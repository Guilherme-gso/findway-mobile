import styled, { css } from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';
import { themes } from '../../../themes';

interface IProgress {
  currentStep: number;
}

interface ICardProps {
  isActive: boolean;
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

export const TopHeader = styled.View`
  padding: 0 20px;
  height: 50px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const Container = styled.View`
  flex: 1;
  background: ${themes.colors.background};
`;

export const ProgressStatus = styled.View<IProgress>`
  background: transparent;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  border-width: 3px;
  margin-right: 28px;

  ${props => progressStyle[props.currentStep]}

  align-items: center;
  justify-content: center;
`;

export const ProgressStatusText = styled.Text`
  color: ${themes.colors.light};
  font-size: 18px;
  font-family: ${themes.fonts.medium};
`;

export const Title = styled.Text`
  font-size: 18px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.medium};
  text-align: center;
`;

export const Header = styled.View`
  align-items: center;
  flex-direction: row;
  width: 100%;
  padding: 30px 20px;
`;

export const Label = styled.Text`
  font-size: 18px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.light};
  margin-bottom: 5px;
  padding: 0 20px;
`;

export const Section = styled.View`
  padding: 20px;
  width: 100%;
`;

export const Dropzone = styled.TouchableOpacity`
  height: 200px;
  width: 100%;
  background: transparent;
  border-width: 1px;
  border-style: dotted;
  border-radius: 5px;
  border-color: ${themes.colors.light};
  align-items: center;
  justify-content: center;
`;

export const Preview = styled.Image`
  width: 100%;
  height: 100%;
`;

export const Form = styled(Unform)`
  width: 100%;
`;

export const CategoryCard = styled.TouchableOpacity<ICardProps>`
  padding: 8px;
  background: ${props =>
    props.isActive ? themes.colors.primary : themes.colors.secondary};
  margin-right: 6px;
  border-radius: 4px;
`;
