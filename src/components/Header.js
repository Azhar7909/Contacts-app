import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="bg-light py-3 mb-5">
      <Link to="/" className="mb-5">
        Home
      </Link>
      <h2 className="text-center">Contacts Management</h2>
    </div>
  );
}
