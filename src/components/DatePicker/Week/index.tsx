import React from 'react'
import { Flex, Text, Center, FlexProps } from '@chakra-ui/react';
import { defaultWeekStyleConfig, WeekStyleConfig } from './type';
type WeekProps = {
  weekStyleConfig?: Partial<WeekStyleConfig>;
} & FlexProps;

export default function Week({ weekStyleConfig, ...props }: WeekProps) {
  const weekString = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

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
