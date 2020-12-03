import { darken, shade } from 'polished';
import styled from 'styled-components/native';
import { themes } from '../../themes';

export const Container = styled.SafeAreaView`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

export const UserAvatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
`;

export const NoProfilePhoto = styled.View`
  height: 50px;
  width: 50px;
  border-radius: 25px;

  align-items: center;
  justify-content: center;
  background: ${themes.colors.secondary};
`;

export const NoProfilePhotoText = styled.Text`
  font-size: 16px;
  color: ${themes.colors.light};
  font-family: ${themes.fonts.regular};
`;

export const Logo = styled.Image`
  width: 50px;
  height: 50px;
`;
