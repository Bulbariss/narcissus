import React from "react";
import koshka from "../images/koshka_pink.png";

const Footer = () => {
  return (
    <div className="w-screen">
      <div className="flex flex-wrap items-center justify-between w-full px-4 pb-6 mx-auto max-w-80 ">
        <div className="w-1/2 pb-4 mb-auto md:w-1/4 md:pb-0 md:mb-0">
          <img src={koshka} alt="logo" className="w-12 h-12" />
        </div>
        <div className="w-1/2 pb-4 md:w-1/4 md:pb-0">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus animi
          quasi debitis.
        </div>
        <div className="w-1/2 md:w-1/4">Test</div>
        <div className="flex flex-col w-1/2 md:w-1/4">
          <div className="font-bold">Контакты</div>
          <a href="simon@koshkaneon.com" className="text-sm underline">
            simon@koshkaneon.com
          </a>
        </div>
      </div>
      <div className="flex items-center justify-between w-full h-12 px-4 pb-6 mx-auto text-sm max-w-80 md:pb-0">
        <div className="w-1/2">© 2020 Koshka Neon</div>
        <div className="w-1/2 text-right">Test</div>
      </div>
    </div>
  );
};

export default Footer;
