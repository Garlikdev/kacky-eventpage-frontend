import {
  Center,
  Box,
  useColorMode,
  Flex,
  HStack,
  Text,
  VStack,
  Button,
  Badge,
  useDisclosure,
  useTheme,
} from '@chakra-ui/react';
import { Fragment, useContext, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DateTime } from 'luxon';
import { getMapImageUrl } from '@/api/api';
// import mapImageFallback from '@/assets/images/mapImageFallback.jpg';
import EventContext from '@/context/EventContext';
import { diffBadgeColorArr, getDefaultBackgrounds } from '@/utils/theme';
import { NavLink } from 'react-router-dom';
import MapImageModal from '../MapImageModal';
import ServerNumberBox from './ServerNumberBox';
import MapLoadingOrList from './MapLoadingOrList';

// eslint-disable-next-line no-unused-vars
const CompactServerList = ({
  serverNumber,
  serverDifficulty,
  maps,
  timeLeft,
  playerCount,
  serverJoin,
  isSuccess,
}: Server) => {
  const { colorMode } = useColorMode();

  const { event } = useContext(EventContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalNextMap1 = useDisclosure();
  const modalNextMap2 = useDisclosure();
  const modalNextMap3 = useDisclosure();
  const theme = useTheme();

  const nextMapModals = [modalNextMap1, modalNextMap2, modalNextMap3];

  const imageUrl = getMapImageUrl(event.type, maps[0].number);

  const divRef = useRef<HTMLDivElement>(null);
  return (
    <Box
      // Image fallback doesn't work for some reason for bgImage
      //   bgImage={`url(${getMapImageUrl(event.type, maps[0].number)})`}
      bgPosition='center'
      bgRepeat='no-repeat'
      bgSize='cover'
      w='full'
      h='4rem'
      ref={divRef}
    >
      {/* SERVER */}
      <Center w='full' h='full'>
        <HStack
          position='relative'
          w='full'
          h='full'
          bgImage={`url(${imageUrl})`}
          bgColor={`${colorMode === 'dark' ? 'black' : 'white'}`}
          bgPosition='center'
          bgRepeat='no-repeat'
          bgSize='cover'
          transition='transform 0.1s ease-in-out'
          p={0}
          // filter={timeLeft < 3 ? 'grayscale(100%)' : 'grayscale(0%)'}
        >
          <HStack
            align='stretch'
            justify='space-between'
            position='relative'
            w='full'
            h='full'
            px={{ base: 2, md: 3 }}
            bgColor={`${
              colorMode === 'dark'
                ? getDefaultBackgrounds().dark[0]
                : getDefaultBackgrounds().light[0]
            }99`}
          >
            {serverDifficulty !== '' ? ( // Servers do not have a difficulty in Phase 1
              <Badge
                w={'0.5rem'}
                h={'100%'}
                left={0}
                position={'absolute'}
                visibility={
                  serverDifficulty === 'undefined' ? 'hidden' : 'visible'
                }
                variant={diffBadgeColorArr[serverDifficulty].variant}
              ></Badge>
            ) : null}
            <HStack gap={2} h='full' align='stretch'>
              <ServerNumberBox
                serverNumber={serverNumber}
                colorMode={colorMode}
              />
              <MapLoadingOrList
                isSuccess={isSuccess}
                timeLeft={timeLeft}
                maps={maps}
                colorMode={colorMode}
                theme={theme}
                onOpen={onOpen}
              />
            </HStack>
            <HStack
              w='fit-content'
              gap={{ base: '2', md: '4' }}
              justify='space-between'
              textTransform='initial'
            >
              <HStack
                justify='center'
                alignContent='start'
                textAlign='start'
                flexGrow={1}
              >
                {timeLeft <= 0 ? (
                  <motion.div
                    key={'timerrestarting'}
                    initial={{ opacity: 0 }} // Start with 0 opacity
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  >
                    <Text
                      as='span'
                      textColor='red'
                      fontWeight={'bold'}
                      sx={{ fontVariantNumeric: 'tabular-nums' }}
                    >
                      00:00
                    </Text>
                  </motion.div>
                ) : (
                  <motion.div
                    key={'timerrunning'}
                    initial={{ opacity: 0 }} // Start with 0 opacity
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  >
                    <Flex justify='center' align='center' h='2rem' w='3rem'>
                      <Text
                        alignContent={'center'}
                        as='span'
                        fontWeight={'bold'}
                        textColor={
                          timeLeft < 300
                            ? colorMode === 'dark'
                              ? 'orange.500'
                              : 'orange.500'
                            : ''
                        }
                        sx={{ fontVariantNumeric: 'tabular-nums' }}
                        filter={
                          colorMode === 'dark'
                            ? theme.shadows.dropGlowDark
                            : theme.shadows.dropGlow
                        }
                      >
                        {/* {timeLeft > 60
                        ? Math.floor(timeLeft / 60)
                            .toString()
                            .padStart(1, '0')
                        : '1'}
                      m left */}
                        {DateTime.fromSeconds(timeLeft).toFormat('mm:ss')}
                      </Text>
                    </Flex>
                  </motion.div>
                )}
              </HStack>
              <VStack>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={'mapnumberloadingnext'}
                    initial={{ opacity: 0 }} // Start with 0 opacity
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  >
                    <VStack
                      gap={0}
                      textColor={colorMode === 'dark' ? 'white' : 'black'}
                      justify={'end'}
                      minW={'2rem'}
                    >
                      {maps.slice(1).map((map: ServerMap, index: number) => (
                        <Fragment key={map.number}>
                          <Text
                            onClick={nextMapModals[index].onOpen}
                            cursor='pointer'
                            _hover={{ transform: 'scale(1.1)' }}
                            fontWeight={'medium'}
                            fontSize={{ base: 'sm', md: 'sm' }}
                            transition='transform 0.1s ease-in-out'
                            color={
                              map.finished
                                ? colorMode === 'dark'
                                  ? 'green.300'
                                  : 'green.500'
                                : ''
                            }
                            filter={
                              map.finished
                                ? colorMode === 'dark'
                                  ? theme.shadows.finGlowDark
                                  : theme.shadows.finGlowLight
                                : colorMode === 'dark'
                                  ? theme.shadows.dropGlowDark
                                  : theme.shadows.dropGlow
                            }
                          >
                            {map.number}
                          </Text>
                          <MapImageModal
                            mapNumber={map.number}
                            author={map.author}
                            isFinished={map.finished}
                            isOpen={nextMapModals[index].isOpen}
                            onClose={nextMapModals[index].onClose}
                            eventtype={event.type}
                          />
                        </Fragment>
                      ))}
                    </VStack>
                  </motion.div>
                </AnimatePresence>
              </VStack>
              <VStack width={'3rem'}>
                <AnimatePresence mode='wait'>
                  <motion.div
                    key={'playercountloadingnext'}
                    initial={{ opacity: 0 }} // Start with 0 opacity
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  >
                    <Text
                      fontWeight={'bold'}
                      transition='transform 0.1s ease-in-out'
                      color={
                        playerCount > 90
                          ? 'red.400'
                          : playerCount > 49
                            ? 'yellow.400'
                            : colorMode === 'dark'
                              ? 'green.300'
                              : 'green.500'
                      }
                    >
                      {playerCount}/100
                    </Text>
                  </motion.div>
                  <motion.div
                    key={'mapjoinloading'}
                    initial={{ opacity: 0 }} // Start with 0 opacity
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  >
                    <Flex
                      gap={0}
                      textColor={colorMode === 'dark' ? 'white' : 'black'}
                    >
                      {serverJoin && (
                        <Button
                          as={NavLink}
                          to={`${serverJoin}`}
                          position='relative'
                          w='fit'
                          fontSize={'xs'}
                          h='1.5rem'
                          p={1}
                          _hover={{
                            bg:
                              colorMode === 'dark'
                                ? 'neutral.700 !important'
                                : 'neutral.300 !important',
                          }}
                          fontWeight='bold'
                          bg={
                            colorMode === 'dark'
                              ? 'neutral.800 !important'
                              : 'neutral.200 !important'
                          }
                          textAlign='center'
                          alignItems={'center'}
                          justifyContent={'center'}
                          filter={
                            colorMode === 'dark'
                              ? theme.shadows.dropGlowDark
                              : theme.shadows.dropGlow
                          }
                        >
                          Join
                        </Button>
                      )}
                    </Flex>
                  </motion.div>
                </AnimatePresence>
              </VStack>
            </HStack>
          </HStack>
        </HStack>
      </Center>
      <MapImageModal
        mapNumber={maps[0].number}
        author={maps[0].author}
        isFinished={maps[0].finished}
        isOpen={isOpen}
        onClose={onClose}
        eventtype={event.type}
      />
    </Box>
  );
};

export default CompactServerList;
