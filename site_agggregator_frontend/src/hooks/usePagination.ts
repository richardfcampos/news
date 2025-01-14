import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  initialPage?: number;
}

export default function usePagination({ totalItems, itemsPerPage, initialPage = 1 }: UsePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  useEffect(() => {
    const queryPage = parseInt(searchParams.get('page') || '', 10);
    if (!isNaN(queryPage) && queryPage >= 1 && queryPage <= totalPages) {
      setCurrentPage(queryPage);
    }
  }, [searchParams, totalPages]);

  const goToPage = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const lastPage = () => {
    goToPage(totalPages);
  };

  return {
    currentPage,
    totalPages,
    totalRecords: totalItems,
    goToPage,
    nextPage,
    prevPage,
    lastPage,
  };
}
