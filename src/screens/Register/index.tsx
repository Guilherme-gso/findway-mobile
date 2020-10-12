import React, { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import {
  Container,
  Content,
  Title,
  RegisterButton,
  RegisterText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { api } from '../../services/api';

const Register: React.FC = () => {
  const { goBack } = useNavigation();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [hasError, setHasError] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!email || !password || !name) {
      setHasError(true);
      return;
    }

    try {
      await api.post('/users', { name, email, password });
      Alert.alert('Sua conta foi criada com sucesso', 'Agora é só fazer login');
    } catch (error) {
      Alert.alert(
        'Erro',
        'Os dados fornecidos já estão em uso por outro usuário'
      );
      setHasError(true);
    }
  }, [name, email, password]);

  return (
    <Container>
      <Title>Cadastre-se</Title>
      <Content>
        <Input
          value={name}
          onChangeText={setName}
          error={hasError}
          keyboardType="default"
          autoCapitalize="none"
          autoCorrect={false}
          icon="account"
          placeholder="Nome"
        />
        <Input
          value={name}
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

        <Button onPress={handleSubmit}>Cadastrar</Button>
      </Content>

      <RegisterButton onPress={goBack}>
        <RegisterText>Fazer login</RegisterText>
      </RegisterButton>
    </Container>
  );
};

export default Register;
