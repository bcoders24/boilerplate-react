import { format, addDays, subDays, isFuture, isPast, isSameDay, differenceInDays } from 'date-fns';

export const formatDateFn = (date: string | Date, formatStr: string = 'LLLL d, yyyy'): string => {
  return format(date, formatStr);
};

export const getCurrentUtcDateTimeFn = (): string => {
  return format(new Date(), 'yyyy-MM-dd HH:mm:ss');
};

export const daysDifferenceFn = (date1: string | Date, date2: string | Date): number => {
  return differenceInDays(new Date(date2), new Date(date1));
};

export const addDaysFn = (date: string | Date, days: number): string => {
  return format(addDays(new Date(date), days), 'yyyy-MM-dd');
};

export const subtractDaysFn = (date: string | Date, days: number): string => {
  return format(subDays(new Date(date), days), 'yyyy-MM-dd');
};

export const isFutureDateFn = (date: string | Date): boolean => {
  return isFuture(new Date(date));
};

export const isPastDateFn = (date: string | Date): boolean => {
  return isPast(new Date(date));
};

export const getDayOfWeekFn = (date: string | Date): string => {
  return format(new Date(date), 'EEEE');
};

export const areDatesEqualFn = (date1: string | Date, date2: string | Date): boolean => {
  return isSameDay(new Date(date1), new Date(date2));
};

export const formatDurationFn = (durationInSeconds: number): string => {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  const seconds = durationInSeconds % 60;
  return `${hours}h ${minutes}m ${seconds}s`;
};

export const getDaysInMonthFn = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};
