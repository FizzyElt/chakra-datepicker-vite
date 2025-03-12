import { Popover, Portal } from '@chakra-ui/react';
import type { PropsWithChildren } from 'react';
import React from 'react';
import SingleDatePicker from './SingleDatePicker';
import type { SingleDatePickerProps } from './SingleDatePicker';

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
}: PropsWithChildren<SingleDatePickerPopupProps>) {
  return (
    <Popover.Root
      open={isOpen}
      onOpenChange={(e: { open: boolean }) => (e.open ? onOpen() : onClose())}
    >
      <Popover.Trigger>{children}</Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Body p={0} width="auto">
              <SingleDatePicker
                selectedDate={selectedDate}
                datePickerStyle={datePickerStyle}
                onSetDate={(date) => {
                  onClose();
                  onSetDate?.(date);
                }}
              />
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
}
