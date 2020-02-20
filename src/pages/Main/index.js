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
  Title,
  NoData,
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
            renderItem={({item}) => <RecipeComponent item={item} />}
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
