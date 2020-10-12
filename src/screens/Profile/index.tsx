import React from 'react';
import { Button } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { themes } from '../../themes';
import { Container, Title } from './styles';

const Profile: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Title>Profile</Title>
      <Button onPress={signOut} title="Logout" color={themes.colors.primary} />
    </Container>
  );
};

export default Profile;
