import React, { useState } from "react";
import Bar from "../components/Bar";
import { url } from "../components/Variable";
import { useLocation } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import { ColorRing } from 'react-loader-spinner'
import Copyright from "../components/Copyright";
var _ = require('lodash');

const Highlighted = ({ text = '', highlight = '' }) => {
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${_.escapeRegExp(highlight)})`, 'gi')
  const parts = text.split(regex)
  return (
    <span>
      {parts.filter(part => part).map((part, i) => (
        regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
      ))}
    </span>
  )
}
export default function Sresult() {
  const loction = useLocation();
  // console.log("location", loction);
  const WordSave = loction.state?.Word;
  const criteria = loction.state?.criteria

  const [ScreenChange, setScreenChange] = useState(true);
  const [File, setFile] = useState([]);
  const [Data, SetData] = useState({});
  const [page, setpage] = useState(1)
  const [data, setData] = useState([])
  const [numberOfPages, setnumberOfPages] = useState(1)
  const [showLoader, setshowLoader] = useState(false)
  const [totalHits, setTotalHits] = useState(0)
  const [selectedFilename, setselectedFilename] = useState('')
  const [fileText,setFileText] = useState("");
  React.useEffect(() => {
    getCorpusFiles();
    searchWord(page, WordSave, criteria)
  }, []);
  const searchWord = (page = 1, word = '', criteria = 'all') => {
    if (word.length > 0) {
      setshowLoader(true)
      fetch(`${url}/corpus/searchWord/${page}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          word: word,
          criteria
        })
      }).then(res => res.json())
        .then((response) => {
          setshowLoader(false)
          // after
          if (response.message === 'Success') {
            console.log('Data received search word --->', response);
            setData(response.doc.occurrence)
            setnumberOfPages(response.doc.numberOfPages)
            setTotalHits(response.doc.count)
            // setIsLoading(false)
            //  navigation('/Sresult' ,{state: {rehman : response.doc,Word:Word,criteria:"all"}})

            // setData(response.doc);
          }

        })
        .catch((error) => {
          setshowLoader(false)
          console.log(error);
        });
    }
    else {

    }
  }
  const getCorpusFiles = async (e) => {
    // setIsLoading(true)
    // console.log('criteria--->',criteria)
    fetch(`${url}/corpus/corpusFiles/${criteria !== undefined ? criteria : "all"}`)
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

  const getFileText = async (item) => {
    if (item.filePath) {
      try {
        setshowLoader(true)
        const request = await fetch(`${url}/corpus/getFileText?filepath=${item.filePath}`)
        const response = await request.json()
        if (response.message === "Success") {
          const {text} = response.doc
          setFileText(text)
          setshowLoader(false)
        }
        else{
          setshowLoader(false)
          alert(response.error)
        }
      } catch (error) {
        setshowLoader(false)
        alert(error)
      }
    }
  }
  return (
    <div>
      <Bar />
      <div style={{ backgroundColor: "#f0faef" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-sm-4 p-5">
              <h3 className="d-flex justify-content-center">Files</h3>
              <div className="pt-3 border border-2 p-2 border-success pb-3">
                <h5 className="">File Name (Click to Open)</h5>
                <br />
                <table class="table table-hover" style={{ cursor: "pointer" }}>
                  <tbody>
                    {File?.map((item) => {
                      return (
                        <tr
                          onClick={() => {
                            setFileText("")
                            getFileText(item)
                            SetData(item);
                            setScreenChange(false);
                            setselectedFilename(item.fileName)
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
              <div style={{ display: "flex", justifyContent: 'space-between' }}>
                <div className="float-start col-md-4 col-sm-4">
                  <p>Word: <strong className="text-danger"> {WordSave}</strong></p>
                  <p>Total Hits: <strong className="text-danger"> {totalHits}</strong></p>
                </div>
                <Pagination count={numberOfPages} page={page} color="primary"
                  onChange={(e, value) => {
                    setpage(value)
                    setshowLoader(true)
                    searchWord(value, WordSave, criteria)
                    // loadData(WordSave, value)
                    // load(WordSave)
                  }} />
              </div>
              <div className="pt-3 border border-2 p-2 border-success pb-3">
                {ScreenChange === false && <a href="#" onClick={e => {
                  e.preventDefault()
                  setScreenChange(true)
                  setselectedFilename('')
                  setFileText("")
                }}>Go Back</a>}
                <h5 className="d-flex justify-content-center">{selectedFilename.length > 0 ? selectedFilename : "Search Results"}</h5>
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

                  {showLoader == false && <tbody>
                    {ScreenChange === true &&
                      data.length > 0 && data.map((a, index) => {
                        return (
                          <tr>
                            <td>{index + 1}</td>
                            <td><Highlighted text={a.complete} highlight={WordSave} /></td>
                          </tr>
                        );
                      })}
                    {ScreenChange === false && (
                      <tr>
                        {/* <td></td> */}
                        {/* <td>{Data.text}</td> */}
                        {fileText.length>0 && <td>{fileText}</td>}

                      </tr>
                    )}
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

              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <footer style={{ textAlign: 'center' }}>
        <span style={{ color: "#b03e41" }}>
          Last Updated: 20 September, 2022.{"    "}PakLocCorp. Copyrights &copy; pakloccorp.com

        </span>
      </footer> */}

      <Copyright />
    </div>
  );
}
