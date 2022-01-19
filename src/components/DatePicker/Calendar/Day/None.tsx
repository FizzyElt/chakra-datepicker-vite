import React from 'react';
import { Center } from '@chakra-ui/react';
import { DayStyleConfig } from '../type';

type NoneProps = {
  dayStyleConfig: DayStyleConfig;
};

export default function None({ dayStyleConfig }: NoneProps) {
  return (
    <Center
      m='auto'
      h={dayStyleConfig.size}
      w={dayStyleConfig.size}
      color='white'
    />
  );
}
