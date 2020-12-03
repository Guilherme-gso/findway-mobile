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

export const Title = styled.Text`
  font-size: 18px;
  font-family: ${themes.fonts.medium};
  color: ${themes.colors.light};
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  font-family: ${themes.fonts.light};
  color: ${themes.colors.light};
  margin-bottom: 8px;
`;

export const Section = styled.View`
  width: 100%;
  padding: 5px 6px;
`;

export const PeopleOptionText = styled.Text`
  font-size: 16px;
  font-family: ${themes.fonts.light};
  color: ${themes.colors.light};
`;

export const PeopleOption = styled.View`
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
