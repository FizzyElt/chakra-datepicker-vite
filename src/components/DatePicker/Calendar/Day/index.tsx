import React from 'react';
import { Box, Center } from '@chakra-ui/react';
import Normal from './Normal';
import None from './None';
import Disable from './Disable';
import Active from './Active';
import Period from './Period';
import ActiveStart from './ActiveStart';
import ActiveEnd from './ActiveEnd';
import { DayType } from '../type';
import { DayStyleConfig, defaultDayStyle } from '../type';

type DayProps = {
  date: Date;
  year: number;
  month: number;
  day: number;
  dayType: DayType;
  onSetDate?: (date: Date) => void;
  dayStyleConfig?: Partial<DayStyleConfig>;
};
export default function Day({
  date,
  year,
  month,
  day,
  dayType,
  onSetDate,
  dayStyleConfig,
}: DayProps) {
  const mergedDayStyleConfig: DayStyleConfig = dayStyleConfig
    ? { ...defaultDayStyle, ...dayStyleConfig }
    : defaultDayStyle;

  switch (dayType) {
    case DayType.NONE:
      return <None dayStyleConfig={mergedDayStyleConfig} />;
    case DayType.ACTIVE:
      return <Active dayStyleConfig={mergedDayStyleConfig} day={day} />;
    case DayType.DISABLE:
      return <Disable dayStyleConfig={mergedDayStyleConfig} day={day} />;
    case DayType.PERIOD:
      return (
        <Period dayStyleConfig={mergedDayStyleConfig} day={day} onClick={() => onSetDate?.(date)} />
      );
    case DayType.ACTIVE_START:
      return <ActiveStart day={day} dayStyleConfig={mergedDayStyleConfig} />;
    case DayType.ACTIVE_END:
      return (
        <ActiveEnd
          day={day}
          dayStyleConfig={mergedDayStyleConfig}
          onClick={() => onSetDate?.(date)}
        />
      );
    case DayType.NORMAL:
      return (
        <Normal onClick={() => onSetDate?.(date)} dayStyleConfig={mergedDayStyleConfig} day={day} />
      );

    default:
      return <None dayStyleConfig={mergedDayStyleConfig} />;
  }
}
