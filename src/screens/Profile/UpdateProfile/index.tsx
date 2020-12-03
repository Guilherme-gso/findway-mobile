import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { FormHandles } from '@unform/core';
import { Container, Title, ChangePassword, Form } from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { api } from '../../../services/api';
import { getValidationErrors } from '../../../utils/getValidationErrors';
import { useAuth } from '../../../hooks/auth';
import { themes } from '../../../themes';

const UpdateProfile: React.FC = () => {
  const { setUser, user, token } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const { goBack } = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleUpdate = useCallback(
    async data => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .required('E-mail é obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string()
              .min(6, 'No mínimo 6 dígitos')
              .required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          confirm_password: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), null], 'Confirmação incorreta'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          name,
          email,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put(`/users/${user.id}/profile`, formData);

        setUser({ user: response.data, token });

        Alert.alert('Seus dados foram alterados com sucesso!');
        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Houve um erro ao atualizar suas informações, tente novamente.'
        );
      } finally {
        setLoading(false);
      }
    },
    [setUser, token, user.id, goBack]
  );

  const submitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? undefined : 'padding'}
      enabled={Platform.OS !== 'android'}
      style={{ flex: 1, backgroundColor: themes.colors.background }}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Title>Atualize suas informações</Title>
          <Form initialData={user} ref={formRef} onSubmit={handleUpdate}>
            <Input
              keyboardType="default"
              autoCompleteType="name"
              autoCapitalize="words"
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

            <ChangePassword>
              <Input
                isSecurity
                icon="lock"
                placeholder="Senha atual"
                name="old_password"
                autoCompleteType="password"
                textContentType="password"
              />
              <Input
                isSecurity
                icon="lock"
                placeholder="Nova senha"
                name="password"
                autoCompleteType="password"
                textContentType="password"
              />

              <Input
                isSecurity
                icon="lock"
                placeholder="Confirmar senha"
                name="confirm_password"
                autoCompleteType="password"
                textContentType="password"
              />
            </ChangePassword>

            <Button onPress={submitForm}>
              {loading ? 'Carregando...' : 'Confirmar mudanças'}
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateProfile;
