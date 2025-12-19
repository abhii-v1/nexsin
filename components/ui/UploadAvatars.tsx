"use client";

import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import ProfileCardModal from "@/components/ProfileCard";
import ProfilePage from "../ProfilePage";

export default function UploadAvatars({
  avatarSrc,
  setAvatarSrc,
}: {
  avatarSrc: string;
  setAvatarSrc: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [open, setOpen] = React.useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = React.useState(false);

  const router = useRouter();

  const handleClose = () => setOpen(false);

  const logout = () => {
    router.push("/login");
  };

  return (
    <>
      {/* Avatar button inside CardNav */}
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
          padding: 0,
        }}
      >
        <MuiAvatar
          alt="User Avatar"
          src={avatarSrc}
          sx={{ width: 40, height: 40 }}
        />
      </ButtonBase>

      {/* Fullscreen slide-down via portal */}
      {typeof window !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="fixed inset-0 bg-black z-[9998]"
                  onClick={handleClose}
                />

                <motion.div
                  key="slide-menu"
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="fixed top-0 left-0 w-full max-h-[90vh] bg-[#0D1117] text-white shadow-lg z-[9999] rounded-b-2xl border-b border-gray-700"
                >
                  <div className="flex justify-between items-center p-4 border-b border-gray-800">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button
                      onClick={handleClose}
                      className="text-gray-400 hover:text-white text-xl"
                    >
                      ✕
                    </button>
                  </div>

                  <ul className="flex flex-col text-center text-base py-4">
                    <li
                      className="py-3 hover:bg-gray-800 cursor-pointer"
                      onClick={() => {
                        setOpen(false);
                        setIsProfileModalOpen(true);
                      }}
                    >
                      Profile
                    </li>

                    <li className="py-3 hover:bg-gray-800 cursor-pointer">
                      Update
                    </li>
                    <li className="py-3 hover:bg-gray-800 cursor-pointer">
                      Contact Us
                    </li>
                    <li className="py-3 hover:bg-gray-800 cursor-pointer">
                      History
                    </li>
                    <li className="py-3 hover:bg-gray-800 cursor-pointer">
                      Order Status
                    </li>

                    <li
                      className="bg-red py-3 hover:bg-gray-800 cursor-pointer"
                      onClick={logout}
                    >
                      Logout
                    </li>
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Profile Modal */}
      {typeof window !== "undefined" &&
        isProfileModalOpen &&
        createPortal(
          <ProfilePage
            avatarSrc={avatarSrc}
            setAvatarSrc={setAvatarSrc}
            onClose={() => setIsProfileModalOpen(false)}
          />,
          document.body
        )}
    </>
  );
}
