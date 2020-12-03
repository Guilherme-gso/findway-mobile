import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { TextInputProps, TextInput } from 'react-native';
import * as Styled from './styles';
import { themes } from '../../themes';

interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  isSecurity?: boolean;
}

const Input: React.FC<InputProps> = ({ name, icon, isSecurity, ...rest }) => {
  const {
    defaultValue = '',
    clearError,
    fieldName,
    error,
    registerField,
  } = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const inputCurrentElementRef = useRef<TextInput>(null);
  const [inputSecurity, setInputSecurity] = useState(isSecurity);

  const inputCurrentValueRef = useRef<TextInputProps>({
    value: defaultValue,
  });

  const [isFilled, setIsFilled] = useState(
    !!inputCurrentValueRef.current.value
  );

  const handleIsFocused = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleIsBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputCurrentValueRef.current.value);
  }, []);

  const handleToggleInputSecurity = useCallback(() => {
    setInputSecurity(!inputSecurity);
  }, [inputSecurity]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputCurrentValueRef.current,
      path: 'value',
      setValue(_, value: string) {
        inputCurrentValueRef.current.value = value;
        inputCurrentElementRef.current?.setNativeProps({ text: value });
      },
      clearValue() {
        inputCurrentValueRef.current.value = '';
        inputCurrentElementRef.current?.clear();
      },
    });
  }, [registerField, fieldName]);

  return (
    <Styled.Container isErrored={!!error} isFocused={isFocused}>
      <Styled.Icon
        name={icon}
        color={
          isFilled
            ? themes.colors.primary
            : error
            ? themes.alerts.error
            : themes.colors.light
        }
        size={20}
      />
      <Styled.TextInput
        ref={inputCurrentElementRef}
        onChangeText={value => {
          inputCurrentValueRef.current.value = value;
        }}
        onKeyPress={clearError}
        defaultValue={defaultValue}
        placeholderTextColor={error ? themes.alerts.error : themes.colors.light}
        keyboardAppearance="default"
        onFocus={handleIsFocused}
        secureTextEntry={inputSecurity}
        onBlur={handleIsBlur}
        {...rest}
      />

      {isSecurity && (
        <Styled.Security onPress={handleToggleInputSecurity}>
          <Styled.Icon
            name={inputSecurity ? 'eye' : 'eye-off'}
            size={22}
            color={error ? themes.alerts.error : themes.colors.light}
          />
        </Styled.Security>
      )}
    </Styled.Container>
  );
};

export default Input;
