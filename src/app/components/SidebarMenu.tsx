

// const Navbar = () => {
//   return (
//     <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
//       <Link to="/">
//         <h1 className="text-3xl font-bold">SJC</h1>
//       </Link>
//       <ul className="flex space-x-4 flex-col">
//         <li>
//           <Link to="/fileExplorer">File Explorer Challenge</Link>
//         </li>
//         <li>
//           <Link to="/contact">Contact</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;


'use client';

import { Sidebar } from 'flowbite-react';
import { HiInbox, HiShoppingCart } from 'react-icons/hi';
import React from "react";
import { Link } from "react-router-dom";
function SidebarMenu() {
  return (

    <Sidebar aria-label="Default sidebar example"  className="h-full">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
         
          <Sidebar.Item href="#" icon={HiInbox}>
            <Link to="/fileExplorer">File Explorer </Link>
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingCart}>
            <Link to="/pagination">Products Pagination </Link>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
   
  );
}
export default SidebarMenu;