import React, { useState } from "react";
import "../Styles/Home.css";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from 'react-router-dom'
import {url} from './Variable'
import swal from 'sweetalert'
export default function Home() {
  const [Word,setWord] = useState('');
  const [selectedIndex, setselectedIndex] = useState(0)
  const categories = [
    {
      text:"All",
      value:"all"
    },
    {
      text:"Fiction",
      value:"ficton"
    },
    {
      text:"News Editorials",
      value:"news"
    },{
      text:"Articles",
      value:"articles"
    },{
      text:"Academics",
      value:"academics"
    }
  ]
  const navigation = useNavigate();
  const Searchword = async (e) => {
    // setIsLoading(true)
    if(Word.length>0){
      navigation('/Sresult' ,{state: {Word:Word,criteria:categories[selectedIndex].value}})

    }
    else{
      swal({
        title: "Invalid search!",
        text: "Search word can not be empty",
        icon: 'error',
      });
    }
  }
  return (
    <div style={{ backgroundColor: "#f0faef" }}>
      <div className="container">
        <div className="row">
          <span>
<br/>
        <h2><strong>"You Shall Know a word by the company it keeps."</strong> Firth (1957)</h2>
          </span>
          <div className="pt-4 d-flex justify-content-center">
            
            <div class="bg-white p-2 w-75 ">
              
              <div className="d-flex justify-content-center">
                <input
                  placeholder="Search Word"
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
              PakLocCorp represents corpus of PakEng and it is a collection of text from multiple genres and registers. There are currently 322 transcripts in total and 2.4 million words. These collections are a window to the variations of English. It contains words from magazines, newspapers, fiction, academic texts and research publications. This corpus is expanding and open to contribution.
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
                  {categories.map((cat,ind)=>{
                    return <option style={{backgroundColor:selectedIndex===ind?"lightblue":"transparent",padding:5}} onClick={e=>{
                      e.preventDefault()
                      setselectedIndex(ind)
                    }} value={cat.value}>{cat.text}</option>
                  })}
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
      <footer style={{textAlign:'center'}}>
      <span style={{ color: "#b03e41"}}>
      Last Updated: 20 September, 2022.{"    "}PakLocCorp. Copyrights &copy; pakloccorp.com 
          
        </span>
      </footer>
    </div>
  );
}
