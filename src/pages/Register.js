import React from "react";

export default function Register() {
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-center pt-4">
          <div className="col-md-6 col-sm-6">
            <div className="border border-success border-2 p-2">
              <form className="p-2">
                <div className="d-flex justify-content-center pt-4 pb-4">
                  <img
                    src="https://odoo-ai.com/pakloccorp/pakloc-removebg-preview.png"
                    alt="logo"
                    width="120"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="loginName"
                    className="form-control"
                    placeholder="Enter Email"
                  />
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-block mb-3 text-white"
                    style={{ backgroundColor: "#5db959" }}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
