import { Searchbar } from "./SearchBar";

export const SearchBarModal = ({
  searchModal,
  setSearchModal,
  searchText,
  setSearchText
}) => {
  return (
    <div className="search-modal" style={{ display: searchModal }}>
      <Searchbar searchText={searchText} setSearchText={setSearchText} />
      <button
        className="btn remove-btn"
        onClick={() => {
          setSearchModal("none");
        }}
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};
