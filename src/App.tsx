import React, { useState } from 'react';

import { Box, VStack, Text, Flex } from '@chakra-ui/react';
import PageContainer from './container/PageContainer';
import StyleSettingForm from './components/StyleSettingsForm';

import { DatePickerStyleConfig, defaultDatePickerStyle } from './components/DatePicker/type';
import { SingleDatePicker, MultipleDatePicker } from './components/DatePicker';
import { DayType } from './components/DatePicker/Calendar/type';

import { format, isSameDay, isAfter, isBefore } from 'date-fns';

export default function App() {
  // single date picker block
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDayRulesFn = (date: Date): DayType => {
    if (isSameDay(selectedDate, date)) {
      return DayType.ACTIVE;
    }

    return DayType.NORMAL;
  };

  // multiple date picker block
  const [rangeDate, setRangeDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const handleMultiDayRulesFn = (date: Date) => {
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
  };

  const handleSetRangeDate = (date: Date) => {
    if (!rangeDate.start) {
      setRangeDate({
        start: date,
        end: null,
      });
      return;
    }

    if (!rangeDate.end) {
      setRangeDate((prev) => {
        return prev.start && isBefore(date, prev.start)
          ? { start: date, end: prev.start }
          : { ...prev, end: date };
      });
      return;
    }

    setRangeDate({
      start: date,
      end: null,
    });
  };

  const [datePickerStyle, setDatePickerStyle] =
    useState<DatePickerStyleConfig>(defaultDatePickerStyle);
  return (
    <PageContainer>
      <Flex justify="space-between">
        <VStack align="stretch" spacing={8}>
          <Box w="fit-content">
            <Text color="white">{format(selectedDate, 'yyyy / MM / dd')}</Text>
            <SingleDatePicker
              selectedDate={selectedDate}
              datePickerStyle={datePickerStyle}
              onSetDate={(date) => setSelectedDate(date)}
              onDayTypeRulesFn={handleDayRulesFn}
            />
          </Box>

          <Box>
            <Text color="white">
              {rangeDate.start ? format(rangeDate.start, 'yyyy / MM / dd') : '???? / ?? / ??'}
              {' ~ '}
              {rangeDate.end ? format(rangeDate.end, 'yyyy / MM / dd') : '???? / ?? / ??'}
            </Text>
            <MultipleDatePicker
              selectedDate={new Date()}
              datePickerStyle={datePickerStyle}
              onDayTypeRulesFn={handleMultiDayRulesFn}
              onSetDate={handleSetRangeDate}
            />
          </Box>
        </VStack>

        <StyleSettingForm
          datePickerStyleConfig={datePickerStyle}
          onSetDatePIckerStyleConfig={setDatePickerStyle}
        />
      </Flex>
    </PageContainer>
  );
}
