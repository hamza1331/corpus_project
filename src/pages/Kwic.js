import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Bar from '../components/Bar'
import { url } from "../components/Variable";
import { useLocation } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import { ColorRing } from 'react-loader-spinner'

export default function Kwic() {
  const loction = useLocation();
  // console.log("location", loction);
  const WordSave = loction.state?.Word;
  const criteria = loction.state?.criteria
  const [page, setpage] = useState(1)
  const [data, setData] = useState([])
  const [showText, setshowText] = useState(false)
  const [filepath, setfilepath] = useState('')
  const [fileText, setfileText] = useState('')
  const [numberOfPages, setnumberOfPages] = useState(1)
  const [showLoader, setshowLoader] = useState(false)
  const [totalHits, setTotalHits] = useState(0)

  const loadData = (word = WordSave, page = 1) => {
    if (word !== undefined && word !== null) {
      if (word.length > 0) {
        setshowLoader(true)
        fetch(`${url}/corpus/findKWIC/${page}`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            word: word,
            criteria: criteria !== undefined ? criteria : "all"
          })
        }).then(res => res.json())
          .then((response) => {
            // console.log('kwicc -->', response)
            setshowLoader(false)
            // console.log('Data received search word --->', response);
            // after
            if (response.message === 'Success') {
              setnumberOfPages(response.doc.numberOfPages)
              setData(response.doc.results)
              setTotalHits(response.doc.count)
              // setIsLoading(false)
              // navigation('/Kwic', { state: { rehman: response.doc, Word: Word, criteria } })

              // setData(response.doc);
            }

          })
          .catch((error) => {
            setshowLoader(false)
            console.log(error);
          });
      }
    }
  }
  useEffect(() => {
    loadData(WordSave)
  }, [])
  return (
    <div>
      <Bar />


      <div style={{ backgroundColor: "#f0faef", height: "100%" }}>


        <div className='container justify-content-center d-flex'>
          <div className='col-md-11 col-sm-11 p-5'>
            <div className='col-md-2 pt-4'>
              <Link to='/Search'>

                <button className='rounded border text-white form-control bg-primary' style={{ width: '100px' }}>Go Back</button>
              </Link>
            </div>
            <br />
            <div style={{ display: "flex", justifyContent: 'space-between' }}>
            <div className="float-start col-md-4 col-sm-4">
                  <p>Word: <strong className="text-danger"> {WordSave}</strong></p>
                  <p>Total Hits: <strong className="text-danger"> {totalHits}</strong></p>
                </div>
              <Pagination count={numberOfPages} page={page} color="primary"
                onChange={(e, value) => {
                  setpage(value)
                  setshowLoader(true)
                  loadData(WordSave, value)
                  // load(WordSave)
                }} />
            </div>
            <div className='pt-3 border border-2 p-2 border-success pb-3' >
              <h3 className='d-flex justify-content-center'>KWIC</h3>
              <br />
              {showLoader === false && showText === false && <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Text From File</th>
                    <th scope="col">Left Text</th>
                    <th scope="col">Center Word</th>
                    <th scope="col">Right Text</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 && data.map((item, index) => <tr>
                    <th scope="row"><a href='#' onClick={e => {
                      e.preventDefault()
                      setshowLoader(true)
                      fetch(url + '/corpus/getFileText', {
                        method: "POST",
                        body: JSON.stringify({
                          filepath: item.filename
                        }),
                        headers: {
                          'Content-Type': 'application/json',
                          'Accept': 'application/json',
                        }
                      })
                        .then(res => res.json())
                        .then(response => {
                          setshowLoader(false)
                          console.log('text response --->', response)
                          if (response.message == 'Success') {
                            setshowText(true)
                            setfileText(response.doc.text)
                          }
                        }).catch(err => {
                          console.log("Can't get file  ---> ", err)
                          setshowLoader(false)
                        })
                    }}>{item.filename}</a></th>
                    <td><RenderText text={item.preText} /></td>
                    <td style={{color:'red',fontWeight:'bold'}}>{WordSave}</td>
                    <td>{item.postText}</td>
                  </tr>)}

                </tbody>
              </table>}
              {showLoader === true && <ColorRing
                visible={showLoader}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{ marginLeft: '50%' }}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />}
              {showText === true && showLoader === false &&
                <div>
                  <span onClick={e => {
                    e.preventDefault()
                    setfileText('')
                    setfilepath('')
                    setshowText(false)
                  }} style={{ color: 'blue', textDecoration: 'underline', paddingLeft: "10" }}>Go Back {"     "} </span>
                  <p style={{ textAlign: "center", fontWeight: 'bolder', fontSize: 18 }}>{filepath}</p>
                  <p style={{ padding: 20, textAlign: 'justify' }}>{fileText}</p>
                </div>}
            </div>
          </div>
        </div>
      </div>
      <footer style={{ textAlign: 'center' }}>
        <span style={{ color: "#b03e41" }}>
          Last Updated: 19th Sept, 2022.{"    "}PakLocCorp. Copyrights &copy; pakloccorp.com

        </span>
      </footer>
    </div>
  )
}

function RenderText({ text }) {
  const arr = text.split(' ')
  return (
    <span>
      {arr.map((st, ind) => <span>{st + " "}</span>)}
    </span>
  )
}
