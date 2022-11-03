import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function BasicPagination({ productsPerPage, totalProducts, paginate }) {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Stack spacing={2}>
      <Pagination 
        count={pageNumbers.length} 
        onClick={paginate}
      />
    </Stack>
  );
}
