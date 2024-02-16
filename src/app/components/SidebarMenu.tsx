import { Sidebar } from 'flowbite-react';
import { FiFolder, FiShoppingCart, FiSearch, FiCodesandbox } from 'react-icons/fi';
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from '../theme-context';
function SidebarMenu() {

  const {theme, toggleTheme} = useTheme();

  return (

    <Sidebar aria-label="Default sidebar example"  className="h-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
         
          <Sidebar.Item href="#" icon={FiFolder}>
            <Link to="/fileExplorer">File Explorer </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiShoppingCart}>
            <Link to="/pagination">Products Pagination </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiSearch}>
            <Link to="/multiSelectSearch">Multi Select Search </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiCodesandbox}>
            <Link to="/polyfill-useEffect">Polyfill </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiCodesandbox}>
            <Link to="/form-validation">Form Validation </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiCodesandbox}>
            <Link to="/debounce">Debounce </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={FiCodesandbox}>
            <Link to="/cartCalculator">Cart Calculator </Link>
          </Sidebar.Item>
          
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
   
  );
}
export default SidebarMenu;