import { Dispatch, SetStateAction, useEffect } from "react";
import { useQuery } from "@apollo/client";

import {
  DialogRoot,
  DialogBackdrop,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
} from "@/components/ui/dialog";
import { Image, Spinner } from "@chakra-ui/react";

import { GET_CHARACTER_DETAILS } from "../../../queries/getCharacterDetails"; // Adjust the import as necessary
import { CharacterEpisode } from "@/app/types";

interface CharacterModalProps {
  isOpen: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  characterId?: string;
}

export const CharacterModal = ({
  isOpen,
  setOpen,
  characterId,
}: CharacterModalProps) => {
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
    variables: { id: characterId },
    skip: !characterId, // Skip query if no character ID is provided
  });

  useEffect(() => {
    if (!loading && !error && data) {
      // Additional actions if needed
    }
  }, [loading, error, data]);

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => setOpen(e.open)}>
      <DialogBackdrop />
      <DialogContent>
        <DialogHeader>
          <h4 className="font-bold font-display text-3xl text-violet-700">
          {loading ? "Loading..." : data?.character?.name}
          </h4>
        </DialogHeader>
        <DialogCloseTrigger className="outline-none" />
        <DialogBody className="overflow-auto max-h-[600px]">
          {loading ? (
            <Spinner />
          ) : error ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : (
            data && (
              <div className="flex flex-col gap-2">
                <Image alt={data.character.name} src={data.character.image} />
                <p>
                  <strong>Status:</strong> {data.character.status}
                </p>
                <p>
                  <strong>Species:</strong> {data.character.species}
                </p>
                <p>
                  <strong>Gender:</strong> {data.character.gender}
                </p>
                <p>
                  <strong>Origin:</strong> {data.character.origin?.name}
                </p>
                <p>
                  <strong>Location:</strong> {data.character.location?.name}
                </p>
                <p>
                  <strong>Episodes:</strong>{" "}
                  {data.character.episode
                    .map((ep: CharacterEpisode) => ep.name)
                    .join(", ")}
                </p>
              </div>
            )
          )}
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};
