import * as React from 'react';
import { ChevronDownIcon, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Command, CommandGroup, CommandItem } from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { UseFormReturn } from '@/types';
import { FieldValues } from 'react-hook-form';
import { FormControl } from '@/components/ui/form';
import cn from '@/utils/cn';

type Item = Record<'value' | 'label', string>;

/**
 * Props for the MultiSelect component.
 */
type MultiSelectProps = {
  /**
   * Field object provided by react-hook-form.
   */
  field: FieldValues;
  /**
   * An array of items to be displayed in the dropdown list.
   */
  items: Item[];
  /**
   * Form object provided by react-hook-form.
   */
  form: UseFormReturn;
  /**
   * Placeholder text displayed in the input field when it's empty.
   */
  placeholder: string;
  /**
   * Boolean value indicating whether the component is disabled.
   */
  disabled?: boolean;
};

/**
 * A component representing a multi-select input.
 * @param {MultiSelectProps} props - The props for the MultiSelect component.
 * @returns {JSX.Element} A JSX element representing the MultiSelect component.
 */

const MultiSelect: React.FC<MultiSelectProps> = ({ field, items, form, placeholder, disabled }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Item[]>([]);
  const [inputValue, setInputValue] = React.useState('');

  const handleUnselect = React.useCallback((item: Item) => {
    setSelected((prev) => prev.filter((s) => s.value !== item.value));
    const newValues = selected.filter((included: Item) => included.value !== item.value);
    form.setValue(field.name, newValues);
  }, []);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    const input = inputRef.current;
    if (input) {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (input.value === '') {
          setSelected((prev) => {
            const newSelected = [...prev];
            newSelected.pop();
            form.setValue(field.name, newSelected);
            return newSelected;
          });
        }
      }
      if (e.key === 'Escape') {
        input.blur();
      }
    }
  }, []);

  const selectables = items.filter((item) => !selected.includes(item));

  return (
    <Command onKeyDown={handleKeyDown} className="w-full overflow-visible bg-transparent">
      <div
        className={cn(
          'group flex min-h-[40px] w-full items-center justify-between rounded-md border border-input bg-muted px-3 py-2 text-xs',
          disabled && 'opacity-50',
        )}
      >
        <div className="w-full flex items-center gap-1 flex-wrap">
          {selected.map((option) => {
            return (
              <Badge key={option.value} variant="outline">
                {option.label}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 text-muted-foreground" />
                </button>
              </Badge>
            );
          })}

          <FormControl>
            <CommandPrimitive.Input
              ref={inputRef}
              value={inputValue}
              onValueChange={setInputValue}
              disabled={disabled}
              onBlur={() => setOpen(false)}
              onFocus={() => setOpen(true)}
              placeholder={placeholder}
              className={cn(
                'w-full bg-transparent outline-none placeholder:text-muted-foreground flex-1',
                !selectables.length && 'cursor-default caret-transparent',
              )}
            />
          </FormControl>
          <div className={cn('opacity-50', !field.value.length && 'opacity-30')}>
            <ChevronDownIcon className={cn('ml-2 h-4 w-4 shrink-0', !selectables.length && 'opacity-0')} />
          </div>
        </div>
      </div>
      <div className="relative mt-1">
        {open && (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {!selectables.length && <CommandItem>No more data.</CommandItem>}
              {selectables.map((option) => {
                return (
                  <CommandItem
                    key={option.value}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={(_value) => {
                      setInputValue('');
                      setSelected((prev) => {
                        form.clearErrors([field.name]);
                        form.setValue(field.name, [...prev, option]);
                        return [...prev, option];
                      });
                    }}
                    className={'cursor-pointer'}
                  >
                    {option.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
