import React from 'react';
import { Center, Text, type CenterProps } from '@chakra-ui/react';
import type { DayStyleConfig } from '../type';

type ActiveProps = {
  day?: number | string;
  dayStyleConfig: DayStyleConfig;
} & CenterProps;

export default function Disable({ day, dayStyleConfig, ...props }: ActiveProps) {
  const { size, fontSize } = dayStyleConfig;

  return (
    <Center {...props} m="auto" h={size} w={size} cursor="not-allowed" pos="relative">
      <Text fontSize={fontSize} color="gray.600">
        {day}
      </Text>
    </Center>
  );
}
