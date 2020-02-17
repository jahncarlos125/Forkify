import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Form, Input, SubmitButton} from './styles';

export default function Main() {
  return (
    <Container>
      <Form>
        <Input placeholder="Buscar receitas.." />
        <SubmitButton>
          <Icon name="search" size={20} color="#eee" />
        </SubmitButton>
      </Form>
    </Container>
  );
}

Main.navigationOptions = {
  title: 'Forkify - Receitas',
  headerStyle: {
    backgroundColor: '#FFF',
  },
  headerTintColor: '#7159c1',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
