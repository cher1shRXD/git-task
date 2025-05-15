import { addDays, differenceInDays } from "date-fns";

export const getDateRange = (start: Date, end: Date) => {
  const days = differenceInDays(end, start) + 1;
  return Array.from({ length: days }, (_, i) => addDays(start, i));
};