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

import * as R from 'ramda';

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
    onSetDatePIckerStyleConfig(
      R.mergeRight(datePickerStyleConfig, { weekStyle })
    );
  };

  const handleSetDayTypeStyle = (dayStyle: Partial<DayStyleConfig>) => {
    onSetDatePIckerStyleConfig(
      R.mergeRight(datePickerStyleConfig, { dayStyle })
    );
  };

  const { weekStyle, dayStyle } = datePickerStyleConfig;

  return (
    <VStack spacing={10}>
      <VStack>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>
            date picker background color
          </FormLabel>
          <Input
            {...inputBaseStyle}
            value={datePickerStyleConfig.bgColor}
            onChange={(e) =>
              onSetDatePIckerStyleConfig(
                R.assoc('bgColor', e.target.value, datePickerStyleConfig)
              )
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel {...formLabelBaseStyle}>date picker font color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={datePickerStyleConfig.color}
            onChange={(e) =>
              onSetDatePIckerStyleConfig(
                R.assoc('color', e.target.value, datePickerStyleConfig)
              )
            }
          />
        </FormControl>
      </VStack>

      <VStack>
        <Heading color='white' size='sm'>
          Week bar style
        </Heading>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>background color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={weekStyle.bgColor || ''}
            onChange={(e) =>
              handleSetWeekStyle(R.assoc('bgColor', e.target.value, weekStyle))
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel {...formLabelBaseStyle}>font color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={weekStyle.color || ''}
            onChange={(e) =>
              handleSetWeekStyle(R.assoc('color', e.target.value, weekStyle))
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel {...formLabelBaseStyle}>font size</FormLabel>
          <Input
            {...inputBaseStyle}
            value={weekStyle.fontSize || ''}
            onChange={(e) =>
              handleSetWeekStyle(R.assoc('fontSize', e.target.value, weekStyle))
            }
          />
        </FormControl>
      </VStack>

      <VStack>
        <Heading size='sm' color='white'>
          day type style
        </Heading>
        <FormControl>
          <FormLabel {...formLabelBaseStyle}>font size</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.fontSize}
            onChange={(e) =>
              handleSetDayTypeStyle(
                R.assoc('fontSize', e.target.value, dayStyle)
              )
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel {...formLabelBaseStyle}>size</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.size}
            onChange={(e) =>
              handleSetDayTypeStyle(R.assoc('size', e.target.value, dayStyle))
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel {...formLabelBaseStyle}>font color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.color}
            onChange={(e) =>
              handleSetDayTypeStyle(R.assoc('color', e.target.value, dayStyle))
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel {...formLabelBaseStyle}>
            active day background color
          </FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.activeBgColor}
            onChange={(e) =>
              handleSetDayTypeStyle(
                R.assoc('activeBgColor', e.target.value, dayStyle)
              )
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel {...formLabelBaseStyle}>active day font color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.activeColor}
            onChange={(e) =>
              handleSetDayTypeStyle(
                R.assoc('activeColor', e.target.value, dayStyle)
              )
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel {...formLabelBaseStyle}>
            period day background color
          </FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.periodBgColor}
            onChange={(e) =>
              handleSetDayTypeStyle(
                R.assoc('periodBgColor', e.target.value, dayStyle)
              )
            }
          />
        </FormControl>

        <FormControl>
          <FormLabel {...formLabelBaseStyle}>period day font color</FormLabel>
          <Input
            {...inputBaseStyle}
            value={dayStyle.periodColor}
            onChange={(e) =>
              handleSetDayTypeStyle(
                R.assoc('periodColor', e.target.value, dayStyle)
              )
            }
          />
        </FormControl>
      </VStack>
    </VStack>
  );
}
