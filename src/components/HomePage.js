import React from "react";
import ContactsList from "./ContactsList";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div>
      <div className="d-flex justify-content-end container">
        <Link to="/add-contact">
          <button type="button" className="btn btn-primary">
            <i className="fa fa-plus-circle"></i> Add new contact
          </button>
        </Link>
      </div>
      <ContactsList />
    </div>
  );
}
