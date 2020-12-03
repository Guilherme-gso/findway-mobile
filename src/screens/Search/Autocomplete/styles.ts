import { Feather } from '@expo/vector-icons';
import { shade } from 'polished';
import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { ISuggestion } from '.';
import { themes } from '../../../themes';

export const List = styled(FlatList as new () => FlatList<ISuggestion>)`
  flex: 1;
  padding: 4px 20px 20px;
`;

export const InputContainer = styled.View`
  height: 45px;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: 0 12px;
  border-radius: 4px;

  margin-bottom: 18px;

  background: ${themes.colors.secondary};
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${themes.colors.light};
`;

export const Icon = styled(Feather)`
  margin-right: 12px;
`;

export const AutocompleteContainer = styled.View`
  width: 100%;
  padding: 20px 10px;

  flex-direction: row;
  margin-bottom: 10px;
  background: ${shade(0.1, themes.colors.background)};
  border-radius: 8px;
`;

export const AutocompleteButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 90%;
`;

export const SuggestionsTitle = styled.Text`
  color: ${themes.colors.light};
  font-size: 16px;
  font-family: ${themes.fonts.regular};
`;
