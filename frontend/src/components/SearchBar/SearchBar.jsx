import "./SearchBar.scss";
import PropTypes from "prop-types";

function SearchBar({ setValue, icon, placeholder, value }) {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="searchBar">
      <input
        type="search"
        className="search"
        onChange={handleChange}
        placeholder={placeholder}
        value={value}
      />
      <i className={`fi fi-br-${icon}`} />
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  setValue: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
