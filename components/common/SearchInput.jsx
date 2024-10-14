import React, { useRef } from "react";

import { INPUT_SIZE } from "@/constants";
import Input from "./Input";

import SearchIcon from "@/public/icons/search.svg";
import XCloseIcon from "@/public/icons/x-close.svg";

const SearchInput = ({ searchInputText, handleSetSearchInputText }) => {
  const inputRef = useRef(null);

  const inputPrefix = (
    <div className="absolute text-gray-500 top-1/2 -translate-y-1/2 left-2.5">
      <SearchIcon className="w-5 h-5" />
    </div>
  );

  return (
    <Input
      type="text"
      inputRef={inputRef}
      placeholder="Search"
      value={searchInputText}
      prefix={inputPrefix}
      suffix={
        searchInputText ? (
          <button
            type="button"
            aria-label="Clear text"
            className="absolute p-1 top-1/2 rounded-md text-gray-500 hover:text-gray-600 -translate-y-1/2 right-2.5 bg-gray-100 hover:bg-gray-200"
            onClick={() => {
              handleSetSearchInputText("");
              inputRef?.current?.focus();
            }}
          >
            <XCloseIcon className="w-3 h-3" />
          </button>
        ) : null
      }
      onChange={(event) => handleSetSearchInputText(event.target.value)}
      size={INPUT_SIZE.MD}
      containerClassName="!font-inter"
    />
  );
};

export default SearchInput;
