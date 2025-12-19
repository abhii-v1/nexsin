"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  GoogleMap,
  Marker,
  Polyline,
  useLoadScript,
  Autocomplete,
} from "@react-google-maps/api";
import { io, Socket } from "socket.io-client";

const containerStyle = { width: "100%", height: "100%" };

type LatLng = { lat: number; lng: number };

const FARE = {
  base: 25, // base fare in ₹
  perKm: 10, // per km rate
  perMin: 1, // per minute rate
  surgeMultiplier: 1.0,
};

export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
    libraries: ["places"],
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  // user & driver
  const [myLocation, setMyLocation] = useState<LatLng>({
    lat: 20.5937,
    lng: 78.9629,
  });
  const [driverLocation, setDriverLocation] = useState<LatLng | null>(null);

  // places autocomplete refs
  const pickupRef = useRef<google.maps.places.Autocomplete | null>(null);
  const dropRef = useRef<google.maps.places.Autocomplete | null>(null);

  const [pickup, setPickup] = useState<LatLng | null>(null);
  const [drop, setDrop] = useState<LatLng | null>(null);

  // directions + route info
  const [routePath, setRoutePath] = useState<LatLng[]>([]);
  const [distanceText, setDistanceText] = useState<string | null>(null);
  const [distanceValueKm, setDistanceValueKm] = useState<number | null>(null); // km
  const [durationText, setDurationText] = useState<string | null>(null);
  const [durationValueMin, setDurationValueMin] = useState<number | null>(null);

  // booking / driver state
  type DriverInfo = {
    name: string;
    photo?: string;
    car?: string;
    phone?: string;
    rating?: number;
    [key: string]: unknown;
  };
  const [bookingState, setBookingState] = useState<
    | "idle"
    | "requested"
    | "driver_assigned"
    | "driver_arriving"
    | "ongoing"
    | "completed"
  >("idle");
  const [driverInfo, setDriverInfo] = useState<DriverInfo | null>(null);
  const socketRef = useRef<Socket | null>(null);

  // fare estimate
  const fareEstimate = () => {
    if (!distanceValueKm || !durationValueMin) return null;
    const km = distanceValueKm;
    const mins = durationValueMin;
    const fare =
      (FARE.base + FARE.perKm * km + FARE.perMin * mins) * FARE.surgeMultiplier;
    return Math.max(Math.round(fare), FARE.base);
  };

  // init map, geolocation, socket
  useEffect(() => {
    // init socket
    socketRef.current = io("http://localhost:4000");

    // receive driver updates
    socketRef.current.on("driverLocation", (data: LatLng) => {
      setDriverLocation(data);
      // if driver assigned, mark arriving state
      if (bookingState === "driver_assigned") {
        setBookingState("driver_arriving");
      }
    });

    // driver assigned event
    socketRef.current.on("driverAssigned", (driver) => {
      setDriverInfo(driver);
      setBookingState("driver_assigned");
    });

    // ride status updates (arrived, start, complete)
    socketRef.current.on("rideStatus", (status: string) => {
      if (
        status === "idle" ||
        status === "requested" ||
        status === "driver_assigned" ||
        status === "driver_arriving" ||
        status === "ongoing" ||
        status === "completed"
      ) {
        setBookingState(status);
      } else {
        console.warn("Unknown rideStatus received:", status);
      }
    });

    // get browser location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const p = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setMyLocation(p);
          setPickup(p); // default pickup to current location
          if (mapRef.current) mapRef.current.panTo(p);
        },
        (err) => console.error("geolocation error", err),
        { enableHighAccuracy: true }
      );
    }

    return () => {
      socketRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper: recenter
  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.panTo(myLocation);
      mapRef.current.setZoom(16);
    }
  };

  // compute route using client DirectionsService (no server call required)
