import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { CategoryCard, CategoryCardText, List, Title } from './styles';

export interface ICategory {
  name: string;
  icon: string;
  searchName: string;
}

export const categories: ICategory[] = [
  {
    name: 'Ensino fundamental',
    icon: '',
    searchName: 'elemantary_school',
  },
  {
    name: 'Ensino médio',
    icon: '',
    searchName: 'high_school',
  },
  {
    name: 'Ensino infantil',
    icon: '',
    searchName: 'pre_school',
  },
  {
    name: 'Faculdade',
    icon: '',
    searchName: 'college',
  },
  {
    name: 'Particular',
    icon: '',
    searchName: 'private',
  },
  {
    name: 'Livre',
    icon: '',
    searchName: 'free',
  },
];

const CategoriesList: React.FC = () => {
  const { navigate } = useNavigation();

  const navigateToCategory = useCallback(
    (searchName: string, name: string) => {
      navigate('Category', {
        searchName,
        name,
      });
    },
    [navigate]
  );

  return (
    <View>
      <Title>Categorias</Title>
      <List
        data={categories}
        keyExtractor={category => category.name}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item: category }) => (
          <CategoryCard
            onPress={() => {
              navigateToCategory(category.searchName, category.name);
            }}
          >
            <CategoryCardText>{category.name}</CategoryCardText>
          </CategoryCard>
        )}
      />
    </View>
  );
};

export default CategoriesList;
