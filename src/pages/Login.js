import React from "react";

export default function Login() {
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
                    type="email"
                    className="form-control"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="row mb-4">
                  <div className="col-md-6 d-flex justify-content-center">
                    <div className="form-check mb-3 mb-md-0">
                      <input
                        className="form-check-input"
                        style={{
                          backgroundColor: "#5db959",
                          borderColor: "#5db959",
                        }}
                        type="checkbox"
                        defaultValue
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="loginCheck">
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <a href="/Forgot">Forgot password?</a>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-block mb-4 text-white"
                    style={{ backgroundColor: "#5db959" }}
                  >
                    Sign in
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    Register? <a href="/Register">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
