import React, { useState, useMemo, useCallback } from 'react';
import { HStack, VStack, IconButton, IconButtonProps, Flex, Text, Box } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import Calendar from './Calendar';
import Week from './Week';

import { format, startOfToday, isSameDay, isAfter, isBefore } from 'date-fns';
import { addMonths } from 'date-fns/fp';
import * as R from 'ramda';

import { DatePickerStyleConfig, defaultDatePickerStyle } from './type';
import { DayType } from './Calendar/type';

export type RangeDate = {
  start: Date | null;
  end: Date | null;
};

export type RangeDatePickerProps = {
  rangeDate: RangeDate;
  datePickerStyle?: Partial<DatePickerStyleConfig>;
  onSetRangeDate?: (rangeDate: RangeDate) => void;
};

export default function RangeDatePicker({
  rangeDate,
  datePickerStyle = {},
  onSetRangeDate,
}: RangeDatePickerProps) {
  const [controlDate, setControlDate] = useState(rangeDate.start || startOfToday());

  const nextMonth = addMonths(1)(controlDate);

  const handleNextMonth = () => setControlDate(addMonths(1));

  const handlePrevMonth = () => setControlDate(addMonths(-1));

  const mergedDatePickerStyle: DatePickerStyleConfig = useMemo(
    () => R.mergeRight(defaultDatePickerStyle, datePickerStyle),
    [datePickerStyle]
  );
  const btnBaseStyle: Omit<IconButtonProps, 'aria-label'> = {
    bgColor: 'transparent',
    color: mergedDatePickerStyle.color,
    variant: 'ghost',
    pos: 'absolute',
    top: 0,
    _hover: {},
    _active: {},
    _focus: {},
  };

  const handleDayRulesFn = useCallback(
    (date: Date) => {
      if (rangeDate.start && !rangeDate.end && isSameDay(rangeDate.start, date)) {
        return DayType.ACTIVE;
      }

      if (!rangeDate.start || !rangeDate.end) {
        return DayType.NORMAL;
      }

      if (isSameDay(rangeDate.start, date)) {
        return DayType.ACTIVE_START;
      }

      if (isSameDay(rangeDate.end, date)) {
        return DayType.ACTIVE_END;
      }

      if (isAfter(date, rangeDate.start) && isBefore(date, rangeDate.end)) {
        return DayType.PERIOD;
      }

      return DayType.NORMAL;
    },
    [rangeDate]
  );

  const handleSetRangeDate = (date: Date) => {
    if (!rangeDate.start) {
      onSetRangeDate?.({
        start: date,
        end: null,
      });
      return;
    }

    if (!rangeDate.end) {
      onSetRangeDate?.(
        rangeDate.start && isBefore(date, rangeDate.start)
          ? { start: date, end: rangeDate.start }
          : { ...rangeDate, end: date }
      );
      return;
    }

    onSetRangeDate?.({
      start: date,
      end: null,
    });
  };

  return (
    <VStack align="stretch" bgColor={mergedDatePickerStyle.bgColor} borderRadius="5px" spacing={0}>
      <Flex justify="space-around" pos="relative" py={2}>
        <IconButton
          {...btnBaseStyle}
          left="0"
          aria-label="prev month"
          icon={<ChevronLeftIcon />}
          onClick={handlePrevMonth}
        />
        <Text color={mergedDatePickerStyle.color}>{format(controlDate, 'MMMM')}</Text>
        <Text color={mergedDatePickerStyle.color}>{format(nextMonth, 'MMMM')}</Text>
        <IconButton
          {...btnBaseStyle}
          right="0"
          aria-label="next month"
          icon={<ChevronRightIcon />}
          onClick={handleNextMonth}
        />
      </Flex>
      <HStack spacing={0}>
        <Box>
          <Week p={2} weekStyleConfig={mergedDatePickerStyle.weekStyle} />
          <Calendar
            year={controlDate.getFullYear()}
            month={controlDate.getMonth()}
            onGetDayTypeRulesFn={handleDayRulesFn}
            onSetDate={handleSetRangeDate}
            dayStyleConfig={mergedDatePickerStyle.dayStyle}
            p={2}
          />
        </Box>
        <Box>
          <Week p={2} weekStyleConfig={mergedDatePickerStyle.weekStyle} />
          <Calendar
            year={nextMonth.getFullYear()}
            month={nextMonth.getMonth()}
            onGetDayTypeRulesFn={handleDayRulesFn}
            onSetDate={handleSetRangeDate}
            dayStyleConfig={mergedDatePickerStyle.dayStyle}
            p={2}
          />
        </Box>
      </HStack>
    </VStack>
  );
}
