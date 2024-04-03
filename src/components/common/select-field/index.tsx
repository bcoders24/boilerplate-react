import { FormControl } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import cn from '@/utils/cn';
import { FieldValues } from 'react-hook-form';

type Item = Record<'value' | 'label', string>;

/**
 * Props for the SelectField component.
 */
type SelectFieldProps = {
  /**
   * Field object provided by react-hook-form.
   */
  field: FieldValues;
  /**
   * An array of items to be displayed in the dropdown list.
   */
  items: Item[];
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
 * A component representing a select input.
 * @param {SelectFieldProps} props - The props for the SelectField component.
 * @returns {JSX.Element} A JSX element representing the SelectField component.
 */

const SelectField: React.FC<SelectFieldProps> = ({ field, items = [], placeholder, disabled }: SelectFieldProps): JSX.Element => {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
      <FormControl>
        <SelectTrigger disabled={disabled} className={cn(!field.value && 'text-muted-foreground')}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item.value} value={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectField;
