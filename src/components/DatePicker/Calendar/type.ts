export enum DayType {
  NONE = "NONE",
  NORMAL = "NORMAL",
  DISABLE = "DISABLE",
  ACTIVE = "ACTIVE",
  PERIOD = "PERIOD",
  ACTIVE_START = "ACTIVE_START",
  ACTIVE_END = "ACTIVE_END",
}

export type DayStyleConfig = {
  fontSize: string;
  size: string | number;
  color: string;
  activeBgColor: string;
  activeColor: string;
  periodBgColor: string;
  periodColor: string;
};

export const defaultDayStyle: DayStyleConfig = {
  fontSize: "md",
  size: 10,
  color: "white",
  activeBgColor: "teal.500",
  activeColor: "white",
  periodBgColor: "teal.600",
  periodColor: "white",
};
