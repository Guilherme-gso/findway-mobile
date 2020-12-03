import { darken } from 'polished';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { IChat } from '.';
import { themes } from '../../themes';

export const Container = styled.View`
  flex: 1;
  background: ${themes.colors.background};
`;

export const Chats = styled(FlatList as new () => FlatList<IChat>)`
  flex: 1;
`;

export const ChatCard = styled.TouchableOpacity`
  padding: 10px;
  width: 100%;
  flex-direction: row;
  background: ${darken(0.1, themes.colors.background)};
  align-items: center;
  margin-bottom: 1px;
`;

export const Image = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 12px;
`;

export const Data = styled.View`
  flex: 1;
  padding: 0 8px;
`;

export const UserName = styled.Text`
  color: ${themes.colors.light};
  font-family: ${themes.fonts.medium};
  font-size: 18px;
`;

export const LastMessage = styled.Text`
  color: ${themes.colors.light};
  font-family: ${themes.fonts.light};
  font-size: 14px;
`;
