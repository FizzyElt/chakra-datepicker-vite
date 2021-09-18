import { DayStyleConfig, defaultDayStyle } from './Calendar/type';
import { WeekStyleConfig, defaultWeekStyleConfig } from './Week/type';

export type DatePickerStyleConfig = {
  bgColor: string;
  color: string;
  weekStyle: Partial<WeekStyleConfig>;
  dayStyle: Partial<DayStyleConfig>;
};

export const defaultDatePickerStyle: DatePickerStyleConfig = {
  bgColor: 'gray.900',
  color: 'white',
  weekStyle: defaultWeekStyleConfig,
  dayStyle: defaultDayStyle,
};
