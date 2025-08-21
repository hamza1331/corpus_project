import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Bar from '../components/Bar'
import { supabase } from '../supabaseClient'
import { url } from '../components/Variable'

export default function WordDetail() {
  const { word: routeWord } = useParams()
  const navigate = useNavigate()
  const [word, setWord] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [wordData, setWordData] = useState(null)
  const [concordanceResults, setConcordanceResults] = useState([])

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

        // Fetch KWIC concordance from existing API
        if (routeWord) {
          const res = await fetch(`${url}/corpus/findKWIC/1`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({ word: routeWord, criteria: 'all' })
          })
          const json = await res.json()
          if (json?.message === 'Success' && json?.doc?.results?.length) {
            setConcordanceResults(json.doc.results)
          }
        }
      } catch (err) {
        setError(err?.message || 'Failed to load word')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [routeWord])

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
        <br />
        <button
          onClick={(e) => { e.preventDefault(); navigate('/Search') }}
          className="rounded border text-white form-control bg-primary"
          style={{ width: '100px' }}
        >
          Go Back
        </button>
        <br />
        <div className="container row">
          &nbsp;
          <div style={{ color: '#b03e41' }}>
            <h4>Definition of '{word}'</h4>
          </div>
          <div className="float-start col-md-10 col-sm-10">
            <br />
            <h2>
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
              <br />
              <div>
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
                    <ul style={{ marginTop: 6 }}>
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
            </h2>
          </div>
        </div>

        {concordanceResults.length > 0 && (
          <table className="table">
            <thead>
              <h2 style={{ textAlign: 'center' }}>Concordance</h2>
              <tr>
                <th scope="col">Text From File</th>
                <th scope="col">Left Text</th>
                <th scope="col">Center Word</th>
                <th scope="col">Right Text</th>
              </tr>
            </thead>
            <tbody>
              {concordanceResults.map((item, index) => (
                <tr key={`${item.filename}-${index}`}>
                  <th scope="row">{item.filename}</th>
                  <td>{item.preText}</td>
                  <td>{word}</td>
                  <td>{item.postText}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <br />
        <span style={{ color: '#b03e41' }}>
          PakLocCorp. Copyrights &copy; pakloccorp.com
        </span>
      </div>
    </div>
  )
}


