import React from 'react';

import None from './None';
import Normal from './Normal';
import Active from './Active';
import Period from './Period';
import Disable from './Disable';
import ActiveEnd from './ActiveEnd';
import ActiveStart from './ActiveStart';

import * as R from 'ramda';

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
  const mergedDayStyleConfig: DayStyleConfig = R.mergeRight(defaultDayStyle, dayStyleConfig || {});

  const renderDay = R.cond([
    [R.equals(DayType.NONE), R.always(<None dayStyleConfig={mergedDayStyleConfig} />)],
    [
      R.equals(DayType.ACTIVE),
      R.always(<Active dayStyleConfig={mergedDayStyleConfig} day={day} />),
    ],
    [
      R.equals(DayType.DISABLE),
      R.always(<Disable dayStyleConfig={mergedDayStyleConfig} day={day} />),
    ],
    [
      R.equals(DayType.PERIOD),
      R.always(
        <Period dayStyleConfig={mergedDayStyleConfig} day={day} onClick={() => onSetDate?.(date)} />
      ),
    ],
    [
      R.equals(DayType.ACTIVE_START),
      R.always(<ActiveStart day={day} dayStyleConfig={mergedDayStyleConfig} />),
    ],
    [
      R.equals(DayType.ACTIVE_END),
      R.always(
        <ActiveEnd
          day={day}
          dayStyleConfig={mergedDayStyleConfig}
          onClick={() => onSetDate?.(date)}
        />
      ),
    ],
    [
      R.equals(DayType.NORMAL),
      R.always(
        <Normal onClick={() => onSetDate?.(date)} dayStyleConfig={mergedDayStyleConfig} day={day} />
      ),
    ],
    [R.T, R.always(<None dayStyleConfig={mergedDayStyleConfig} />)],
  ]);

  return renderDay(dayType);
}
