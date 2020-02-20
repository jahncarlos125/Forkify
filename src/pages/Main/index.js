import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Keyboard, ActivityIndicator} from 'react-native';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  Title,
  NoData,
  Error,
} from './styles';
import * as FavActions from '../../store/modules/favorites/actions';
import * as RecipeActions from '../../store/modules/recipes/actions';
import RecipeComponent from '~/components/Recipe';

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
    const {loadRecipesRequest} = this.props;

    await loadRecipesRequest(term);

    Keyboard.dismiss();
    this.setState({
      term: '',
    });
  };

  render() {
    const {term} = this.state;
    const {recipes, globals} = this.props;
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
            {globals.loading ? (
              <ActivityIndicator color="#fff" size={20} />
            ) : (
              <Icon name="search" size={20} color="#eee" />
            )}
          </SubmitButton>
        </Form>
        {recipes.recipes.length ? (
          <List
            data={recipes.recipes}
            keyExtractor={item => item.id}
            renderItem={({item}) => <RecipeComponent item={item} />}
          />
        ) : (
          <NoData>
            {recipes.error ? (
              <Error>{recipes.error}</Error>
            ) : (
              <Title>Sem dados!</Title>
            )}
          </NoData>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites,
  recipes: state.recipes,
  globals: state.globals,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({...FavActions, ...RecipeActions}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Main);
