import React, { useCallback, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  ProfilePhotoContainer,
  Name,
  NoProfilePhoto,
  ProfilePhoto,
  Icon,
  ButtonLogout,
  ButtonText,
  ButtonUpdate,
} from './styles';
import { themes } from '../../themes';
import storage from '../../config/storage';
import { api } from '../../services/api';
import { uploadImage } from '../../utils/uploadImage';

const Profile: React.FC = () => {
  const { navigate } = useNavigation();
  const { signOut, user, token, setUser } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleUploadPhoto = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.cancelled) {
      const { uri } = result;
      const fileName = uri.substring(uri.lastIndexOf('/') + 1);

      const blob = await uploadImage(uri);

      const storageRef = storage.ref().child('uploads').child(fileName);

      try {
        setLoading(true);
        const snapshot = await storageRef.put(blob);

        const avatar_url = await snapshot.ref.getDownloadURL();

        const { data } = await api.patch(`/users/${user.id}/avatar`, {
          avatar_url,
        });

        setUser({
          token,
          user: data,
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }, [user.id, setUser, token]);

  return (
    <Container>
      <ProfilePhotoContainer onPress={handleUploadPhoto}>
        <Icon>
          <Feather name="camera" color={themes.colors.primary} size={18} />
        </Icon>
        {loading ? (
          <ActivityIndicator color={themes.colors.primary} size="large" />
        ) : user.avatar_url ? (
          <ProfilePhoto source={{ uri: user.avatar_url }} />
        ) : (
          <NoProfilePhoto>
            <Name>{user.name[0]}</Name>
          </NoProfilePhoto>
        )}
      </ProfilePhotoContainer>

      <ButtonUpdate onPress={() => navigate('UpdateProfile')}>
        <ButtonText>Atualizar perfil</ButtonText>
      </ButtonUpdate>

      <ButtonLogout onPress={signOut}>
        <ButtonText>Sair</ButtonText>
      </ButtonLogout>
    </Container>
  );
};

export default Profile;
