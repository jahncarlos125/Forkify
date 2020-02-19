import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
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
import * as FavActions from '../../store/modules/favorites/actions';
import * as RecipeActions from '../../store/modules/recipes/actions';
import api from '../../services/api';
import DoubleTap from '~/components/DoubleTap';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: [],
      recipes: [],
      term: '',
      loading: false,
    };
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
        <SubmitButton
          onPress={() => {
            navigation.navigate('Favorites');
          }}>
          <Icon name="favorite-border" size={20} color="#eee" />
        </SubmitButton>
      ),
    };
  };

  searchRecipes = async () => {
    const {term} = this.state;
    console.tron.log(term);
    console.tron.log(this.props);
    const {loadRecipesRequest} = this.props;
    this.setState({loading: true});
    try {
      await loadRecipesRequest(term);
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
    const {recipes} = this.state;
    const {favorites, addFavorite, removeFavorite} = this.props;

    const isFav = favorites.find(x => {
      return x.id === item.id;
    });

    //Se já houver esse favorito ele vai removê-lo
    if (isFav) {
      let fav = favorites.filter(f => {
        return f.id !== item.id;
      });

      removeFavorite(fav);

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
      addFavorite(item);

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
    const {term, loading} = this.state;
    const {recipes} = this.props;
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

const mapStateToProps = state => ({
  favorites: state.favorites,
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({...FavActions, ...RecipeActions}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
