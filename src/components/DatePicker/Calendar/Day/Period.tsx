import React from 'react';
import { Center, Text, CenterProps } from '@chakra-ui/react';
import { DayStyleConfig } from '../type';

type PeriodProps = {
  day?: number | string;
  dayStyleConfig: DayStyleConfig;
} & CenterProps;

export default function Period({ day, dayStyleConfig, ...props }: PeriodProps) {
  const {
    size,
    color,
    activeColor,
    activeBgColor,
    periodBgColor,
    periodColor,
    fontSize,
  } = dayStyleConfig;
  return (
    <Center
      {...props}
      m='auto'
      h={size}
      w={size}
      cursor='pointer'
      pos='relative'
      color={periodColor}
      _hover={{
        color: activeColor,
        _before: {
          bgColor: activeBgColor,
        },
      }}
      _before={{
        content: '""',
        pos: 'absolute',
        zIndex: '1',
        borderRadius: 'full',
        h: 'full',
        w: 'full',
        bgColor: 'transparent',
        transition: '0.3s',
      }}
      _after={{
        content: '""',
        pos: 'absolute',
        zIndex: '0',
        top: '10%',
        h: '80%',
        w: 'full',
        bgColor: periodBgColor,
      }}
    >
      <Text pos='relative' fontSize={fontSize} color='inherit' zIndex='2'>
        {day}
      </Text>
    </Center>
  );
}
