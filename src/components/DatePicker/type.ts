import type { DayStyleConfig } from "./Calendar/type";
import { defaultDayStyle } from "./Calendar/type";
import type { WeekStyleConfig } from "./Week/type";
import { defaultWeekStyleConfig } from "./Week/type";

export type DatePickerStyleConfig = {
  bgColor: string;
  color: string;
  weekStyle: Partial<WeekStyleConfig>;
  dayStyle: Partial<DayStyleConfig>;
};

export const defaultDatePickerStyle: DatePickerStyleConfig = {
  bgColor: "gray.700",
  color: "white",
  weekStyle: defaultWeekStyleConfig,
  dayStyle: defaultDayStyle,
};
