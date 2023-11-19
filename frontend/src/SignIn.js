import React from "react";
import { Link } from "react-router-dom";

function SignIn() {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const userName = document.getElementById("exampleInputUserName1").value;
    const password = document.getElementById("exampleInputPassword1").value;

    const url = "http://localhost:3000/auth/login";
    const data = {
      userName: userName,
      password: password,
    };

    console.log("body data", data);

    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.message);
        }
      })
      .then((data) => {
        if (data.success) {
          console.log("Success", data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userName", data.userName);
          localStorage.setItem("userId", data._id);
          localStorage.setItem("name", data.name);

          window.location.href = "http://localhost:3000/";
        } else {
          alert(data.message);
        }
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="SignIn">
      <form>
        <div class="mb-3">
          <label for="exampleInputUserName1" class="form-label">
            User Name
          </label>
          <input
            type="textNumber"
            class="form-control"
            id="exampleInputUserName1"
            aria-describedby="userNameHelp"
            required
          />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">
            Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            required
          />
        </div>
        <div class="signin-actions">
          <Link to={"/"}>
            <button class="signin-action-buttons btn btn-secondary">
              Back
            </button>
          </Link>
          <button
            type="submit"
            onClick={(event) => handleSubmit(event)}
            class="signin-action-buttons btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
