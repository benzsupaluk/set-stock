import clsx from "clsx";

const LoadingThreeDots = () => {
  return (
    <div className={clsx("flex items-center gap-2 loading-three-dots")}>
      <div className="rounded-full w-3 h-3 bg-primary-400 animate-scale animation-delay-[200ms]"></div>
      <div className="rounded-full w-3 h-3 bg-secondary-400 animate-scale animation-delay-[400ms]"></div>
      <div className="rounded-full w-3 h-3 bg-brown-400 animate-scale animation-delay-[600ms]"></div>
    </div>
  );
};

export default LoadingThreeDots;
