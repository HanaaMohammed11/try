/* eslint-disable no-unused-vars */
import React from "react";
import Topbanner from "./componants/banner/Topbanner";
import Bottombanner from "./componants/banner/Bottombanner";
import Cards from "./Card";

export default function Home() {
  return (
    <div
      className="relative flex flex-col min-h-screen bg-gray-300"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("./src/assets/backgroundhome.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center items-center text-center  inset-0 bg-black  ">
        <Topbanner />
        <div className="w-48 items-center mx-auto absolute">
          <img src="./src/assets/m.png" alt="" />
        </div>
      </div>

      <Cards />

      <Bottombanner />
    </div>
  );
}
