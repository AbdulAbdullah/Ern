import React from 'react';
import { Box, Badge, Text, Button, Stack, Icon } from '@chakra-ui/react';
import { Quest } from '../../types/quest';
import { StarIcon, TimeIcon } from '@chakra-ui/icons';

interface QuestCardProps {
  quest: Quest;
  onAccept: (questId: string) => void;
}

const QuestCard: React.FC<QuestCardProps> = ({ quest, onAccept }) => {
  const difficultyColor = {
    Easy: 'green',
    Medium: 'orange',
    Hard: 'red'
  }[quest.difficulty];

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      bg="whiteAlpha.50"
      backdropFilter="blur(10px)"
      boxShadow="lg"
      _hover={{ transform: 'translateY(-2px)', transition: 'transform 0.2s' }}
    >
      <Stack direction="column" gap={3}>
        <Stack direction="row" justify="space-between">
          <Badge colorScheme={difficultyColor} px={2} py={1}>
            {quest.difficulty}
          </Badge>
          <Badge colorScheme={quest.status === 'Available' ? 'green' : 'gray'}>
            {quest.status}
          </Badge>
        </Stack>
        
        <Text fontSize="xl" fontWeight="bold" color="white">
          {quest.title}
        </Text>
        
        <Text color="whiteAlpha.800" overflow="hidden" textOverflow="ellipsis" maxH="3em">
          {quest.description}
        </Text>
        
        <Stack direction="row" gap={4}>
          <Stack direction="row" align="center">
            <Icon as={StarIcon} color="yellow.400" />
            <Text color="whiteAlpha.900">
              {quest.rewards.amount} {quest.rewards.token}
            </Text>
          </Stack>
          
          {quest.deadline && (
            <Stack direction="row" align="center">
              <Icon as={TimeIcon} color="blue.400" />
              <Text color="whiteAlpha.900">
                {new Date(quest.deadline).toLocaleDateString()}
              </Text>
            </Stack>
          )}
        </Stack>

        <Button
          colorScheme="purple"
          variant="solid"
          isDisabled={quest.status !== 'Available'}
          onClick={() => onAccept(quest.id)}
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
        >
          Accept Quest
        </Button>
      </Stack>
    </Box>
  );
}

export default QuestCard;