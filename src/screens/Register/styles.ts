import styled from 'styled-components/native';
import { themes } from '../../themes';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${themes.colors.background};
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #c4c4c4;
  font-weight: 500;
  font-family: ${themes.fonts.semi};
  margin-bottom: 14px;
`;

export const Content = styled.View`
  padding: 0 20px;
  width: 100%;
`;

export const RegisterButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 80px;

  width: 100%;
  background: transparent;
  align-items: center;
  justify-content: center;
`;

export const RegisterText = styled.Text`
  font-size: 22px;
  color: ${themes.colors.primary};
  font-family: ${themes.fonts.semi};
`;
