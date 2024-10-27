import { useState } from "react";
import { UserInfo } from "@/app/types";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
} from "@/components/ui/dialog";
import { Input } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  saveUserData: (username: string, jobTitle: string) => void;
  defaultValue?: UserInfo;
}

export const ProfileEdit = ({
  isOpen,
  onClose,
  saveUserData,
  defaultValue,
}: DialogProps) => {
  const [username, setUsername] = useState(defaultValue?.username || "");
  const [jobTitle, setJobTitle] = useState(defaultValue?.jobTitle || "");

  const handleSave = () => {
    saveUserData(username, jobTitle);
    onClose();
  };

  return (
    <DialogRoot open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <h4 className="text-lg">Enter Your information</h4>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-2">
          <div>
            <h5>Username </h5>
            <Input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="my-2 p-2 border"
            />
          </div>
          <div>
            <h5>Job Title </h5>
            <Input
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="my-2 p-2 border"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button colorScheme="blue" onClick={handleSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};
