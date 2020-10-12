import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { themes } from '../../themes';
import { Container, ButtonText, Icon } from './styles';

interface IButtonProps extends TouchableOpacityProps {
  icon?: string;
}

const Button: React.FC<IButtonProps> = ({ children, icon, ...rest }) => {
  return (
    <Container {...rest}>
      <ButtonText>{children}</ButtonText>
      {icon && <Icon name={icon} size={18} color={themes.colors.secondary} />}
    </Container>
  );
};

export default Button;
