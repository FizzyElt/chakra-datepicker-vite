import React, { useState } from 'react';
import {
  Box,
  HStack,
  Text,
  IconButton,
  Center,
  IconButtonProps,
} from '@chakra-ui/react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';

import Week from './Week';
import Calendar from './Calendar';

import { format } from 'date-fns';
import { addMonths } from 'date-fns/esm';
import { DateRulesFn } from './utils/dayListGenerator';

import * as R from 'ramda';

import { DatePickerStyleConfig, defaultDatePickerStyle } from './type';

type SingleDatePickerProps = {
  selectedDate: Date;
  onSetDate?: (date: Date) => void;
  onDayTypeRulesFn: DateRulesFn;
  datePickerStyle?: Partial<DatePickerStyleConfig>;
};

export default function SingleDatePicker({
  selectedDate,
  datePickerStyle,
  onSetDate,
  onDayTypeRulesFn,
}: SingleDatePickerProps) {
  const [controlDate, setControlDate] = useState(selectedDate);

  const handleNextMonth = () => {
    setControlDate((prev) => addMonths(prev, 1));
  };

  const handlePrevMonth = () => {
    setControlDate((prev) => addMonths(prev, -1));
  };

  const mergedDatePickerStyle: DatePickerStyleConfig = R.mergeDeepRight(
    defaultDatePickerStyle,
    datePickerStyle || {}
  );

  const btnBaseStyle: Omit<IconButtonProps, 'aria-label'> = {
    bgColor: 'transparent',
    color: mergedDatePickerStyle.color,
    variant: 'ghost',
    _hover: {},
    _active: {},
    _focus: {},
  };

  return (
    <Box bgColor={mergedDatePickerStyle.bgColor} borderRadius='5px'>
      <Center>
        <HStack m='auto'>
          <IconButton
            {...btnBaseStyle}
            aria-label='prev month'
            icon={<ChevronLeftIcon />}
            onClick={handlePrevMonth}
          />
          <Text
            minW='6rem'
            textAlign='center'
            color={mergedDatePickerStyle.color}
          >
            {format(controlDate, 'MMMM')}
          </Text>
          <IconButton
            {...btnBaseStyle}
            aria-label='next month'
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
        onGetDayTypeRulesFn={onDayTypeRulesFn}
        dayStyleConfig={mergedDatePickerStyle.dayStyle}
        p={2}
      />
    </Box>
  );
}
