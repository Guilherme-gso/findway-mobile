import React from 'react';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Logo,
  UserAvatar,
  NoProfilePhoto,
  NoProfilePhotoText,
} from './styles';
import logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const { user } = useAuth();
  const { navigate } = useNavigation();

  return (
    <Container>
      <Logo source={logo} />

      <TouchableOpacity onPress={() => navigate('Profile')}>
        {user.avatar_url ? (
          <UserAvatar source={{ uri: user.avatar_url }} />
        ) : (
          <NoProfilePhoto>
            <NoProfilePhotoText>{user.name[0]}</NoProfilePhotoText>
          </NoProfilePhoto>
        )}
      </TouchableOpacity>
    </Container>
  );
};

export default Header;
