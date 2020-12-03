import React, { useCallback, useRef } from 'react';
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
  CreateAccount,
  CreateAccountText,
  Form,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth, ICredentials } from '../../hooks/auth';
import logo from '../../assets/logo.png';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { themes } from '../../themes';

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { signIn, loading } = useAuth();
  const { navigate } = useNavigation();

  const handleSubmit = useCallback(
    async (data: ICredentials) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email(),
          password: Yup.string().min(6, 'No mínimo 6 digitos'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          `Ocorreu o erro ${err}. Tente novamente!`
        );
      }
    },
    [signIn]
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

            <Form ref={formRef} onSubmit={handleSubmit}>
              <Input
                keyboardType="email-address"
                autoCompleteType="email"
                autoCapitalize="none"
                autoCorrect={false}
                name="email"
                icon="mail"
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
                {loading ? 'Carregando...' : 'Entrar'}
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccount onPress={() => navigate('Register')}>
        <CreateAccountText>Cadastre-se</CreateAccountText>
      </CreateAccount>
    </>
  );
};

export default Login;
