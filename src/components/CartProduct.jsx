import PropTypes from 'prop-types';
import React from 'react';

export default function CartProduct({
  id,
  title,
  thumbnail,
  quantity,
  onClickMinus,
  onClickPlus,
  onClickRemove,
}) {
  return (
    <div
      className="product"
    >
      <img
        className="h-[90px] w-[90px]"
        src={ thumbnail }
        alt={ id }
      />
      <p
        data-testid="shopping-cart-product-name"
      >
        {title}
      </p>

      <div className="flex flex-row items-center">
        <button
          data-testid="product-decrease-quantity"
          className="material-symbols-outlined border border-gray-300"
          disabled={ quantity === 1 }
          onClick={ onClickMinus }
        >
          remove
        </button>
        <p
          data-testid="shopping-cart-product-quantity"
          className="w-[20px] text-center"
        >
          {quantity}
        </p>
        <button
          data-testid="product-increase-quantity"
          className="material-symbols-outlined border border-gray-300"
          onClick={ onClickPlus }
        >
          add
        </button>
        <button
          data-testid="remove-product"
          className="material-symbols-outlined"
          onClick={ onClickRemove }
        >
          delete
        </button>
      </div>
    </div>
  );
}

CartProduct.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  onClickMinus: PropTypes.func.isRequired,
  onClickPlus: PropTypes.func.isRequired,
  onClickRemove: PropTypes.func.isRequired,
};
