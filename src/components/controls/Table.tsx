import { useEffect, useMemo, useState } from "react";
import {
  useReactTable,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import {
  TextField,
  TableBody,
  TableCell,
  Table,
  TableHead,
  TableRow,
  TableContainer,
  Stack,
  Box,
  Typography,
} from "@mui/material";
import { useDebounce } from "use-debounce";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Controls from "controls/Controls";
import Loader from "common/Loader/Loader";

const CustomTable = ({ columnDef, data, changeData, loading, addUser }) => {
  const finalColumnDef = useMemo(() => columnDef, []);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [filtering, setFiltering] = useState("");
  const [debouncedValue] = useDebounce(filtering, 700);

  const tableInstance = useReactTable({
    data: data,
    columns: finalColumnDef,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      pagination: pagination,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    manualSorting: true,
    onPaginationChange: setPagination,
    manualPagination: true,
    onGlobalFilterChange: setFiltering,
    manualFiltering: true,
    // pageCount: 20,
  });

  useEffect(() => {
    const params = `pageNo=${pagination.pageIndex + 1}&pageSize=${
      pagination.pageSize
    }&sort=${sorting[0]?.id ? sorting[0]?.id : ""}&order=${
      sorting[0]?.desc ? "desc" : "asc"
    }&search=${filtering}`;
    changeData(params);
  }, [pagination, sorting, debouncedValue]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        paddingX="10px"
        paddingTop="10px"
        position="sticky"
        top="0"
      >
        <TextField
          type="text"
          size="small"
          variant="outlined"
          label={null}
          placeholder="Search"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
          autoFocus={filtering.length > 0 ? true : false}
        />
        <Controls.Button text="Add Record" onClick={addUser} />
      </Box>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            {tableInstance.getHeaderGroups().map((headerEl) => {
              return (
                <TableRow key={headerEl.id}>
                  {headerEl.headers.map((columnEl) => {
                    return (
                      <TableCell
                        key={columnEl.id}
                        colSpan={columnEl.colSpan}
                        onClick={columnEl.column.getToggleSortingHandler()}
                        sx={{ cursor: "pointer" }}
                      >
                        {columnEl.isPlaceholder
                          ? null
                          : flexRender(
                              columnEl.column.columnDef.header,
                              columnEl.getContext()
                            )}
                        {columnEl.column.getIsSorted() === "asc" ? (
                          <ArrowDropUpIcon />
                        ) : columnEl.column.getIsSorted() === "desc" ? (
                          <ArrowDropDownIcon />
                        ) : (
                          ""
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHead>

          <TableBody>
            {tableInstance.getRowModel().rows.map((rowEl) => {
              return (
                <TableRow key={rowEl.id}>
                  {rowEl.getVisibleCells().map((cellEl) => {
                    return (
                      <TableCell key={cellEl.id} sx={{ fontWeight: 400 }}>
                        {flexRender(
                          cellEl.column.columnDef.cell,
                          cellEl.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Stack
          sx={{
            left: 0,
            bottom: 0,
            zIndex: 2,
            position: "sticky",
            background: "white",
            width: "100%",
            boxShadow: "0 0 8px rgba(0,0,0,0.2)",
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              gap="8px"
              padding="8px"
            >
              <Controls.Button
                text="Previous"
                onClick={() => tableInstance.previousPage()}
                disabled={!tableInstance.getCanPreviousPage()}
              />
              <Typography variant="subtitle2">
                Page {tableInstance.options.state.pagination?.pageIndex! + 1} of{" "}
                {tableInstance.getPageCount()}
              </Typography>
              <Controls.Button
                text="Next"
                onClick={() => tableInstance.nextPage()}
                disabled={!tableInstance.getCanNextPage()}
              />
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              position="absolute"
              right="20px"
            >
              <Typography variant="subtitle2">
                Page size: {tableInstance.options.state.pagination?.pageSize}
              </Typography>
              <Controls.Select
                value={tableInstance.options.state.pagination?.pageSize}
                onChange={(e) => tableInstance.setPageSize(e.target.value)}
                options={[
                  { id: 10, title: 10 },
                  { id: 25, title: 25 },
                  { id: 50, title: 50 },
                  { id: 100, title: 100 },
                ]}
              />
            </Stack>
          </Stack>
        </Stack>
      </TableContainer>
    </>
  );
};

export default CustomTable;
