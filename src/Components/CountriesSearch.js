import React from "react";

const CountriesSearch = ({ key, searchTitle, children }) => {
  return (
    <div>
      <h5 key={key} className="search-title">
        {searchTitle}
      </h5>
      <div>
        {key}
        {children}
      </div>
    </div>
  );
};

export default CountriesSearch;
