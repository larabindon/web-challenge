// components/Profile.tsx
"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DrawerContent,
  DrawerBackdrop,
  DrawerRoot,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer";
import { useEffect, useState } from "react";
import { ProfileEdit } from "../ProfileEdit";
import { UserInfo } from "@/app/types";

export const Profile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Start with dialog open
  const [isDialogOpen, setDialogOpen] = useState(false); // Start with dialog open

  // Load user info from local storage
  useEffect(() => {
    const storedInfo = localStorage.getItem("userInfo");
    if (storedInfo) {
      setUserInfo(JSON.parse(storedInfo));
    }
  }, []);

  const handleSaveUserInfo = (username: string, jobTitle: string) => {
    const info = { username, jobTitle };
    setUserInfo(info);
    localStorage.setItem("userInfo", JSON.stringify(info));
  };

  return (
    <>
      {userInfo && (
        <>
          <ProfileEdit
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
            saveUserData={handleSaveUserInfo}
            defaultValue={userInfo}
          />

          <Avatar
            name={userInfo?.username}
            src={"https://bit.ly/broken-link"} // Placeholder image
            size="lg"
            onClick={() => setIsDrawerOpen(true)}
            position="fixed"
            top="16px"
            right="16px"
            cursor="pointer"
            zIndex={1000}
          />

          <DrawerRoot open={isDrawerOpen} placement={"end"} onOpenChange={(e) => setIsDrawerOpen(e.open)}>
            <DrawerBackdrop />
            <DrawerContent>
              <DrawerHeader>User Information</DrawerHeader>
              <DrawerBody>
                <div>
                  <p>
                    <strong>Username:</strong> {userInfo.username}
                  </p>
                  <p>
                    <strong>Job Title:</strong> {userInfo.jobTitle}
                  </p>
                </div>
              </DrawerBody>
              <DrawerFooter>
                <Button
                  mr={3}
                  className="outline-none"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Close
                </Button>
                <Button onClick={() => setDialogOpen(true)}>
                  Edit Information
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerRoot>
        </>
      )}
    </>
  );
};
