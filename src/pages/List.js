import React from "react";
import Bar from "../components/Bar";

export default function List() {
  return (
    <div>
      <div className="container">
        <br />
        <br/>
        <div>
          <h1>Browse the Dictionary</h1>
          <hr />
          
        </div>
        <br />
        <div className="pt-4 d-flex justify-content-center">
          <div class="bg-white p-2 w-75 ">
            <div className="d-flex justify-content-center">
              <input
                placeholder="Search Word"
                className="m-1 rounded border w-75"
              />
              <button
                className="p-1 px-5 rounded border text-white"
                style={{ backgroundColor: "#5db959" }}
              >
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        {/* <div>
            <ul class="list-inline ">
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>A</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>B</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>C</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>D</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>E</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>F</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>G</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>H</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>I</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>J</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>K</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>L</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>M</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>N</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>O</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>P</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>Q</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>R</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>S</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3'>T</li>
               
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>U</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>V</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>W</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>X</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>Y</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>Z</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-2 mb-2'>0-9</li>
            </ul>
        </div> */}
        <br/>
        <div>

 <h3>Academic Word &nbsp; <i class="fa fa-graduation-cap" aria-hidden="true"></i></h3>
 
        </div>
        <br />
        <h5 style={{marginLeft:'140px'}}>Entries:</h5>
          <div className="container col-lg-9 col-sm-9 col-md-9 border border-2" style={{borderRadius:'5px'}}>
            <div className="row">
              <div
                className="col-md-6 col-sm-6 "
                style={{ backgroundColor: "#eeeeee", width: "100v" }}
              >
                <br />

                <div>
                  <ul className="px-5 list-unstyled ">
                    <div className="justify-content-center px-5">
                      <li className="py-1">
                        <span
                          type="button"
                          class="btn btn-block px-5 text-white"
                          style={{ backgroundColor: "#07255e" }}
                        >
                          Subtitle 1
                        </span>
                      </li>
                      <li className="py-1">
                        <span
                          type="button"
                          class="btn btn-block px-5"
                          style={{ color: "#216bbd" }}
                        >
                          <strong>Subtitle 2</strong>
                        </span>
                      </li>
                      <li className="py-1">
                        <span
                          type="button"
                          class="btn btn-block px-5 "
                          style={{ color: "#216bbd" }}
                        >
                          <strong>Subtitle 3</strong>
                        </span>
                      </li>
                      <li className="py-1">
                        <span
                          type="button"
                          class="btn btn-block px-5"
                          style={{ color: "#216bbd" }}
                        >
                          <strong>Subtitle 4</strong>
                        </span>
                      </li>
                      <li className="py-1">
                        <span
                          type="button"
                          class="btn btn-block px-5"
                          style={{ color: "#216bbd" }}
                        >
                          <strong>Subtitle 5</strong>
                        </span>
                      </li>
                      <li className="py-1">
                        <span
                          type="button"
                          class="btn btn-block px-5"
                          style={{ color: "#216bbd" }}
                        >
                          <strong>Subtitle 6</strong>
                        </span>
                      </li>
                      <li className="py-1">
                        <span
                          type="button"
                          class="btn btn-block px-5"
                          style={{ color: "#216bbd" }}
                        >
                          <strong>Subtitle 7</strong>
                        </span>
                      </li>
                      <li className="py-1">
                        <span
                          type="button"
                          class="btn btn-block px-5"
                          style={{ color: "#216bbd" }}
                        >
                          <strong>Subtitle 8</strong>
                        </span>
                      </li>
                    </div>
                  </ul>
                </div>
              </div>
              <div
                className="col-md-6 col-sm-6"
                style={{ background: "#eeeeee", height:'80px'}}
              >
                <br />

                <div>
                  <nav aria-label="Page navigation example" className="">
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Previous">
                          <span aria-hidden="true" className="text-success">
                            «
                          </span>
                          <span className="sr-only text-success">Previous</span>
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link text-success" href="#">
                          1
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link text-success" href="#">
                          2
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link text-success" href="#">
                          3
                        </a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" aria-label="Next">
                          <span aria-hidden="true" className="text-success">
                            »
                          </span>
                          <span className="sr-only text-success">Next</span>
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>

                <ul className="list-unstyled">
                  <div className="" style={{paddingLeft:'100px'}}>
                    <li className="py-2">
                      <strong>
                        <a style={{ color: "#216bbd" }}>Inconsistency</a>
                      </strong>
                    </li>
                    <li className="py-2">
                      <strong>
                        <a style={{ color: "#216bbd" }}>Analyse</a>
                      </strong>
                    </li>
                    <li className="py-2">
                      <strong>
                        <a style={{ color: "#216bbd" }}>Analysis</a>
                      </strong>
                    </li>
                    <li className="py-2">
                      <strong>
                        <a style={{ color: "#216bbd" }}>Analyst</a>
                      </strong>
                    </li>
                    <li className="py-2">
                      <strong>
                        <a style={{ color: "#216bbd" }}>Analytic</a>
                      </strong>
                    </li>
                    <li className="py-2">
                      <strong>
                        <a style={{ color: "#216bbd" }}>Analytical</a>
                      </strong>
                    </li>
                    <li className="py-2">
                      <strong>
                        <a style={{ color: "#216bbd" }}>Analytically</a>
                      </strong>
                    </li>
                    <li className="py-2">
                      <strong>
                        <a style={{ color: "#216bbd" }}>approachable</a>
                      </strong>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        <br />
        <br />
      </div>
    </div>
  );
}
