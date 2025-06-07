import { HStack, Text } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { MdOutlineArrowRight } from 'react-icons/md';

interface MapLoadingOrListProps {
  isSuccess: boolean;
  timeLeft: number;
  maps: any[];
  colorMode: string;
  theme: any;
  onOpen: () => void;
}

const MapLoadingOrList = ({
  isSuccess,
  timeLeft,
  maps,
  colorMode,
  theme,
  onOpen,
}: MapLoadingOrListProps) => (
  <AnimatePresence mode='wait'>
    {isSuccess ? (
      timeLeft !== undefined && timeLeft !== null && timeLeft < 3 ? (
        <motion.div
          key='mapnumberloadingserver'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <Text
            as='span'
            fontWeight='bold'
            fontSize={{ base: 'sm', md: 'lg' }}
            color={colorMode === 'dark' ? 'blue.500' : 'blue.500'}
            filter={
              colorMode === 'dark'
                ? theme.shadows.dropGlowDark
                : theme.shadows.dropGlow
            }
          >
            Loading {maps[1]?.number ?? ''} ...
          </Text>
        </motion.div>
      ) : (
        <motion.div
          key='mapnumberready'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
        >
          <HStack
            gap={{ base: '0', md: '1' }}
            color={colorMode === 'dark' ? 'neutral.100' : 'neutral.900'}
            align='end'
            alignItems='center'
            fontSize={{ base: 'xl', md: '2xl' }}
            onClick={onOpen}
            cursor='pointer'
            position='relative'
            _hover={{ transform: 'scale(1.05)' }}
            transition='transform 0.1s ease-in-out'
          >
            <Text
              as='span'
              fontWeight='bold'
              color={
                maps[0].finished
                  ? colorMode === 'dark'
                    ? 'green.300'
                    : 'green.500'
                  : ''
              }
              filter={
                maps[0].finished
                  ? colorMode === 'dark'
                    ? theme.shadows.finGlowDark
                    : theme.shadows.finGlowLight
                  : colorMode === 'dark'
                    ? theme.shadows.dropGlowDark
                    : theme.shadows.dropGlow
              }
            >
              {maps[0].number}
            </Text>
            <MdOutlineArrowRight
              fontWeight='bold'
              filter={
                colorMode === 'dark'
                  ? theme.shadows.dropGlowDark
                  : theme.shadows.dropGlow
              }
            />
            <Text
              as='span'
              fontWeight='bold'
              color={
                maps[1].finished
                  ? colorMode === 'dark'
                    ? 'green.300'
                    : 'green.500'
                  : ''
              }
              filter={
                maps[1].finished
                  ? colorMode === 'dark'
                    ? theme.shadows.finGlowDark
                    : theme.shadows.finGlowLight
                  : colorMode === 'dark'
                    ? theme.shadows.dropGlowDark
                    : theme.shadows.dropGlow
              }
            >
              {maps[1].number}
            </Text>
            <Text
              fontSize='xs'
              position={{ base: 'absolute' }}
              top={{ base: '1.8rem' }}
              display={{ base: 'none', sm: 'block' }}
              filter={
                colorMode === 'dark'
                  ? theme.shadows.dropGlowDark
                  : theme.shadows.dropGlow
              }
            >
              {maps[0].author}
            </Text>
          </HStack>
        </motion.div>
      )
    ) : null}
  </AnimatePresence>
);

export default MapLoadingOrList;
