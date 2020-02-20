import React, {Component} from 'react';
import {ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Recipe, Avatar, InfoContainer, Title, Publisher} from './styles';
import DoubleTap from '../DoubleTap';
import * as FavActions from '../../store/modules/favorites/actions';
import * as RecipeActions from '../../store/modules/recipes/actions';

class RecipeComponent extends Component {
  static defaultProps = {
    favorite: false,
  };
  handleFavorites = async item => {
    const {favorites, addFavoriteRequest, removeFavoriteRequest} = this.props;

    let favorite_id = favorites.findIndex(r => r.id === item.id);

    //Se já houver esse favorito ele vai removê-lo
    if (favorite_id >= 0) {
      removeFavoriteRequest(item);

      ToastAndroid.show(
        `${item.title} removido!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    } else {
      addFavoriteRequest(item);

      ToastAndroid.show(
        `${item.title} favoritado!`,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  };
  render() {
    const {item, favorite} = this.props;
    return (
      <DoubleTap onDoubleTap={() => this.handleFavorites(item)}>
        <Recipe>
          <Avatar source={{uri: item.avatar}} />
          <InfoContainer>
            <Title>{item.title}</Title>
            <Publisher>{item.publisher}</Publisher>
          </InfoContainer>
          {favorite ? null : item.favorite ? (
            <Icon name="favorite" color="#7159c1" size={20} />
          ) : (
            <Icon name="favorite-border" color="#7159c1" size={20} />
          )}
        </Recipe>
      </DoubleTap>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites,
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({...FavActions, ...RecipeActions}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RecipeComponent);
