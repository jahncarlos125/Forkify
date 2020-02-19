import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

export const Form = styled.View`
  flex-direction: row;
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-color: #eee;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  flex: 1;
  height: 40px;
  background: #eee;
  border-radius: 40px;
  padding: 0 15px;
  border: 1px solid #eee;
`;

export const SubmitButton = styled(RectButton)`
  justify-content: center;
  align-items: center;
  background: #4c3c82;
  border-radius: 40px;
  margin-left: 10px;
  padding: 0 12px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const Recipe = styled.View`
  flex-direction: row;
  align-items: center;
  background: #eee;
  margin: 8px 0;
  padding: 10px;
  /* border: solid 1px; */
`;

export const Avatar = styled.Image`
  flex: 1;
  width: 64px;
  height: 64px;
  border-radius: 32px;
  background: #eee;
  margin-right: 10px;
`;

export const InfoContainer = styled.View`
  flex: 4;
  justify-content: center;
  align-items: flex-start;
`;

export const NoData = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #4c3c82;
  font-weight: bold;
  margin-top: 5px;
`;

export const Publisher = styled.Text``;
