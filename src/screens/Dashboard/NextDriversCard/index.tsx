import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { themes } from '../../../themes';
import { IJob } from '../NextDriversList';
import {
  Container,
  Data,
  Title,
  Description,
  Button,
  ButtonText,
  IconContainer,
} from './styles';

interface IProps {
  job: IJob;
  isSearch: boolean;
  isDriver?: boolean;
}

const NextDriverCard: React.FC<IProps> = ({ job, isSearch }) => {
  const { navigate } = useNavigation();

  return (
    <Container
      onPress={() =>
        navigate('Job', {
          id: job.id,
        })}
    >
      {isSearch && (
        <IconContainer>
          <Feather name="tag" size={20} color={themes.colors.primary} />
        </IconContainer>
      )}
      <Data>
        <Title numberOfLines={1}>{job.title}</Title>
        <Description numberOfLines={2}>{job.description}</Description>
        {!isSearch && (
          <Button>
            <ButtonText>Ver detalhes</ButtonText>
          </Button>
        )}
      </Data>
    </Container>
  );
};

export default NextDriverCard;
