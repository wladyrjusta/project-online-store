import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from '../components/Loading';
import Lateral from '../components/Lateral';
import Topo from '../components/Topo';
import Product from '../components/Product';
import ShoppingCart from './ShoppingCart';
import SearchResult from '../components/SearchResult';
import { getProductFromCacheById, searchProducts } from '../services/ProductService';
import { getCategories } from '../services/api';

const SearchState = Object.freeze({
  WAITING_USER_SUBMIT: 'SearchState.WAITING_USER_SUBMIT',
  WAITING_SERVER: 'SearchState.WAITING_SERVER',
  SHOW_ANSWER: 'SearchState.SHOW_ANSWER',
});

const initialState = {
  searchState: SearchState.WAITING_USER_SUBMIT,
  allCategories: [],
  categoriesAreLoading: true,
  searchTextInput: '',
  searchResult: [],
  cartMap: new Map(),
};

class Home extends Component {
  state = { ...initialState };

  componentDidMount() {
    const { allCategories } = this.state;
    if (allCategories.length === 0) {
      this.setState(
        { categoriesAreLoading: true },
        () => {
          // console.log('Puxando categorias do ML');
          getCategories()
            .then((r) => {
              this.setState({
                allCategories: r,
                categoriesAreLoading: false });
            });
        },
      );
    }
  }

  handleAddToCartButton = ({ target: { id } }) => {
    // adiciona o produto e mostra a quantidade desse produto no carrinho

    const { cartMap } = this.state;
    const cartObject = cartMap.get(id) || {
      id,
      thumbnail: getProductFromCacheById(id).thumbnail,
      title: getProductFromCacheById(id).title,
      quantity: 0,
    };

    cartObject.quantity += 1;
    // console.log('Adicionando ao carrinho: ', JSON.stringify(cartObject));
    cartMap.set(id, cartObject);
    // this.setCartMap(cartMap);
  };

  executeSearch = (categoryId, input) => {
    this.setState(
      { searchState: SearchState.WAITING_SERVER },
      () => searchProducts({
        categoryId,
        input,
      })
        .then((searchResult) => {
          // console.log('Resultado da pesquisa:', searchResult);
          this.setState({
            searchResult,
            searchState: SearchState.SHOW_ANSWER,
          });
        }),
    );
  };

  setCartMap = (map) => {
    this.setState({ cartMap: map });
    // localStorage.setItem('cart', JSON.stringify(map));
  };

  render() {
    const {
      allCategories,
      categoriesAreLoading,
      searchTextInput,
      searchState,
      searchResult,
      cartMap,
    } = this.state;
    // console.log(searchResult);

    if (searchState === SearchState.WAITING_SERVER) return <Loading />;

    return (
      <>
        <Topo />

        <Lateral
          value={ searchTextInput }
          onChange={ (event) => {
            const { value } = event.target;
            this.setState({ searchTextInput: value });
          } }
          onSubmit={ () => this.executeSearch('', searchTextInput) }
          allCategories={ allCategories }
          categoriesAreLoading={ categoriesAreLoading }
          getProductsByCategory={ (categoryId) => {
            this.executeSearch(categoryId, undefined);
          } }
        />
        <main>
          <Switch>
            <Route
              path="/product/:id"
              render={
                (props) => (<Product
                  { ...props }
                  handleCartButton={ this.handleAddToCartButton }
                />)
              }
            />
            <Route
              exact
              path="/shopping-cart"
              render={ (props) => (<ShoppingCart
                { ...props }
                cartMap={ cartMap }
                setCartMap={ this.setCartMap }
              />) }
            />
            <Route exact path="/">
              {searchState === SearchState.SHOW_ANSWER && <SearchResult
                searchResult={ searchResult }
                handleCartButton={ this.handleAddToCartButton }
              />}
            </Route>
          </Switch>
        </main>
      </>
    );
  }
}

export default Home;
