import React from "react";

const SearchCard = ({
  placeholder,
  name,
  id,
  type,
  className,
  SubmitHandler,
}) => {
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      SubmitHandler([name, document.getElementById(id).value]);
    }
  };

  return (
    <div className="row">
      <div className="input-field col s6">
        <label forhtml="name">{placeholder}</label>
        <input
          placeholder={placeholder}
          name={name}
          id={id}
          type={type}
          className={className}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={() =>
            SubmitHandler([name, document.getElementById(id).value])
          }
          text="true"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SearchCard;
