import { SimpleGrid, type SimpleGridProps } from "@chakra-ui/react";
import { useMemo } from "react";
import dayListGenerator, { type DateRulesFn } from "../utils/dayListGenerator";
import Day from "./Day";
import type { DayStyleConfig } from "./type";

type CalendarProps = {
  year: number;
  month: number;
  onSetDate?: (date: Date) => void;
  onGetDayTypeRulesFn: DateRulesFn;
  dayStyleConfig?: Partial<DayStyleConfig>;
} & SimpleGridProps;

export default function Calendar({
  year,
  month,
  dayStyleConfig,
  onSetDate,
  onGetDayTypeRulesFn,
  ...props
}: CalendarProps) {
  const dayList = useMemo(() => {
    return dayListGenerator(year, month, onGetDayTypeRulesFn);
  }, [year, month, onGetDayTypeRulesFn]);

  return (
    <SimpleGrid {...props} columns={7} rowGap={1}>
      {dayList.map((dateObj) => {
        return (
          <Day
            key={`${dateObj.month}_${dateObj.day}`}
            onSetDate={onSetDate}
            {...dateObj}
            dayStyleConfig={dayStyleConfig}
          />
        );
      })}
    </SimpleGrid>
  );
}
