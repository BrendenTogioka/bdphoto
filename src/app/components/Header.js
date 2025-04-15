import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full h-auto p-2">
      <nav className="flex gap-2  ">
        <Link
          href="/"
          className="w-[40px] h-[40px] bg-gradient-to-r from-slate-900 to-slate-700 text-white flex-center rounded-sm shadow-sm cursor-pointer"
        >
          BD
        </Link>
        <div className="w-[40px] h-[40px] bg-white flex-center  rounded-full shadow-sm cursor-pointer">
          =
        </div>{" "}
        <div className="flex items-center">
          <Link href="/projects">Projects</Link>
        </div>
      </nav>
    </header>
  );
}
