import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { themes } from '../../themes';
import { IJob } from '../Dashboard/NextDriversList';

export const Container = styled.View`
  flex: 1;
  background: ${themes.colors.background};
  align-items: center;
  justify-content: center;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
`;

export const List = styled(FlatList as new () => FlatList<IJob>)`
  padding-bottom: 40px;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-size: 22px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.light};
  padding: 20px 0 10px;
  text-align: center;
`;

export const NoCategoryContainer = styled.View`
  width: 100%;
`;
