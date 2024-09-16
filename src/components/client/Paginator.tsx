"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Paginator({
  total,
  perPage,
}: {
  total: number;
  perPage: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = parseInt(searchParams?.get("page") || "1");

  const totalPages = Math.ceil(total / perPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      router.push(`/posts?page=${newPage}`);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers: (string | number)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page > 3) {
        pageNumbers.push(1, "...");
      } else {
        for (let i = 1; i <= Math.min(3, totalPages); i++) {
          pageNumbers.push(i);
        }
      }

      if (page > 3 && page < totalPages - 2) {
        pageNumbers.push(page - 1, page, page + 1);
      } else if (page >= totalPages - 2) {
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }

      if (page < totalPages - 2) {
        pageNumbers.push("...", totalPages);
      }
    }
    return pageNumbers;
  };

  return (
    <div className="pagination">
      <div className="inline-flex text-gray-800 divide-x-2">
        {page > 1 && (
          <button
            className="bg-gray-300 hover:bg-gray-400 transition-all font-bold py-2 px-4 rounded-l"
            onClick={() => handlePageChange(page - 1)}
          >
            {"<"}
          </button>
        )}
        {getPageNumbers().map((pageNumber, index) =>
          typeof pageNumber === "number" ? (
            <button
              key={index}
              className={`${
                pageNumber === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }
              ${pageNumber === 1 && page === 1 && "rounded-l"}
               ${
                 pageNumber === totalPages && page === totalPages && "rounded-r"
               } transition-all font-bold py-2 px-4`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ) : (
            <span key={index} className="py-2 px-4 bg-gray-300 cursor-default ">
              {pageNumber}
            </span>
          )
        )}
        {page < totalPages && (
          <button
            className="bg-gray-300 hover:bg-gray-400 transition-all font-bold py-2 px-4 rounded-r"
            onClick={() => handlePageChange(page + 1)}
          >
            {">"}
          </button>
        )}
      </div>
    </div>
  );
}
