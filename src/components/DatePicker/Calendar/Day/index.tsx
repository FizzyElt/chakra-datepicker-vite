import { useMemo } from "react";

import Active from "./Active";
import ActiveEnd from "./ActiveEnd";
import ActiveStart from "./ActiveStart";
import Disable from "./Disable";
import None from "./None";
import Normal from "./Normal";
import Period from "./Period";

import { DayType } from "../type";
import { type DayStyleConfig, defaultDayStyle } from "../type";

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
  const mergedDayStyleConfig: DayStyleConfig = useMemo(
    () => ({ ...defaultDayStyle, ...dayStyleConfig }),
    [dayStyleConfig],
  );

  switch (dayType) {
    case DayType.NONE:
      return <None dayStyleConfig={mergedDayStyleConfig} />;
    case DayType.ACTIVE:
      return <Active dayStyleConfig={mergedDayStyleConfig} day={day} />;
    case DayType.DISABLE:
      return <Disable dayStyleConfig={mergedDayStyleConfig} day={day} />;
    case DayType.PERIOD:
      return (
        <Period
          dayStyleConfig={mergedDayStyleConfig}
          day={day}
          onClick={() => onSetDate?.(date)}
        />
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
        <Normal
          onClick={() => onSetDate?.(date)}
          dayStyleConfig={mergedDayStyleConfig}
          day={day}
        />
      );
    default:
      return <None dayStyleConfig={mergedDayStyleConfig} />;
  }
}
