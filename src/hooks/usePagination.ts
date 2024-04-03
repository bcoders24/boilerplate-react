import { type PaginationState } from '@tanstack/react-table';
import { useState } from 'react';

const usePagination = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  return { pagination, setPagination };
};

export default usePagination;
