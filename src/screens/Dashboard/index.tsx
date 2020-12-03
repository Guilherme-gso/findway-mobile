/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, RefreshControl, View } from 'react-native';
import * as Location from 'expo-location';
import { FlatList } from 'react-native-gesture-handler';

import Header from '../../components/Header';
import { api } from '../../services/api';
import CategoriesList from './CategoriesList';
import NextDriversList, { IJob } from './NextDriversList';
import { Container } from './styles';
import { useAuth } from '../../hooks/auth';
import { themes } from '../../themes';

interface IRender {
  key: string;
  render(): JSX.Element;
}

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadNextJobs = useCallback(
    async (latitude: number, longitude: number) => {
      const { data } = await api.get('next/jobs', {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          latitude,
          longitude,
        },
      });

      setJobs(data);
    },
    [token]
  );

  const loadJobs = useCallback(async () => {
    const { data } = await api.get('/jobs', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    setJobs(data);
  }, [token]);

  useEffect(() => {
    async function loadPosition(): Promise<void> {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setLocation(false);
        loadJobs();
        setLoading(false);
        return;
      }

      setLocation(true);

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      loadNextJobs(latitude, longitude);
      setLoading(false);

    }

    loadPosition();
  }, [loadJobs, loadNextJobs]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    if (location) {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();

      loadNextJobs(latitude, longitude);
    } else {
      loadJobs();
    }

    setRefreshing(false);
  }, [loadJobs, loadNextJobs, location]);

  const data = useMemo(() => {
    const components: IRender[] = [
      {
        key: 'CATEGORIES_LIST',
        render: () => <CategoriesList />,
      },
      {
        key: 'JOBS_LIST',
        render: () => <NextDriversList location={location} jobs={jobs} />,
      },
    ];

    return components;
  }, [jobs, location]);

  return (
    <Container>
      <Header />
      {loading ? (
        <View style={{ flex: 1, alignItems: 'center',justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={themes.colors.primary} />
        </View>
     ) : (
       <FlatList
         refreshControl={(
           <RefreshControl
             progressBackgroundColor={themes.colors.secondary}
             colors={[themes.colors.primary, themes.colors.secondary]}
             refreshing={refreshing}
             onRefresh={onRefresh}
           />
        )}
         showsVerticalScrollIndicator={false}
         keyExtractor={item => item.key}
         data={data}
         renderItem={({ item }) => item.render()}
       />
     )}
    </Container>
  );
};

export default Dashboard;
