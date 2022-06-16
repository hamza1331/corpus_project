import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Bar from "../components/Bar";
import { useNavigate } from "react-router-dom";
import { url } from "../components/Variable";
import { useLocation } from "react-router-dom";
export default function Home() {
  const navigation = useNavigate();
  const [Word, setWord] = useState('');
  const [data, setData] = useState(null)
  const [searchWord, setSearchWord] = useState('')
  const [wordDescription,setWordDescription] = useState('')
  useEffect(() => {
    getUDWords()
  }, [])
  const getUDWords = async () => {
    fetch(`${url}/corpus/getUdWords`)
      .then(res => res.json())
      .then(response => {
        if (response.message === 'Success') {
          console.log('response--->', response.doc)
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
    }
    else if (Word === 'Azaan') {
      setSearchWord(Word)
      setWordDescription('noun')
    }
    else if (Word === 'Betiyan') {
      setSearchWord(Word)
      setWordDescription('Beti-yan noun plural')
    }
    else if (Word === 'Dadis') {
      setSearchWord(Word)
      setWordDescription('Dadi-s   noun plural')
    }
    else if (Word === 'Kaala') {
      setSearchWord(Word)
      setWordDescription('adjective')
    }
    else if (Word === 'Sarees') {
      setSearchWord(Word)
      setWordDescription('Saree-s noun plural')
    }
    else {
      alert('POS not added for this word yet.')
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
                {searchWord.length > 0 && <div>
                  <h3>Searched Word: {searchWord}</h3>
                  <h4>({wordDescription})  </h4>
                </div>}
                <h5 className="p-3 justify-content-center d-flex">Urduized Words</h5>
                <Table>
                  {data !== null && <Tbody>
                    {data !== null && Object.values(data).map((value) => <Tr>
                      {value.map((data) => <Td style={{ fontWeight: "bold" }}>{data}</Td>)}
                    </Tr>)}
                  </Tbody>}
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
