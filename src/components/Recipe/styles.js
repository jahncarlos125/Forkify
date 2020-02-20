import styled from 'styled-components/native';

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
