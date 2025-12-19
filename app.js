import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

let activeSockets = new Set();

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);
  activeSockets.add(socket);

  // When client requests a ride
  socket.on("requestRide", (payload) => {
    console.log("Request ride", payload);
    // Find driver (simulate) — create mock driver
    const driver = {
      id: "driver_" + Math.floor(Math.random() * 1000),
      name: "Ravi",
      car: "Swift Dzire - KA01AB1234",
      photo: "/driver-placeholder.png",
      // start driver at a random nearby position
      lat: payload.pickup.lat + (Math.random() - 0.5) * 0.02,
      lng: payload.pickup.lng + (Math.random() - 0.5) * 0.02,
    };

    // assign driver to this socket
    socket.emit("driverAssigned", driver);

    // simulate driver moving towards pickup, then to drop
    simulateDriverMovement(socket, driver, payload.pickup, payload.drop);
  });

  socket.on("cancelRide", () => {
    socket.emit("rideStatus", "idle");
    // stop any background simulation if needed (not implemented per-socket here)
    console.log("Ride canceled for", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
    activeSockets.delete(socket);
  });
});

function simulateDriverMovement(socket, driver, pickup, drop) {
  // 1) move driver toward pickup
  const movePhase = (from, to, stepMs = 2000, onStep) => {
    const steps = 30;
    let i = 0;
    const latStep = (to.lat - from.lat) / steps;
    const lngStep = (to.lng - from.lng) / steps;
    const interval = setInterval(() => {
      i++;
      driver.lat += latStep;
      driver.lng += lngStep;
      socket.emit("driverLocation", { lat: driver.lat, lng: driver.lng });

      if (onStep) onStep({ lat: driver.lat, lng: driver.lng });

      if (i >= steps) {
        clearInterval(interval);
      }
    }, stepMs);
    return interval;
  };

  // Indicate searching -> assigned (already emitted)
  socket.emit("rideStatus", "driver_assigned");

  // move to pickup
  const toPickupInterval = movePhase({ lat: driver.lat, lng: driver.lng }, pickup, 1500, () => {
    // when arrived pickup
  });

  // after arrival delay, move to drop
  setTimeout(() => {
    socket.emit("rideStatus", "driver_arriving");
  }, 1500 * 30 + 500);

  setTimeout(() => {
    socket.emit("rideStatus", "ongoing");
    // move from pickup -> drop
    movePhase(pickup, drop, 1500, () => {});
    // after done, emit completed
    setTimeout(() => {
      socket.emit("rideStatus", "completed");
    }, 1500 * 30 + 2000);
  }, 1500 * 30 + 2000);
}

server.listen(4000, () => {
  console.log("Server listening on :4000");
});
