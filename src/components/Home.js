import React, { useState } from "react";
import "../Styles/Home.css";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from 'react-router-dom'
import { url } from './Variable'
import swal from 'sweetalert'
export default function Home() {
  const [Word, setWord] = useState('');
  const [selectedIndex, setselectedIndex] = useState(0)
  const categories = [
    {
      text: "All",
      value: "all"
    },
    {
      text: "Fiction",
      value: "ficton"
    },
    {
      text: "News Editorials",
      value: "news"
    }, {
      text: "Academics",
      value: "academics"
    }
  ]
  const navigation = useNavigate();
  const Searchword = async (e) => {
    // setIsLoading(true)
    if (Word.length > 0) {
      navigation('/Sresult', { state: { Word: Word, criteria: categories[selectedIndex].value } })

    }
    else {
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
            <br />
            <h2><strong>"You Shall Know a word by the company it keeps."</strong> Firth (1957)</h2>
          </span>
          <div className="pt-4 d-flex justify-content-center">

            <div class="bg-white p-2 w-75 ">

              <div className="d-flex justify-content-center">
                <input
                  placeholder="Search Word"
                  className="m-1 rounded border w-75"
                  onChange={(e) => setWord(e.target.value)}
                />
                <button
                  className="p-1 px-5 rounded border text-white"
                  style={{ backgroundColor: "#5db959" }}
                  onClick={() => Searchword()}
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
                  {categories.map((cat, ind) => {
                    return <option style={{ backgroundColor: selectedIndex === ind ? "lightblue" : "transparent", padding: 5 }} onClick={e => {
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
        <div className="row">
          <div className="col-md-12 col-sm-12 p-5">
            <div className="pt-3 border border-2 p-2 border-success pb-3">
              <h5 className="d-flex justify-content-center">
              PAKLOCCORP DATA SHEET
              </h5>
              <br />
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td></td>
                      <td><b>File ID</b></td>
                      <td><b>Genre</b></td>
                      <td><b>Category</b></td>
                      <td><b>Files</b></td>
                      <td><b>Words</b></td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td><b>NEWS</b></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>1ED2-22 to 153ED2-22</td>
                      <td>Editorials /opinion articles</td>
                      <td>The NEWS</td>
                      <td>153</td>
                      <td>62718</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>AFG001  to AFG050</td>
                      <td>Articles on Afghan social life and women</td>
                      <td>The News</td>
                      <td>50</td>
                      <td>24118</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>MA-Nov-001-030</td>
                      <td>Magazine articles MNR</td>
                      <td>Magazine News articles</td>
                      <td>30</td>
                      <td>36449</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>BLGPK001-BLGPK002</td>
                      <td>Blogs</td>
                      <td>Right to education</td>
                      <td>1</td>
                      <td>6289</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>Blogs</td>
                      <td>Blog Pakistan</td>
                      <td>1</td>
                      <td>7389</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>1YNG-10YNG</td>
                      <td>Young world</td>
                      <td>Children's fiction and reports</td>
                      <td>10</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>3.DW-NP</td>
                      <td>News reports Dawn</td>
                      <td>Taliban</td>
                      <td>1</td>
                      <td>19075</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>3.NYT-NP</td>
                      <td>News reports Newyork Times</td>
                      <td>Taliban</td>
                      <td>1</td>
                      <td>52074</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>3.TNI-NP</td>
                      <td>News reports The NEWS International</td>
                      <td>Taliban</td>
                      <td>1</td>
                      <td>24491</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>3.UT-NP</td>
                      <td>News reports USA Today</td>
                      <td>Taliban</td>
                      <td>1</td>
                      <td>41081</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td><b>Academics</b></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>CRT001-CRT040</td>
                      <td>Student writings</td>
                      <td>Assignments/fiction etc</td>
                      <td>40</td>
                      <td>52496</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC001</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>76261</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC002</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>56198</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC003</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>96569</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC004</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>56947</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC005</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>61432</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC006</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>85603</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC007</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>70924</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC008</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>142197</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC009</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>34480</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC010</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>110713</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC011</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>84109</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC012</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>118937</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC013</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>180143</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC014</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>73304</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>PHDHEC015</td>
                      <td>PhD theses</td>
                      <td>Linguistics and literature</td>
                      <td>1</td>
                      <td>69750</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td><b>Fiction</b></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>CH1HF-CH9HF</td>
                      <td>Kamila Shamsie</td>
                      <td>Home Fire</td>
                      <td>9</td>
                      <td>68589</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>BRNTSHD</td>
                      <td>Kamila Shamsie</td>
                      <td>Burnt shadows</td>
                      <td>1</td>
                      <td>119787</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>KARTGRPH</td>
                      <td>Kamila Shamsie</td>
                      <td>Kartography</td>
                      <td>1</td>
                      <td>102316</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>BRKVRS</td>
                      <td>Kamila Shamsie</td>
                      <td>Broken verses</td>
                      <td>1</td>
                      <td>110438</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>INOTHER</td>
                      <td>Daniyal Mueenuddin</td>
                      <td>In other rooms, other wonders</td>
                      <td>1</td>
                      <td>9474</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>ICBP</td>
                      <td>Bipsi sidhwa</td>
                      <td>Ice Candy Man</td>
                      <td>1</td>
                      <td>88921</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>MYFLD</td>
                      <td>Tehmina Durrani</td>
                      <td>My Feudal Lord</td>
                      <td>1</td>
                      <td>115789</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>THERLFND</td>
                      <td>Mohsin Hamid</td>
                      <td>The reluctant fundamentalist</td>
                      <td>1</td>
                      <td>42250</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>IMMALA</td>
                      <td>Malala Yousafzai</td>
                      <td>I am Malala</td>
                      <td>1</td>
                      <td>40887</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td>SRBRD</td>
                      <td>Nadeem Aslam</td>
                      <td>Season of Rain Birds</td>
                      <td>1</td>
                      <td>56133</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td><b>Total Number of words</b></td>
                      <td></td>
                      <td></td>
                      <td><b>2398331</b></td>
                    </tr>
                  </tbody>
                </table>
                <br />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer style={{ textAlign: 'center' }}>
        <span style={{ color: "#b03e41" }}>
          Last Updated: 20 September, 2022.{"    "}PakLocCorp. Copyrights &copy; pakloccorp.com

        </span>
      </footer>
    </div>
  );
}
