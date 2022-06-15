import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Searchtool() {
    const navigation = useNavigate();
  return (
    <div style={{ backgroundColor: "#f0faef", height: "100vh" }}>
      <div className="container">
        <div className="d-flex justify-content-center p-2 pt-5 pb-5">
          <div className="col-md-10 col-sm-10 bg-white d-flex justify-content-center">
            <div className="container">
              <br />
              <div className="d-flex justify-content-center">
                <span className="px-1 d-flex align-items-center">Find:</span>
                <div>
                  
                <input
                  placeholder="search"
                  className="form-control"
                />{" "}
                </div>
                &nbsp;
                <div className="col-md-1">

                <select class="form-select">
                  <option value="all">All</option>{" "}
                  <option value="fiction">Fiction</option>{" "}
                  <option value="articles">Articles</option>{" "}
                </select>
                </div>
              </div>
              <br />

              <div className="d-flex justify-content-center container">
                <div className="d-grid gap-2 d-md-block">
                  <button class="btn text-white" 
                  style={{ backgroundColor: "#5db959" }}
                  onClick={()=>navigation('/Sresult')}
                  >
                    SEARCH
                    </button>
                  {" "}
                  <button
                    class="btn btn-primary"
                    onClick={()=>navigation('/Concordance')}
                  >
                    CONCORDANCE
                  </button>
                  {" "}
                  <button class="btn text-white"
                  style={{ backgroundColor: "#5db959" }}
                  onClick={()=>navigation('/Kwic')}
                  >
                    KWIC
                  </button>
                  {" "}
                  <button class="btn btn-primary"
                  onClick={()=>navigation('/Keywordf')}
                  >
                    KEYWORD FREQUENCY
                  </button>
                </div>
              </div>

              <br />

              <div className="justify-content-center">
                <div className="container row">
                  <div className="col-md-3"></div>
                  <div className="col-md-3">
                    <label className="d-flex justify-content-center">
                      <strong>Writer:</strong>
                    </label>
                    <select class="form-select form-select-lg-3">
                      <option value="all">--Writer--</option>{" "}
                      <option value="fiction">Fiction</option>{" "}
                      <option value="articles">Articles</option>{" "}
                    </select>
                  </div>
                  <div className="col-md-3">
                    <label className=" d-flex justify-content-center">
                      <strong>Category:</strong>
                    </label>
                    <select class=" form-select form-select-lg-3">
                      <option value="all">--Category--</option>{" "}
                      <option value="fiction">Fiction</option>{" "}
                      <option value="articles">Articles</option>{" "}
                    </select>
                  </div>
                  <div className="col-md-3"></div>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
