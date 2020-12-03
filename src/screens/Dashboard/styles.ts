import styled from 'styled-components/native';
import { themes } from '../../themes';

export const Container = styled.View`
  flex: 1;
  background: ${themes.colors.background};
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: ${themes.fonts.semi};
  color: ${themes.colors.light};
`;
