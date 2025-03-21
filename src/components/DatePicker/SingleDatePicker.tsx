import {
  Box,
  Center,
  HStack,
  IconButton,
  type IconButtonProps,
  Text,
} from "@chakra-ui/react";
import { addMonths, format, isSameDay } from "date-fns";
import { Struct, pipe } from "effect";
import { useCallback, useMemo, useState } from "react";
import Calendar from "./Calendar";
import { DayType } from "./Calendar/type";
import Week from "./Week";
import { type DatePickerStyleConfig, defaultDatePickerStyle } from "./type";

export type SingleDatePickerProps = {
  selectedDate: Date;
  onSetDate?: (date: Date) => void;
  datePickerStyle?: Partial<DatePickerStyleConfig>;
};

export default function SingleDatePickerPopup({
  selectedDate,
  onSetDate,
  datePickerStyle = {},
}: SingleDatePickerProps) {
  const [controlDate, setControlDate] = useState(selectedDate);

  const handleNextMonth = () => setControlDate((d) => addMonths(d, 1));

  const handlePrevMonth = () => setControlDate((d) => addMonths(d, -1));

  const mergedDatePickerStyle = useMemo(() => {
    const res = pipe(
      { ...defaultDatePickerStyle, ...datePickerStyle },
      Struct.evolve({
        weekStyle: (style) => ({
          ...style,
          ...(datePickerStyle.weekStyle || {}),
        }),
        dayStyle: (style) => ({
          ...style,
          ...(datePickerStyle.dayStyle || {}),
        }),
      }),
    );

    return res;
  }, [datePickerStyle]);

  const btnBaseStyle: Omit<IconButtonProps, "aria-label"> = {
    bgColor: "transparent",
    color: mergedDatePickerStyle.color,
    variant: "ghost",
    _hover: {},
    _active: {},
    _focus: {},
  };

  const handleDayRulesFn = useCallback(
    (date: Date) =>
      isSameDay(date, selectedDate) ? DayType.ACTIVE : DayType.NORMAL,
    [selectedDate],
  );

  return (
    <Box bgColor={mergedDatePickerStyle.bgColor} borderRadius="5px">
      <Center>
        <HStack m="auto">
          <IconButton
            {...btnBaseStyle}
            aria-label="prev month"
            onClick={handlePrevMonth}
          />
          <Text
            minW="6rem"
            textAlign="center"
            color={mergedDatePickerStyle.color}
          >
            {format(controlDate, "MMMM")}
          </Text>
          <IconButton
            {...btnBaseStyle}
            aria-label="next month"
            onClick={handleNextMonth}
          />
        </HStack>
      </Center>
      <Week p={2} weekStyleConfig={mergedDatePickerStyle.weekStyle} />
      <Calendar
        year={controlDate.getFullYear()}
        month={controlDate.getMonth()}
        onSetDate={onSetDate}
        onGetDayTypeRulesFn={handleDayRulesFn}
        dayStyleConfig={mergedDatePickerStyle.dayStyle}
        p={2}
      />
    </Box>
  );
}
