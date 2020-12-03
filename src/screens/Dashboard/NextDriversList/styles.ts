import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { IJob } from '.';
import { themes } from '../../../themes';

export const List = styled(FlatList as new () => FlatList<IJob>)`
  padding: 20px 12px 34px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${themes.fonts.regular};
  color: ${themes.colors.light};
  padding: 4px 0;
`;
