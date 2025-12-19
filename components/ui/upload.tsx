"use client";

import * as React from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProfileCardModal from "@/components/ProfileCard";

const defaultAvatar = "/defaultcharacter.png";

function DefaultUserIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"
      className="rounded-full bg-gray-700 border-2 border-gray-600 shadow-md">
      <circle cx="12" cy="8" r="4" />
      <path d="M2 20c0-3.333 5.333-6 10-6s10 2.667 10 6v2H2v-2z" />
    </svg>
  );
}

function UserAvatar({ src, alt, size = 40 }: { src?: string; alt?: string; size?: number }) {
  if (!src || src === defaultAvatar) {
    return (
      <span className="flex items-center justify-center rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: "#374151",
          borderWidth: 2,
          borderColor: "#4b5563",
          boxShadow: "0 0 8px rgba(0,0,0,0.3)",
          borderStyle: "solid",
        }}>
        <DefaultUserIcon size={size} />
      </span>
    );
  }
  return (
    <Image
      alt={alt || "n"}
      src={src!}
      width={size}
      height={size}
      className="rounded-full object-cover border-2 border-gray-600 shadow-md"
    />
  );
}

export default function UploadAvatars() {
  const router = useRouter();

  const [avatarSrc, setAvatarSrc] = React.useState<string>(defaultAvatar);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState<boolean>(false);

  const handleClose = () => setOpen(false);

  const handleProfileClick = () => {
    handleClose();
    setIsProfileModalOpen(true);
  };

  const handleContactClick = () => {
    handleClose();
    router.push("/contactus");  // ✔ FIXED ROUTE (WORKING)
  };

  return (
    <>
      <ButtonBase
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        sx={{
          borderRadius: "50%",
          width: 48,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UserAvatar src={avatarSrc} alt="User Avatar" size={40} />
      </ButtonBase>

      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black z-[9998]"
                  onClick={handleClose}
                />

                <motion.div
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  className="fixed top-0 left-0 w-full max-h-[90vh] bg-[#0D1117] text-white shadow-lg z-[9999] rounded-b-2xl border-b border-gray-700"
                >
                  <div className="flex justify-between items-center p-4 border-b border-gray-800">
                    <h2 className="text-lg font-semibold">User Menu</h2>
                    <button onClick={handleClose} className="text-gray-400 hover:text-white text-xl">
                      ✕
                    </button>
                  </div>

                  <ul className="flex flex-col text-center text-base py-4">
                    <li onClick={handleProfileClick} className="py-3 hover:bg-gray-800 cursor-pointer">Profile</li>
                    <li className="py-3 hover:bg-gray-800 cursor-pointer">Update</li>
                    <li onClick={handleContactClick} className="py-3 hover:bg-gray-800 cursor-pointer">Contact Us</li>
                    <li className="py-3 hover:bg-gray-800 cursor-pointer">History</li>
                    <li className="py-3 hover:bg-gray-800 cursor-pointer">Order Status</li>
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}

      {typeof window !== "undefined" && isProfileModalOpen &&
        createPortal(
          <ProfileCardModal
            onClose={() => setIsProfileModalOpen(false)}
            avatarSrc={avatarSrc}
            setAvatarSrc={setAvatarSrc}
          />,
          document.body
        )}
    </>
  );
}
