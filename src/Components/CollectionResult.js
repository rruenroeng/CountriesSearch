import React from "react";

const languageHelper = (array) => {
  var out = array.map((item, index) => <div key={index}> {item} </div>);

  return <div id="languageHelper">{out}</div>;
};

const CollectionResult = ({
  className,
  id,
  flagPng,
  fullName,
  pop,
  ac2,
  ac3,
  region,
  subRegion,
  languages,
}) => {
  return (
    <li className="collection-item avatar" key={id}>
      <img src={flagPng} alt="" className="circle" />
      <span className="title">{fullName}</span>
      <div className="row">
        <div className="col s6">
          <p>
            Population: {pop}
            <br />
            Alpha-2 Code: {ac2}
            <br />
            Alpha-3 Code: {ac3}
            <br />
            Region: {region}
          </p>
        </div>
        <div className="col s6">
          <p>Sub-Region: {subRegion}</p>
          Languages:{languageHelper(languages)}
        </div>
      </div>
    </li>
  );
};

export default CollectionResult;
