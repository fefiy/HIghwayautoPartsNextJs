import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav>
      <div className="flex py-1 px-24 text-[rgb(164,164,164)] gap-6 text-sm items-center border-b border-bg-[rgb(164,164,164)]">
        <Link href="/about" className="capitalize">
          About us
        </Link>
        <Link href="/contact" className="capitalize">
          contact us
        </Link>
      </div>
      <div className="flex items-center gap-10 py-2 px-24 border-b border-bg-[rgb(164,164,164)]">
        <div className=" ">
          <h1 className="uppercase text-[rgb(229,39,39)] text-4xl font-bold tracking-[9px]">
            {" "}
            high <span className="text-black">way</span>{" "}
          </h1>
          <p className="uppercase tracking-[6px]"> Auto spare parts </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
