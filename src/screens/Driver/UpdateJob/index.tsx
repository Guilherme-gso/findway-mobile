import React, { useCallback, useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useAuth } from '../../../hooks/auth';
import {
  Container,
  ProfilePhotoContainer,
  ProfilePhoto,
  Icon,
  ButtonLogout,
  ButtonText,
  Title,
  Description,
} from './styles';
import { themes } from '../../../themes';
import storage from '../../../config/storage';
import { api } from '../../../services/api';
import { uploadImage } from '../../../utils/uploadImage';
import { IJob } from '../../Dashboard/NextDriversList';
import { IUser } from '../hooks/types';
import logo from '../../../assets/logo.png';

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

const UpdateJob: React.FC = () => {
  const { params } = useRoute();
  const { id } = params as { id: string };
  const { reset } = useNavigation();
  const { token } = useAuth();

  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [job, setJob] = useState<Job>({} as Job);

  useEffect(() => {
    async function loadJob(): Promise<void> {
      setLoading(true);
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

        const url = await snapshot.ref.getDownloadURL();

        const { data } = await api.put(
          `/jobs/${id}/update`,
          {
            ...job,
            uri: url,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setJob(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }, [id, token, job]);

  const handleDelete = useCallback(async () => {
    setLoadingDelete(true);
    try {
      await api.delete(
        `/jobs/${id}/delete`,

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert('Serviço excluído com sucesso!');

      reset({
        routes: [{ name: 'Home' }],
        index: 0,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingDelete(false);
    }
  }, [id, token, reset]);

  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        backgroundColor: themes.colors.background,
      }}
      enabled
      behavior={Platform.OS === 'android' ? undefined : 'padding'}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Container>
          <ProfilePhotoContainer onPress={handleUploadPhoto}>
            <Icon>
              <Feather name="camera" color={themes.colors.primary} size={18} />
            </Icon>
            {loading ? (
              <ActivityIndicator color={themes.colors.primary} size="large" />
            ) : job.uri ? (
              <ProfilePhoto source={{ uri: job.uri }} />
            ) : (
              <ProfilePhoto source={logo} />
            )}
          </ProfilePhotoContainer>

          <View style={{ alignItems: 'center', paddingHorizontal: 20 }}>
            <Title>{job.driver?.company}</Title>
            <Description>{job.description}</Description>
          </View>

          <ButtonLogout onPress={handleDelete}>
            <ButtonText>
              {loadingDelete ? 'Carregando...' : 'Excluir'}
            </ButtonText>
          </ButtonLogout>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateJob;
