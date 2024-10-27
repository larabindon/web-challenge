import React from "react";
import { HStack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
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
    >
      <HStack justify="center" mt={4}>
        <PaginationPrevTrigger
          onClick={() => {
            console.log("change");
            onPageChange(currentPage - 1);
          }}
        />
        <PaginationItems />
        <PaginationNextTrigger onClick={() => onPageChange(currentPage + 1)} />
      </HStack>
    </PaginationRoot>
  );
};
