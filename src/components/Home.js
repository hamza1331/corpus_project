import React, { useState } from "react";
import "../Styles/Home.css";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from 'react-router-dom'
import {url} from './Variable'

export default function Home() {
  const [Word,setWord] = useState('');

  const navigation = useNavigate();
  const Searchword = async (e) => {
    // setIsLoading(true)
    fetch(`${url}/corpus/searchWord`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        word: Word,
        criteria:"all"
      })
    }).then(res => res.json())
      .then((response) => {

        console.log('Data received search word --->', response);
        // after
        if (response.message === 'Success') {
          // setIsLoading(false)
         navigation('/Sresult' ,{state: {rehman : response.doc,Word:Word,criteria:"all"}})
         
          // setData(response.doc);
        }

      })
      .catch((error) =>{
        console.log(error);
      });
  }
  return (
    <div style={{ backgroundColor: "#f0faef" }}>
      <div className="container">
        <div className="row">
          <div className="pt-4 d-flex justify-content-center">
            <div class="bg-white p-2 w-75 ">
              <div className="d-flex justify-content-center">
                <input
                  placeholder="Search topics"
                  className="m-1 rounded border w-75"
                  onChange={(e)=>setWord(e.target.value)}
                />
                <button
                  className="p-1 px-5 rounded border text-white"
                  style={{ backgroundColor: "#5db959" }}
                  onClick={()=>Searchword()}
                >
                  <i class="fa fa-search"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-6 p-5">
            <div className="pt-3 border border-2 p-2 border-success pb-3">
              <h6 className="p-3">
                PacLocCorp represents corpus of PakEng and it is a collection of
                text from multiple genres and registers. There are currently 800
                transcripts in total and 2 million words (1 million words per
                year). These collections are a window to the variations of
                English. It contains words from magazines, newspapers, fiction,
                academic texts and business emails. This corpus is expanding and
                open to contribution.
              </h6>
              <br />
            </div>
          </div>

          <div className="col-md-6 col-sm-6 p-5">
            <div className="pt-3 border border-success border-2">
              <div className="d-flex justify-content-center">
                <h5 className="pb-2">Categories</h5>
              </div>
              <div className="d-flex justify-content-center pb-4">
                <Scrollbars
                  style={{
                    height: "170px",
                    width: "280px",
                    paddingLeft: "19px",
                  }}
                  className="bg-white border border-2 border-black"
                >
                  <p>Fiction</p>
                  <p>Business Emails</p>
                  <p>Academics</p>
                  <p>New Editorial</p>
                  <p>Blogs</p>
                  <p>Chats</p>
                  <p>Email</p>
                  <p>All</p>
                </Scrollbars>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12 p-5 ">
            <div className="border border-2 p-2 border-success">
              <h5 className="p-3">How to search Corpus:</h5>
              <ul className="list-inline p-3">
                <li className="p-1">
                  You can browse a word list with frequency counts and it can be
                  helpful for teachers and students.
                </li>
                <hr class="solid"></hr>
                <li className="p-1">
                  You can browse through Urduized word list with example
                  sentences from concordance and actual context.
                </li>
                <hr class="solid"></hr>
                <li className="p-1">
                  Individual word search is helpful for understanding
                  collocations and contexts etc.
                </li>
                <hr class="solid"></hr>
                <li className="p-1">
                  Detailed analysis of grammatical structure and vocabulary is
                  also possible.
                </li>
                <hr class="solid"></hr>
                <li className="p-1">
                  Phrases and strings of words are also available.
                </li>
                <hr class="solid"></hr>
                <li className="p-1">
                  POS tagging and grammatical tagging of Urduized words with
                  spelling variations is also available.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
