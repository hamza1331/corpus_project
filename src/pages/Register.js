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
                    className="form-control"
                    placeholder="Enter Email"
                  />
                </div>
<div className="form-outline mb-4">

                <select class="form-select" aria-label="Default select example">
  <option selected>--SELECT--</option>
  <option value="1">AFGHANISTAN</option>
  <option value="2">ALBANIA</option>
  <option value="3">PAKISTAN</option>
</select>
</div>
                

                <div className="form-outline mb-4">
                <div className="form-outline mb-4">
                  <input
                    type="select"
                    className="form-control"
                    placeholder="Please Select Category"
                    readOnly
                  />
                </div>
                <div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
          <label className="form-check-label" htmlFor="flexRadioDefault1">
            University professor: languages / linguistics
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
          Graduate student: languages or linguistics
          </label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
          <label className="form-check-label" htmlFor="flexRadioDefault2">
          University professor: not languages / linguistics
          </label>
        </div>
      </div>
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
