import React from 'react';
import { CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import cn from '@/utils/cn';
import { formatDateFn } from '@/utils/date';
import { Typography } from '@/components/common/typography';

const Datepicker: React.FC<DatepickerProps> = ({ selectedDate, setSelectedDate }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-[240px] text-black bg-gray98 px-3 text-left font-normal border-none')}
        >
          {selectedDate ? (
            formatDateFn(selectedDate, 'PPP')
          ) : (
            <Typography variant="small" className="text-input-placeholder">
              Pick a date
            </Typography>
          )}
          <CalendarDays className="ml-auto h-4 w-4 text-black" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default Datepicker;

interface DatepickerProps {
  selectedDate: Date | undefined;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}
