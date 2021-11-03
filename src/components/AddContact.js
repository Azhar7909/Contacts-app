import React, { useState } from "react";
import {Helmet} from "react-helmet";


export default function AddContact() {
  const url = "http://localhost:8000/contacts";
  const [info, setInfo] = useState({
    name: "",
    email: "",
  });
  const [fileInfo, setFileInfo] = useState("");

  const fileHandler = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0];
    setFileInfo(file);
  };

  const handleChange = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const addConHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("form_data", fileInfo);
    const data = JSON.stringify({
      id: Math.floor(Math.random() * 99999999999999),
      name: info.name,
      email: info.email,
      img: formData,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };

    fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("result", result);
        alert("Contact added");
        setInfo({ name: "", email: "", img: "" });
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>add new contact</title>
      </Helmet>
      <h3>Add Contact</h3>
      <form onSubmit={(e) => addConHandler(e)}>
        <div class="mb-3">
          <label for="nameCon" class="form-label">
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            class="form-control"
            id="nameCon"
            name="name"
            value={info.name}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div class="mb-3">
          <label for="emailCon" class="form-label">
            Email address <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            class="form-control"
            id="emailCon"
            name="email"
            value={info.email}
            onChange={handleChange}
            required
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="fileCon" class="form-label">
            Image(optional)
          </label>
          <input
            type="file"
            class="form-control"
            id="fileCon"
            name="img"
            onChange={(e) => fileHandler(e)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
