"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface ProfileModalProps {
  onClose: () => void;
  avatarSrc: string;
  setAvatarSrc: React.Dispatch<React.SetStateAction<string>>;
}

interface ProfileState {
  avatarSrc: string;
  fullName: string;
  nickName: string;
  gender: string;
  mobile: string;
}

// 👇 Yahan pe wahi image ka path hai jo tumne diya tha
const defaultAvatar = "public/default-user.png";


const ProfileCardModal: React.FC<ProfileModalProps> = ({
  onClose,
  avatarSrc,
  setAvatarSrc,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  const [inputs, setInputs] = useState<ProfileState>({
    avatarSrc,
    fullName: "Alexa Rawles",
    nickName: "Alexa",
    gender: "Female",
    mobile: "9876543210",
  });

 useEffect(() => {
  if (!avatarSrc) return;
  // Schedule update for next event loop tick
  setTimeout(() => {
    setInputs((prev) => ({ ...prev, avatarSrc }));
  }, 0);
}, [avatarSrc]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file);
      setInputs((prev) => ({ ...prev, avatarSrc: newAvatarUrl }));
      setAvatarSrc(newAvatarUrl);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) setShowAvatarOptions(true);
  };

  const handlePickGallery = () => {
    fileInputRef.current?.click();
    setShowAvatarOptions(false);
  };

  const handleRemoveAvatar = () => {
    setInputs((prev) => ({ ...prev, avatarSrc: defaultAvatar }));
    setAvatarSrc(defaultAvatar);
    setShowAvatarOptions(false);
  };

  const handleEdit = () => setIsEditing(true);
  const handleSave = () => setIsEditing(false);
  const handleCancel = () => setIsEditing(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-md p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#0f172a] text-white rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.4)] overflow-hidden border border-white/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-3xl"
        >
          &times;
        </button>

        {/* Header */}
        <div className="text-center p-6 border-b border-white/10">
          <h2 className="text-3xl font-semibold text-gray-100 tracking-wide">
            Profile Overview
          </h2>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center py-8">
          <div
            className={`relative rounded-full ${
              isEditing ? "cursor-pointer" : ""
            } group`}
            onClick={handleAvatarClick}
          >
            <Image
              src={
                inputs.avatarSrc && inputs.avatarSrc.trim() !== ""
                  ? inputs.avatarSrc
                  : defaultAvatar
              }
              alt="Avatar"
              className="w-36 h-36 rounded-full object-cover border-2 border-gray-600 shadow-md bg-gray-700"
            />
            {isEditing && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <span className="text-white text-xs font-semibold">
                  Change
                </span>
              </div>
            )}
          </div>

          {/* Avatar Options */}
          {isEditing && showAvatarOptions && (
            <div className="absolute mt-44 bg-slate-900 border border-gray-700 rounded-lg shadow-lg p-3 flex flex-col space-y-2 z-[10001]">
              <button
                className="py-2 px-3 text-left hover:bg-slate-800 rounded"
                onClick={handlePickGallery}
              >
                Choose from Gallery
              </button>
              <button
                className="py-2 px-3 text-left text-red-500 hover:bg-slate-800 rounded"
                onClick={handleRemoveAvatar}
              >
                Remove Photo
              </button>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg"
          />

          {/* ✏️ Edit Button */}
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="mt-8 px-8 py-3 font-semibold text-white bg-blue-600 rounded-xl shadow-md active:translate-y-[1px] active:scale-95 transition-transform duration-150 ease-out hover:bg-blue-500"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Information Section */}
        <div
          className={`p-10 transition-all duration-500 ${
            !isEditing
              ? "opacity-40 blur-sm pointer-events-none"
              : "opacity-100 blur-none"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">
            <div>
              <label className="block text-sm text-gray-400">Full Name</label>
              <input
                id="fullName"
                type="text"
                value={inputs.fullName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 mt-1 bg-[#1e293b] border border-gray-700 rounded-lg text-gray-100 ${
                  !isEditing
                    ? "opacity-50 cursor-default"
                    : "focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400">Nick Name</label>
              <input
                id="nickName"
                type="text"
                value={inputs.nickName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 mt-1 bg-[#1e293b] border border-gray-700 rounded-lg text-gray-100 ${
                  !isEditing
                    ? "opacity-50 cursor-default"
                    : "focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400">Gender</label>
              <select
                id="gender"
                value={inputs.gender}
                onChange={handleSelectChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 mt-1 bg-[#1e293b] border border-gray-700 rounded-lg text-gray-100 ${
                  !isEditing
                    ? "opacity-50 cursor-default"
                    : "focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                }`}
              >
                <option>Female</option>
                <option>Male</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400">
                Mobile Number
              </label>
              <input
                id="mobile"
                type="tel"
                value={inputs.mobile}
                onChange={handleInputChange}
                disabled={!isEditing}
                className={`w-full px-3 py-2 mt-1 bg-[#1e293b] border border-gray-700 rounded-lg text-gray-100 ${
                  !isEditing
                    ? "opacity-50 cursor-default"
                    : "focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                }`}
              />
            </div>
          </div>
        </div>

        {/* ✅ Bottom Center Buttons */}
        {isEditing && (
          <div className="flex justify-center items-center py-6 border-t border-gray-700 bg-[#111827]/60">
            <div className="flex gap-4">
              <button
                onClick={handleCancel}
                className="px-6 py-2 font-semibold text-gray-300 bg-gray-700/40 border border-gray-600 rounded-lg hover:bg-gray-700/70 transition-all duration-200 ease-out"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 font-semibold text-white bg-green-600 rounded-lg shadow-sm hover:bg-green-500 active:translate-y-[2px] active:shadow-inner transition-all duration-150 ease-out"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileCardModal;
