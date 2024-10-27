"use client";
import { useEffect, useState } from "react";
import { ProfileEdit } from "./components/ProfileEdit";

import { useRouter } from "next/navigation";
import { UserInfo } from "./types";

export default function Home() {
  const router = useRouter(); // Initialize the router
  const [isDialogOpen, setDialogOpen] = useState(true); // Start with dialog open
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const storedInfo = localStorage.getItem("userInfo");
    if (storedInfo) {
      setUserInfo(JSON.parse(storedInfo));
      router.push("/information");
    }
  }, []);

  const handleSaveUserInfo = (username: string, jobTitle: string) => {
    const info = { username, jobTitle };
    setDialogOpen(false);
    localStorage.setItem("userInfo", JSON.stringify(info));
    // Redirect to the information page after saving user info
    router.push("/information");
  };

  return (
    <>
      {isDialogOpen && userInfo === null && (
        <ProfileEdit
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          saveUserData={handleSaveUserInfo}
        />
      )}
    </>
  );
}
