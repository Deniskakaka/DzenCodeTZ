import { NavLink } from "react-router-dom";

import "./saidBar.scss";

export const NavigationMenu = () => {
  return (
    <div className="saidBar">
      <div className="saidBar_avatar">
        <NavLink to="/setting"></NavLink>
      </div>
      <nav className="saidBar_navigation">
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/orders">Orders</NavLink>
      </nav>
    </div>
  );
};
