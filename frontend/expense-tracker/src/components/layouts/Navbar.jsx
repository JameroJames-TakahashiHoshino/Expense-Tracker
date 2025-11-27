import React, { useState, useEffect } from 'react'
import { HiOutlineMenu, HiOutlineX, HiOutlineSun, HiOutlineMoon } from "react-icons/hi";
import SideMenu from "./SideMenu";
import { getSavedTheme, toggleTheme } from '../../utils/theme';

const Navbar = ({activeMenu}) => {
        const [openSideMenu, setOpenSideMenu] = useState(false);
        const [theme, setTheme] = useState(getSavedTheme());

        useEffect(() => {
            // keep the local theme state in sync with persisted value
            setTheme(getSavedTheme());
        }, []);
  return(
    <div className="flex gap-5 bg-white border boredr-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button
            className="block lg:hidden text-black"
            onClick={() => {
                setOpenSideMenu(!openSideMenu);
            }}
        >
            {openSideMenu ? (
                <HiOutlineX className="text-2xl" />
            ) : (
                <HiOutlineMenu className="text-2xl" />
            )}
        </button>

        <h2 className="text-lg font-medium text-black">NEU Expense Tracker</h2>

        <div className="ml-auto flex items-center gap-3">
            <button
                aria-label="Toggle theme"
                className="p-2 rounded-md text-gray-700 hover:bg-gray-100 dark:hover:bg-white/5"
                onClick={() => {
                    const next = toggleTheme();
                    setTheme(next);
                }}
            >
                {theme === 'dark' ? (
                    <HiOutlineSun className="text-xl" />
                ) : (
                    <HiOutlineMoon className="text-xl" />
                )}
            </button>
        </div>

        {openSideMenu && (
            <div className="fixed top-[61px] -ml-4 bg-white">
                <SideMenu activeMenu={activeMenu} />
            </div>
        )}
    </div>
  )
}

export default Navbar