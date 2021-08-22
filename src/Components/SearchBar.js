export const Searchbar = ({ searchText, setSearchText }) => {
  return (
    <div className="search-wrapper">
      <input
        className="search-wrapper_input bgColorSearchInput"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        type="text"
        placeholder="Search videos..."
      />
    </div>
  );
};
