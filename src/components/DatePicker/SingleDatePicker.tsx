import React, { useState, useMemo, useCallback } from 'react';
import { Box, Center, IconButton, HStack, Text, Popover, IconButtonProps } from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

import { DatePickerStyleConfig, defaultDatePickerStyle } from './type';
import { DayType } from './Calendar/type';

import * as R from 'ramda';

import Week from './Week';
import Calendar from './Calendar';

import addMonths from 'date-fns/fp/addMonths';
import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';

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

  const handleNextMonth = () => setControlDate(addMonths(1));

  const handlePrevMonth = () => setControlDate(addMonths(-1));

  const mergedDatePickerStyle = useMemo(
    () => R.mergeDeepRight(defaultDatePickerStyle, datePickerStyle),
    [datePickerStyle]
  );

  const btnBaseStyle: Omit<IconButtonProps, 'aria-label'> = {
    bgColor: 'transparent',
    color: mergedDatePickerStyle.color,
    variant: 'ghost',
    _hover: {},
    _active: {},
    _focus: {},
  };

  const handleDayRulesFn = useCallback(
    (date: Date) => (isSameDay(date, selectedDate) ? DayType.ACTIVE : DayType.NORMAL),
    [selectedDate]
  );

  return (
    <Box bgColor={mergedDatePickerStyle.bgColor} borderRadius="5px">
      <Center>
        <HStack m="auto">
          <IconButton
            {...btnBaseStyle}
            aria-label="prev month"
            icon={<ChevronLeftIcon />}
            onClick={handlePrevMonth}
          />
          <Text minW="6rem" textAlign="center" color={mergedDatePickerStyle.color}>
            {format(controlDate, 'MMMM')}
          </Text>
          <IconButton
            {...btnBaseStyle}
            aria-label="next month"
            icon={<ChevronRightIcon />}
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
