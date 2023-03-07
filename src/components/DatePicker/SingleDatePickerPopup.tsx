import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
import SingleDatePicker, { SingleDatePickerProps } from './SingleDatePicker';

type SingleDatePickerPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
} & SingleDatePickerProps;

export default function SingleDatePickerPopup({
  isOpen,
  onClose,
  onOpen,
  selectedDate,
  onSetDate,
  datePickerStyle = {},
  children,
}: React.PropsWithChildren<SingleDatePickerPopupProps>) {
  return (
    <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent border="none">
        <PopoverCloseButton color="white" />
        <PopoverBody p={0}>
          <SingleDatePicker
            selectedDate={selectedDate}
            datePickerStyle={datePickerStyle}
            onSetDate={(date) => (onClose(), onSetDate?.(date))}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
