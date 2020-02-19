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

  handleFavorites = async item => {
    const {recipes} = this.state;
    const {favorites, dispatch} = this.props;

    const isFav = favorites.find(x => {
      return x.id === item.id;
    });

    //Se já houver esse favorito ele vai removê-lo
    if (isFav) {
      let fav = favorites.filter(f => {
        return f.id !== item.id;
      });

      dispatch({
        type: 'REMOVE_FAVORITE',
        fav,
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
      dispatch({
        type: 'ADD_FAVORITE',
        item,
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
    const {favorites} = this.props;
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
