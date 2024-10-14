import Navbar from "./Navbar";
import clsx from "clsx";
import { Rubik } from "next/font/google";

const rubik = Rubik({ subsets: ["latin"] });

const Layout = ({ children }) => {
  return (
    <main className={clsx("flex flex-col justify-between")}>
      <section className="grow flex flex-col h-[100dvh] overflow-hidden">
        <Navbar />
        <section className="grow flex flex-col overflow-auto">
          {children}
        </section>
      </section>
      {/* footer */}
    </main>
  );
};

export default Layout;
