import { differenceInDays, addDays, format } from "date-fns";

const getDeltaFromDates = (startDate: string, endDate: string) => {
  return differenceInDays(new Date(startDate), new Date(endDate));
};
const addDaysToDate = (startDate: string, days: number) => {
  return format(addDays(new Date(startDate), days), "yyyy-MM-dd");
};

export { getDeltaFromDates, addDaysToDate };
