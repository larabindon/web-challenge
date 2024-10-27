"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { UserInfo } from "./types";
import { ProfileEdit } from "./components/ProfileEdit";

function Home() {
  const router = useRouter(); 
  const [isDialogOpen, setDialogOpen] = useState(true);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); 

  useEffect(() => {
    //Get stored user info
    const storedInfo = localStorage.getItem("userInfo");
    if (storedInfo) {
      setUserInfo(JSON.parse(storedInfo));
      router.push("/information");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSaveUserInfo = (username: string, jobTitle: string) => {
    const info = { username, jobTitle };
    localStorage.setItem("userInfo", JSON.stringify(info));

    //set dialog open false once user info has been assigned
    setDialogOpen(false);

    // Redirect to the information page after saving user info
    router.push("/information");
  };

  return (
    <>
      {/* Only display if isDialogOpen is open AND there is no user info  */}
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

export default Home;
