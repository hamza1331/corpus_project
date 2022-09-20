import React,{useEffect,useState} from "react";
import { Link} from "react-router-dom";
import { url } from "../components/Variable";
import { useLocation } from "react-router-dom";
import Bar from "../components/Bar";
import Pagination from '@mui/material/Pagination';
import { ColorRing } from 'react-loader-spinner'
export default function Keywordf() {
  const loction = useLocation();

  // console.log("location", loction);
  const criteria = loction.state?.criteria
  const [ScreenChange, setScreenChange] = useState(true);
  const [File, setFile] = useState([]);
  const [Data, SetData] = useState({});
  const [selectedFileIndex, setselectedFileIndex] = useState(-1)
  const [page, setpage] = useState(1)
  const [data, setData] = useState([])
  const [numberOfPages, setnumberOfPages] = useState(1)
  const [showLoader, setshowLoader] = useState(false)
  const [totalHits, setTotalHits] = useState(0)
  const [selectedFilename, setselectedFilename] = useState('')
  const abc = loction.state?.rehman?.frequency;
  const word = loction.state?.Word;

  useEffect(()=>{
    getCorpusFiles()
  },[])
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
  const getFileFrequency = (fileName='')=>{
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    fetch(url+"/corpus/fileWordFrequency?filepath="+fileName, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('frequency ----> ',result)
        if(result.message==='Success'){
          setData(result.doc.wordList)
        }
      })
      .catch(error => console.log('error', error));
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
                    {File?.map((item,index) => {
                      return (
                        <tr
                          onClick={() => {
                            setselectedFilename(item.fileName)
                            getFileFrequency(item.fileName)
                            setselectedFileIndex(index)
                          }}
                        >
                          <td style={{backgroundColor:selectedFileIndex===index?"lightblue":"transparent"}}>{item.fileName}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <br />
              </div>
            </div>

            <div className="col-md-8 col-sm-8 p-5">
              
              <div className="pt-3 border border-2 p-2 border-success pb-3">
                <h5 className="d-flex justify-content-center">{selectedFilename.length > 0 ? selectedFilename : "Word List"}</h5>

                <br />
                {showLoader===false && data.length===0 && <h4 style={{textAlign:"center"}}>Select file to show word list</h4>}
                <br/>
                <table class="table">
                  <thead>
                    {ScreenChange && (
                      <tr>
                        <th scope="col">Word</th>
                        <th scope="col">Frequency</th>
                        <th scope="col">Rank</th>
                      </tr>
                    )}
                  </thead>

                  {showLoader == false && <tbody>
                    {ScreenChange === true &&
                      data.length > 0 && data.map((a, index) => {
                        return (
                          <tr>
                            <td>{a.key}</td>
                            <td>{a.value}</td>
                            <td>{index + 1}</td>
                          </tr>
                        );
                      })}
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
      <footer style={{textAlign:'center'}}>
        <span style={{ color: "#b03e41"}}>
      Last Updated: 20 September, 2022.{"    "}PakLocCorp. Copyrights &copy; pakloccorp.com
        </span>
      </footer>
    </div>
  );
}
