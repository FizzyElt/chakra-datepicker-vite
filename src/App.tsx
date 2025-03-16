import React, { useState } from "react";

import {
  Box,
  Button,
  Flex,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import StyleSettingForm from "./components/StyleSettingsForm";
import PageContainer from "./container/PageContainer";

import {
  RangeDatePicker,
  RangeDatePickerPopup,
  SingleDatePicker,
  SingleDatePickerPopup,
} from "./components/DatePicker";
import { defaultDatePickerStyle } from "./components/DatePicker/type";
import type { DatePickerStyleConfig } from "./components/DatePicker/type";

import { format } from "date-fns";

export default function App() {
  // single date picker block
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popupSelectedDate, setPopupSelectedDate] = useState(new Date());

  // multiple date picker block
  const [rangeDate, setRangeDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const [popupRangeDate, setPopupRangeDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });

  const pickerDisclosure = useDisclosure();
  const rangePickerDisclosure = useDisclosure();

  const [datePickerStyle, setDatePickerStyle] = useState<DatePickerStyleConfig>(
    defaultDatePickerStyle,
  );
  return (
    <PageContainer>
      <Flex justify="space-between">
        <VStack align="stretch" gap={8}>
          <Box w="fit-content">
            <Text color="white">{format(selectedDate, "yyyy / MM / dd")}</Text>
            <SingleDatePicker
              selectedDate={selectedDate}
              datePickerStyle={datePickerStyle}
              onSetDate={setSelectedDate}
            />
          </Box>

          <Box>
            <Text color="white">
              {rangeDate.start
                ? format(rangeDate.start, "yyyy / MM / dd")
                : "???? / ?? / ??"}
              {" ~ "}
              {rangeDate.end
                ? format(rangeDate.end, "yyyy / MM / dd")
                : "???? / ?? / ??"}
            </Text>
            <RangeDatePicker
              rangeDate={rangeDate}
              datePickerStyle={datePickerStyle}
              onSetRangeDate={setRangeDate}
            />
          </Box>

          <Box>
            <SingleDatePickerPopup
              isOpen={pickerDisclosure.open}
              onClose={pickerDisclosure.onClose}
              onOpen={pickerDisclosure.onOpen}
              selectedDate={popupSelectedDate}
              onSetDate={setPopupSelectedDate}
              datePickerStyle={datePickerStyle}
            >
              <Button>{format(popupSelectedDate, "yyyy / MM / dd")}</Button>
            </SingleDatePickerPopup>
          </Box>

          <Box>
            <RangeDatePickerPopup
              isOpen={rangePickerDisclosure.open}
              onClose={rangePickerDisclosure.onClose}
              onOpen={rangePickerDisclosure.onOpen}
              rangeDate={popupRangeDate}
              onSetRangeDate={setPopupRangeDate}
              datePickerStyle={datePickerStyle}
            >
              <Button>
                {popupRangeDate.start
                  ? format(popupRangeDate.start, "yyyy / MM / dd")
                  : "???? / ?? / ??"}
                {" ~ "}
                {popupRangeDate.end
                  ? format(popupRangeDate.end, "yyyy / MM / dd")
                  : "???? / ?? / ??"}
              </Button>
            </RangeDatePickerPopup>
          </Box>
        </VStack>

        <StyleSettingForm
          datePickerStyleConfig={datePickerStyle}
          onSetDatePIckerStyleConfig={setDatePickerStyle}
        />
      </Flex>
    </PageContainer>
  );
}
