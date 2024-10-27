import React from "react";
import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "@/components/ui/pagination";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  return (
    <PaginationRoot
      count={totalPages}
      pageSize={1}
      defaultPage={currentPage}
      onPageChange={(e) => onPageChange(e.page)}
      siblingCount={1}
    >
      <HStack justify="center" mt={4}>
        <PaginationPrevTrigger
          onClick={() => {
            console.log("change");
            onPageChange(currentPage - 1);
          }}
        />
        <div className=" md:hidden">
          <PaginationPageText />
        </div>
        <div className=" hidden gap-2 md:flex">
          <PaginationItems />
        </div>
        <PaginationNextTrigger onClick={() => onPageChange(currentPage + 1)} />
      </HStack>
    </PaginationRoot>
  );
};
