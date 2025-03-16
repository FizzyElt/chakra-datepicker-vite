import type { FlexProps } from "@chakra-ui/react";
import { Center, Flex, Text } from "@chakra-ui/react";
import React from "react";
import type { WeekStyleConfig } from "./type";
import { defaultWeekStyleConfig } from "./type";
type WeekProps = {
  weekStyleConfig?: Partial<WeekStyleConfig>;
} & FlexProps;

export default function Week({ weekStyleConfig, ...props }: WeekProps) {
  const weekString = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const mergeWeekStyle = weekStyleConfig
    ? { ...defaultWeekStyleConfig, ...weekStyleConfig }
    : defaultWeekStyleConfig;

  const { bgColor, color, fontSize } = mergeWeekStyle;
  return (
    <Flex bgColor={bgColor} {...props}>
      {weekString.map((weekDay) => {
        return (
          <Center flex="1" key={weekDay}>
            <Text color={color} fontSize={fontSize}>
              {weekDay}
            </Text>
          </Center>
        );
      })}
    </Flex>
  );
}
