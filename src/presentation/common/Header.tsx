import React from "react";
// import { useLoading } from "./LoadingContext.OLD";
import { Link } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Header.css";
import { useStorage } from "../..";

function Header() {
  const isLoading = useStorage((state) => state.isLoading);
  // const { loading: initialLoading } = useLoading(); // TODO remove
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
