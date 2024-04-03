import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Filters from '../filters';
import { Typography } from '@/components/common/typography';
import { capitalize } from '@/utils/functions';
import { ChevronDown, X } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const options = [
  {
    label: 'Australia',
    id: 'australia',
  },
  {
    label: 'Canada',
    id: 'canada',
  },
  {
    label: 'America',
    id: 'america',
  },
  {
    label: 'Sydney',
    id: 'sydney',
  },
  {
    label: 'Brazil',
    id: 'brazil',
  },
];

const selected = ['canada'];

const LocationSelector = () => {
  const [locationPopper, setLocationPopper] = useState<boolean>(false);
  const [countries, setCountries] = useState<string[]>(selected);

  const handleOriginFn = (_e: React.MouseEvent<HTMLButtonElement>) => {
    setLocationPopper(false);
    setCountries([...countries]);
  };

  return (
    <Popover open={locationPopper} onOpenChange={setLocationPopper}>
      <PopoverTrigger asChild className="flex cursor-pointer">
        <div className="w-60 px-4 py-2 flex items-center justify-between whitespace-nowrap rounded-full outline-none text-xs border border-primary bg-[#EDF6FF] h-14">
          <div className="flex gap-2">
            <img src="location.svg" alt="location" />
            <div className="flex flex-wrap">
              {countries.map((country, i, array) => {
                if (i === array.length - 1)
                  return (
                    <Typography variant="xsmall" key={i}>
                      {capitalize(country)}
                    </Typography>
                  );
                else
                  return (
                    <Typography key={i} variant="xsmall">
                      {capitalize(country) + ','}&nbsp;
                    </Typography>
                  );
              })}
            </div>
          </div>
          <ChevronDown className="flex-shrink-0" size={16} />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex flex-col gap-y-2">
          <div className="flex justify-between items-center">
            <Typography variant="small">Branch</Typography>
            <Button size="icon" onClick={() => setLocationPopper(false)}>
              <X className="flex-shrink-0" size={16} />
            </Button>
          </div>
          <Separator />
          <div className="flex gap-2 flex-wrap">
            <Filters filteredValues={countries} setFilteredValues={setCountries} items={options} />
          </div>
          <Button size="sm" className="ml-auto mt-2" onClick={handleOriginFn}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LocationSelector;
