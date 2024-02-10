import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Bar from "../components/Bar";
import { url } from "../components/Variable";
import { ColorRing } from 'react-loader-spinner';
import Copyright from "../components/Copyright";
export default function Downloaddata() {
  const [data, setdata] = useState([])
  const [isLoggedIn, setIsloggedIn] = useState(false)
  const [showLoader, setshowLoader] = useState(false)
  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  useEffect(() => {
    let data = localStorage.getItem('corpusUserData')
    if (data !== null) {
      setIsloggedIn(true)
    }
    setshowLoader(true)
    fetch(url + '/corpus/downloadCorpus')
      .then((res) => res.json())
      .then(response => {
        setshowLoader(false)
        if (response.message === 'Success') {
          setdata(response.doc)
        }
      })
  }, [])
  const downloadFile = (e) => {
    if(isLoggedIn){
      window.open(url+'/corpus/getCorpusFile/'+e.target.innerText.toLowerCase(),'_blank')
    }
  }
  return (
    <div>
      <Bar />
      <div style={{ backgroundColor: "#f0faef", height: "100vh" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 p-5">
              <div className="pt-3 border border-2 p-2 border-success pb-3">
                <h5 className="d-flex justify-content-center">
                  Download Corpus Data
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
                    {showLoader===false && <tbody>
                      {data.length > 0 && data.map((corp) => <tr>
                        <td className={isLoggedIn===true?"downloadable":"notDownloadable"} onClick={downloadFile} style={{
                          color: isLoggedIn === true ? "blue" : "black",
                          textDecoration: isLoggedIn === true ? "underline" : ""
                        }}>{toTitleCase(corp.name)}</td>
                        <td>{corp.noOfWords + " words (" + corp.size + " sentences)"}</td>
                        <td>{corp.time}</td>
                        <td>{corp.genre}</td>
                        <td>{corp.frequency + "%"}</td>
                      </tr>)}
                    </tbody>}
                    {showLoader === true && <ColorRing
                visible={showLoader}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{ marginLeft: '50%' }}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />}
                  </table>
                    <br/>
                {isLoggedIn===false && <h6 style={{marginLeft:10}}>*User must login to access and download corpus data</h6>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <footer style
      ={{textAlign:'center'}}>
      <span style={{ color: "#b03e41"}}>
      Last Updated: 20 September, 2022.{"    "}PakLocCorp. Copyrights &copy; pakloccorp.com 
          
        </span>
      </footer> */}
      <Copyright/>
    </div>
  );
}
