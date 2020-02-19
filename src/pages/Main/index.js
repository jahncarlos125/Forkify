import React, {Component} from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import {ToastAndroid, Keyboard, ActivityIndicator} from 'react-native';
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
  NoData,
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import DoubleTap from '~/components/DoubleTap';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      recipes: [],
      term: '',
      loading: false,
    };
  }

  async componentDidMount() {
    await this.loadFavorites();
  }

  async componentDidUpdate(_, prevState) {
    const {favorites} = this.state;
    if (prevState !== favorites) {
      await AsyncStorage.setItem('@fork:key', JSON.stringify(favorites));
    }
  }

  async loadFavorites() {
    const fav = await AsyncStorage.getItem('@fork:key');

    if (fav) {
      this.setState({
        favorites: JSON.parse(fav),
      });
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Forkify - Receitas',
      headerStyle: {
        backgroundColor: '#4C3C82',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: '400',
        fontFamily: 'Roboto',
      },
      headerRight: () => (
        <SubmitButton onPress={() => {}}>
          <Icon name="favorite-border" size={20} color="#eee" />
        </SubmitButton>
      ),
    };
  };

  searchRecipes = async () => {
    const {term, favorites} = this.state;
    this.setState({loading: true});
    try {
      const {data} = await api.get(`/search?q=${term}`);

      if (data.count) {
        let r = data.recipes.map(item => {
          const isFav = favorites.find(x => {
            return x.id === item.recipe_id;
          });

          return {
            id: item.recipe_id,
            title: item.title,
            avatar: item.image_url,
            publisher: item.publisher,
            favorite: isFav ? true : false,
          };
        });

        this.setState({
          recipes: r,
        });
      }
    } catch (error) {
      console.tron.error(error);
    } finally {
      Keyboard.dismiss();
      this.setState({
        term: '',
        loading: false,
      });
    }
  };

  handleFavorites = async item => {
    const {favorites, recipes} = this.state;

    const isFav = favorites.find(x => {
      return x.id === item.id;
    });

    //Se já houver esse favorito ele vai removê-lo
    if (isFav) {
      let fav = favorites.filter(f => {
        return f.id !== item.id;
      });

      this.setState({
        favorites: fav,
      });

      //Muda status de favorito na lista de receitas
      recipes.map(recipe => {
        if (recipe.id === item.id) {
          return (recipe.favorite = false);
        }
      });

      ToastAndroid.show(
        `${item.title} removido!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      this.setState({
        favorites: [...favorites, item],
      });

      //Muda status de favorito na lista de receitas
      recipes.map(recipe => {
        if (recipe.id === item.id) {
          return (recipe.favorite = true);
        }
      });

      ToastAndroid.show(
        `${item.title} favoritado!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };

  render() {
    const {recipes, term, loading} = this.state;
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
            {loading ? (
              <ActivityIndicator color="#fff" size={20} />
            ) : (
              <Icon name="search" size={20} color="#eee" />
            )}
          </SubmitButton>
        </Form>
        {recipes.length ? (
          <List
            data={recipes}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <DoubleTap onDoubleTap={() => this.handleFavorites(item)}>
                <Recipe>
                  <Avatar source={{uri: item.avatar}} />
                  <InfoContainer>
                    <Title>{item.title}</Title>
                    <Publisher>{item.publisher}</Publisher>
                  </InfoContainer>
                  {item.favorite ? (
                    <Icon name="favorite" color="#7159c1" size={20} />
                  ) : (
                    <Icon name="favorite-border" color="#7159c1" size={20} />
                  )}
                </Recipe>
              </DoubleTap>
            )}
          />
        ) : (
          <NoData>
            <Title>Sem dados!</Title>
          </NoData>
        )}
      </Container>
    );
  }
}
