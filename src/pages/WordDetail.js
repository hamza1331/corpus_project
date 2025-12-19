import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Bar from '../components/Bar'
import { supabase } from '../supabaseClient'
import { url } from '../components/Variable'
import Pagination from '@mui/material/Pagination';
import { ColorRing } from 'react-loader-spinner'

export default function WordDetail() {
  const { word: routeWord } = useParams()
  const navigate = useNavigate()
  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [wordData, setWordData] = useState(null)
  
  // Concordance state variables
  const [data, setData] = useState([])
  const [collocationData, setCollocationData] = useState([])
  const [LN, setLN] = useState(5)
  const [RN, setRN] = useState(5)
  const [page, setpage] = useState(1)
  const [showText, setshowText] = useState(false)
  const [filepath, setfilepath] = useState('')
  const [fileText, setfileText] = useState('')
  const [numberOfPages, setnumberOfPages] = useState(1)
  const [showLoader, setshowLoader] = useState(false)
  const [totalHits, setTotalHits] = useState(0)
  const [fileCount, setFileCount] = useState(0)

  useEffect(() => {
    setWord(routeWord || '')

    const fetchData = async () => {
      try {
        // Fetch word details from Supabase
        const { data, error } = await supabase
          .from('urduized_words')
          .select('*')
          .ilike('word', routeWord)
          .limit(1)
          .maybeSingle()

        if (error) throw error
        setWordData(data)

        // Search concordance on component mount
        if (routeWord) {
          searchConcordance(LN, RN, routeWord, 'all', 1)
          searchCollocation(2, 2, routeWord, 'all', 1)
        }
      } catch (err) {
        setError(err?.message || 'Failed to load word')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [routeWord])

  const searchConcordance = async (left = LN, right = RN, word = routeWord, criteria = '', page = 1) => {
    if (word) {
      setshowLoader(true)
      fetch(`${url}/corpus-management/search/concordance/${page}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          word: word,
          criteria: criteria !== '' ? criteria : "all",
          dirPath: '',
          LN: left,
          RN: right
        })
      }).then(res => res.json())
        .then((response) => {
          setshowLoader(false)
          if (response.message === 'Success') {
            // console.log('response--->', response.doc)
            setData(response.doc.occurrence);
            setnumberOfPages(response.doc.numberOfPages)
            setTotalHits(response.doc.count)
            setFileCount(response?.doc?.fileCount)
          }
        })
        .catch((error) => {
          setshowLoader(false)
          console.log(error);
        });
    }
    else {
      alert('You must type a word to search results')
    }
  }

  const searchCollocation = async (left = LN, right = RN, word = routeWord, criteria = '', page = 1) => {
    if (word) {
      setshowLoader(true)
      fetch(`${url}/corpus-management/search/concordance/${page}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          word: word,
          criteria: criteria !== '' ? criteria : "all",
          dirPath: '',
          LN: 2,
          RN: 2
        })
      }).then(res => res.json())
        .then((response) => {
          setshowLoader(false)
          if (response.message === 'Success') {
            // console.log('response--->', response.doc)
            setCollocationData(response.doc.occurrence);
            // setTotalHits(response.doc.count)
          }
        })
        .catch((error) => {
          setshowLoader(false)
          console.log(error);
        });
    }
    else {
      alert('You must type a word to search results')
    }
  }

  const handlePlay = (src) => {
    if (!src) return
    const audio = new Audio(src)
    audio.loop = false
    audio.play()
  }

  if (loading) {
    return (
      <div>
        <Bar />
        <div className="container"><p>Loading...</p></div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <Bar />
        <div className="container"><p style={{color:'#b03e41'}}>Error: {error}</p></div>
      </div>
    )
  }

  return (
    <div>
      <Bar />
      <div className="container">
        <div className="small">
        <br />
        <button
          onClick={(e) => { e.preventDefault(); navigate('/Search') }}
          className="rounded border text-white form-control bg-primary"
          style={{ width: '100px' }}
        >
          Go Back
        </button>
        <br />
        <div className="container row details card card-body shadow-sm mb-3" style={{ border: '1px solid #e9ecef' }}>
          &nbsp;
          <div className="float-start col-md-10 col-sm-10">
            <h4 className="mb-2">
              {word}
              {"    "}
              {wordData?.voice_link && (
                <span>
                  <i
                    className="fa fa-volume-up fa-lg"
                    onClick={() => handlePlay(wordData.voice_link)}
                    style={{ color: '#b03e41', cursor: 'pointer' }}
                    aria-hidden="true"
                  ></i>{' '}
                </span>
              )}
              <div className="mt-2" style={{ lineHeight: 1.4 }}>
                <p>
                  <strong><span style={{ color: '#b03e41' }}>Grammatical category:</span></strong>{' '}
                  <span>{wordData?.part_of_speech || '—'}</span>
                </p>
                <p>
                  <strong><span style={{ color: '#b03e41' }}>Semantic Category/Tag:</span></strong>{' '}
                  <span>
                    {wordData?.category || '—'}
                    {wordData?.tag ? ` (${wordData.tag})` : ''}
                  </span>
                </p>
                <p>
                  <strong><span style={{ color: '#b03e41' }}>Meaning:</span></strong>{' '}
                  <span>{wordData?.description || '—'}</span>
                </p>
                {(wordData?.related_words?.length || 0) > 0 && (
                  <div>
                    <strong><span style={{ color: '#b03e41' }}>Collocates:</span></strong>
                    <ul style={{ marginTop: 6, columns: 2, columnGap: 24 }}>
                      {wordData.related_words.slice(0, 10).map((rw, idx) => (
                        <li key={idx}>{rw}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div style={{ marginTop: 12 }}>
                  {wordData?.thesaurus_link && (
                    <p>
                      <strong><span style={{ color: '#b03e41' }}>Thesaurus:</span></strong>{' '}
                      <a href={wordData.thesaurus_link} target="_blank" rel="noreferrer">{wordData.thesaurus_link}</a>
                    </p>
                  )}
                </div>
              </div>
            </h4>
          </div>
        </div>
 
        {/* Concordance Section */}
        <div style={{ backgroundColor: "#f8f9fa", height: "100%" }}>
          <div className="container">
            <div className="d-flex justify-content-center p-2 pt-3 pb-3">
              <div className="col-md-10 col-sm-10 bg-white d-flex justify-content-center">
                <div className="container">
                  <br />
                  <div className="justify-content-center">
                    <div className="container row">
                      <div className="col-md-3"></div>
                      <div className="col-md-3">
                        <label className="d-flex justify-content-center mb-1" style={{ fontSize: '0.9rem' }}>
                          <strong>Left Word Number:</strong>
                        </label>
                        <select onChange={e => {
                          if (e.target.value !== 'all') {
                            setLN(parseInt(e.target.value))
                          }
                        }} className="form-select form-select-sm">
                          <option value="all">--Select Number--</option>{" "}
                          <option value="1">1</option>{" "}
                          <option value="2">2</option>{" "}
                          <option value="3">3</option>{" "}
                          <option value="4">4</option>{" "}
                          <option value="5">5</option>{" "}
                          <option value="6">6</option>{" "}
                          <option value="7">7</option>{" "}
                          <option value="8">8</option>{" "}
                          <option value="9">9</option>{" "}
                          <option value="10">10</option>{" "}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <label className=" d-flex justify-content-center mb-1" style={{ fontSize: '0.9rem' }}>
                          <strong>Right Word Number:</strong>
                        </label>
                        <select onChange={(e) => {
                          if (e.target.value !== 'all') {
                            setRN(parseInt(e.target.value))
                          }
                        }} className=" form-select form-select-sm">
                          <option value="all">--Select Number--</option>{" "}
                          <option value="1">1</option>{" "}
                          <option value="2">2</option>{" "}
                          <option value="3">3</option>{" "}
                          <option value="4">4</option>{" "}
                          <option value="5">5</option>{" "}
                          <option value="6">6</option>{" "}
                          <option value="7">7</option>{" "}
                          <option value="8">8</option>{" "}
                          <option value="9">9</option>{" "}
                          <option value="10">10</option>{" "}
                        </select>
                      </div>
                      <div className="col-md-3">
                        <div className="col-md-6 pt-3">
                          <button
                            onClick={e => {
                              e.preventDefault()
                              searchConcordance(LN, RN)
                            }}
                            className="btn btn-success btn-sm w-100"
                          >
                            Sort
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Dual Table Layout */}
          <div className="container">
            <div className="row">
              {/* Main Concordance Table - Left Side */}
              <div className="col-md-8">
                <div className="p-2 card shadow-sm">
                  <div style={{ display: "flex", justifyContent: 'space-between', marginBottom: '15px' }}>
                    <div>
                      <p>Word: <strong className="text-danger"> {word}</strong></p>
                      <p>Total Hits: <strong className="text-danger"> {totalHits}</strong></p>
                      <p>Total Files: <strong className="text-danger"> {fileCount}</strong></p>
                    </div>
                    <Pagination size="small" count={numberOfPages} page={page} color="primary"
                      onChange={(e, value) => {
                        setpage(value)
                        setshowLoader(true)
                        searchConcordance(LN, RN, word, 'all', value)
                      }} />
                  </div>
                  <div className="pt-2 border border-2 p-2 border-success pb-2 rounded">
                    <h5 className="d-flex justify-content-center m-0">Concordance</h5>
                    <br />
                    {showLoader === false && (
                      <div className="table-responsive">
                        <table className="table table-sm table-striped table-hover align-middle" style={{ minWidth: '700px' }}>
                          <thead>
                            <tr>
                              <th scope="col">Sr.</th>
                              <th scope="col">Filename</th>
                              <th scope="col">Left Text</th>
                              <th scope="col">Center Word</th>
                              <th scope="col">Right Text</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data.length > 0 && data.map((doc, index) => <tr key={`concordance-${index}`}>
                              <th scope="row">{index + 1}</th>
                              <td>{doc.filename || '—'}</td>
                              <td>{doc.preText}</td>
                              <td style={{ color: 'red', fontWeight: 'bold' }}><b>{word && word}</b></td>
                              <td>{doc.postText}</td>
                            </tr>)}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {showLoader === true && <ColorRing
                      visible={showLoader}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{ marginLeft: '50%' }}
                      wrapperClass="blocks-wrapper"
                      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />}
                  </div>
                </div>
              </div>
 
              {/* Collocation Table - Right Side */}
              <div className="col-md-4">
                <div className="p-2 card shadow-sm">
                  <div className="pt-2 border border-2 p-2 border-success pb-2 rounded">
                    <h5 className="d-flex justify-content-center m-0">Collocation</h5>
                    <p className="text-center text-muted small">Fixed: 2 left/right words, 5 results</p>
                    <p className="text-center">Files: <strong className="text-danger"> {fileCount}</strong></p>
                    <br />
                    {showLoader === false && (
                      <div className="table-responsive">
                        <table className="table table-sm table-striped table-hover align-middle" style={{ minWidth: '360px' }}>
                          <thead>
                            <tr>
                              <th scope="col">Sr.</th>
                              <th scope="col">Filename</th>
                              <th scope="col">Left Text</th>
                              <th scope="col">Center Word</th>
                              <th scope="col">Right Text</th>
                            </tr>
                          </thead>
                          <tbody>
                            {collocationData.length > 0 && collocationData.slice(0, 5).map((doc, index) => <tr key={`collocation-${index}`}>
                              <th scope="row">{index + 1}</th>
                              <td>{doc.filename || '—'}</td>
                              <td>{doc.preText}</td>
                              <td style={{ color: 'red', fontWeight: 'bold' }}><b>{word && word}</b></td>
                              <td>{doc.postText}</td>
                            </tr>)}
                          </tbody>
                        </table>
                      </div>
                    )}
                    {showLoader === true && <ColorRing
                      visible={showLoader}
                      height="80"
                      width="80"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{ marginLeft: '50%' }}
                      wrapperClass="blocks-wrapper"
                      colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
 
        <br />
        <span style={{ color: '#b03e41' }}>
          PakLocCorp. Copyrights &copy; pakloccorp.com
        </span>
        </div>
      </div>
    </div>
    )
  }


