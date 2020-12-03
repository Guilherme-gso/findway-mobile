import { FlatList } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { themes } from '../../../themes';
import { IJob } from '../../Dashboard/NextDriversList';

export const Container = styled.View`
  flex: 1;
  background: ${themes.colors.background};
  position: relative;
`;

export const List = styled(FlatList as new () => FlatList<IJob>)`
  flex: 1;
  padding: 30px 12px;
`;

export const HeaderList = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

export const PlusButton = styled.TouchableOpacity`
  height: 60px;
  width: 60px;
  background: ${themes.colors.primary};
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;
