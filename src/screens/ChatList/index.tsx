import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Chats,
  ChatCard,
  Image,
  Data,
  UserName,
  LastMessage,
} from './styles';
import Header from '../../components/Header';

export interface IChat {
  id: string;
  user_name: string;
  user_avatar: string;
  last_message: string;
}

const ChatList: React.FC = () => {
  const { navigate } = useNavigation();
  const [chats] = useState<IChat[]>([
    {
      id: '1',
      user_name: 'Guilherme Oliveira',
      user_avatar: 'https://github.com/guilherme-gso.png',
      last_message: 'Hello Everyone!',
    },
    {
      id: '2',
      user_name: 'Guilherme Oliveira',
      user_avatar: 'https://github.com/guilherme-gso.png',
      last_message: 'Hello Everyone!',
    },
    {
      id: '3',
      user_name: 'Guilherme Oliveira',
      user_avatar: 'https://github.com/guilherme-gso.png',
      last_message: 'Hello Everyone!',
    },
  ]);
  return (
    <Container>
      <Header />

      <Chats
        keyExtractor={chat => chat.id}
        data={chats}
        renderItem={({ item: chat }) => (
          <ChatCard onPress={() => navigate('Chat')}>
            <Image source={{ uri: chat.user_avatar }} />

            <Data>
              <UserName>{chat.user_name}</UserName>
              <LastMessage>{chat.last_message}</LastMessage>
            </Data>
          </ChatCard>
        )}
      />
    </Container>
  );
};

export default ChatList;
