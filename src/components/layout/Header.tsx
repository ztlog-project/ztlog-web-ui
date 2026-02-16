'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { useTheme } from 'contexts';

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  const [isFixed, setFixed] = useState(false);
  const headerFixed = () => {
    const currentScrollPosition = window.pageYOffset;
    if (currentScrollPosition > 0) {
      setFixed(true);
    } else {
      setFixed(false);
    }
  };

  const [isAriaExpanded, setAriaExpanded] = useState(false);
  const [isShow, setShow] = useState(false);

  const menuCollapsed = () => {
    setAriaExpanded(!isAriaExpanded);
    setShow(!isShow);
  };

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener('scroll', headerFixed);
    };
    scrollListener();
    return () => {
      window.removeEventListener('scroll', headerFixed);
    };
  });

  return (
    <header>
      <nav
        id="mainNav"
        className={
          isFixed
            ? 'is-fixed is-visible navbar-light navbar navbar-expand-lg'
            : 'navbar-light navbar navbar-expand-lg'
        }
      >
        <div className="container px-4 px-lg-5">
          <Link href="/" className="navbar-brand">
            <img src="/images/logo.png" alt="logo" />
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
          <div
            className={
              isShow
                ? 'collapse navbar-collapse show'
                : 'collapse navbar-collapse'
            }
            id="navbarResponsive"
          >
            <ul className="navbar-nav ms-auto py-4 py-lg-0">
              <li className="nav-item">
                <Link href="/about" className="nav-link px-lg-3 py-3 py-lg-4">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/tags" className="nav-link px-lg-3 py-3 py-lg-4">
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
