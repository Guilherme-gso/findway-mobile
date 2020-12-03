import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator, Alert, Modal } from 'react-native';
import produce from 'immer';
import {
  Container,
  InputContainer,
  Input,
  Icon,
  FilterButton,
  SearchArea,
  List,
  Resource,
  Title,
  ModalContent,
  ModalHeader,
  CloseButton,
  ClearFilter,
  ModalBody,
  Section,
  Label,
  CategoryCard,
  CategoryCardText,
  Vacancies,
  VacancyInput,
  Button,
  ButtonText,
} from './styles';
import { themes } from '../../themes';
import { IJob } from '../Dashboard/NextDriversList';
import { api } from '../../services/api';
import { useAuth } from '../../hooks/auth';
import NextDriverCard from '../Dashboard/NextDriversCard';
import { categories, ICategory } from '../Dashboard/CategoriesList';
import { Data } from '../Dashboard/NextDriversCard/styles';

export interface IItem {
  key: string;
  render(): JSX.Element;
}

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [results, setResults] = useState<IJob[]>([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>([]);
  const [minVacancies, setMinVacancies] = useState('');
  const [maxVacancies, setMaxVacancies] = useState('');

  useEffect(() => {
    async function getResults(): Promise<void> {
      if (filter) {
        setLoading(true);
        const { data } = await api.get('/filter/jobs/suggestions', {
          headers: {
            authorization: `Bearer ${token}`,
          },

          params: {
            filter,
          },
        });

        setResults(data);
        setLoading(false);
        return;
      }

      setTimeout(() => {
        return setResults([]);
      }, 650);
    }

    getResults();
  }, [filter, token]);

  const toggleModal = useCallback(() => {
    setVisible(prev => !prev);
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

  const handleFilter = useCallback(async () => {
    setLoading(true);

    try {
      const { data } = await api.post(
        '/filter/jobs',
        {
          categories: selectedCategories.map(c => c.searchName),
          max_vacancies: Number(maxVacancies),
          min_vacancies: Number(minVacancies),
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      setResults(data);
      toggleModal();
    } catch (error) {
      console.log(error);
      Alert.alert('Houve um erro ao filtrar os serviços, tente novamente');
    } finally {
      setLoading(false);
    }
  }, [selectedCategories, token, minVacancies, maxVacancies, toggleModal]);

  const clearFilters = useCallback(() => {
    setMinVacancies('');
    setMaxVacancies('');
    setSelectedCategories([]);
  }, []);

  return (
    <>
      <Container>
        <InputContainer>
          <SearchArea>
            <Icon name="search" color={themes.colors.primary} size={20} />
            <Input
              placeholder="Pesquisar"
              placeholderTextColor={themes.colors.light}
              value={filter}
              onChangeText={value => setFilter(value)}
            />

            {filter ? (
              <TouchableOpacity onPress={() => setFilter('')}>
                <Icon name="x" size={18} color={themes.colors.light} />
              </TouchableOpacity>
            ) : null}
          </SearchArea>

          <FilterButton onPress={toggleModal}>
            <Feather name="filter" size={18} color={themes.colors.light} />
          </FilterButton>
        </InputContainer>

        {loading ? (
          <Resource>
            <ActivityIndicator size="large" color={themes.colors.primary} />
          </Resource>
        ) : (
          <List
            ListEmptyComponent={() => {
              return filter ? (
                <Resource>
                  <Title>Nenhum resultado encontrado.</Title>
                </Resource>
              ) : null;
            }}
            keyExtractor={job => job.id}
            data={results}
            renderItem={({ item: job }) => (
              <NextDriverCard isSearch job={job} />
            )}
          />
        )}
      </Container>

      <Modal animationType="slide" visible={visible} transparent>
        <ModalContent>
          <ModalHeader>
            <CloseButton onPress={toggleModal}>
              <Feather name="x" color={themes.colors.light} size={20} />
            </CloseButton>
            <Title>Filtrar</Title>
            <CloseButton onPress={clearFilters}>
              <ClearFilter>Limpar</ClearFilter>
            </CloseButton>
          </ModalHeader>

          <ModalBody>
            <Section>
              <Label>Quantidade de vagas</Label>
              <Vacancies>
                <VacancyInput
                  placeholder="Mínimo"
                  placeholderTextColor={themes.colors.light}
                  keyboardType="numeric"
                  value={minVacancies}
                  onChangeText={value => setMinVacancies(value)}
                />
                <VacancyInput
                  placeholder="Máximo"
                  placeholderTextColor={themes.colors.light}
                  keyboardType="numeric"
                  value={maxVacancies}
                  onChangeText={value => setMaxVacancies(value)}
                />
              </Vacancies>
            </Section>

            <Section>
              <Label>Categorias</Label>
            </Section>
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
              <Button onPress={handleFilter}>
                <ButtonText>{loading ? 'Carregando...' : 'Filtrar'}</ButtonText>
              </Button>
            </Section>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Dashboard;
