"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

interface ProfileModalProps {
  onClose: () => void;
  avatarSrc: string;
  setAvatarSrc: React.Dispatch<React.SetStateAction<string>>;
}

const defaultAvatar = "/defaultcharacter.png";

const ProfileCardModal: React.FC<ProfileModalProps> = ({
  onClose,
  avatarSrc,
  setAvatarSrc,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [animate, setAnimate] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [inputs, setInputs] = useState({
    fullName: "abhi yadav",
    nickName: "Alexa",
    gender: "Female",
    mobile: "9876543210",
  });

  useEffect(() => {
    setTimeout(() => setAnimate(true), 50);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatarSrc(newAvatarUrl);
      setShowAvatarOptions(false);
    }
  };

  const handleAvatarClick = () => {
    if (isEditing) setShowAvatarOptions(true);
  };

  const handlePickGallery = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveAvatar = () => {
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
      className="fixed inset-0 z-[9999] flex flex-col justify-end bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-2xl mx-auto mb-6 bg-[rgba(15,23,42,0.92)]
        text-white rounded-t-3xl shadow-[0_-8px_40px_rgba(0,0,0,0.4)]
        overflow-hidden border border-white/10 flex flex-col 
        backdrop-blur-md backdrop-saturate-150 transform transition-all duration-500
        ${animate ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#0f172a]/60 border-b border-white/10">
          <h3 className="text-lg font-semibold">User Profile</h3>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-2xl bg-white/5 w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10"
          >
            &times;
          </button>
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center justify-center py-6 relative">
          <div
            className={`relative rounded-full ${isEditing ? "cursor-pointer" : ""}`}
            onClick={handleAvatarClick}
          >
            <Image
              src={avatarSrc || defaultAvatar}
              alt="Avatar"
              width={112}
              height={112}
              className="w-28 h-28 rounded-full object-cover border-2 border-indigo-600 shadow-md"
            />

            {isEditing && (
              <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition">
                <span className="text-white text-xs font-semibold">Change</span>
              </div>
            )}
          </div>

          {isEditing && showAvatarOptions && (
            <div className="absolute mt-36 bg-slate-900 border border-indigo-700 rounded-lg shadow-lg p-3 flex flex-col space-y-2">
              <button
                className="py-2 px-3 hover:bg-slate-800 rounded"
                onClick={handlePickGallery}
              >
                Choose from Gallery
              </button>
              <button
                className="py-2 px-3 text-red-500 hover:bg-slate-800 rounded"
                onClick={handleRemoveAvatar}
              >
                Remove Photo
              </button>
            </div>
          )}

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/png, image/jpeg"
          />

          {!isEditing && (
            <button
              onClick={handleEdit}
              className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-lg shadow-md"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Inputs section removed for brevity but unchanged */}
      </div>
    </div>
  );
};

export default ProfileCardModal;