const computeRoute = async (from: LatLng, to: LatLng) => {
  if (!window.google) return;

  const directionsService = new google.maps.DirectionsService();

  directionsService.route(
    {
      origin: { lat: from.lat, lng: from.lng },
      destination: { lat: to.lat, lng: to.lng },
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (result, status) => {
      if (status === google.maps.DirectionsStatus.OK && result && result.routes && result.routes.length > 0) {
        const route = result.routes[0];
        // build path polyline
        const path: LatLng[] = [];
        route.overview_path.forEach((p: google.maps.LatLng) =>
          path.push({ lat: p.lat(), lng: p.lng() })
        );
        setRoutePath(path);

        // compute distance & duration from legs
        let totalMeters = 0;
        let totalSeconds = 0;
        route.legs.forEach((leg) => {
          if (leg.distance) totalMeters += leg.distance!.value ?? 0;
          if (leg.duration) totalSeconds += leg.duration!.value ?? 0;
        });

        const km = Math.round((totalMeters / 1000) * 10) / 10;
        setDistanceValueKm(km);
        setDistanceText(`${km} km`);

        const mins = Math.round(totalSeconds / 60);
        setDurationValueMin(mins);
        setDurationText(`${mins} min`);
      } else {
        console.warn("Directions request failed:", status);
      }
    }
  );
};

  // when pickup & drop changed compute route
  useEffect(() => {
    if (pickup && drop) {
      computeRoute(pickup, drop);
      // auto-zoom to bounds
      setTimeout(() => {
        if (!mapRef.current || routePath.length === 0) return;
        const bounds = new google.maps.LatLngBounds();
        routePath.forEach((p) =>
          bounds.extend(new google.maps.LatLng(p.lat, p.lng))
        );
        mapRef.current.fitBounds(bounds);
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickup, drop]);

  // Autocomplete place changed handlers
  const onPickupLoad = (ac: google.maps.places.Autocomplete | null) => {
    pickupRef.current = ac;
  };
  const onDropLoad = (ac: google.maps.places.Autocomplete | null) => {
    dropRef.current = ac;
  };
  const onPickupPlaceChanged = () => {
    const place = pickupRef.current?.getPlace();
    if (place?.geometry?.location) {
      const loc = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setPickup(loc);
      if (mapRef.current) mapRef.current.panTo(loc);
    }
  };
  const onDropPlaceChanged = () => {
    const place = dropRef.current?.getPlace();
    if (place?.geometry?.location) {
      const loc = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setDrop(loc);
    }
  };

  // BOOK RIDE (emit to server)
  const requestRide = () => {
    if (!pickup || !drop) return alert("Select pickup and drop");
    setBookingState("requested");
    // payload: pickup, drop, distance
    socketRef.current?.emit("requestRide", {
      pickup,
      drop,
      distanceKm: distanceValueKm,
    });
  };

  // CANCEL RIDE
  const cancelRide = () => {
    socketRef.current?.emit("cancelRide");
    setBookingState("idle");
    setDriverInfo(null);
    setDriverLocation(null);
    setRoutePath([]); // optional
  };

  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="relative h-full w-full">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={myLocation}
        zoom={16}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        options={{ streetViewControl: false, mapTypeControl: false }}
      >
        {/* accuracy circle (approx) */}
        <Marker
          position={myLocation}
          icon={{
            url: "/user-dot.png",
            scaledSize: new window.google.maps.Size(28, 28),
          }}
        />

        {/* driver marker */}
        {driverLocation && (
          <Marker
            position={driverLocation}
            icon={{
              url: "/car-icon.jpeg",
              scaledSize: new window.google.maps.Size(44, 44),
            }}
          />
        )}

        {/* route polyline */}
        {routePath.length > 0 && (
          <Polyline
            path={routePath}
            options={{ strokeColor: "#1976D2", strokeWeight: 6 }}
          />
        )}
      </GoogleMap>

      {/* UI Panel */}
      <div className="absolute top-6 left-6 z-50 w-[360px] bg-white/95 rounded-lg p-4 shadow-lg">
        <h3 className="font-semibold text-lg">Where to?</h3>

        <div className="mt-3 space-y-2">
          <Autocomplete
            onLoad={onPickupLoad}
            onPlaceChanged={onPickupPlaceChanged}
          >
            <input
              placeholder="Pickup (your location)"
              value={pickup ? "" : ""}
              className="w-full p-2 border rounded"
              defaultValue=""
            />
          </Autocomplete>

          <Autocomplete onLoad={onDropLoad} onPlaceChanged={onDropPlaceChanged}>
            <input
              placeholder="Where to?"
              className="w-full p-2 border rounded"
            />
          </Autocomplete>

          <div className="flex items-center gap-2 mt-2">
            <button
              className="px-3 py-2 bg-blue-600 text-white rounded"
              onClick={() => {
                // set pickup to current location
                setPickup(myLocation);
                if (mapRef.current) mapRef.current.panTo(myLocation);
              }}
            >
              Use my location
            </button>

            <button
              className="px-3 py-2 border rounded"
              onClick={() => {
                // swap pickup/drop
                setPickup((p) => {
                  const prev = p;
                  setPickup(drop ?? null);
                  setDrop(prev ?? null);
                  return drop ?? null;
                });
              }}
            >
              Swap
            </button>
          </div>
        </div>

        {/* Route info */}
        {distanceText && durationText && (
          <div className="mt-3 p-2 bg-gray-100 rounded">
            <div className="flex justify-between">
              <div>
                <div className="text-sm text-gray-600">Distance</div>
                <div className="font-medium">{distanceText}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">ETA</div>
                <div className="font-medium">{durationText}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Fare</div>
                <div className="font-medium">₹ {fareEstimate()}</div>
              </div>
            </div>
          </div>
        )}

        {/* Booking buttons & status */}
        <div className="mt-3">
          {bookingState === "idle" && (
            <button
              className="w-full py-2 bg-green-600 text-white rounded"
              onClick={requestRide}
            >
              Request Ride
            </button>
          )}

          {bookingState === "requested" && (
            <div className="space-y-2">
              <div className="text-sm">Searching for drivers nearby...</div>
              <button
                className="w-full py-2 bg-red-500 text-white rounded"
                onClick={cancelRide}
              >
                Cancel
              </button>
            </div>
          )}

          {(bookingState === "driver_assigned" ||
            bookingState === "driver_arriving" ||
            bookingState === "ongoing") &&
            driverInfo && (
                <div className="flex items-center gap-3">
                  <Image
                    src={driverInfo.photo || "/driver-placeholder.png"}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full"
                    alt="driver"
                  />
                  <div>
                  <div>
                    <div className="font-semibold">{driverInfo.name}</div>
                    <div className="text-sm text-gray-600">
                      Car: {driverInfo.car}
                    </div>
                    <div className="text-sm text-gray-600">
                      ETA: {durationText}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-3">
                  <button
                    className="flex-1 py-2 bg-blue-600 text-white rounded"
                    onClick={() => {
                      // optional: contact driver logic
                      window.alert("Contact driver (mock)");
                    }}
                  >
                    Contact
                  </button>
                  <button
                    className="flex-1 py-2 border rounded"
                    onClick={cancelRide}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

          {bookingState === "completed" && (
            <div className="mt-2 p-2 bg-green-50 border rounded">
              <div className="font-medium">Ride completed</div>
              <div className="text-sm">Thank you — ₹ {fareEstimate()}</div>
              <button
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
                onClick={() => setBookingState("idle")}
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>

      {/* recenter button */}
      <button
        onClick={handleRecenter}
        className="absolute bottom-6 right-6 z-50 bg-white p-3 rounded-full shadow"
        title="Recenter to me"
      >
        ⊕
      </button>
    </div>
  );
}
