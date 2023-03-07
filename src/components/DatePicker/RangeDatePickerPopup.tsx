import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
  PopoverHeader,
} from '@chakra-ui/react';
import RangeDatePicker, { RangeDatePickerProps } from './RangeDatePicker';

type RangeDatePickerPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
} & RangeDatePickerProps;

export default function RangeDatePickerPopup({
  isOpen,
  onClose,
  onOpen,
  rangeDate,
  datePickerStyle = {},
  onSetRangeDate = () => {},
  children,
}: React.PropsWithChildren<RangeDatePickerPopupProps>) {
  console.log(datePickerStyle);

  return (
    <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent border="none" w="fit-content" bgColor={datePickerStyle.bgColor}>
        <PopoverHeader border="none" h="30px">
          <PopoverCloseButton color="white" />
        </PopoverHeader>

        <PopoverBody p={0}>
          <RangeDatePicker
            rangeDate={rangeDate}
            datePickerStyle={datePickerStyle}
            onSetRangeDate={(update) => {
              onSetRangeDate(update);
              if (update.start && update.end) onClose();
            }}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
