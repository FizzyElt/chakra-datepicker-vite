import React from 'react';
import { Center, Text, CenterProps } from '@chakra-ui/react';
import { DayStyleConfig } from '../type';

type ActiveProps = {
  day?: number | string;
  dayStyleConfig: DayStyleConfig;
} & CenterProps;

export default function Active({ day, dayStyleConfig, ...props }: ActiveProps) {
  const { size, color, activeBgColor, activeColor, fontSize } = dayStyleConfig;
  return (
    <Center
      {...props}
      m="auto"
      h={size}
      w={size}
      cursor="pointer"
      pos="relative"
      _before={{
        content: '""',
        pos: 'absolute',
        zIndex: '0',
        borderRadius: 'full',
        h: 'full',
        w: 'full',
        bgColor: activeBgColor,
        transition: '0.3s',
      }}
    >
      <Text pos="relative" fontSize={fontSize} color={activeColor} zIndex="1">
        {day}
      </Text>
    </Center>
  );
}
