import React from 'react';

import { Title, List } from './styles';
import NextDriverCard from '../NextDriversCard';

export interface IJob {
  id: string;
  title: string;
  uri: string;
  description: string;
  vacancies: string;
  latitude: string;
  longitude: string;
  driver_id: string;
  categories: string[];
}

interface INextDriverListProps {
  jobs: IJob[];
  location: boolean;
}

const NextDriversList: React.FC<INextDriverListProps> = ({
  jobs,
  location,
}) => {
  return (
    <List
      ListHeaderComponent={
        <Title>{location ? 'Próximos de você' : 'Todos os Serviços'}</Title>
      }
      showsVerticalScrollIndicator={false}
      data={jobs}
      keyExtractor={job => job.id}
      renderItem={({ item: job }) => (
        <NextDriverCard isSearch={false} job={job} />
      )}
    />
  );
};

export default NextDriversList;
