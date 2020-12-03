import { Feather } from '@expo/vector-icons';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import produce from 'immer';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import storage from '../../../config/storage';
import { themes } from '../../../themes';
import { uploadImage } from '../../../utils/uploadImage';
import {
  Container,
  ProgressStatus,
  ProgressStatusText,
  Title,
  Header,
  Section,
  Dropzone,
  Label,
  Preview,
  Form,
  CategoryCard,
  TopHeader,
} from './styles';
import { getValidationErrors } from '../../../utils/getValidationErrors';
import { api } from '../../../services/api';
import { useAuth } from '../../../hooks/auth';
import { categories, ICategory } from '../../Dashboard/CategoriesList';
import { CategoryCardText } from '../../Search/styles';

const RegisterJob: React.FC = () => {
  const { navigate } = useNavigation();
  const [currentStep, setCurrentStep] = useState(1);

  const progressText = useMemo(() => {
    const steps: { [key: number]: string } = {
      1: '50%',
      2: '100%',
    };

    return steps[currentStep];
  }, [currentStep]);

  const progressTitle = useMemo(() => {
    const steps: { [key: number]: string } = {
      1: 'Upload de imagem',
      2: 'Informe os dados do serviço.',
    };

    return steps[currentStep];
  }, [currentStep]);

  const progressForm = useMemo(() => {
    const steps: { [key: number]: JSX.Element } = {
      1: <FormUri toggleStep={() => setCurrentStep(prev => prev + 1)} />,
      2: <FormService />,
    };

    return steps[currentStep];
  }, [currentStep]);

  const handleStep = useCallback(() => {
    if (currentStep === 1) {
      navigate('Home');
      return;
    }

    setCurrentStep(prev => prev - 1);
  }, [navigate, currentStep]);

  return (
    <Container>
      <TopHeader>
        <TouchableOpacity onPress={handleStep}>
          <Feather name="arrow-left" size={20} color={themes.colors.light} />
        </TouchableOpacity>
      </TopHeader>
      <Header>
        <ProgressStatus currentStep={currentStep}>
          <ProgressStatusText>{progressText}</ProgressStatusText>
        </ProgressStatus>

        <Title>{progressTitle}</Title>
      </Header>

      {progressForm}
    </Container>
  );
};

const FormUri: React.FC<{ toggleStep(): void }> = ({ toggleStep }) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('job_image').then(response =>
      setImageUrl(response || '')
    );
  }, []);

  const handleUploadPhoto = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      setUploadLoading(true);
      const { uri } = result;
      const fileName = uri.substring(uri.lastIndexOf('/') + 1);
      const blob = await uploadImage(uri);
      const storageRef = storage.ref().child('uploads').child(fileName);
      const snapshot = await storageRef.put(blob);
      const url = await snapshot.ref.getDownloadURL();

      await AsyncStorage.setItem('job_image', url);

      setImageUrl(url);
      setUploadLoading(false);
    }
  }, []);

  return (
    <View>
      <Section>
        <Label>Escolha uma imagem para o seu serviço</Label>
        <Dropzone onPress={handleUploadPhoto}>
          {uploadLoading ? (
            <ActivityIndicator size="large" color={themes.colors.primary} />
          ) : imageUrl ? (
            <Preview source={{ uri: imageUrl }} />
          ) : (
            <Feather name="upload" size={30} color={themes.colors.primary} />
          )}
        </Dropzone>
      </Section>

      {imageUrl ? (
        <Section>
          <Button onPress={toggleStep}>Continuar</Button>
        </Section>
      ) : null}
    </View>
  );
};

const FormService: React.FC = () => {
  const { user } = useAuth();
  const { reset } = useNavigation();
  const { token } = useAuth();
  const ref = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);

  useEffect(() => {
    async function loadLocation(): Promise<void> {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        return;
      }

      const position = await Location.getCurrentPositionAsync();
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    loadLocation();
  }, []);

  const selectCategory = useCallback(
    (category: ICategory) => {
      const categoryIndex = selectedCategories.findIndex(
        index => index === category
      );

      if (categoryIndex > -1) {
        const updatedCategories = produce(selectedCategories, draft => {
          draft.splice(categoryIndex, 1);
        });
        setSelectedCategories(updatedCategories);
        return;
      }

      const updatedCategories = produce(selectedCategories, draft => {
        draft.push(category);
      });

      setSelectedCategories(updatedCategories);
    },
    [selectedCategories]
  );

  const submitForm = useCallback(() => ref.current?.submitForm(), []);

  const handleSubmit = useCallback(
    async data => {
      try {
        setLoading(true);
        ref.current?.setErrors({});

        const schema = Yup.object().shape({
          title: Yup.string().required(),
          description: Yup.string().required(),
          vacancies: Yup.number().required(),
        });

        await schema.validate(data, { abortEarly: false });

        const image = await AsyncStorage.getItem('job_image');

        await api.post(
          'jobs',
          {
            ...data,
            uri: image,
            driver_id: user.driver_id,
            latitude: location.latitude,
            longitude: location.longitude,
            categories: selectedCategories.map(c => c.searchName),
          },
          { headers: { authorization: `Bearer ${token}` } }
        );

        await AsyncStorage.removeItem('job_image');

        reset({
          routes: [{ name: 'Home' }],
          index: 0,
        });

        Alert.alert('Novo serviço criado com sucesso!');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          ref.current?.setErrors(errors);
          return;
        }

        Alert.alert(
          'Ocorreu um erro ao cadastrar seu serviço, tente novamente'
        );
      } finally {
        setLoading(false);
      }
    },
    [token, reset, user.driver_id, location, selectedCategories]
  );

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Form ref={ref} onSubmit={handleSubmit}>
          <Section>
            <Input
              name="title"
              placeholder="Nome do seu serviço"
              placeholderTextColor={themes.colors.light}
            />
            <Input
              name="description"
              placeholder="Descrição para o seu serviço"
              placeholderTextColor={themes.colors.light}
            />
            <Input
              name="vacancies"
              placeholder="Quantidade de vagas"
              keyboardType="numeric"
              maxLength={2}
              placeholderTextColor={themes.colors.light}
            />
          </Section>

          <Label>Selecione a(s) categoria(s)</Label>

          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 20,
            }}
            showsHorizontalScrollIndicator={false}
            horizontal
          >
            {categories.map(category => (
              <CategoryCard
                onPress={() => selectCategory(category)}
                isActive={selectedCategories.includes(category)}
                key={category.name}
              >
                <CategoryCardText
                  isActive={selectedCategories.includes(category)}
                >
                  {category.name}
                </CategoryCardText>
              </CategoryCard>
            ))}
          </ScrollView>

          <Section>
            <Button onPress={submitForm}>
              {loading ? 'Carregando...' : 'Cadastrar'}
            </Button>
          </Section>
        </Form>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterJob;
