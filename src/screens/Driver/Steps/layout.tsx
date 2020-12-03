import React, { useMemo } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRegisterDriver } from '../hooks';
import {
  Container,
  Header,
  ProgressStatus,
  ProgressText,
  ProgressStatusText,
  Content,
} from './styles';

import FormUser from '../../../components/Driver/FormUser';
import { themes } from '../../../themes';
import FormCompany from '../../../components/Driver/FormCompany';

interface IStatusText {
  [key: number]: string;
}

interface IFormRender {
  [key: number]: JSX.Element;
}

const Steps: React.FC = () => {
  const { currentStep } = useRegisterDriver();

  const progressStatusText = useMemo(() => {
    const steps: IStatusText = {
      1: '50%',
      2: '100%',
    };

    return steps[currentStep];
  }, [currentStep]);

  const progressText = useMemo(() => {
    const steps: IStatusText = {
      1: 'Informações do usuário',
      2: 'Informações da empresa',
    };

    return steps[currentStep];
  }, [currentStep]);

  const renderForm = useMemo(() => {
    const forms: IFormRender = {
      1: <FormUser />,
      2: <FormCompany />,
    };

    return forms[currentStep];
  }, [currentStep]);

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS !== 'android'}
      behavior={Platform.OS === 'android' ? undefined : 'padding'}
      style={{ flex: 1, backgroundColor: themes.colors.background }}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <Container>
          <Header>
            <ProgressStatus currentStep={currentStep}>
              <ProgressStatusText>{progressStatusText}</ProgressStatusText>
            </ProgressStatus>

            <ProgressText>{progressText}</ProgressText>
          </Header>

          <Content>{renderForm}</Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Steps;
