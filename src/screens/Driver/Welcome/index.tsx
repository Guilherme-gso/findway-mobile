import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../../components/Button';
import { Container, Title, LetsGo, ImageContainer, Call } from './styles';
import WelcomeSvg from './WelcomeSvg';

const Welcome: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Container>
        <ImageContainer>
          <WelcomeSvg />
        </ImageContainer>

        <Call>
          <Title>Bem vindo ao Findway para motoristas!</Title>
        </Call>

        <LetsGo>
          <Button onPress={() => navigate('Steps')}>Começar</Button>
        </LetsGo>
      </Container>
    </ScrollView>
  );
};

export default Welcome;
