import React, { useCallback, useState, useRef, useEffect } from 'react';
import { TextInputProps, TextInput as ITextInput } from 'react-native';
import { themes } from '../../themes';
import { Container, TextInput, Icon, Security } from './styles';

interface IInputProps extends TextInputProps {
  icon?: string;
  isSecurity?: boolean;
  error: boolean;
  value: string;
}

const Input: React.FC<IInputProps> = ({
  icon,
  isSecurity,
  value,
  error,
  ...rest
}) => {
  const inputRef = useRef<ITextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [isErrored, setIsErrored] = useState(false);

  const [inputSecurity, setInputSecurity] = useState(isSecurity);
  const handleToggleInputSecurity = useCallback(() => {
    setInputSecurity(!inputSecurity);
  }, [inputSecurity]);

  const handleFocus = useCallback(() => {
    setIsFocused(!isFocused);
  }, [isFocused]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!value);
  }, [value]);

  useEffect(() => {
    setIsErrored(error);
  }, [error]);

  return (
    <Container isErrored={isErrored} isFocused={isFocused}>
      <Icon
        name={icon}
        size={22}
        color={isFilled ? themes.colors.primary : themes.colors.light}
      />
      <TextInput
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        secureTextEntry={inputSecurity}
        placeholderTextColor={themes.colors.light}
        {...rest}
      />
      {isSecurity && (
        <Security onPress={handleToggleInputSecurity}>
          <Icon
            name={inputSecurity ? 'eye' : 'eye-off'}
            size={22}
            color={themes.colors.primary}
          />
        </Security>
      )}
    </Container>
  );
};

export default Input;
