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
                    placeholder="Search topics"
                    className="m-1 rounded border w-75"
                  />
                  <button
                    className="p-1 px-5 rounded border text-white"
                    style={{ backgroundColor: "#5db959" }}
                    onClick={() => {
                      navigation("/Listresult");
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
                <h5 className="p-3 justify-content-center d-flex">Urduized Words</h5>
                <Table>
                  {data !== null && <Tbody>
                    {data!==null && Object.values(data).map((value) => <Tr>
                      {value.map((data) => <Td  style={{fontWeight:"bold"}}>{data}</Td>)}
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
