import React from "react";

const ResultsTable = (props) => {
  return (
    <div>
      <ul className="collection">
        <div>{props.children}</div>
      </ul>
    </div>
  );
};

export default ResultsTable;
