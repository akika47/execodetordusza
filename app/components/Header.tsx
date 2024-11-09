"use client";

import { useRouter } from "next/navigation";
import Home from '../page';

const Header = () => {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    router.push(route);
  };

  return (
    <header>
      <button onClick={() => handleNavigation("/")}>Home</button>
      <button onClick={() => handleNavigation("/News")}>News</button>
      <button onClick={() => handleNavigation("/About")}>About</button>
    </header>
  );
};

export default Header;
