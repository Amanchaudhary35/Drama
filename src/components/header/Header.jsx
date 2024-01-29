import React, { useState, useEffect } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from 'react-router-dom';
import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg"

const Header = () => {
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    }
    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    }

    const handleSearchQuery = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000)
        }
    }

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <div className="contentWrapper">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem">Movies</li>
                    <li className="menuItem">TV Shows</li>
                    <li className="menuItem"><HiOutlineSearch onClick={openSearch} /></li>
                </ul>

                <div className="mobileMenuItems">
                    <HiOutlineSearch />
                    {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
                </div>
            </div>
            {showSearch && <div className="searchBar">
                <ContentWrapper>
                    <div className="searchInput">
                        <input type="text" placeholder='Search Movies and TV shows...' onChange={(e) => setQuery(e.target.value)} onKeyUp={handleSearchQuery} /><VscChromeClose onClick={() => setShowSearch(false)} />
                    </div>
                </ContentWrapper>
            </div>}

        </header>
    )
}

export default Header