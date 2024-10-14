import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="sticky top-0 h-[80px] w-full border-b border-gray-200 px-8">
      <div className="h-[80px] flex items-center">
        <Link href={"/"} className="font-bold text-xl flex items-center gap-1">
          <div className="rounded-lg bg-primary-500 text-white px-2">
            SCRAPE
          </div>
          SET
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
