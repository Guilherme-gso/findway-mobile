import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Alert } from 'react-native';
import { FormHandles } from '@unform/core';
import { Form, Button, ButtonText, Footer } from './styles';
import Input from '../../Input';
import { api } from '../../../services/api';
import { getValidationErrors } from '../../../utils/getValidationErrors';
import { useRegisterDriver } from '../../../screens/Driver/hooks';

const FormUser: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { currentStep, toggleSteps, handleUser } = useRegisterDriver();
  const [loading, setLoading] = useState(false);

  const handleSignUp = useCallback(
    async data => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('Email obrigatório').email(),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, { abortEarly: false });

        const { data: user } = await api.post('/users', data);

        handleUser(user.user);
        toggleSteps(currentStep + 1);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Houve um erro ao criar sua conta!',
          'Os dados fornecidos já estão em uso por outro usúario'
        );
      } finally {
        setLoading(false);
      }
    },
    [handleUser, toggleSteps, currentStep]
  );

  const submitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  return (
    <Form ref={formRef} onSubmit={handleSignUp}>
      <Input
        keyboardType="default"
        autoCompleteType="name"
        autoCapitalize="none"
        autoCorrect={false}
        icon="user"
        name="name"
        placeholder="Nome"
      />

      <Input
        keyboardType="email-address"
        autoCompleteType="email"
        autoCapitalize="none"
        autoCorrect={false}
        icon="mail"
        name="email"
        placeholder="Email"
      />
      <Input
        isSecurity
        icon="lock"
        placeholder="Senha"
        name="password"
        autoCompleteType="password"
        textContentType="password"
      />

      <Footer>
        <Button onPress={submitForm}>
          <ButtonText>{loading ? 'Carregando...' : 'Continuar'}</ButtonText>
        </Button>
      </Footer>
    </Form>
  );
};

export default FormUser;
