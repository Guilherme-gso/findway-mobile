import { Platform } from 'react-native';
import styled from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';
import { themes } from '../../../themes';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 50px 30px ${Platform.OS === 'android' ? 120 : 100}px;
  background: ${themes.colors.background};
`;

export const ChangePassword = styled.View`
  width: 100%;
  margin-top: 22px;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #c4c4c4;
  font-weight: 500;
  font-family: ${themes.fonts.semi};
  margin-bottom: 14px;
`;

export const Form = styled(Unform)`
  width: 100%;
`;

export const Logo = styled.Image`
  width: 200px;
  height: 200px;
`;

export const RegisterButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  padding: 10px 0;

  width: 100%;
  background: transparent;
  align-items: center;
  justify-content: center;
  border-top-width: 1px;
  border-top-color: ${themes.colors.secondary};
`;

export const RegisterText = styled.Text`
  font-size: 22px;
  color: ${themes.colors.primary};
  font-family: ${themes.fonts.light};
`;

export const ButtonLogin = styled.TouchableOpacity`
  width: 100%;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
`;

export const ButtonLoginText = styled.Text`
  font-size: 22px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.light};
  margin-left: 4px;
  margin-top: 3px;
`;
