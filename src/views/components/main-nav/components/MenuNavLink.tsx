import { NavLink, NavLinkProps } from 'react-router-dom';
import React from 'react';

export const MenuNavLink: React.FC<NavLinkProps> = (props) => {
  return <NavLink exact={true} {...props} activeClassName="active" />;
};
