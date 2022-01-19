import React from 'react';
import { Center, Text, CenterProps } from '@chakra-ui/react';

import { DayStyleConfig } from '../type';
type ActiveEndProps = {
  day?: string | number;
  dayStyleConfig: DayStyleConfig;
} & CenterProps;

export default function ActiveEnd({
  day,
  dayStyleConfig,
  ...props
}: ActiveEndProps) {
  const { size, activeBgColor, activeColor, periodBgColor, fontSize } =
    dayStyleConfig;

  return (
    <Center
      {...props}
      m='auto'
      h={size}
      w={size}
      cursor='pointer'
      pos='relative'
      _before={{
        content: '""',
        pos: 'absolute',
        zIndex: '1',
        borderRadius: 'full',
        h: 'full',
        w: 'full',
        bgColor: activeBgColor,
        transition: '0.3s',
      }}
      _after={{
        content: '""',
        pos: 'absolute',
        zIndex: '0',
        w: '50%',
        h: '80%',
        top: '10%',
        right: '50%',
        bgColor: periodBgColor,
      }}
    >
      <Text pos='relative' fontSize={fontSize} zIndex='2' color={activeColor}>
        {day}
      </Text>
    </Center>
  );
}
