import cn from '@/utils/cn';
import React, { ElementType } from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'body' | 'body-small' | 'small' | 'xsmall';

interface Props {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
  as?: ElementType;
}

const tags: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  body: 'p',
  'body-small': 'p',
  small: 'span',
  xsmall: 'span',
};

const sizes: Record<Variant, string> = {
  h1: 'text-5xl font-semibold sm:text-4xl',
  h2: 'text-4xl font-semibold sm:text-3xl',
  h3: 'text-3xl font-semibold sm:text-2xl',
  h4: 'text-2xl font-semibold sm:text-1xl',
  h5: 'text-xl font-semibold sm:text-lg',
  body: 'text-lg sm:text-md',
  'body-small': 'text-md sm:text-sm',
  small: 'text-sm sm:text-xs',
  xsmall: 'text-xs',
};

export const Typography = ({ variant, children, className, as }: Props) => {
  const sizeClasses = sizes[variant];
  const Tag = as || tags[variant];
  return className ? (
    <Tag className={cn(sizeClasses, className)}>{children}</Tag>
  ) : (
    <Tag className={`${sizeClasses}`}>{children}</Tag>
  );
};
