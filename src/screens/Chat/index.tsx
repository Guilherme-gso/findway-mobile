/* eslint-disable no-shadow */
// import { Feather, MaterialIcons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { themes } from '../../themes';
// import * as S from './styles';

// const Chat: React.FC = () => {
//   const { goBack } = useNavigation();

//   return (
//     <S.Container>
//       <S.Header>
//         <TouchableOpacity onPress={goBack}>
//           <Feather name="arrow-left" color={themes.colors.light} size={30} />
//         </TouchableOpacity>

//         <S.Avatar source={{ uri: 'https://github.com/guilherme-gso.png' }} />
//       </S.Header>

//       <S.ChatContent>
//         <S.ChatTitle>Essa conversa está vazia.</S.ChatTitle>
//         <S.ChatSubtitle>Comece sua conversa com Guilherme</S.ChatSubtitle>
//       </S.ChatContent>

//       <S.Footer>
//         <S.FooterWrapper>
//           <S.ChatInput
//             placeholder="Digite sua mensagem"
//             placeholderTextColor={themes.colors.light}
//           />
//           <S.ChatButton>
//             <MaterialIcons name="send" size={20} color="#fff" />
//           </S.ChatButton>
//         </S.FooterWrapper>
//       </S.Footer>
//     </S.Container>
//   );
// };

// export default Chat;
import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import * as Styled from './styles';
import { themes } from '../../themes';
import firestore from '../../config/firestore';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';

interface RouteParams {
  sender: string;
  receptor: string;
}

interface IReceptor {
  id: string;
  name: string;
  avatar_url: string;
}

const Chat: React.FC = () => {
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const { params } = useRoute();
  const { receptor: receptor_id } = params as RouteParams;

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [receptor, setReceptor] = useState<IReceptor>({} as IReceptor);

  useEffect(() => {
    async function loadReceptor(): Promise<void> {
      const { data } = await api.get(`users/${receptor_id}`);

      setReceptor({
        id: data.id,
        name: data.name,
        avatar_url: data.avatar_url,
      });
    }

    loadReceptor();
  }, [receptor_id]);

  useEffect(() => {
    const unsubscribeListener = firestore
      .collection('messages')
      .where('receptor.id', '==', receptor_id)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: firebaseData.text,
            createdAt: new Date().getTime(),
            user: firebaseData.user,
          };

          return data;
        });

        setMessages(messages);
      });

    return () => unsubscribeListener();
  }, [receptor_id]);

  const onSend = useCallback(
    async (messagesData: IMessage[]) => {
      const message = {
        _id: messagesData[0]._id,
        text: messagesData[0].text,
        user: messagesData[0].user,
        receptor,
      };

      await firestore.collection('messages').add(message);
    },
    [receptor]
  );

  return (
    <Styled.Container>
      <Styled.Header>
        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left" color={themes.colors.light} size={30} />
        </TouchableOpacity>

        <Styled.Avatar source={{ uri: receptor.avatar_url }} />
      </Styled.Header>
      <GiftedChat
        user={{
          _id: user.id,
          avatar: user.avatar_url,
          name: user.name,
        }}
        onSend={onSend}
        messages={messages}
        messagesContainerStyle={{ backgroundColor: themes.colors.background }}
      />
    </Styled.Container>
  );
};

export default Chat;
