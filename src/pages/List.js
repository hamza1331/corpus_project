import React, { useState, useEffect } from "react";
import Bar from "../components/Bar";
import { useNavigate } from 'react-router-dom'
import { url } from "../components/Variable";
export default function List() {
  const navigation = useNavigate();
  const [data, setData] = useState(null)
  const [pages, setPages] = useState(1)
  const [finalDAta, setFinalData] = useState(null)
  const [selectedlist, setSelectedList] = useState(1)
  const [selectedPage, setSelectedPage] = useState(1)
  const [word, setWord] = useState('')
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
          let results = []
          Object.values(response.doc).map((dataa, index) => {
            // console.log('dataaaa '+index+'--->',dataa)
            results.push({
              list: index,
              allData: dataa,
              pages: Math.ceil(dataa.length / 7)
            })
          })
          console.log('finalDAta--->', results)
          setFinalData(results)
          setPages(results[0].pages)
        }
      })
  }
  return (
    <div>
      <div className="container">
        <br />
        <br />
        <div>
          <h1>Browse the Urduized Words</h1>
          <hr />

        </div>
        <br />
        <h3 style={{ fontWeight: 'bold' }}>What is an Urduized word?</h3>
        <p>
          When a local Urdu word is inserted in English sentence, it gives meaning to the English text. Several scholars have used Urduized English (Baumgardener, 1993) or Urduized words to represent such insertions. Mehboob (2003) provided a complete list of 54 categories of borrowed words and Tallat (1993) discussed Urduized meaning of Pakistani English.
          <br />
          Example sentences are given below:
          <ol>
            <li>
              Edibles: At some time they again came to the haleem [a thick soup] shop on motorcycles and threw his two daigs [a cauldron].Mehboob (2003)

            </li>
            <li>Ghizaayyat bakhsh full cream homogenized taazaa duudh. Baumgardener (1993)
            </li>
            <li>
              Everyone in the world, it seems, is talking about the judge-sahib’s murder. Aslam (1993)

            </li>
          </ol>
        </p>
        <p>To access the list of Urduized words, <a href="https://firebasestorage.googleapis.com/v0/b/pakgentextweb.appspot.com/o/urduized%20words%20list%20a-z.xlsx?alt=media&token=3075882f-6e78-4843-81b4-3ba67157a846" target="_blank">Click Here</a></p>
        <div className="pt-4 d-flex justify-content-center">
          <div class="bg-white p-2 w-75 ">
            <div className="d-flex justify-content-center">
              <input
                placeholder="Search Word"
                className="m-1 rounded border w-75"
                value={word}
                onChange={e => setWord(e.target.value)}
              />
              <button
                className="p-1 px-5 rounded border text-white"
                style={{ backgroundColor: "#5db959" }}
                onClick={e => {
                  e.preventDefault()
                  if (word.length > 0)
                    navigation('/Definition', { state: { value: word } })
                  else {
                    alert('Search Word can not be empty')
                  }
                }}
              >
                <i class="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
        {/* <div>
            <ul class="list-inline ">
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>A</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>B</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>C</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>D</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>E</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>F</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>G</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>H</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>I</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>J</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>K</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>L</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>M</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>N</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>O</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>P</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>Q</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>R</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>S</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3'>T</li>
               
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>U</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>V</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>W</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>X</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>Y</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-3 mb-2'>Z</li>
               &nbsp;
               <li className='list-inline-item border border-secondary rounded-circle p-2 px-2 mb-2'>0-9</li>
            </ul>
        </div> */}
        <br />
        <div>

          {/* <h3>Academic Word &nbsp; <i class="fa fa-graduation-cap" aria-hidden="true"></i></h3> */}

        </div>
        <br />
        <h5 style={{ marginLeft: '140px' }}>Entries:</h5>
        <div className="container col-lg-9 col-sm-9 col-md-9 border border-2" style={{ borderRadius: '5px' }}>
          <div className="row">
            <div
              className="col-md-6 col-sm-6 "
              style={{ backgroundColor: "#eeeeee", width: "100v" }}
            >
              <br />

              <div>
                <ul className="px-5 list-unstyled ">
                  <div className="justify-content-center px-5">
                    <li onClick={e => {
                      e.preventDefault()
                      setSelectedList(1)
                      setSelectedPage(1)
                    }} className="py-1">
                      <span
                        type="button"
                        className={selectedlist === 1 ? "btn btn-block px-5 text-white" : "btn btn-block px-5"}
                        style={{ backgroundColor: selectedlist === 1 ? "#07255e" : "#eeeeee" }}
                      >
                        <strong>List 1</strong>
                      </span>
                    </li>
                    <li onClick={e => {
                      e.preventDefault()
                      setSelectedList(2)
                      setSelectedPage(1)

                    }} className="py-1">
                      <span
                        type="button"
                        className={selectedlist === 2 ? "btn btn-block px-5 text-white" : "btn btn-block px-5"}
                        style={{ backgroundColor: selectedlist === 2 ? "#07255e" : "#eeeeee" }}
                      >
                        <strong>List 2</strong>
                      </span>
                    </li>
                    <li onClick={e => {
                      e.preventDefault()
                      setSelectedList(3)
                      setSelectedPage(1)

                    }} className="py-1">
                      <span
                        type="button"
                        className={selectedlist === 3 ? "btn btn-block px-5 text-white" : "btn btn-block px-5"}
                        style={{ backgroundColor: selectedlist === 3 ? "#07255e" : "#eeeeee" }}
                      >
                        <strong>List 3</strong>
                      </span>
                    </li>
                    <li onClick={e => {
                      e.preventDefault()
                      setSelectedList(4)
                      setSelectedPage(1)

                    }} className="py-1">
                      <span
                        type="button"
                        className={selectedlist === 4 ? "btn btn-block px-5 text-white" : "btn btn-block px-5"}
                        style={{ backgroundColor: selectedlist === 4 ? "#07255e" : "#eeeeee" }}
                      >
                        <strong>List 4</strong>
                      </span>
                    </li>
                    <li onClick={e => {
                      e.preventDefault()
                      setSelectedList(5)
                      setSelectedPage(1)

                    }} className="py-1">
                      <span
                        type="button"
                        className={selectedlist === 5 ? "btn btn-block px-5 text-white" : "btn btn-block px-5"}
                        style={{ backgroundColor: selectedlist === 5 ? "#07255e" : "#eeeeee" }}
                      >
                        <strong>List 5</strong>
                      </span>
                    </li>
                    <li onClick={e => {
                      e.preventDefault()
                      setSelectedList(6)
                      setSelectedPage(1)

                    }} className="py-1">
                      <span
                        type="button"
                        className={selectedlist === 6 ? "btn btn-block px-5 text-white" : "btn btn-block px-5"}
                        style={{ backgroundColor: selectedlist === 6 ? "#07255e" : "#eeeeee" }}
                      >
                        <strong>List 6</strong>
                      </span>
                    </li>
                    <li onClick={e => {
                      e.preventDefault()
                      setSelectedList(7)
                      setSelectedPage(1)
                    }} className="py-1">
                      <span
                        type="button"
                        className={selectedlist === 7 ? "btn btn-block px-5 text-white" : "btn btn-block px-5"}
                        style={{ backgroundColor: selectedlist === 7 ? "#07255e" : "#eeeeee" }}
                      >
                        <strong>List 7</strong>
                      </span>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
            <div
              className="col-md-6 col-sm-6"
              style={{ background: "#eeeeee", height: '80px' }}
            >
              <br />

              <div>
                <nav aria-label="Page navigation example" className="">
                  <ul className="pagination">
                    <li className="page-item">
                      <a onClick={e => {
                        e.preventDefault()
                        setSelectedPage(selectedPage - 1)
                      }} className={selectedPage === 1 ? "page-link disabled" : "page-link"} href="#" aria-label="Previous">
                        <span aria-hidden="true" className="text-success">
                          «
                        </span>
                        <span className="sr-only text-success">Previous</span>
                      </a>
                    </li>
                    {finalDAta !== null && Array.from({ length: finalDAta[selectedlist - 1].pages }, () => Math.round(Math.random() * 100)).map((val, ind) => <li className="page-item">
                      <a onClick={e => {
                        e.preventDefault()
                        setSelectedPage(ind + 1)
                      }} className="page-link text-success" href="#">
                        {ind + 1}
                      </a>
                    </li>)}
                    <li className="page-item">
                      <a onClick={e => {
                        e.preventDefault()
                        setSelectedPage(selectedPage + 1)
                      }} className={selectedPage === pages ? "page-link disabled" : "page-link"} href="#" aria-label="Next">
                        <span aria-hidden="true" className="text-success">
                          »
                        </span>
                        <span className="sr-only text-success">Next</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <ul className="list-unstyled">
                <div className="" style={{ paddingLeft: '100px' }}>
                  {finalDAta !== null && finalDAta[selectedlist - 1].allData.sort((a, b) => a.localeCompare(b))
                    .slice((selectedPage * 7) - 7, selectedPage * 7).map((word) => <li className="py-2 worddd">
                      <strong>
                        <a onClick={e => {
                          e.preventDefault()
                          navigation('/Definition', { state: { value: word } })
                        }} className="wordddingg" style={{ color: "#216bbd" }}>{word}</a>
                      </strong>
                    </li>)}
                </div>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}
