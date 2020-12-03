import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import { themes } from '../../../themes';

export const Container = styled(RectButton)`
  width: 100%;
  border-radius: 4px;
  background: ${themes.colors.secondary};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
`;

export const IconContainer = styled.View`
  width: 40px;
  margin-right: 8px;
  align-items: center;
  justify-content: center;
`;

export const Data = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.regular};
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.light};
`;

export const Button = styled.TouchableOpacity``;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: ${themes.colors.primary};
  font-family: ${themes.fonts.regular};
`;
