import React, {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from './ThemeToggle';
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const { user, logout } = UserAuth();
    const navigate = useNavigate();
    
    const handleNav = () => {
        setNav(!nav);
        if (!nav) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    };
    
    const handleSignOut = async () => {
        try {
            await logout();
            navigate("/");
        } catch (err) {
            console.log(err.message);
        }
    };

  return (
    <div className="rounded-div flex items-center justify-between h-20 font-bold">
        <Link to="/">
            <h1 className="text-2xl">Cryptobase</h1>
        </Link>
        <div className="hidden md:block">
            <ThemeToggle/>
        </div>

        {user?.email ? (
            <div className="hidden md:block">
                <Link to="/account" className="p-4 hover:text-accent">
                    Account
                </Link>
                <button className="px-5 py-2 ml-2" onClick={handleSignOut}>
                    Sign Out
                </button>
            </div>
        ) : (
            <div className="hidden md:block">
                <Link to="/signin" className="p-4 hover:text-accent">
                    Sign In
                </Link>
                <Link 
                    to="signup" 
                    className="bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl"
                >
                    Sign Up
                </Link>
            </div>
        )}

        {/* Menu Icon */}
        <div onClick={handleNav} className="block md:hidden cursor-pointer z-10">
            {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={20} />}
        </div>

        {/* Mobile Menu */}
        <div
            className={
            nav
                ? "md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary duration-300 z-10 overflow-hidden"
                : "fixed left-[100%] top-20 h-[90%] w-full flex flex-col items-center justify-between ease-in duration-300"
            }
        >
            <ul className="w-full p-4">
                <li className="border-b py-6">
                    <Link to="/" onClick={handleNav}>
                        Home
                    </Link>
                </li>
                <li className="border-b py-6">
                    <Link to="/account" onClick={handleNav}>
                        Account
                    </Link>
                </li>
                <li className="py-6">
                    <ThemeToggle />
                </li>
            </ul>

            {user?.email ? (
                <div className="flex flex-col w-full p-4">
                    <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl" onClick={handleSignOut}>
                        Sign Out
                    </button>
                </div>
            ) : (
                <div className="flex flex-col w-full p-4">
                    <Link to="/signin" onClick={handleNav}>
                        <button className="w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl">
                            Sign In
                        </button>
                    </Link>
                    <Link to="/signup" onClick={handleNav}>
                        <button className="w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl">
                            Sign Up
                        </button>
                    </Link>
                </div>
            )}
        </div>
    </div>
  )
}

export default Navbar