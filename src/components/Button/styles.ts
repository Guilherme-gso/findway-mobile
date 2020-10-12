import { MaterialCommunityIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { themes } from '../../themes';

export const Container = styled.TouchableOpacity`
  height: 55px;
  background: ${themes.colors.primary};

  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 4px;
  box-shadow: 0 5px 5px rgba(239, 205, 61, 0.2);
`;

export const ButtonText = styled.Text`
  font-size: 22px;
  color: ${themes.colors.secondary};
  font-family: ${themes.fonts.medium};
`;

export const Icon = styled(MaterialCommunityIcons)`
  margin-left: 12px;
`;
