import styled from 'styled-components/native';
import { themes } from '../../themes';

interface IMessageButton {
  variant: 'mail' | 'whatsapp';
}

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background: ${themes.colors.background};
`;

export const CompanyHeader = styled.View`
  padding: 10px 10px 25px;
  width: 100%;
`;

export const Image = styled.Image`
  height: 120px;
  width: 120px;
  border-radius: 4px;
`;

export const CompanyName = styled.Text`
  font-size: 22px;
  font-family: ${themes.fonts.regular};
  color: ${themes.colors.light};
  margin-top: 8px;
`;

export const MessageButton = styled.TouchableOpacity<IMessageButton>`
  background: ${props =>
    props.variant === 'whatsapp' ? themes.alerts.success : themes.alerts.error};
  align-items: center;
  justify-content: center;
  padding: 10px 15px;
  border-radius: 8px;
  margin-top: 12px;
`;

export const MessageButtonText = styled.Text`
  font-size: 16px;
  font-family: ${themes.fonts.semi};
  color: ${themes.colors.light};
`;

export const CompanyContent = styled.View`
  flex: 1;
  width: 100%;
`;

export const Section = styled.View`
  padding: 10px 15px;
`;

export const Label = styled.Text`
  font-size: 22px;
  font-family: ${themes.fonts.regular};
  color: ${themes.colors.primary};
`;

export const Description = styled.Text`
  font-size: 16px;
  font-family: ${themes.fonts.light};
  color: ${themes.colors.light};
`;

export const Card = styled.View`
  background: ${themes.colors.background};
  padding: 10px;

  flex-direction: row;
  align-items: center;
  border-radius: 8px;
`;

export const CardImageContainer = styled.View`
  height: 60px;
  width: 60px;
  margin-right: 12px;
`;

export const CardImage = styled.Image`
  height: 100%;
  width: 100%;

  border-radius: 12px;
`;

export const Data = styled.View`
  flex: 1;
`;

export const DriverName = styled.Text`
  font-size: 20px;
  font-family: ${themes.fonts.medium};
  color: ${themes.colors.light};
`;

export const DriverPhone = styled.Text`
  font-size: 16px;
  font-family: ${themes.fonts.regular};
  color: ${themes.colors.light};
`;
