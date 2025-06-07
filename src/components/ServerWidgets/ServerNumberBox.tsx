import { Box, Text } from '@chakra-ui/react';
import { getDefaultBackgrounds } from '@/utils/theme';

interface ServerNumberBoxProps {
  serverNumber: number;
  colorMode: string;
}

const ServerNumberBox = ({ serverNumber, colorMode }: ServerNumberBoxProps) => (
  <Box
    position='relative'
    alignContent='center'
    w='3rem'
    h='full'
    bgColor={`$${
      colorMode === 'dark'
        ? getDefaultBackgrounds().dark[0]
        : getDefaultBackgrounds().light[0]
    }99`}
    display='flex'
    alignItems='center'
    justifyContent='center'
  >
    <Text
      fontWeight='medium'
      fontSize='xl'
      transition='transform 1s ease-in-out'
      textAlign='center'
    >
      #{serverNumber}
    </Text>
  </Box>
);

export default ServerNumberBox;
