import React from "react";
import { Link} from "react-router-dom";
import { url } from "../components/Variable";
import { useLocation } from "react-router-dom";
import Bar from "../components/Bar";

export default function Keywordf() {

  const loction = useLocation();
  const abc = loction.state?.rehman?.frequency;
  const word = loction.state?.Word;
  return (
    <div>
      <Bar />

      <div style={{ backgroundColor: "#f0faef", height: "100vh" }}>
        <div className="container justify-content-center d-flex">
          <div className="col-md-11 col-sm-11 p-5">
            <div className="col-md-2 pt-4">
              <Link to="/Search">
                <button className="rounded border text-white form-control bg-primary" style={{width:'100px'}}>
                  Go Back
                </button>
              </Link>
            </div>
            <br />
            <p>Searched Word: {" "}</p>
            <div className="pt-3 border border-2 p-2 border-success pb-3">
              <h5 className="d-flex justify-content-center">Word Frequency</h5>
              <br />
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Sr#</th>
                    <th scope="col">Word</th>
                    <th scope="col">Frequency</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>{word}</td>
                    <td>{abc}</td>
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
