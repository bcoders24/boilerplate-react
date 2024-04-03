import { Typography } from '@/components/common/typography';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type PaginationProps = {
  tableInstance: any;
};

const Pagination: React.FC<PaginationProps> = ({ tableInstance }) => {
  const previousFn = () => {
    tableInstance.previousPage();
  };

  const nextFn = () => {
    tableInstance.nextPage();
  };

  const sizeChangeFn = (value: string) => {
    tableInstance.setPageSize(value);
  };

  return (
    <div className="flex items-center justify-center gap-x-2 mt-5 relative">
      <Button onClick={previousFn} disabled={!tableInstance.getCanPreviousPage()}>
        Prev
      </Button>
      <Typography variant="body-small" className="font-medium">
        {tableInstance.options.state.pagination?.pageIndex + 1} of {tableInstance.getPageCount()}
      </Typography>
      <Button onClick={nextFn} disabled={!tableInstance.getCanNextPage()}>
        Next
      </Button>
      <div className="absolute right-0 w-20">
        <Select
          defaultValue={tableInstance.options?.state?.pagination?.pageSize?.toString()}
          onValueChange={sizeChangeFn}
        >
          <SelectTrigger className="font-medium">
            <SelectValue placeholder="Page Size" />
          </SelectTrigger>
          <SelectContent className="w-auto">
            {pageSizeOptions.map((index) => (
              <SelectItem key={index} value={index.toString()}>
                {index}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const pageSizeOptions = [10, 25, 50, 100];

export default Pagination;
