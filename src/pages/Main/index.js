import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  Recipe,
  Avatar,
  InfoContainer,
  Title,
  Publisher,
} from './styles';
import api from '../../services/api';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      recipes: [],
      term: '',
    };
  }

  searchRecipes = async () => {
    const {term} = this.state;
    try {
      const {data} = await api.get(`/search?q=${term}`);

      if (data.count) {
        let r = data.recipes.map(item => {
          return {
            id: item.recipe_id,
            title: item.title,
            avatar: item.image_url,
            publisher: item.publisher,
          };
        });

        this.setState({
          recipes: r,
        });
      }
    } catch (error) {
      console.tron.error(error);
    }
  };

  render() {
    const {recipes, term} = this.state;
    return (
      <Container>
        <Form>
          <Input
            placeholder="Buscar receitas.."
            value={term}
            onChangeText={t => this.setState({term: t})}
            returnKeyType="search"
            onSubmitEditing={() => this.searchRecipes()}
          />
          <SubmitButton onPress={() => this.searchRecipes()}>
            <Icon name="search" size={20} color="#eee" />
          </SubmitButton>
        </Form>
        <List
          data={recipes}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Recipe>
              <Avatar source={{uri: item.avatar}} />
              <InfoContainer>
                <Title>{item.title}</Title>
                <Publisher>{item.publisher}</Publisher>
              </InfoContainer>
            </Recipe>
          )}
        />
      </Container>
    );
  }
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
