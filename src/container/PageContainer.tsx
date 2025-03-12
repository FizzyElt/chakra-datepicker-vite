import type React from 'react';
import { Box } from '@chakra-ui/react';

type PageContainerProps = {
  children?: React.ReactNode;
};

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <Box w="full" p={14} minH="100vh" bgColor="gray.800">
      {children}
    </Box>
  );
}
