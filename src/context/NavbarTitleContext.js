import { createContext, useState } from "react";

const NavbarTitleContext = createContext();

const NavbarTitleProvider = ({ children }) => {
  const [navbarTitle, setNavbarTitle] = useState("");

  return (
    <NavbarTitleContext.Provider value={{ navbarTitle, setNavbarTitle }}>
      {children}
    </NavbarTitleContext.Provider>
  );
};

export { NavbarTitleProvider };
export default NavbarTitleContext;
