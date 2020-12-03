import styled from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';
import { themes } from '../../../themes';

export const Container = styled.View`
  flex: 1;
  padding: 0 20px;
  background: ${themes.colors.background};
`;

export const Title = styled.Text`
  font-size: 22px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.medium};
`;

export const Description = styled.Text`
  font-size: 18px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.regular};
  text-align: center;
`;

export const Form = styled(Unform)`
  width: 100%;
`;

export const ProfilePhotoContainer = styled.TouchableOpacity`
  margin: 32px 0;
  position: relative;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled.View`
  position: absolute;
  bottom: 2px;
  right: 100px;
  z-index: 20;
  background: ${themes.colors.background};
  width: 35px;
  height: 35px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
`;

export const ProfilePhoto = styled.Image`
  height: 170px;
  width: 170px;
  border-radius: 85px;
`;

export const ButtonLogout = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${themes.alerts.error};
  height: 40px;
  width: 100%;
  border-radius: 4px;

  max-width: 60%;
  margin: 20px auto;
`;

export const ButtonUpdate = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: ${themes.alerts.success};
  height: 40px;
  border-radius: 4px;
  width: 100%;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: ${themes.colors.light};
  font-size: 22px;
  margin-right: 12px;
  font-family: ${themes.fonts.regular};
  margin-top: 4px;
`;

export const NoProfilePhoto = styled.View`
  height: 170px;
  width: 170px;
  border-radius: 85px;
  background: ${themes.colors.secondary};
  align-items: center;
  justify-content: center;
`;

export const Name = styled.Text`
  font-size: 32px;
  font-family: ${themes.fonts.semi};
  color: ${themes.colors.light};
`;
