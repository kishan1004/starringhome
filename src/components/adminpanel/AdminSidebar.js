// Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaClipboardList,
  FaStar,
  FaCog,
} from "react-icons/fa";
import { MdInventory } from "react-icons/md";

function AdminSidebar({ toggleSidebar }) {
  return (
    <aside className="w-64 min-h-screen mt-[60px] bg-gray-100 text-black flex flex-col p-4 space-y-4">
      <nav className="flex flex-col space-y-3">
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`
          }
          onClick={toggleSidebar} // Close sidebar on link click
        >
          <FaTachometerAlt className="mr-3" /> Dashboard
        </NavLink>
        <NavLink
          to="products"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`
          }
          onClick={toggleSidebar} // Close sidebar on link click
        >
          <FaBox className="mr-3" /> Product
        </NavLink>
        <NavLink
          to="orders"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`
          }
          onClick={toggleSidebar} // Close sidebar on link click
        >
          <FaClipboardList className="mr-3" /> Orders
        </NavLink>
        <NavLink
          to="testimonials"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`
          }
          onClick={toggleSidebar} // Close sidebar on link click
        >
          <FaStar className="mr-3" /> Testimonials
        </NavLink>
        <NavLink
          to="settings"
          className={({ isActive }) =>
            `flex items-center px-3 py-2 rounded ${
              isActive
                ? "bg-black text-white"
                : "hover:bg-black hover:text-white"
            }`
          }
          onClick={toggleSidebar} // Close sidebar on link click
        >
          <FaCog className="mr-3" /> Settings
        </NavLink>
      </nav>
      {/* <NavLink
        to="report"
        className={({ isActive }) =>
          `flex items-center px-3 py-2 rounded ${
            isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"
          }`
        }
        onClick={toggleSidebar} // Close sidebar on link click
      >
        <FaBox className="mr-3" /> Report
      </NavLink> */}
      <NavLink
        to="inventory"
        className={({ isActive }) =>
          `flex items-center px-3 py-2 rounded ${
            isActive ? "bg-black text-white" : "hover:bg-black hover:text-white"
          }`
        }
        onClick={toggleSidebar} // Close sidebar on link click
      >
        <MdInventory className="mr-3" /> Inventory
      </NavLink>
    </aside>
  );
}

export default AdminSidebar;
