import React, { useState } from 'react';
import {
  Container,
  SimpleGrid,
  Heading,
  Input,
  Box,
  Stack,
  Select,
} from '@chakra-ui/react';
import QuestCard from '../components/quests/QuestCard';
import { Quest } from '../types/quest';
import { useAuth } from '../contexts/AuthContext';

// Mock data for quests
const mockQuests: Quest[] = [
  {
    id: '1',
    title: 'Build a Simple DApp',
    description: 'Create a basic decentralized application using Ethereum smart contracts.',
    rewards: {
      amount: 100,
      token: 'ERN'
    },
    difficulty: 'Easy',
    status: 'Available',
    requirements: ['Basic Solidity', 'React knowledge'],
    deadline: new Date('2025-06-01')
  },
  {
    id: '2',
    title: 'Smart Contract Audit',
    description: 'Perform a security audit on a given smart contract and identify vulnerabilities.',
    rewards: {
      amount: 250,
      token: 'ERN'
    },
    difficulty: 'Hard',
    status: 'Available',
    requirements: ['Advanced Solidity', 'Security expertise'],
    deadline: new Date('2025-05-15')
  },
  {
    id: '3',
    title: 'Create NFT Collection',
    description: 'Design and deploy a collection of NFTs with unique attributes.',
    rewards: {
      amount: 150,
      token: 'ERN'
    },
    difficulty: 'Medium',
    status: 'Available',
    requirements: ['ERC721 knowledge', 'Digital art skills'],
    deadline: new Date('2025-05-30')
  }
];

const QuestList: React.FC = () => {
  const { isConnected } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const filteredQuests = mockQuests.filter(quest => {
    const matchesSearch = quest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quest.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || quest.difficulty.toLowerCase() === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const handleAcceptQuest = (questId: string) => {
    // To be implemented with smart contract integration
    console.log('Accepting quest:', questId);
  };

  if (!isConnected) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box textAlign="center" p={8}>
          <Heading size="lg" color="whiteAlpha.900">Please connect your wallet to view quests</Heading>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Heading mb={8} color="whiteAlpha.900">Available Quests</Heading>
      
      <Stack direction={{ base: 'column', md: 'row' }} gap={4} mb={8}>
        <Input
          placeholder="Search quests..."
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          bg="whiteAlpha.50"
          color="white"
          _placeholder={{ color: 'whiteAlpha.500' }}
          borderColor="whiteAlpha.200"
          _hover={{ borderColor: 'whiteAlpha.300' }}
          _focus={{ borderColor: 'purple.400', boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)' }}
        />
        <Box width={{ base: 'full', md: '200px' }}>
          <Select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            bg="whiteAlpha.50"
            color="white"
            borderColor="whiteAlpha.200"
            _hover={{ borderColor: 'whiteAlpha.300' }}
            _focus={{ borderColor: 'purple.400', boxShadow: '0 0 0 1px var(--chakra-colors-purple-400)' }}
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </Box>
      </Stack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
        {filteredQuests.map(quest => (
          <QuestCard
            key={quest.id}
            quest={quest}
            onAccept={handleAcceptQuest}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default QuestList;