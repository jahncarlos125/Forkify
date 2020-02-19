import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Container,
  List,
  Recipe,
  Avatar,
  InfoContainer,
  Title,
  Publisher,
} from './styles';
import DoubleTap from '~/components/DoubleTap';

class Favorites extends Component {
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
    const {favorites} = this.state;
    return (
      <Container>
        <List
          data={favorites}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DoubleTap onDoubleTap={() => this.handleFavorites(item)}>
              <Recipe>
                <Avatar source={{uri: item.avatar}} />
                <InfoContainer>
                  <Title>{item.title}</Title>
                  <Publisher>{item.publisher}</Publisher>
                </InfoContainer>
              </Recipe>
            </DoubleTap>
          )}
        />
      </Container>
    );
  }
}

export default connect(state => ({
  favorites: state.favorites,
}))(Favorites);

Favorites.navigationOptions = {
  title: 'Favoritos',
  headerStyle: {
    backgroundColor: '#4C3C82',
  },
  headerTintColor: '#FFF',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};
