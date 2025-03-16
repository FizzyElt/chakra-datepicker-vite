import type { PropsWithChildren } from "react";
import RangeDatePicker, { type RangeDatePickerProps } from "./RangeDatePicker";

import {
  PopoverRoot,
  PopoverContent,
  PopoverBody,
  PopoverTrigger,
} from "@/components/ui/popover";

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
    <PopoverRoot
      open={isOpen}
      onOpenChange={(e) => (e.open ? onOpen() : onClose())}
    >
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent w="auto">
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
    </PopoverRoot>
  );
}
