import * as PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchField from './SearchField';
import { MenuItem } from './MenuItem';
import Loading from './Loading';

export default function Lateral({
  allCategories,
  categoriesAreLoading,
  getProductsByCategory,
  onChange,
  onSubmit,
  value,
}) {
  const history = useHistory();

  const callback = () => history.push('/');

  return (
    <aside aria-label="Sidenav">

      <SearchField
        value={ value }
        onChange={ onChange }
        onSubmit={ () => onSubmit(callback) }
      />
      <div
        className={ 'overflow-y-auto py-5 px-3 h-full bg-white border-r '
        + 'border-gray-200 dark:bg-gray-800 dark:border-gray-700' }
      >
        {categoriesAreLoading && <Loading />}
        {!categoriesAreLoading && (
          <ul
            className={ 'pt-5 mt-5 space-y-2 border-t border-gray-200 '
            + 'dark:border-gray-700' }
          >
            {allCategories.map((category) => (
              <MenuItem
                key={ category.id }
                href="/"
              >
                <button
                  value={ category.id }
                  data-testid="category"
                  className="extraSmallButton m-1"
                  onClick={ () => getProductsByCategory(category.id) }
                >
                  {category.name}
                </button>
              </MenuItem>))}
          </ul>)}
      </div>
    </aside>
  );
}

Lateral.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  allCategories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  categoriesAreLoading: PropTypes.bool.isRequired,
  getProductsByCategory: PropTypes.func.isRequired,
};
