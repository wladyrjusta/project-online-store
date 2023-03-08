import React from 'react';
import PropTypes from 'prop-types';
import { fetchProductById } from '../services/ProductService';
import Loading from './Loading';

export default class Product extends React.Component {
  state = {
    produto: { thumbnail: '', title: '', price: '' },
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const p = await fetchProductById(id);
    // console.log('Product.jsx - Produto:', p);
    this.setState({ produto: p });
  }

  render() {
    const { match: { params: { id } }, handleCartButton } = this.props;

    const { produto } = this.state;

    if (!produto) return (<Loading />);

    const {
      thumbnail,
      title,
      price,
    } = produto;

    return (
      <div
        data-testid="product"
        className="product"
      >
        <img
          className="h-[90px] w-[90px]"
          src={ thumbnail }
          alt={ title }
          data-testid="product-detail-image"
        />
        <p data-testid="product-detail-name">{title}</p>
        <p>
          R$:
          <span data-testid="product-detail-price">
            {price}
          </span>
        </p>
        <button
          data-testid="product-detail-add-to-cart"
          onClick={ handleCartButton }
          id={ id }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  handleCartButton: PropTypes.func.isRequired,
};
