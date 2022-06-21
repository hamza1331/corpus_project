import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Bar from "../components/Bar";

export default function Downloaddata() {
  return (
    <div>
      <Bar />
      <div style={{ backgroundColor: "#f0faef", height: "100vh" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 p-5">
              <div className="pt-3 border border-2 p-2 border-success pb-3">
                <h5 className="d-flex justify-content-center">
                  Search Results
                </h5>
                <br />
                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Corpus</th>
                        <th scope="col">Size</th>
                        <th scope="col">Time</th>
                        <th scope="col">Genre</th>
                        <th scope="col">Frequency (Urduised words)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                        <td>Cell</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
