import styled from 'styled-components/native';
import { themes } from '../../../themes';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-around;
  padding: 0 30px;
  background: ${themes.colors.background};
`;

export const Title = styled.Text`
  font-size: 26px;
  color: #c4c4c4;
  font-weight: 500;
  font-family: ${themes.fonts.semi};
  margin-bottom: 6px;
  text-align: center;
`;

export const LetsGo = styled.View`
  width: 100%;
`;

export const ImageContainer = styled.View`
  width: 100%;
  align-items: center;
`;
export const Call = styled.View`
  width: 100%;
`;
