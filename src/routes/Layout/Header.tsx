import logo from "pages/images/logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faBars, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useTheme } from "contexts";

export default function Header() {
  // theme
  const { theme, toggleTheme } = useTheme();

  // scroll fixed
  const [isFixed, setFixed] = useState(false);
  const headerFixed = () => {
    const currentScrollPosition = window.pageYOffset;
    if (currentScrollPosition > 0) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  // menu click -> open
  const [isAriaExpanded, setAriaExpanded] = useState(false);
  const [isShow, setShow] = useState(false);

  const menuCollapsed = () => {
    setAriaExpanded(!isAriaExpanded);
    setShow(!isShow);
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", headerFixed);
    };
    scrollListener();
    return () => {
      window.removeEventListener("scroll", headerFixed);
    };
  });

  return (
    <header>
      <nav
        id="mainNav"
        className={
          isFixed
            ? "is-fixed is-visible navbar-light navbar navbar-expand-lg"
            : "navbar-light navbar navbar-expand-lg"
        }
      >
        {/* <nav className="navbar-light navbar navbar-expand-lg"> */}
        <div className="container px-4 px-lg-5">
          <Link to="/" className="navbar-brand">
            <img src={logo} alt="logo" style={{ width: "50px" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded={isAriaExpanded ? true : false}
            aria-label="Toggle navigation"
            onClick={menuCollapsed}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          {/* Menu */}
          <div
            className={
              isShow
                ? "collapse navbar-collapse show"
                : "collapse navbar-collapse"
            }
            id="navbarResponsive"
          >
            <ul className="navbar-nav ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <Link to="/about" className="nav-link px-lg-3 py-3 py-lg-4">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/tags" className="nav-link px-lg-3 py-3 py-lg-4">
                  Tags
                </Link>
              </li>
              <li className="nav-item">
                <div className="search px-lg-3 py-3 py-lg-3">
                  <input type="text" placeholder="검색어 입력..." />
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
              </li>
              <li className="nav-item">
                <button
                  onClick={toggleTheme}
                  className="nav-link px-lg-3 py-3 py-lg-4 theme-toggle"
                  aria-label="Toggle dark mode"
                  style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                >
                  <FontAwesomeIcon icon={theme === 'dark' ? faSun : faMoon} />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
