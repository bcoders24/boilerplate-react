import { FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import cn from '@/utils/cn';
import React from 'react';
import { FieldValues } from 'react-hook-form';

type FormInputProps = {
  icon?: React.ReactNode;
  placeholder: string;
  field: FieldValues;
  type?: string;
  disabled?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({ icon, type = 'text', placeholder, field, disabled }) => {
  return (
    <div className={cn('flex items-center bg-accent rounded-md border')}>
      {icon && <div className={cn('text-primary mx-2', disabled && 'opacity-50')}>{icon}</div>}
      <FormControl className="w-full">
        <Input
          type={type}
          placeholder={placeholder}
          {...field}
          className={cn('w-full border-0 h-[38px]', icon ? 'px-0' : 'px-3')}
          disabled={disabled}
        />
      </FormControl>
    </div>
  );
};

export default FormInput;
