import React from "react";

export default function Login() {
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-center pt-4">
          <div className="col-md-6 col-sm-6">
            <div className="border border-success border-2 p-2">
              <form className="p-2">
                {/* Email input */}
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
                    id="loginName"
                    className="form-control"
                    placeholder="Enter Email"
                  />
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="loginPassword"
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
                {/* 2 column grid layout */}
                <div className="row mb-4">
                  <div className="col-md-6 d-flex justify-content-center">
                    {/* Checkbox */}
                    <div className="form-check mb-3 mb-md-0">
                      <input
                        className="form-check-input"
                        style={{
                          backgroundColor: "#5db959",
                          borderColor: "#5db959",
                        }}
                        type="checkbox"
                        defaultValue
                        id="loginCheck"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="loginCheck">
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    {/* Simple link */}
                    <a href="/Forgot">Forgot password?</a>
                  </div>
                </div>
                {/* Submit button */}
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-block mb-4 text-white"
                    style={{ backgroundColor: "#5db959" }}
                  >
                    Sign in
                  </button>
                  {/* Register buttons */}
                </div>
                <div className="text-center">
                  <p>
                    You Can Register? <a href="/Register">Register</a>
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
