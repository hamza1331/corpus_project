import React from "react";
import { Link } from "react-router-dom";
import Bar from "../components/Bar";

export default function Concordance() {
  return (
    <div>
      <Bar />

      <div style={{ backgroundColor: "#f0faef", height: "100%" }}>
        <div className="container">
          <div className="d-flex justify-content-center p-2 pt-5 pb-5">
            <div className="col-md-10 col-sm-10 bg-white d-flex justify-content-center">
              <div className="container">
                <br />

                <div className="justify-content-center">
                  <div className="container row">
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                      <label className="d-flex justify-content-center">
                        <strong>Left Word Number:</strong>
                      </label>
                      <select class="form-select form-select-lg-3">
                        <option value="all">--Select Number--</option>{" "}
                        <option value="fiction">Fiction</option>{" "}
                        <option value="articles">Articles</option>{" "}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className=" d-flex justify-content-center">
                        <strong>Right Word Number:</strong>
                      </label>
                      <select onChange={(e)=>console.log(e.target.value)} class=" form-select form-select-lg-3">
                        <option value="1323">--Select Number--</option>{" "}
                        <option value="fiction">Fiction</option>{" "}
                        <option value="articles">Articles</option>{" "}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <div className="col-md-4 pt-4">
                        <button
                          className="rounded border text-white form-control"
                          style={{ backgroundColor: "#5db959" }}
                        >
                          Sort
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container justify-content-center d-flex">
          <div className="col-md-11 col-sm-11 p-5">
            <div className="col-md-2">
              <Link to="/Search">
                <button className="rounded border text-white form-control bg-primary" style={{width:'100px'}}>
                  Go Back
                </button>
              </Link>
            </div>
            <br />
            <p>Searched Word</p>
            <div className="pt-3 border border-2 p-2 border-success pb-3">
              <h5 className="d-flex justify-content-center">Concordance</h5>
              <br />
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Left Text</th>
                    <th scope="col">Center Word</th>
                    <th scope="col">Right Text</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
