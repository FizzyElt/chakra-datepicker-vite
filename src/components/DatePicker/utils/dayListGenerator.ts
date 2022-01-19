import { startOfWeek, addDays, getYear, getMonth, getDate } from 'date-fns';
import { DayType } from '../Calendar/type';

import * as R from 'ramda';

export type DateRulesFn = (date: Date) => DayType;

export default function dayListGenerator(
  year: number,
  month: number,
  dateTypeRuleFn: DateRulesFn
): Array<{
  date: Date;
  year: number;
  month: number;
  day: number;
  dayType: DayType;
}> {
  const startDate = startOfWeek(new Date(year, month, 1));

  return R.pipe(
    R.times((index) => addDays(startDate, index)),
    R.map((date) => ({
      date,
      year: getYear(date),
      month: getMonth(date),
      day: getDate(date),
      dayType:
        R.equals(getMonth(date), month) && R.equals(getYear(date), year)
          ? dateTypeRuleFn(date)
          : DayType.NONE,
    }))
  )(42);
}
