import Image from "next/image";
import Header from "./components/Header";
import denali from "@/../public/images/denali.jpg";

export default function Home() {
  return (
    <div className="relative ">
      <Header />
      <div className="relative flex-center h-[90svh]">
        <h1 className="relative text-8xl z-10 text-neutral-100">Alaska</h1>

        <div className="w-screen h-[90svh] absolute top-0 left-0 z-0 ">
          <Image
            src={denali}
            alt="denali"
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="h-screen">
        <h2>space</h2>
      </div>
    </div>
  );
}
