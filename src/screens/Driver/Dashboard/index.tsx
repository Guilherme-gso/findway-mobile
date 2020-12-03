import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Header from '../../../components/Header';
import { useAuth } from '../../../hooks/auth';
import { api } from '../../../services/api';
import { themes } from '../../../themes';
import NextDriverCard from '../../Dashboard/NextDriversCard';
import { IJob } from '../../Dashboard/NextDriversList';
import { Title } from '../../Dashboard/NextDriversList/styles';
import { Container, List, HeaderList, PlusButton } from './styles';

const Dashboard: React.FC = () => {
  const { navigate } = useNavigation();
  const { user, token } = useAuth();
  const [jobs, setJobs] = useState<IJob[]>([]);

  useEffect(() => {
    async function loadJobs(): Promise<void> {
      const { data } = await api.get(`drivers/${user.id}/user/jobs`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setJobs(data);
    }

    loadJobs();
  }, [user.id, token]);

  return (
    <>
      <Container>
        <Header />

        <List
          ListHeaderComponent={() => (
            <HeaderList>
              <Title>Serviços cadastrados</Title>
            </HeaderList>
          )}
          ListFooterComponent={<View />}
          ListFooterComponentStyle={{ height: 80 }}
          keyExtractor={job => job.id}
          data={jobs}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: job }) => (
            <NextDriverCard isDriver isSearch={false} job={job} />
          )}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 15,
            right: 0,
            left: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <PlusButton onPress={() => navigate('RegisterJob')}>
            <Feather name="plus" size={30} color={themes.colors.secondary} />
          </PlusButton>
        </View>
      </Container>
    </>
  );
};

export default Dashboard;
