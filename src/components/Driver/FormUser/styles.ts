import styled from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';
import { TouchableOpacity } from 'react-native';
import { themes } from '../../../themes';

export const Form = styled(Unform)`
  width: 100%;
`;

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 50px;
`;

export const Button = styled(TouchableOpacity)`
  background: ${themes.colors.primary};
  margin-right: 20px;
  padding: 10px 40px;
  border-radius: 50px;
`;

export const ButtonText = styled.Text`
  color: ${themes.colors.secondary};
  font-size: 18px;
  font-family: ${themes.fonts.medium};
`;
