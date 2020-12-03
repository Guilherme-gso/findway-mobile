import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useAuth } from '../../../hooks/auth';
import { api } from '../../../services/api';
import { themes } from '../../../themes';
import { IJob } from '../../Dashboard/NextDriversList';
import {
  List,
  InputContainer,
  Input,
  Icon,
  AutocompleteContainer,
  SuggestionsTitle,
  AutocompleteButton,
} from './styles';

export interface ISuggestion {
  id: string;
  title: string;
}

const Autocomplete: React.FC = () => {
  const { token } = useAuth();
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

  const format = useCallback((text: string): string => {
    if (!text) return '';

    return text
      .normalize('NFD')
      .replace(/[^a-aZ-Zs]/g, '')
      .toLowerCase();
  }, []);

  const onChangeText = useCallback(
    async (text: string) => {
      const results: IJob[] = [];

      if (!results.length) {
        setSuggestions([]);
        return;
      }

      const { data } = await api.get<IJob[]>('/jobs', {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      data.filter(job => {
        if (format(job.title).indexOf(format(text)) > -1) {
          results.push(job);
        }
      });

      setSuggestions(
        results.filter(
          (suggestion, index, self) =>
            index ===
            self.findIndex(
              s => s.title === suggestion.title && s.title === suggestion.title
            )
        )
      );
    },
    [format, token]
  );

  return (
    <>
      <View style={{ padding: 20 }}>
        <InputContainer>
          <Icon name="search" color={themes.colors.primary} size={20} />
          <Input
            placeholder="Pesquisar"
            placeholderTextColor={themes.colors.light}
            onChangeText={value => onChangeText(value)}
          />
        </InputContainer>
      </View>
      <List
        data={suggestions}
        keyExtractor={item => item.id}
        renderItem={({ item: suggestion }) => (
          <AutocompleteContainer>
            <AutocompleteButton>
              <Icon name="shuffle" color={themes.colors.light} />
              <SuggestionsTitle numberOfLines={1}>
                {suggestion.title}
              </SuggestionsTitle>
            </AutocompleteButton>
          </AutocompleteContainer>
        )}
      />
    </>
  );
};

export default Autocomplete;
