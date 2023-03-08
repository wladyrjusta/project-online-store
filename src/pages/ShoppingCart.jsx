import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CartProduct from '../components/CartProduct';
import Loading from '../components/Loading';

export default function ShoppingCart({
  cartMap,
  setCartMap,
}) {
  const [lista, setLista] = useState();
  const [vazio, setVazio] = useState(true);
  const [value, setValue] = useState(false);

  useEffect(() => {
    // console.log('ShoppingCart notificado de alteração no cartMap');
    const novaLista = Object.keys(Object.fromEntries(cartMap));
    const novaLista2 = novaLista.map((id) => cartMap.get(id));
    // console.log(JSON.stringify(novaLista2));

    setLista(novaLista2);
    setVazio(novaLista2.length === 0);
  }, [cartMap, value]);

  if (!lista) return <Loading />;

  return (
    <div>
      {vazio && (
        <p data-testid="shopping-cart-empty-message">
          Seu carrinho está vazio
        </p>)}

      {!vazio && (
        <div
          className="searchResultContainer"
        >
          {lista.map(({ id, title, quantity, thumbnail }) => (
            <CartProduct
              key={ id }
              id={ id }
              thumbnail={ thumbnail }
              alt={ id }
              title={ title }
              quantity={ quantity }
              onClickMinus={ () => {
                let valor = quantity;
                valor -= 1;
                if (valor === 0) {
                  cartMap.delete(id);
                } else {
                  cartMap.set(id, { id, title, quantity: valor });
                }
                setCartMap(cartMap);
                setValue(!value); // force update
              } }
              onClickPlus={ () => {
                let valor = quantity;
                valor += 1;
                const novoValor = { id, title, quantity: valor };
                // console.log('Tentando mudar o valor para: ', JSON.stringify(novoValor));
                cartMap.set(id, novoValor);
                setCartMap(cartMap);
                setValue(!value); // force update
              } }
              onClickRemove={ () => {
                cartMap.delete(id);
                setCartMap(cartMap);
                setValue(!value); // force update
              } }
            />
          ), console.log(lista))}
        </div>
      )}
    </div>
  );
}

ShoppingCart.propTypes = {
  cartMap: PropTypes.instanceOf(Map).isRequired,
  setCartMap: PropTypes.func.isRequired,
};
