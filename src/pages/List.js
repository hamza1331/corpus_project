import React, { useState } from "react";
import "../Styles/Home.css";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Bar from "../components/Bar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigation = useNavigate();
  const url='https://ae92-185-202-239-227.ngrok.io'
  const [Word,setWord] = useState('');
  const Concord = async (e) => {
    // setIsLoading(true)
    fetch(`${url}/corpus/searchConcordance`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        word: Word,
        criteria:"all",
        // LN:
      })
    }).then(res => res.json())
      .then((response) => {

        console.log('Data received search word --->', response);
        // after
        if (response.message === 'Success') {
          // setIsLoading(false)
         navigation('/Sresult' ,{state: {rehman : response.doc}})
         
          // setData(response.doc);
        }

      })
      .catch((error) =>{
        console.log(error);
      });
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
                <h5 className="p-3 justify-content-center d-flex">List:</h5>
                <Table>
                  <Thead>
                    <Tr>
                      <Th>Event</Th>
                      <Th>Date</Th>
                      <Th>Location</Th>
                      <Th>abc</Th>
                      <Th>xyz</Th>
                      <Th>bhi</Th>
                      <Th>adc</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Tablescon</Td>
                      <Td>9 April 2019</Td>
                      <Td>East Annex</Td>
                      <Td>Tablescon</Td>
                      <Td>9 April 2019</Td>
                      <Td>East Annex</Td>
                      <Td>Tablescon</Td>
                    </Tr>
                    <Tr>
                      <Td>Capstone Data</Td>
                      <Td>19 May 2019</Td>
                      <Td>205 Gorgas</Td>
                      <Td>Tablescon</Td>
                      <Td>9 April 2019</Td>
                      <Td>East Annex</Td>
                      <Td>Tablescon</Td>
                    </Tr>
                    <Tr>
                      <Td>Tuscaloosa D3</Td>
                      <Td>29 June 2019</Td>
                      <Td>Github</Td>
                      <Td>Tablescon</Td>
                      <Td>9 April 2019</Td>
                      <Td>East Annex</Td>
                      <Td>Tablescon</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
