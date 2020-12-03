import React, { useCallback, useRef, useState } from 'react';
import * as Yup from 'yup';
import { Alert, View } from 'react-native';
import { FormHandles } from '@unform/core';
import { Switch } from 'react-native-gesture-handler';
import { darken, shade } from 'polished';
import {
  Form,
  Button,
  ButtonText,
  Footer,
  Section,
  Title,
  PeopleOption,
  PeopleOptionText,
  Subtitle,
} from './styles';
import Input from '../../Input';
import { api } from '../../../services/api';
import { getValidationErrors } from '../../../utils/getValidationErrors';
import { useRegisterDriver } from '../../../screens/Driver/hooks';
import { themes } from '../../../themes';
import { ICompany } from '../../../screens/Driver/hooks/types';
import { useAuth } from '../../../hooks/auth';

const FormCompany: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { setUser } = useAuth();
  const { user } = useRegisterDriver();

  const [loading, setLoading] = useState(false);
  const [legalPerson, setLegalPerson] = useState(false);
  const [normalPerson, setNormalPerson] = useState(false);

  const handleSubmit = useCallback(
    async (data: ICompany) => {
      try {
        setLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          company: Yup.string().required('Nome da empresa obrigatório'),
          city: Yup.string().required('Nome da cidade obrigatório'),
          phone: Yup.string().required('Telefone obrigatório'),
        });

        await schema.validate(data, { abortEarly: false });

        const { data: requestData } = await api.post('/drivers', {
          ...data,
          uf: 'sp',
          user_id: user.id,
        });

        setUser({
          token: requestData.token,
          user: {
            ...requestData.user,
            driver_id: requestData.driver.id,
          },
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Houve um erro ao criar sua conta!',
          'Os dados fornecidos já estão em uso por outro usúario'
        );
      } finally {
        setLoading(false);
      }
    },
    [setUser, user.id]
  );

  const submitForm = useCallback(() => {
    formRef.current?.submitForm();
  }, []);

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <View
        style={{
          marginBottom: 10,
          backgroundColor: themes.colors.secondary,
          borderRadius: 8,
          padding: 10,
        }}
      >
        <Section>
          <Title>Pessoa física ou jurídica?</Title>

          <PeopleOption>
            <PeopleOptionText>Pessoa física</PeopleOptionText>
            <Switch
              thumbColor={themes.colors.primary}
              trackColor={{
                false: shade(0.6, themes.colors.light),
                true: darken(0.2, themes.colors.primary),
              }}
              enabled={normalPerson}
              value={normalPerson}
              onValueChange={value => {
                setNormalPerson(value);
                setLegalPerson(!value);
              }}
            />
          </PeopleOption>

          <PeopleOption>
            <PeopleOptionText>Pessoa jurídica</PeopleOptionText>
            <Switch
              thumbColor={themes.colors.primary}
              trackColor={{
                false: shade(0.6, themes.colors.light),
                true: darken(0.2, themes.colors.primary),
              }}
              enabled={legalPerson}
              value={legalPerson}
              onValueChange={value => {
                setLegalPerson(value);
                setNormalPerson(!value);
              }}
            />
          </PeopleOption>
        </Section>
      </View>

      {legalPerson && (
        <Section>
          <Subtitle>Informe o nome da sua companhia/empresa</Subtitle>
          <Input icon="user" name="company" placeholder="Nome" />

          <Subtitle>Cidade</Subtitle>
          <Input icon="home" name="city" placeholder="Cidade" />

          <Subtitle>Informe o cnpj da sua empresa</Subtitle>
          <Input
            keyboardType="numeric"
            icon="list"
            name="cnpj"
            placeholder="Cnpj"
          />

          <Subtitle>Número de telefone</Subtitle>
          <Input
            keyboardType="numeric"
            icon="phone"
            name="phone"
            placeholder="Telefone"
          />
        </Section>
      )}

      {normalPerson && (
        <Section>
          <Subtitle>Informe o nome da sua companhia/empresa</Subtitle>
          <Input icon="user" name="company" placeholder="Nome" />

          <Subtitle>Cidade</Subtitle>
          <Input icon="home" name="city" placeholder="Cidade" />

          <Subtitle>Informe seu cpf</Subtitle>
          <Input
            keyboardType="numeric"
            icon="list"
            name="cpf"
            placeholder="Cpf"
          />

          <Subtitle>Informe seu WhatsApp</Subtitle>
          <Input
            keyboardType="numeric"
            icon="phone"
            name="phone"
            placeholder="WhatsApp"
          />
        </Section>
      )}

      <Footer>
        <Button onPress={submitForm}>
          <ButtonText>{loading ? 'Carregando...' : 'Cadastrar'}</ButtonText>
        </Button>
      </Footer>
    </Form>
  );
};

export default FormCompany;
