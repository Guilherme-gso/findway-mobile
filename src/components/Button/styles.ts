import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { themes } from '../../themes';

export const Container = styled.TouchableOpacity`
  height: 55px;
  background: ${themes.colors.primary};

  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  font-size: 22px;
  color: ${themes.colors.secondary};
  font-family: ${themes.fonts.medium};
`;

export const Icon = styled(MaterialIcons)`
  margin-left: 12px;
`;
