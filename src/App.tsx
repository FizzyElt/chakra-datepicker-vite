import React, { useState } from 'react';
import { Box, VStack, Text, HStack, Flex } from '@chakra-ui/react';
import PageContainer from './container/PageContainer';
import { SingleDatePicker, MultipleDatePicker } from './components/DatePicker';
import { DayType } from './components/DatePicker/Calendar/type';
import { format, getTime } from 'date-fns';
import { DatePickerStyleConfig, defaultDatePickerStyle } from './components/DatePicker/type';
import StyleSettingForm from './components/StyleSettingsForm';

export default function App() {
  // single date picker block
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDayRulesFn = (date: Date): DayType => {
    if (format(date, 'yyyy/MM/dd') === format(selectedDate, 'yyyy/MM/dd')) {
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
    if (
      rangeDate.start &&
      !rangeDate.end &&
      format(rangeDate.start, 'yyyy/MM/dd') === format(date, 'yyyy/MM/dd')
    ) {
      return DayType.ACTIVE;
    }

    if (!rangeDate.start || !rangeDate.end) {
      return DayType.NORMAL;
    }

    if (format(date, 'yyyy/MM/dd') === format(rangeDate.start, 'yyyy/MM/dd')) {
      return DayType.ACTIVE_START;
    }

    if (format(date, 'yyyy/MM/dd') === format(rangeDate.end, 'yyyy/MM/dd')) {
      return DayType.ACTIVE_END;
    }

    const dateMilliseconds = getTime(date);

    if (getTime(rangeDate.start) < dateMilliseconds && dateMilliseconds < getTime(rangeDate.end)) {
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
        return prev.start && getTime(date) < getTime(prev.start)
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
          onSetDatePIckerStyleConfig={(styleConfig) => setDatePickerStyle(styleConfig)}
        />
      </Flex>
    </PageContainer>
  );
}
