import styled from 'styled-components/native';
import { themes } from '../../themes';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: ${themes.colors.background};
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: ${themes.fonts.semi};
  color: ${themes.colors.light};
`;
