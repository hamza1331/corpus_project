import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Bar from "../components/Bar";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

import { url } from "../components/Variable";
import { useLocation } from "react-router-dom";
export default function Home() {
  const navigation = useNavigate();
  const [Word, setWord] = useState('');
  const [data, setData] = useState(null)
  const [searchWord, setSearchWord] = useState('')
  const [wordDescription,setWordDescription] = useState('')
  const [showConcordance,setShowConcordance] = useState(false)
  const [concordanceResults, setconcordanceResults] = useState([])
  useEffect(() => {
    getUDWords()
  }, [])
  const getUDWords = async () => {
    fetch(`${url}/corpus/getUdWords`)
      .then(res => res.json())
      .then(response => {
        if (response.message === 'Success') {
          // console.log('response--->', response.doc)
          setData(response.doc)
          
        }
      })
  }
  const searcUDhWord = () => {
    /**
     Examples:

      Gohar noun
      Azaan noun 
      Betiyan
      Beti-yan noun plural
      Dadis
      Dadi-s    noun plural
      Kaala     adjective
      Sarees
      Saree-s noun plural
     */
    if(Word.length===0){
      alert('You must type in search field to get results')
    }
    else if (Word === 'Gohar') {
      setSearchWord(Word)
      setWordDescription('noun')
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'Azaan') {
      setSearchWord(Word)
      setWordDescription('noun')
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'Betiyan') {
      setSearchWord(Word)
      setWordDescription('Beti-yan noun plural')
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'Dadis') {
      setSearchWord(Word)
      setWordDescription('Dadi-s   noun plural')
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'Kaala') {
      setSearchWord(Word)
      setWordDescription('adjective')
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'Sarees') {
      setSearchWord(Word)
      setWordDescription('Saree-s noun plural')
      searchConcordance()
      setShowConcordance(true)
    }
    else {
      alert('POS not added for this word yet.')
    }
  }
  const searchConcordance = async () => {
    if (Word.length > 0) {
      fetch(`${url}/corpus/findKWIC`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          word: Word,
          criteria: 'all'
        })
      }).then(res => res.json())
        .then((response) => {

          // console.log('Data received search word --->', response);
          // after
          if (response.message === 'Success') {
            // setIsLoading(false)
            console.log('response--->',response.doc)
            if(response.doc.results.length>0){
              setconcordanceResults(response.doc.results)
            }else{
              alert('No results found for word: '+Word)
            }

            // setData(response.doc);
          }

        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      alert('You must type a word to search results')
    }
  }
  return (
    <div>
      <div
        style={{
          backgroundColor: "#f0faef",
          minWidth: "100%",
          minHeight: "100%",
          position: "absolute",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="pt-4 d-flex justify-content-center">
              <div class="bg-white p-2 w-75 ">
                <div className="d-flex justify-content-center">
                  <input
                    value={Word}
                    onChange={e => {
                      setWord(e.target.value)
                    }}
                    placeholder="Search Word"
                    className="m-1 rounded border w-75"
                  />
                  <button
                    className="p-1 px-5 rounded border text-white"
                    style={{ backgroundColor: "#5db959" }}
                    onClick={() => {
                      searcUDhWord()
                    }}
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 p-5 ">
              <div className="border border-2 p-2 border-success">
                {showConcordance===true && searchWord.length > 0 && <div>
                  <h3>Searched Word: {searchWord}</h3>
                  <h4 style={{color:"red"}}>({wordDescription})  </h4>
                </div>}
                <h5 className="p-3 justify-content-center d-flex">{showConcordance===false?"Urduized Words":"Concordance"}</h5>
                {showConcordance===false && <Table>
                  {data !== null && <Tbody>
                    {data !== null && Object.values(data).map((value) => <Tr>
                      {value.map((data) => <Td style={{ fontWeight: "bold" }}>{data}</Td>)}
                    </Tr>)}
                  </Tbody>}
                </Table>}
                {showConcordance===true && <div className='col-md-2 pt-4'>

                <button className='rounded border text-white form-control bg-primary' onClick={()=>{
                  setShowConcordance(false)
                  setWord('')
                }} style={{ width: '100px' }}>Go Back</button>

            </div>}
            <br/>
                {showConcordance===true && <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Text From File</th>
                    <th scope="col">Left Text</th>
                    <th scope="col">Center Word</th>
                    <th scope="col">Right Text</th>
                  </tr>
                </thead>
                <tbody>
                  {concordanceResults.length>0 && concordanceResults.map((item,index)=><tr>
                    <th scope="row">{item.filename}</th>
                    <td>{item.preText}</td>
                    <td>{Word}</td>
                    <td>{item.postText}</td>
                  </tr>)}

                </tbody>
              </table>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
