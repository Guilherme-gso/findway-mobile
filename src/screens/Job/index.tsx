import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Alert, View, Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import { api } from '../../services/api';
import { IJob } from '../Dashboard/NextDriversList';
import { IUser, useAuth } from '../../hooks/auth';
import {
  Container,
  CompanyHeader,
  Image,
  CompanyName,
  MessageButton,
  CompanyContent,
  Section,
  Label,
  Description,
  Card,
  CardImageContainer,
  CardImage,
  Data,
  DriverName,
  DriverPhone,
  MessageButtonText,
} from './styles';
import logo from '../../assets/logo.png';
import { themes } from '../../themes';

interface RouteParams {
  id: string;
}

interface IDriver {
  id: string;
  company: string;
  city: string;
  phone: string;
  user: IUser;
}

interface Job extends IJob {
  driver: IDriver;
}

const Job: React.FC = () => {
  const { token, user } = useAuth();
  const { navigate } = useNavigation();
  const { params } = useRoute();
  const [loading, setLoading] = useState(true);
  const { id } = params as RouteParams;
  const [job, setJob] = useState<Job>({} as Job);

  useEffect(() => {
    async function loadJob(): Promise<void> {
      try {
        const { data } = await api.get<Job>(`jobs/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        setJob(data);
      } catch (err) {
        Alert.alert('Erro ao carregar o serviço');
      } finally {
        setLoading(false);
      }
    }

    loadJob();
  }, [id, token]);

  const oppenWhatsapp = useCallback(() => {
    const message = `Olá estou interessado nos serviços da sua empresa, ${job.driver?.company} no aplicativo findway!`;
    Linking.openURL(
      `whatsapp://send?phone=${job.driver?.phone}&text=${message}`
    );
  }, [job.driver?.company, job.driver?.phone]);

  const oppenEmail = useCallback(() => {
    const message = `Olá ${job.driver?.user.name}, estou interessado nos serviços da sua empresa, ${job.driver?.company}, no aplicativo Findway!`;

    MailComposer.composeAsync({
      subject: `Serviço: ${job.title}`,
      recipients: [job.driver?.user.email],
      body: message,
    });
  }, [
    job.driver?.user.name,
    job.title,
    job.driver?.user.email,
    job.driver?.company,
  ]);

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: themes.colors.background,
        flex: 1,
      }}
    >
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={themes.colors.primary} />
        </View>
      ) : (
        <Container>
          <CompanyHeader>
            <View style={{ alignItems: 'center' }}>
              <Image source={job.uri ? { uri: job.uri } : logo} />
              <CompanyName>{job.driver?.company}</CompanyName>
            </View>
          </CompanyHeader>

          <CompanyContent>
            <Section>
              <Label>Detalhes</Label>
              <Description>{job.description}</Description>
            </Section>

            <Section>
              <Label>Informações do motorista</Label>

              <Card>
                <CardImageContainer>
                  <CardImage source={{ uri: job.driver.user?.avatar_url }} />
                </CardImageContainer>

                <Data>
                  <DriverName>{`Nome: ${job.driver?.user.name}`}</DriverName>
                  <DriverPhone>{`Telefone: ${job.driver?.phone}`}</DriverPhone>
                </Data>
              </Card>
            </Section>

            <Section>
              <MessageButton variant="whatsapp" onPress={oppenWhatsapp}>
                <MessageButtonText>
                  Entrar em contato pelo whatsapp
                </MessageButtonText>
              </MessageButton>

              <MessageButton variant="mail" onPress={oppenEmail}>
                <MessageButtonText>
                  Entrar em contato via email
                </MessageButtonText>
              </MessageButton>
            </Section>
          </CompanyContent>
        </Container>
      )}
    </ScrollView>
  );
};

export default Job;
