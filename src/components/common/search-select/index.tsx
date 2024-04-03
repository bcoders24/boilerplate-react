import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import cn from '@/utils/cn';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { FieldValues } from 'react-hook-form';
import { FormControl } from '@/components/ui/form';
import { UseFormReturn } from '@/types';

type Item = Record<'value' | 'label', string>;

/**
 * Props for the Search Select component.
 */
type SearchSelectProps = {
  /**
   * Field object provided by react-hook-form.
   */
  field: FieldValues;
  /**
   * Form object provided by react-hook-form.
   */
  form: UseFormReturn;
  /**
   * Placeholder text displayed in the input field when it's empty.
   */
  placeholder: string;
  /**
   * Placeholder text displayed in the search input field when it's empty.
   */
  searchPlaceholder: string;
  /**
   * An array of items to be displayed in the dropdown list.
   */
  items: Item[];
  /**
   * Boolean value indicating whether the component is disabled.
   */
  disabled?: boolean;
};

/**
 * A component representing a searchable select input.
 * @param {SearchSelectProps} props - The props for the SearchSelect component.
 * @returns {JSX.Element} A JSX element representing the SearchSelect component.
 */

const SearchSelect: React.FC<SearchSelectProps> = ({
  field,
  form,
  placeholder,
  searchPlaceholder,
  items,
  disabled,
}: SearchSelectProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const getPopoverWidth = () => {
    if (buttonRef.current) {
      const width = buttonRef.current.offsetWidth;
      return width;
    }
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            ref={buttonRef}
            variant="outline"
            role="combobox"
            disabled={disabled}
            className={cn(
              'w-full justify-between rounded-md bg-accent h-10 font-normal px-3 border border-input',
              !field.value && 'text-muted-foreground hover:text-muted-foreground',
            )}
          >
            {field.value ? items.find((option: any) => option.value === field.value)?.label : placeholder}
            <ChevronDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="p-0" style={{ width: `${getPopoverWidth()}px` || 'auto' }}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} className="h-9 text-xs" />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {items.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={(currentValue) => {
                  form.clearErrors([field.name]);
                  form.setValue(field.name, currentValue);
                  setOpen(false);
                }}
              >
                {option.label}
                <CheckIcon
                  className={cn('ml-auto h-4 w-4', field.value === option.value ? 'opacity-100' : 'opacity-0')}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SearchSelect;
