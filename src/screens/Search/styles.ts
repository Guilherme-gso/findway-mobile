import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { themes } from '../../themes';
import { IJob } from '../Dashboard/NextDriversList';

interface ICardProps {
  isActive: boolean;
}

export const Container = styled.View`
  background: ${themes.colors.background};
  flex: 1;
`;

export const SearchArea = styled.View`
  flex-direction: row;
  flex: 1;
  align-items: center;
  background: ${themes.colors.secondary};
  padding: 12px;
  border-radius: 4px;
  margin-right: 5px;
`;

export const FilterButton = styled.TouchableOpacity`
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  background: ${themes.colors.secondary};
  border-radius: 4px;
`;

export const InputContainer = styled.View`
  height: 45px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 4px;

  margin: 20px 12px 10px;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${themes.colors.light};
`;

export const Icon = styled(Feather)`
  margin-right: 12px;
`;

export const Title = styled.Text`
  font-size: 22px;
  font-family: ${themes.fonts.light};
  color: ${themes.colors.light};
`;

export const List = styled(FlatList as new () => FlatList<IJob>)`
  flex: 1;
  padding: 10px 12px;
`;

export const Resource = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const ModalContent = styled.View`
  background: ${themes.colors.secondary};
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  height: 100%;
  margin-top: auto;
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
`;

export const CloseButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const ClearFilter = styled.Text`
  font-size: 14px;
  text-transform: uppercase;
  font-family: ${themes.fonts.light};
  color: ${themes.colors.light};
`;

export const ModalBody = styled.View`
  margin-top: 12px;
`;

export const Section = styled.View`
  padding: 0 20px;
`;

export const Label = styled.Text`
  font-size: 16px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.regular};
  margin: 12px 0 4px; ;
`;

export const CategoryCardText = styled.Text<ICardProps>`
  font-size: 12px;
  color: ${props =>
    props.isActive ? themes.colors.secondary : themes.colors.light};
  font-family: ${themes.fonts.regular};
`;

export const CategoryCard = styled.TouchableOpacity<ICardProps>`
  padding: 8px;
  background: ${props =>
    props.isActive ? themes.colors.primary : themes.colors.background};
  margin-right: 6px;
  border-radius: 4px;
`;

export const Vacancies = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

export const VacancyInput = styled.TextInput`
  flex: 1;
  margin-right: 12px;
  height: 40px;
  background: ${themes.colors.background};
  font-size: 16px;
  color: ${themes.colors.light};
  padding: 0 12px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${themes.colors.primary};
`;

export const Button = styled.TouchableOpacity`
  height: 50px;
  background: ${themes.colors.primary};

  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 4px;
  margin: 30px 0;
`;

export const ButtonText = styled.Text`
  font-size: 22px;
  color: ${themes.colors.secondary};
  font-family: ${themes.fonts.medium};
`;
