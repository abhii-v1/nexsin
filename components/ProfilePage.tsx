"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const defaultAvatar = "/defaultcharacter.png";

export default function ProfilePage({
  avatarSrc,
  setAvatarSrc,
  onClose,
}: {
  avatarSrc: string;
  setAvatarSrc: React.Dispatch<React.SetStateAction<string>>;
  onClose: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showEdit, setShowEdit] = useState(false);

  const [form, setForm] = useState({
    fullName: "Abhi Yadav",
    username: "abhi123",
    email: "abhi@example.com",
    phone: "9876543210",
    address: "Your address here",
    bio: "Write something about yourself...",
    gender: "Male",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setAvatarSrc(imgURL);
    }
  };

  const handleAvatarRemove = () => {
    setAvatarSrc(defaultAvatar);
  };

  return (
    <div
      className="
    fixed inset-0 
    bg-black/60 backdrop-blur-md 
    z-[9999] 
    overflow-y-auto 
    flex justify-center 
    p-4
  "
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="
    bg-[#0F172A]
    text-white
    w-full max-w-3xl
    rounded-2xl
    shadow-2xl
    p-8
    flex flex-col
    max-h-[85vh]
    overflow-y-auto
  "
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-6">
          <h1 className="text-2xl font-bold">Profile</h1>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <Image
              src={avatarSrc || defaultAvatar}
              alt="avatar"
              width={160}
              height={160}
              className="rounded-full border-4 border-indigo-500 shadow-xl object-cover"
            />
          </motion.div>

          <div className="flex gap-4 mt-5">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Change Photo
            </button>

            <button
              onClick={handleAvatarRemove}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700"
            >
              Remove
            </button>
          </div>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>

        {/* EDIT BUTTON */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setShowEdit(!showEdit)}
            className="px-5 py-2.5 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            {showEdit ? "Hide Details" : "Edit Profile"}
          </button>
        </div>

        {/* EDIT FIELDS WITH SWEET ANIMATION */}
        <AnimatePresence>
          {showEdit && (
            <motion.div
              initial={{ opacity: 0, y: -20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -20, height: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-5"
            >
              {/* Full Name */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Full Name (required)
                </label>
                <input
                  id="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Mobile Number (required)
                </label>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Address Line 1 */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Address Line 1 (required)
                </label>
                <input
                  id="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Flat, House no., Building, Company"
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100 focus:ring-2 focus:ring-indigo-600"
                />
              </div>

              {/* Address Line 2 */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Address Line 2
                </label>
                <input
                  id="address2"
                  placeholder="Area, Colony, Street, Sector, Village"
                  onChange={handleChange}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100"
                />
              </div>

              {/* Landmark */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Landmark
                </label>
                <input
                  id="landmark"
                  placeholder="E.g. Near Apollo Hospital"
                  onChange={handleChange}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100"
                />
              </div>

              {/* City, State, Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* City */}
                <div>
                  <label className="text-sm font-medium text-gray-300">
                    City
                  </label>
                  <input
                    id="city"
                    placeholder="City"
                    onChange={handleChange}
                    className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="text-sm font-medium text-gray-300">
                    State
                  </label>
                  <input
                    id="state"
                    placeholder="State"
                    onChange={handleChange}
                    className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100"
                  />
                </div>

                {/* Pincode */}
                <div>
                  <label className="text-sm font-medium text-gray-300">
                    Pincode
                  </label>
                  <input
                    id="pincode"
                    placeholder="6-digit Pincode"
                    onChange={handleChange}
                    className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100"
                  />
                </div>
              </div>

              {/* Country */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Country
                </label>
                <input
                  id="country"
                  placeholder="India"
                  defaultValue="India"
                  onChange={handleChange}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100"
                />
              </div>

              {/* Alternate Phone */}
              <div>
                <label className="text-sm font-medium text-gray-300">
                  Alternate Phone
                </label>
                <input
                  id="alternatePhone"
                  placeholder="Optional"
                  onChange={handleChange}
                  className="w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-gray-100"
                />
              </div>

              {/* Default Address */}
              <div className="flex items-center gap-3 mt-4">
                <input
                  type="checkbox"
                  id="defaultAddress"
                  className="w-5 h-5"
                />
                <label
                  htmlFor="defaultAddress"
                  className="text-gray-300 text-sm"
                >
                  Make this my default delivery address
                </label>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        {showEdit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-end gap-4 mt-10"
          >
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>

            <button
              onClick={() => console.log("Saved:", form)}
              className="px-5 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Save Changes
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
