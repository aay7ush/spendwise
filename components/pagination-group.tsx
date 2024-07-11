"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PaginationGroupProps } from "@/types";

export default function PaginationGroup({
  page,
  totalPage,
}: PaginationGroupProps) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(page);
  const [totalPages, setTotalPages] = useState(totalPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push(`/dashboard?page=${page}`);
  };

  return (
    <div className="pb-3">
      {totalPage > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(currentPage - 1)}
                  isActive={currentPage > 1}
                  className="cursor-pointer"
                />
              </PaginationItem>
            )}
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                  className="cursor-pointer"
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              {currentPage < totalPages && (
                <PaginationNext
                  onClick={() => handlePageChange(currentPage + 1)}
                  isActive={currentPage < totalPages}
                  className="cursor-pointer"
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
