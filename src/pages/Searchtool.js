import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { url } from '../components/Variable'
export default function Searchtool() {
  const navigation = useNavigate();
  const [Word, setWord] = useState('');
  const [criteria, setCriteria] = useState('all')

  const Searchword = async (e) => {
    // setIsLoading(true)
    console.log('worddd-->', Word)
    if (Word.length > 0) {
      fetch(`${url}/corpus/searchWord`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          word: Word,
          criteria: criteria
        })
      }).then(res => res.json())
        .then((response) => {

          // console.log('Data received search word --->', response);
          // after
          if (response.message === 'Success') {
            // setIsLoading(false)
            navigation('/Sresult', { state: { rehman: response.doc, Word: Word, criteria } })

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
  const searchConcordance = async (e) => {
    // setIsLoading(true)
    console.log('worddd-->', Word)
    if (Word.length > 0) {
      fetch(`${url}/corpus/searchConcordance`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          word: Word,
          criteria: criteria,
          LN: 6,
          RN: 6
        })
      }).then(res => res.json())
        .then((response) => {

          // console.log('Data received search word --->', response);
          // after
          if (response.message === 'Success') {
            // setIsLoading(false)
            navigation('/Concordance', { state: { rehman: response.doc, Word: Word, criteria } })

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

  const searchKeywordfreq = async (e) => {
    // setIsLoading(true)
    console.log('worddd-->', Word)
    if (Word.length > 0) {
      fetch(`${url}/corpus/wordFrequency`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          word: Word,
          criteria: criteria
        })
      }).then(res => res.json())
        .then((response) => {

          // console.log('Data received search word --->', response);
          // after
          if (response.message === 'Success') {
            // setIsLoading(false)
            navigation('/Keywordf', { state: { rehman: response.doc, Word: Word, criteria } })

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

  const searchKWIC = async (e) => {
    // setIsLoading(true)
    console.log('worddd-->', Word)
    if (Word.length > 0) {
      fetch(`${url}/corpus/findKWIC`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          word: Word,
          criteria: criteria
        })
      }).then(res => res.json())
        .then((response) => {

          // console.log('Data received search word --->', response);
          // after
          if (response.message === 'Success') {
            // setIsLoading(false)
            navigation('/Kwic', { state: { rehman: response.doc, Word: Word, criteria } })

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
                    value={Word}
                    onChange={(t) => setWord(t.target.value)}
                    placeholder="search"
                    className="form-control"
                  />{" "}
                </div>
                &nbsp;
                <div className="col-md-1">

                  <select onChange={(e) => {
                    // console.log('option--->',e.target.value)
                    setCriteria(e.target.value)
                  }} class="form-select">
                    <option value="all">All</option>{" "}
                    <option value="fiction">Fiction</option>{" "}
                    <option value="news">News Editorials</option>{" "}
                    <option value="articles">Articles</option>{" "}
                  </select>
                </div>
              </div>
              <br />

              <div className="d-flex justify-content-center container">
                <div className="d-grid gap-2 d-md-block">
                  <button class="btn text-white"
                    style={{ backgroundColor: "#5db959" }}
                    onClick={() => Searchword()}
                  >
                    SEARCH
                  </button>
                  {" "}
                  <button
                    class="btn btn-primary"
                    onClick={() => searchConcordance()}
                  >
                    CONCORDANCE
                  </button>
                  {" "}
                  <button class="btn text-white"
                    style={{ backgroundColor: "#5db959" }}
                    onClick={() => searchKWIC()}
                  >
                    KWIC
                  </button>
                  {" "}
                  <button class="btn btn-primary"
                  onClick={()=>searchKeywordfreq()}
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
                      <option value="news">News Editorials</option>{" "}
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
