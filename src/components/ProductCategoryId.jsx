import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ProductCategoryId extends Component {
  render() {
    const { title, thumbnail, price, handleCartButton, buttonId } = this.props;

    return (
      <div>
        <Link
          to={ `/product/${buttonId}` }
          data-testid="product"
          className="product"
        >
          <img
            className="h-[90px] w-[90px]"
            src={ thumbnail }
            alt={ title }
            data-testid="product-detail-link"
          />
          <p>{ title }</p>
          <p>
            R$:
            <span>
              { price }
            </span>
          </p>
        </Link>

        <button
          data-testid="product-add-to-cart"
          onClick={ (event) => handleCartButton(event) }
          id={ buttonId }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

ProductCategoryId.defaultProps = {
  price: '',
};

ProductCategoryId.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number,
  handleCartButton: PropTypes.func.isRequired,
  buttonId: PropTypes.string.isRequired,
};
