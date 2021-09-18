import { startOfWeek, addDays, getYear, getMonth, getDate } from 'date-fns';
import { DayType } from '../Calendar/type';

export type DateRulesFn = (date: Date) => DayType;

export default function dayListGenerator(
  year: number,
  month: number,
  dateTypeRuleFn: DateRulesFn,
): Array<{
  date: Date;
  year: number;
  month: number;
  day: number;
  dayType: DayType;
}> {
  const startDate = startOfWeek(new Date(year, month, 1));

  return Array.from({ length: 42 }, (_, index) => {
    const date = addDays(startDate, index);
    return {
      date,
      year: getYear(date),
      month: getMonth(date),
      day: getDate(date),
      dayType:
        getMonth(date) === month && getYear(date) === year ? dateTypeRuleFn(date) : DayType.NONE,
    };
  });
}
