import { Popover, Portal, Button } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import React from 'react';
import RangeDatePicker from './RangeDatePicker';
import type { RangeDatePickerProps } from './RangeDatePicker';
import {
  PopoverContent,
  PopoverBody,
  PopoverRoot,
  PopoverHeader,
  PopoverTrigger,
} from '../ui/popover';
import { ToggleTip } from '../ui/toggle-tip';

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
}: PropsWithChildren<RangeDatePickerPopupProps>) {
  return (
    <Popover.Root isOpen={isOpen} onClose={onClose} onOpen={onOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content border="none" w="fit-content" bgColor={datePickerStyle.bgColor}>
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
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
