import { Field, Heading, Input, type InputProps, VStack } from '@chakra-ui/react';
import React from 'react';

import type { DayStyleConfig } from '../DatePicker/Calendar/type';
import type { WeekStyleConfig } from '../DatePicker/Week/type';
import type { DatePickerStyleConfig } from '../DatePicker/type';

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
  const formLabelBaseStyle: Field.LabelProps = {
    color: 'white',
  };

  const handleSetWeekStyle = (weekStyle: Partial<WeekStyleConfig>) => {
    onSetDatePIckerStyleConfig({ ...datePickerStyleConfig, weekStyle });
  };

  const handleSetDayTypeStyle = (dayStyle: Partial<DayStyleConfig>) => {
    onSetDatePIckerStyleConfig({ ...datePickerStyleConfig, dayStyle });
  };

  const { weekStyle, dayStyle } = datePickerStyleConfig;

  return (
    <VStack gap={10}>
      <VStack>
        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>date picker background color</Field.Label>
          <Input
            {...inputBaseStyle}
            value={datePickerStyleConfig.bgColor}
            onChange={(e) =>
              onSetDatePIckerStyleConfig({ ...datePickerStyleConfig, bgColor: e.target.value })
            }
          />
        </Field.Root>

        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>date picker font color</Field.Label>
          <Input
            {...inputBaseStyle}
            value={datePickerStyleConfig.color}
            onChange={(e) =>
              onSetDatePIckerStyleConfig({ ...datePickerStyleConfig, color: e.target.value })
            }
          />
        </Field.Root>
      </VStack>

      <VStack>
        <Heading color="white" size="sm">
          Week bar style
        </Heading>
        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>background color</Field.Label>
          <Input
            {...inputBaseStyle}
            value={weekStyle.bgColor || ''}
            onChange={(e) => handleSetWeekStyle({ ...weekStyle, bgColor: e.target.value })}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>font color</Field.Label>
          <Input
            {...inputBaseStyle}
            value={weekStyle.color || ''}
            onChange={(e) => handleSetWeekStyle({ ...weekStyle, color: e.target.value })}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>font size</Field.Label>
          <Input
            {...inputBaseStyle}
            value={weekStyle.fontSize || ''}
            onChange={(e) => handleSetWeekStyle({ ...weekStyle, fontSize: e.target.value })}
          />
        </Field.Root>
      </VStack>

      <VStack>
        <Heading size="sm" color="white">
          day type style
        </Heading>
        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>font size</Field.Label>
          <Input
            {...inputBaseStyle}
            value={dayStyle.fontSize}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, fontSize: e.target.value })}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>size</Field.Label>
          <Input
            {...inputBaseStyle}
            value={dayStyle.size}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, size: e.target.value })}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>font color</Field.Label>
          <Input
            {...inputBaseStyle}
            value={dayStyle.color}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, color: e.target.value })}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>active day background color</Field.Label>
          <Input
            {...inputBaseStyle}
            value={dayStyle.activeBgColor}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, activeBgColor: e.target.value })}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>active day font color</Field.Label>
          <Input
            {...inputBaseStyle}
            value={dayStyle.activeColor}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, activeColor: e.target.value })}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>period day background color</Field.Label>
          <Input
            {...inputBaseStyle}
            value={dayStyle.periodBgColor}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, periodBgColor: e.target.value })}
          />
        </Field.Root>

        <Field.Root>
          <Field.Label {...formLabelBaseStyle}>period day font color</Field.Label>
          <Input
            {...inputBaseStyle}
            value={dayStyle.periodColor}
            onChange={(e) => handleSetDayTypeStyle({ ...dayStyle, periodColor: e.target.value })}
          />
        </Field.Root>
      </VStack>
    </VStack>
  );
}
