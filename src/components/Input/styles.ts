import styled, { css } from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { themes } from '../../themes';

interface IContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<IContainerProps>`
  height: 55px;
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-width: 1px;
  border-color: ${themes.colors.light};

  padding: 0 12px;
  border-radius: 8px;

  margin-bottom: 18px;

  ${props =>
    props.isErrored &&
    css`
      border-color: ${themes.alerts.error};
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: ${themes.colors.primary};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${themes.colors.light};
  font-size: 18px;
  font-family: ${themes.fonts.medium};
`;

export const Icon = styled(MaterialCommunityIcons)`
  margin-right: 12px;
`;

export const Security = styled.TouchableOpacity``;
