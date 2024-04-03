import { Fragment, useState } from 'react';
import SEO from '@/components/common/seo';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SelectOptions from '@/constants/select-options';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Typography } from '@/components/common/typography';
import { Input } from '@/components/ui/input';
import Filters from '@/features/shared/filters';
import Datepicker from '../shared/datepicker';
import { Slider } from '@/components/ui/dual-range';
import Rating from '../shared/rating';

const items = [
  {
    id: 'recents',
    label: 'Recents',
  },
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'applications',
    label: 'Applications',
  },
  {
    id: 'desktop',
    label: 'Desktop',
  },
  {
    id: 'downloads',
    label: 'Downloads',
  },
  {
    id: 'documents',
    label: 'Documents',
  },
];

const ProductDetails = (): JSX.Element => {
  const [filteredValues, setFilteredValues] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [range, setRange] = useState([0, 24]);
  const statusChange = (value: string) => {
    toast.success(value);
  };
  const handleRangeChange = (value: any) => {
    setRange(value);
  };
  return (
    <Fragment>
      <SEO title="Product Details" description="" name="" type="webapp" />
      <div className="w-full h-full p-4">
        {/* Showcasing */}
        <div className="rounded-md h-full flex flex-col items-center gap-y-4 justify-center">
          <div className="flex gap-x-4 items-center">
            <Typography variant="body-small" className="font-semibold">
              Buttons
            </Typography>
            <div className="flex space-x-4">
              <Button>Primary Button</Button>
              <Button variant="outline">Outlined Button</Button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Typography variant="body-small" className="font-semibold">
              Select
            </Typography>
            <Select onValueChange={statusChange}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {SelectOptions.STATUS_FILTERS.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-x-4 items-center">
            <Typography variant="body-small" className="font-semibold">
              Filter
            </Typography>
            <div className="w-80 flex flex-wrap gap-2">
              <Filters items={items} filteredValues={filteredValues} setFilteredValues={setFilteredValues} />
            </div>
          </div>
          <div className="flex gap-x-4 items-center">
            <Typography variant="body-small" className="font-semibold">
              Input
            </Typography>
            <Input placeholder="Placeholder" />
          </div>
          <div className="flex gap-x-4 items-center">
            <Typography variant="body-small" className="font-semibold">
              Datepicker
            </Typography>
            <Datepicker selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          </div>
          <div className="w-1/2 flex gap-x-4 items-center">
            <Typography variant="body-small" className="font-semibold">
              Range Selector
            </Typography>
            <Slider
              max={36}
              min={0}
              step={1}
              value={range}
              onValueChange={handleRangeChange}
              formatLabel={(value) => `${value} hrs`}
            />
          </div>
          <div className="flex gap-x-4 items-center">
            <Typography variant="body-small" className="font-semibold">
              Rating
            </Typography>
            <Rating rating={2} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetails;
