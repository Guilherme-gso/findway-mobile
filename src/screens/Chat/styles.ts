import styled from 'styled-components/native';
import { themes } from '../../themes';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${themes.colors.background};
`;

export const Content = styled.View`
  padding: 20px;
  flex: 1;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

export const ChatContent = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ChatTitle = styled.Text`
  font-size: 22px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.medium};
`;

export const ChatSubtitle = styled.Text`
  font-size: 16px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.regular};
`;

export const Footer = styled.View`
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  padding: 20px 10px;
`;

export const FooterWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ChatInput = styled.TextInput`
  flex: 1;
  background: ${themes.colors.secondary};
  margin-right: 8px;
  border-radius: 8px;
  height: 50px;

  color: ${themes.colors.light};
  padding: 0 20px;
  font-size: 16px;
`;

export const ChatButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: #4c8bf5;

  align-items: center;
  justify-content: center;
`;
