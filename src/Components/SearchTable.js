import React from "react";

const SearchTable = (props) => {
  return (
    <form className="search-table col s12" action="./index.php" method="post">
      <div>{props.children}</div>
    </form>
  );
};

export default SearchTable;
