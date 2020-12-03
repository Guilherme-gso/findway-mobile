import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';
import { themes } from '../../themes';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 40px 30px ${Platform.OS === 'android' ? 120 : 100}px;
  background: ${themes.colors.background};
`;

export const Title = styled.Text`
  font-size: 25px;
  color: #c4c4c4;
  font-weight: 500;
  font-family: ${themes.fonts.semi};
  margin-bottom: 14px;
`;

export const Content = styled.View`
  padding: 0 20px;
  width: 100%;
`;

export const Form = styled(Unform)`
  width: 100%;
`;

export const Logo = styled.Image`
  height: 180px;
  width: 180px;
`;

export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  padding: 10px 0;

  width: 100%;
  background: ${themes.colors.background};
  align-items: center;
  justify-content: center;
`;

export const CreateAccountText = styled.Text`
  font-size: 22px;
  color: ${themes.colors.primary};
  font-family: ${themes.fonts.light};
`;
