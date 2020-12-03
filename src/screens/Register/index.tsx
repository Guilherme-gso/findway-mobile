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
import {
  Container,
  Logo,
  Form,
  RegisterButton,
  RegisterText,
  ButtonLogin,
  ButtonLoginText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import logo from '../../assets/logo.png';
import { api } from '../../services/api';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { ISetUser, useAuth } from '../../hooks/auth';
import { themes } from '../../themes';

const Register: React.FC = () => {
  const { setUser } = useAuth();
  const formRef = useRef<FormHandles>(null);

  const { navigate } = useNavigation();

  const [loading, setLoading] = useState(false);

  const handleSignUp = useCallback(
    async data => {
      try {
        setLoading(false);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string().required('Email obrigatório').email(),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, { abortEarly: false });

        const {
          data: { user, token },
        } = await api.post<ISetUser>('/users', data);

        setUser({ user, token });
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
        setLoading(true);
      }
    },
    [setUser]
  );

  const submitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? undefined : 'padding'}
        enabled={Platform.OS !== 'android'}
        style={{ flex: 1, backgroundColor: themes.colors.background }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <Logo source={logo} />

            <Form ref={formRef} onSubmit={handleSignUp}>
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
              <Input
                isSecurity
                icon="lock"
                placeholder="Senha"
                name="password"
                autoCompleteType="password"
                textContentType="password"
              />

              <Button onPress={submitForm}>
                {loading ? 'Carregando...' : 'Cadastrar'}
              </Button>

              <ButtonLogin onPress={() => navigate('Login')}>
                <ButtonLoginText>Fazer Login</ButtonLoginText>
              </ButtonLogin>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <RegisterButton onPress={() => navigate('WelcomeDriver')}>
        <RegisterText>Cadastre seus serviços</RegisterText>
      </RegisterButton>
    </>
  );
};

export default Register;
