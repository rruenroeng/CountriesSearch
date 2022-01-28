import React from "react";

const ResultsTable = (props) => {
  return (
    <div>
      <ul className="collection">
        <li>{props.children}</li>
      </ul>
    </div>
  );
};

export default ResultsTable;
