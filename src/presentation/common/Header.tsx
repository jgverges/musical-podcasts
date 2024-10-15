import React from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import "../../styles/Header.css";
import { useAppStore } from "../../application/stores/useAppStore";

function Header() {
  const isLoading = useAppStore((state) => state.isLoading);

  return (
    <header className="header-container">
      <h1 className="header-title">
        <Link to="/" className="no-underline">
          Podcaster
        </Link>
      </h1>
      {isLoading && <LoadingIndicator />}
    </header>
  );
}
export default Header;
