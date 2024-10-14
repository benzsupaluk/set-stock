import { useEffect, useRef } from "react";
import clsx from "clsx";
import { Z_INDEX } from "@/constants";

const Popover = ({
  isOpen,
  handleSetIsOpen,
  content,
  children,
  position = "bottom-left",
  delay = "75",
  className = "",
  contentClassName = "",
}) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    if (popoverRef.current && isOpen) {
      popoverRef.current.focus();
    }
  }, [content, isOpen]);

  return (
    <div
      ref={popoverRef}
      tabIndex={0}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          handleSetIsOpen(false);
        }
      }}
      className={clsx("relative outline-none", className)}
    >
      {children}
      <div
        style={{ zIndex: Z_INDEX.POPOVER }}
        className={clsx(
          isOpen
            ? "visible scale-y-100 origin-top opacity-100"
            : "invisible opacity-0 h-0 w-0 overflow-hidden hidden",
          position === "top-left" && "bottom-full left-0",
          position === "bottom-left" && "top-full left-0",
          position === "top-right" && "bottom-full right-0",
          position === "bottom-right" && "top-full right-0",
          contentClassName,
          `delay-[${delay}]`,
          "absolute w-auto transition-alls duration-100 outline-none"
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default Popover;
