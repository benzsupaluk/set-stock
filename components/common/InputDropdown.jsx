import { useState, useMemo } from "react";

import clsx from "clsx";

import Popover from "./Popover";

import ChevronDownIcon from "@/public/icons/chevron-down.svg";
import CheckIcon from "@/public/icons/check.svg";

const InputDropdown = ({
  position = "bottom-left",
  items,
  selectedItem,
  handleSetSelectedItem,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleShowDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const filteredItems = useMemo(() => {}, [searchText, items]);

  return (
    <>
      <Popover
        isOpen={showDropdown}
        handleSetIsOpen={(state) => setShowDropdown(state)}
        content={
          <ul className="flex flex-col gap-2 bg-white border border-gray-200 shadow-lg rounded-xl p-2 w-60 max-w-[calc(100dvw_-_200px)]">
            {items.map((item, index) => {
              return (
                <li className="w-full" key={index} title={item}>
                  <button
                    type="button"
                    aria-label={`${item}`}
                    className="py-2 pr-3 pl-5 text-left w-full rounded-lg bg-white hover:bg-gray-50 flex items-center gap-4 relative"
                    onClick={() => {
                      handleSetSelectedItem(item);
                      setShowDropdown(false);
                    }}
                  >
                    {item === selectedItem && (
                      <CheckIcon className="w-4 h-4 stroke-primary-500 absolute left-0.5 top-1/2 -translate-y-1/2" />
                    )}

                    <span className="text-[15px] font-semibold text-gray-600 truncate pl-0.5">
                      {item}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        }
        contentClassName="mt-1"
        position={position}
      >
        <button
          type="button"
          aria-label="Option"
          title={selectedItem}
          className="rounded-xl sm:w-44 shadow-xs h-11 py-2.5 px-3.5 flex items-center gap-1 text-gray-600 font-semibold bg-white hover:bg-gray-50 border border-gray-300 disabled:border-gray-200 disabled:text-gray-400"
          onClick={handleShowDropdown}
        >
          <span className="truncate text-left grow">{selectedItem}</span>
          <ChevronDownIcon
            className={clsx(
              "w-5 h-5 transition-all shrink-0 stroke-current",
              showDropdown ? "rotate-180" : ""
            )}
          />
        </button>
      </Popover>
    </>
  );
};

export default InputDropdown;
