import React, { useState } from 'react';
import {
  HStack,
  VStack,
  IconButton,
  IconButtonProps,
  Flex,
  Text,
  Box,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import Calendar from './Calendar';
import Week from './Week';

import { addMonths, format } from 'date-fns';
import * as R from 'ramda';

import { DateRulesFn } from './utils/dayListGenerator';
import { DatePickerStyleConfig, defaultDatePickerStyle } from './type';

type MultipleDatePickerProps = {
  selectedDate: Date;
  datePickerStyle?: Partial<DatePickerStyleConfig>;
  onSetDate?: (date: Date) => void;
  onDayTypeRulesFn: DateRulesFn;
};

export default function MultipleDatePicker({
  selectedDate,
  datePickerStyle,
  onSetDate,
  onDayTypeRulesFn,
}: MultipleDatePickerProps) {
  const [controlDate, setControlDate] = useState(selectedDate);
  const nextMonth = addMonths(controlDate, 1);

  const handleNextMonth = () => {
    setControlDate((prev) => addMonths(prev, 1));
  };

  const handlePrevMonth = () => {
    setControlDate((prev) => addMonths(prev, -1));
  };

  const mergedDatePickerStyle: DatePickerStyleConfig = R.mergeRight(
    defaultDatePickerStyle,
    datePickerStyle || {}
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
  return (
    <VStack
      align='stretch'
      bgColor={mergedDatePickerStyle.bgColor}
      borderRadius='5px'
      spacing={0}
    >
      <Flex justify='space-around' pos='relative' py={2}>
        <IconButton
          {...btnBaseStyle}
          left='0'
          aria-label='prev month'
          icon={<ChevronLeftIcon />}
          onClick={handlePrevMonth}
        />
        <Text color={mergedDatePickerStyle.color}>
          {format(controlDate, 'MMMM')}
        </Text>
        <Text color={mergedDatePickerStyle.color}>
          {format(nextMonth, 'MMMM')}
        </Text>
        <IconButton
          {...btnBaseStyle}
          right='0'
          aria-label='next month'
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
            onGetDayTypeRulesFn={onDayTypeRulesFn}
            onSetDate={onSetDate}
            dayStyleConfig={mergedDatePickerStyle.dayStyle}
            p={2}
          />
        </Box>
        <Box>
          <Week p={2} weekStyleConfig={mergedDatePickerStyle.weekStyle} />
          <Calendar
            year={nextMonth.getFullYear()}
            month={nextMonth.getMonth()}
            onGetDayTypeRulesFn={onDayTypeRulesFn}
            onSetDate={onSetDate}
            dayStyleConfig={mergedDatePickerStyle.dayStyle}
            p={2}
          />
        </Box>
      </HStack>
    </VStack>
  );
}
