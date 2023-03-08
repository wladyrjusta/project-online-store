import PropTypes from 'prop-types';

export default function SearchField({ onChange, value, onSubmit }) {
  return (
    <>
      <form
        className="flex gap-x-3 items-center justify-center"
        onSubmit={ (event) => {
          event.preventDefault();
          onSubmit(event);
        } }
      >
        <label
          htmlFor="pesquisar"
          className="leibou"
        >
          <input
            className="inpute"
            data-testid="query-input"
            id="pesquisar"
            name="pesquisa"
            value={ value }
            onChange={ onChange }
            type="text"
            placeholder="digite aqui para pesquisar"
          />
        </label>
        <button
          type="submit"
          data-testid="query-button"
          className="extraSmallButton py-1 bg-green-700 hover:bg-green-800"
        >
          Pesquisar
        </button>
      </form>
      <p data-testid="home-initial-message" className="text-center">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </p>
    </>
  );
}

SearchField.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
