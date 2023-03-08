import { Component } from 'react';
import * as PropTypes from 'prop-types';
import ProductCategoryId from './ProductCategoryId';

export default class SearchResult extends Component {
  render() {
    const { searchResult, handleCartButton } = this.props;

    const vazio = searchResult.length === 0;
    return (
      <>
        {vazio
        && (<p className="text-center">Nenhum produto foi encontrado</p>)}

        {!vazio
        && (
          <section
            className="searchResultContainer"
          >
            {searchResult.map(({
              id,
              title,
              price,
              thumbnail,
            }) => (
              <ProductCategoryId
                key={ id }
                thumbnail={ thumbnail }
                title={ title }
                price={ price }
                id={ id }
                handleCartButton={ (event) => handleCartButton(event) }
                buttonId={ id }
              />))}
          </section>
        )}
      </>
    );
  }
}

SearchResult.propTypes = {
  searchResult: PropTypes.arrayOf(PropTypes.shape).isRequired,
  handleCartButton: PropTypes.func.isRequired,
};
