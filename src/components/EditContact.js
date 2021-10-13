import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function EditContact() {
  const url = "http://localhost:3004/contacts";
  const [info, setInfo] = useState({
    name: "",
    email: "",
  });
  const [fileInfo, setFileInfo] = useState("");

  let { id } = useParams();

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

  function EditConHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("form_data", fileInfo);
    const data = JSON.stringify({
      name: info.name,
      email: info.email,
      img: formData,
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: data,
      redirect: "follow",
    };

    fetch(url + "/" + id, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        alert("Contact updated");
        console.log("result", result);
      })
      .catch((error) => console.log("error", error));
  }
  useEffect(() => {
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const img = localStorage.getItem("img");
    setInfo({ name: name, email: email });
  }, []);
  return (
    <div>
      <h3>Update Contact : {id}</h3>
      <form onSubmit={(e) => EditConHandler(e)}>
        <div class="mb-3">
          <label for="nameCon" class="form-label">
            Name
          </label>
          <input
            type="text"
            class="form-control"
            id="nameCon"
            name="name"
            value={info.name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div class="mb-3">
          <label for="emailCon" class="form-label">
            Email address
          </label>
          <input
            type="email"
            class="form-control"
            id="emailCon"
            name="email"
            value={info.email}
            onChange={handleChange}
          />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="fileCon" class="form-label">
            Image
          </label>
          <input
            type="file"
            class="form-control"
            id="fileCon"
            name="img"
            value={info.img}
            onChange={(e) => fileHandler(e)}
          />
        </div>
        <button type="submit" class="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
}
