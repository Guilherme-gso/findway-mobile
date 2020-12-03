import styled, { css } from 'styled-components/native';
import { themes } from '../../../themes';

interface IProgress {
  currentStep: number;
}

const progressStyle: { [key: number]: any } = {
  1: css`
    border-top-color: ${themes.colors.primary};
    border-left-color: ${themes.colors.primary};
    border-right-color: ${themes.colors.secondary};
    border-bottom-color: ${themes.colors.secondary};
  `,
  2: css`
    border-color: ${themes.colors.primary};
  `,
};

export const Container = styled.View`
  flex: 1;
  align-items: center;
  padding: 50px 30px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${themes.fonts.semi};
  color: ${themes.colors.light};

  margin: 12px 0 5px;
`;

export const Header = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
`;

export const ProgressStatus = styled.View<IProgress>`
  background: transparent;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  border-width: 3px;

  ${props => progressStyle[props.currentStep]}

  align-items: center;
  justify-content: center;
`;

export const ProgressStatusText = styled.Text`
  color: ${themes.colors.light};
  font-size: 18px;
  font-family: ${themes.fonts.medium};
`;

export const ProgressText = styled.Text`
  font-size: 16px;
  font-family: ${themes.fonts.semi};
  color: ${themes.colors.light};
  margin-left: 40px;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;

  margin-top: 40px;
`;
