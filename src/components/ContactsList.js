import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";
import { Get, Delete } from "../api_calls/Utills";

export default function ContactsList() {
  const [contactsList, setContactsList] = useState([]);
  const [conDetail, setConDetail] = useState({});

  const url = "http://localhost:8000/contacts";

  function deleteHandler(id) {
    Delete(url + "/" + id)
      .then((response) => {
        getContactsList();
        console.log(response);
      })
      .catch((error) => console.log("error", error));
  }

  function setLocalStorage(name, email, img) {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("img", img);
  }

  function getContactsList() {
    Get(url)
      .then((response) => {
        setContactsList(response.data);
        console.log("contactList",response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  useEffect(() => {
    getContactsList();
  }, []);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Contact lists</title>
      </Helmet>
      <h3>Contacts List</h3>
      <ul className="list-group list-group-flush">
        {contactsList.map((v, i) => (
          <li
            key={i}
            className="list-group-item d-flex justify-content-between"
          >
            <span className="d-flex align-items-center">
              <Avatar img={v.img} name={v.name} />
              <div>
                <div className="mx-3">{v.name}</div>
                <div className="mx-3" style={{ fontSize: "10px" }}>
                  {v.email}
                </div>
              </div>
            </span>
            <span>
              <button
                style={{ boxShadow: "none" }}
                type="button"
                class="btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() =>
                  setConDetail({
                    id: v.id,
                    name: v.name,
                    email: v.email,
                    img: v.img,
                  })
                }
              >
                <i
                  title="details"
                  class="fa fa-info text-primary fs-4 btn"
                  data-bs-target="#exampleModal"
                ></i>
              </button>
              <Link to={`/edit-contact/${v.id}`}>
                <i
                  title="edit"
                  className="fa fa-edit text-primary fs-4 btn"
                  onClick={() => setLocalStorage(v.name, v.email, v.img)}
                ></i>
              </Link>
              <i
                title="delete"
                className="fa fa-trash text-danger fs-4 btn"
                onClick={() => deleteHandler(v.id)}
              ></i>
            </span>
          </li>
        ))}
      </ul>
      {/* Detail model */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Contact detail
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <img
                className="conDetail mb-4"
                src={conDetail.img}
                alt=""
                srcset=""
              />
              <table>
                <tbody>
                  <tr>
                    <th>Id: </th>
                    <td>{conDetail.id}</td>
                  </tr>
                  <tr>
                    <th>Name: </th>
                    <td>{conDetail.name}</td>
                  </tr>
                  <tr>
                    <th>Email: </th>
                    <td>{conDetail.email}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* end */}
    </div>
  );
}
