import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { api } from '../../services/api';
import NextDriverCard from '../Dashboard/NextDriversCard';
import { IJob } from '../Dashboard/NextDriversList';
import { Container, Content, Title, List, NoCategoryContainer } from './styles';
import NoCategoryData from './NoCategoryData';
import Button from '../../components/Button';

interface IRouteParams {
  searchName: string;
  name: string;
}

const Category: React.FC = () => {
  const { token } = useAuth();
  const { navigate } = useNavigation();

  const route = useRoute();
  const params = route.params as IRouteParams;

  const [jobs, setJobs] = useState<IJob[]>([]);

  useEffect(() => {
    async function loadJobs(): Promise<void> {
      const { data } = await api.get('/categories/jobs', {
        params: {
          categories: [params.searchName],
        },
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setJobs(data);
    }

    loadJobs();
  }, [params.searchName, token]);

  return (
    <Container>
      <Content>
        <List
          ListHeaderComponent={
            jobs.length ? (
              <Title>{`Resultados para categoria ${params.name}`}</Title>
            ) : (
              <View />
            )
          }
          ListEmptyComponent={() => (
            <NoCategoryContainer>
              <View style={{ alignItems: 'center' }}>
                <NoCategoryData />
              </View>
              <Title>Essa categoria ainda não possui serviços.</Title>
              <Button onPress={() => navigate('Home')}>Voltar</Button>
            </NoCategoryContainer>
          )}
          showsVerticalScrollIndicator={false}
          data={jobs}
          keyExtractor={job => job.id}
          renderItem={({ item: job }) => <NextDriverCard isSearch job={job} />}
        />
      </Content>
    </Container>
  );
};

export default Category;
