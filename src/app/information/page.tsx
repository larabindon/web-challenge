"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { Spinner } from "@chakra-ui/react";

import { Avatar } from "@/components/ui/avatar";

import { GET_CHARACTERS } from "../../queries/getCharacter";
import { Character } from "../types";
import { Pagination } from "../components/Pagination";
import { CharacterModal } from "../components/CharacterModal";
import { Profile } from "../components/Profile";

const InformationPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1); // Initialize with a default page
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(
    null
  );
  const [isModalOpen, setModalOpen] = useState(false);

  const { loading, error, data } = useQuery(GET_CHARACTERS, {
    variables: { page: currentPage }, // Pass the current page as a variable
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const page = parseInt(query.get("page") || "1", 10);
    setCurrentPage(page);
  }, []);

  useEffect(() => {
    if (!loading && data) {
    }
  }, [loading, data]);

  const handlePageChange = (page: number) => {
    router.push(`/information?page=${page}`); // Update the URL with the new page
    setCurrentPage(page);
  };

  const handleRowClick = (characterId: string) => {
    setSelectedCharacterId(characterId);
    setModalOpen(true);
  };

  // Load user info from local storage
  useEffect(() => {
    const storedInfo = localStorage.getItem("userInfo");
    if (!storedInfo) {
      // Redirect to home page if no user info is found
      router.push("/");
    }
  }, [router]);

  if (loading) return <Spinner />;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return (
    <>
      <div>
        <Profile />
      </div>
      <CharacterModal
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        characterId={selectedCharacterId}
      />

      <div className="p-10">
        <div className="bg-white shadow-lg p-2">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-3xl font-display font-semibold leading-6 text-gray-900">
                  Character List
                </h1>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 hidden md:table-cell"
                        >
                          Species
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {data.characters.results.map((character: Character) => (
                        <tr
                          key={character.id}
                          className="cursor-pointer"
                          onClick={() => handleRowClick(character.id)}
                        >
                          <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                            <div className="flex gap-2 items-center">
                              <div className="flex-shrink-0">
                                <Avatar
                                  name={character.name}
                                  src={character.image}
                                  size="xl"
                                />
                              </div>
                              <div className="font-medium text-gray-900">
                                {character.name}
                              </div>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell">
                            <div className="text-gray-900">
                              {character.status}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500 hidden md:table-cell">
                            <div className="text-gray-900">
                              {character.species}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <Pagination
              totalPages={data.characters.info.pages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default InformationPage;
