// "use client";
// import React, { useState } from "react";
// import { HoveredLink, Menu, MenuItem, ProductItem } from "./navbar-menu";
// import { cn } from "./utils";

// export function NavBar() {
//   return (
//     <div className="relative w-20 flex items-center justify-center">
//       <Navbar className="top-0" />

//     </div>
//   );
// }

// function Navbar({ className }) {
//   const [active, setActive] = useState(null);

//   return (
//     <div className={cn("fixed top-10 inset-x-0 text-3xl  mx-auto z-50", className)}>
//       <Menu setActive={setActive}>
//         <MenuItem setActive={setActive} active={active} item="الصلاحيات">
//           {/* <div className="flex flex-col space-y-4 text-sm">
//             <HoveredLink href="/web-dev">Web Development</HoveredLink>
//             <HoveredLink href="/interface-design">Interface Design</HoveredLink>
//             <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
//             <HoveredLink href="/branding">Branding</HoveredLink>
//           </div> */}
//         </MenuItem>
//         <MenuItem setActive={setActive} active={active} item="الموظفين">
         
       
//         </MenuItem>
//         <MenuItem setActive={setActive} active={active} item="المصفوفات">
//           {/* <div className="flex flex-col space-y-4 text-sm">
//             <HoveredLink href="/hobby">Hobby</HoveredLink>
//             <HoveredLink href="/individual">Individual</HoveredLink>
//             <HoveredLink href="/team">Team</HoveredLink>
//             <HoveredLink href="/enterprise">Enterprise</HoveredLink>
//           </div> */}
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// }


import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // تأكدي من إضافة ملف CSS

const NavBar = () => {
  return (
    <nav className="navbar">
         <ul className="navbar-menu">
      
       <li  className="navbar-item">
         <Link to={"./MatrixList"} className="navbar-link">
الصلاحيات      
         </Link>
       </li>
          
       <li  className="navbar-item">
         <Link to={"./MatrixList"} className="navbar-link">
         الموظفين
      
         </Link>
       </li>
          
       <li  className="navbar-item">
         <Link to={"./MatrixList"} className="navbar-link">
         المصفوفات
      
         </Link>
       </li>
       {/* <div className='navbar-brand logo w-52  ml-auto mr-5 pt-8'>
<img src="../src/assets/logo.png" alt="" />
    </div> */}
   </ul>

    </nav>
  );
};

export default NavBar;
