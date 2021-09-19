import React from 'react';
import {
  Input,
  FormControl,
  FormLabel,
  VStack,
  InputProps,
  Heading,
  FormLabelProps,
} from '@chakra-ui/react';
import { DatePickerStyleConfig } from '../DatePicker/type';
import { WeekStyleConfig } from '../DatePicker/Week/type';
import { DayStyleConfig } from '../DatePicker/Calendar/type';

type StyleSettingFormProps = {
  datePickerStyleConfig: DatePickerStyleConfig;
  onSetDatePIckerStyleConfig: (styleConfig: DatePickerStyleConfig) => void;
};

export default function StyleSettingForm({
  datePickerStyleConfig,
  onSetDatePIckerStyleConfig,
}: StyleSettingFormProps) {
  const inputBaseStyle: InputProps = {
    color: 'white',
  };
  const formLabelBaseStyle: FormLabelProps = {
    color: 'white',
  };

  const handleSetWeekStyle = (weekStyle: Partial<WeekStyleConfig>) => {
    onSetDatePIckerStyleConfig({
      ...datePickerStyleConfig,
      weekStyle,
    });
  };

  const handleSetDayTypeStyle = (dayStyle: Partial<DayStyleConfig>) => {
    onSetDatePIckerStyleConfig({
      ...datePickerStyleConfig,
      dayStyle,
    });
  };

  const { weekStyle, dayStyle } = datePickerStyleConfig;

  return (
    <VStack spacing={10}>
      <VStack>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>date picker background color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={datePickerStyleConfig.bgColor}
            onChange={(e) =>
              onSetDatePIckerStyleConfig({ ...datePickerStyleConfig, bgColor: e.target.value })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>date picker font color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={datePickerStyleConfig.color}
            onChange={(e) =>
              onSetDatePIckerStyleConfig({ ...datePickerStyleConfig, color: e.target.value })
            }
          />
        </FormControl>
      </VStack>

      <VStack>
        <Heading color="white" size="sm">
          Week bar style
        </Heading>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>background color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={weekStyle.bgColor || ''}
            onChange={(e) => handleSetWeekStyle({ ...weekStyle, bgColor: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>font color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={weekStyle.color || ''}
            onChange={(e) => handleSetWeekStyle({ ...weekStyle, color: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>font size</FormLabel>
          <Input
            {...inputBaseStyle}
            value={weekStyle.fontSize || ''}
            onChange={(e) => handleSetWeekStyle({ ...weekStyle, fontSize: e.target.value })}
          />
        </FormControl>
      </VStack>

      <VStack>
        <Heading size="sm" color="white">
          day type style
        </Heading>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>font size</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.fontSize}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, fontSize: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>size</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.size}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, size: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>font color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.color}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, color: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>active day background color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.activeBgColor}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, activeBgColor: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>active day font color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.activeColor}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, activeColor: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>period day background color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.periodBgColor}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, periodBgColor: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>period day font color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.periodColor}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, periodColor: e.target.value })}
          />
        </FormControl>
      </VStack>
    </VStack>
  );
}
