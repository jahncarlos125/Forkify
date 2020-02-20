import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, List, NoData, Title} from './styles';
import RecipeComponent from '~/components/Recipe';

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

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Favoritos',
      headerStyle: {
        backgroundColor: '#4C3C82',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: '400',
        fontFamily: 'Roboto',
      },
    };
  };

  render() {
    const {favorites} = this.props;
    return (
      <Container>
        {favorites.length ? (
          <List
            data={favorites}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <RecipeComponent item={item} favorite={true} />
            )}
          />
        ) : (
          <NoData>
            <Title>Sem favoritos!</Title>
          </NoData>
        )}
      </Container>
    );
  }
}

export default connect(state => ({
  favorites: state.favorites,
}))(Favorites);
