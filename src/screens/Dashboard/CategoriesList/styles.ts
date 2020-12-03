import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { themes } from '../../../themes';
import { ICategory } from '.';

export const List = styled(FlatList as new () => FlatList<ICategory>)`
  padding: 4px 12px 4px 12px;
`;

export const CategoryCard = styled(RectButton)`
  background: ${themes.colors.secondary};
  margin-right: 12px;
  padding: 20px 10px;
  align-items: center;
  border-radius: 8px;
`;

export const CategoryCardText = styled.Text`
  font-size: 16px;
  font-family: ${themes.fonts.light};
  color: ${themes.colors.light};
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${themes.fonts.regular};
  color: ${themes.colors.light};
  padding: 18px 12px 0;
`;
