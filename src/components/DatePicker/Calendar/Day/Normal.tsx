import React from 'react';
import { Center, Text, CenterProps } from '@chakra-ui/react';
import { DayStyleConfig } from '../type';

type NormalProps = {
  day?: number | string;
  dayStyleConfig: DayStyleConfig;
} & CenterProps;

export default function Normal({ day, dayStyleConfig, ...props }: NormalProps) {
  const { size, color, activeBgColor, activeColor, fontSize } = dayStyleConfig;

  return (
    <Center
      {...props}
      m='auto'
      h={size}
      w={size}
      cursor='pointer'
      pos='relative'
      color={color}
      _hover={{
        color: activeColor,
        _before: {
          bgColor: activeBgColor,
        },
      }}
      _before={{
        content: '""',
        pos: 'absolute',
        zIndex: '0',
        borderRadius: 'full',
        h: 'full',
        w: 'full',
        transition: '0.3s',
      }}
    >
      <Text pos='relative' fontSize={fontSize} color='inherit' zIndex='1'>
        {day}
      </Text>
    </Center>
  );
}
