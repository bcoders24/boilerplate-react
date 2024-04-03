import { Fragment } from 'react';
import { Typography } from '@/components/common/typography';
import { Checkbox } from '@/components/ui/checkbox';

const Filters: React.FC<FilterProps> = ({ items, filteredValues, setFilteredValues }) => {
  return (
    <Fragment>
      {items.map((item: any) => (
        <div key={item.id} className="flex items-center border border-primary p-1 rounded-full gap-x-1">
          <Checkbox
            checked={filteredValues?.includes(item.id) || false}
            onCheckedChange={(checked) => {
              setFilteredValues((prevValues: any) => {
                if (checked) {
                  return [...(prevValues || []), item.id];
                }
                return (prevValues || []).filter((value: any) => value !== item.id);
              });
            }}
          />
          <Typography variant="xsmall" className="cursor-default">
            {item.label}
          </Typography>
        </div>
      ))}
    </Fragment>
  );
};

export default Filters;

interface Item {
  id: string;
  label: string;
}

interface FilterProps {
  items: Item[];
  filteredValues: string[];
  setFilteredValues: React.Dispatch<React.SetStateAction<string[]>>;
}
