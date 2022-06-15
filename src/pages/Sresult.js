import React, { useState } from "react";
import Bar from "../components/Bar";
import { url } from "../components/Variable";
import { useLocation } from "react-router-dom";

export default function Sresult() {
  const loction = useLocation();
  console.log("location", loction);
  const abc = loction.state?.rehman?.occurrence;
  const wordcounts = loction.state?.rehman?.count;
  const WordSave = loction.state?.Word;

  const [ScreenChange, setScreenChange] = useState(true);
  const [File, setFile] = useState([]);
  const [Data, SetData] = useState({});

  React.useEffect(() => {
    Searchword();
  }, []);

  const Searchword = async (e) => {
    // setIsLoading(true)
    fetch(`${url}/corpus/corpusFiles/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("Files received search word --->", response);
        // after
        if (response.message === "Success") {
          // setIsLoading(false
          setFile(response.doc);
          // setData(response.doc);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <Bar />
      <div style={{ backgroundColor: "#f0faef" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-4 p-5">
              <h3 className="d-flex justify-content-center">Files</h3>
              <div className="pt-3 border border-2 p-2 border-success pb-3">
                <h5 className="">File Name</h5>
                <br />
                <table class="table table-hover" style={{ cursor: "pointer" }}>
                  <tbody>
                    {File?.map((item) => {
                      return (
                        <tr
                          onClick={() => {
                            SetData(item);
                            setScreenChange(false);
                          }}
                        >
                          <td>{item.fileName}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <br />
              </div>
            </div>

            <div className="col-md-8 col-sm-8 p-5">
              <div className="container row">
              &nbsp;
              
                <div className="float-start col-md-4 col-sm-4">
                  
                  <p>Search Word: {WordSave}</p>
                </div>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <div className="float-end col-md-4 col-sm-4">
                  
                      <p className="px-4">Word Count: {wordcounts}</p>
                  
                </div>
              </div>
              <div className="pt-3 border border-2 p-2 border-success pb-3">
                <h5 className="d-flex justify-content-center">Word List</h5>
                <br />
                <table class="table">
                  <thead>
                    {ScreenChange && (
                      <tr>
                        <th scope="col">Sr#</th>
                        <th scope="col">Text</th>
                      </tr>
                    )}
                  </thead>

                  <tbody>
                    {ScreenChange === true &&
                      abc?.map((a, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td>{a.complete}</td>
                          </tr>
                        );
                      })}
                    {ScreenChange === false && (
                      <tr>
                        {/* <td></td> */}
                        <td>{Data.text}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
