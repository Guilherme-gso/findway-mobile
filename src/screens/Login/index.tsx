import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import {
  Container,
  Content,
  Title,
  CreateAccount,
  CreateAccountText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const { navigate } = useNavigation();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [hasError, setHasError] = useState(false);

  const handleSubmit = useCallback(async () => {
    try {
      if (!email || !password) {
        setHasError(true);
        return;
      }

      setHasError(false);
      await signIn({ email, password });
    } catch (error) {
      Alert.alert('Erro', 'Erro ao fazer login, verifique suas credenciais');
      setHasError(true);
    }
  }, [email, password, signIn]);

  return (
    <Container>
      <Title>Login</Title>
      <Content>
        <Input
          value={email}
          onChangeText={setEmail}
          error={hasError}
          keyboardType="email-address"
          autoCompleteType="email"
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          placeholder="Email"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          error={hasError}
          isSecurity
          icon="lock"
          placeholder="Senha"
          autoCompleteType="password"
          textContentType="password"
        />

        <Button onPress={handleSubmit}>Entrar</Button>
      </Content>

      <CreateAccount onPress={() => navigate('Register')}>
        <CreateAccountText>Cadastre-se</CreateAccountText>
      </CreateAccount>
    </Container>
  );
};

export default Login;
