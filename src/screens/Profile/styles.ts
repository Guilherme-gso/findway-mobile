import styled from 'styled-components/native';
import { Form as Unform } from '@unform/mobile';
import { Feather } from '@expo/vector-icons';
import { themes } from '../../themes';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 80px;
  background: ${themes.colors.background};
`;

export const Form = styled(Unform)`
  width: 100%;
`;

export const ProfilePhotoContainer = styled.TouchableOpacity`
  margin: 32px 0;
  position: relative;
`;

export const Icon = styled.View`
  position: absolute;
  bottom: 2px;
  right: 6px;
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
  padding: 0 80px;
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
