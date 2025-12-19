import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { url } from '../components/Variable'
export default function Searchtool() {
  const navigation = useNavigate();
  const [Word, setWord] = useState('');
  const [folders, setFolders] = useState([])
  const [dirPath, setDirPath] = useState('')

  useEffect(() => {
    // Load corpus directory tree from new corpus manager and flatten to options
    fetch(`${url}/corpus-management/structure`)
      .then(res => res.json())
      .then(response => {
        if (response.message === 'Success' && response.doc && Array.isArray(response.doc.structure)) {
          const flat = []

          const walk = (items, prefix = '') => {
            items.forEach(item => {
              if (item.type === 'directory') {
                const path = item.path || (prefix ? `${prefix}/${item.name}` : item.name)
                flat.push({
                  label: path || '/',
                  value: path,
                })
                if (item.children && item.children.length > 0) {
                  walk(item.children, path)
                }
              }
            })
          }

          walk(response.doc.structure)
          setFolders(flat)
        }
      })
      .catch(err => {
        console.log('Failed to load corpus structure', err)
      })
  }, [])

  const Searchword = async (e) => {
    // setIsLoading(true)
    // console.log('worddd-->', Word)
    if (Word.length > 0) {
      navigation('/Sresult', { state: { Word: Word, dirPath } })

    }
    else {
      alert('You must type a word to search results')
    }
  }
  const searchConcordance = async (e) => {
    // setIsLoading(true)
    // console.log('worddd-->', Word)
    if (Word.length > 0) {
      // fetch(`${url}/corpus/searchConcordance/1`, {
      //   method: "POST",
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Accept': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     word: Word,
      //     criteria: criteria,
      //     LN: 6,
      //     RN: 6
      //   })
      // }).then(res => res.json())
      //   .then((response) => {

      //     // console.log('Data received search word --->', response);
      //     // after
      //     if (response.message === 'Success') {
      //       // setIsLoading(false)

      //       // setData(response.doc);
      //     }

      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      navigation('/Concordance', { state: { Word: Word, dirPath } })
    }
    else {
      alert('You must type a word to search results')
    }
  }

  const searchKeywordfreq = async (e) => {
    // setIsLoading(true)
    navigation('/Keywordf', { state: { dirPath } })
  }

  const searchKWIC = async (e) => {
    // setIsLoading(true)
    console.log('worddd-->', Word)
    if (Word.length > 0) {
      navigation('/Kwic', { state: {  Word: Word, dirPath } })
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
                <div className="container row justify-content-center">
                  <div className="col-md-4">
                    <label className=" d-flex justify-content-center">
                      <strong>Category:</strong>
                    </label>
                    <select
                      value={dirPath}
                      onChange={e => {
                        e.preventDefault()
                        setDirPath(e.target.value)
                      }}
                      className=" form-select form-select-lg-3"
                    >
                      <option value="">All (entire corpus)</option>
                      {folders.map((folder, idx) => (
                        <option key={idx} value={folder.value}>
                          {folder.label}
                        </option>
                      ))}
                    </select>
                  </div>
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
