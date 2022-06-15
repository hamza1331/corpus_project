import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import Bar from "../components/Bar";
import { url } from "../components/Variable";
import { useLocation } from "react-router-dom";
export default function Concordance() {
  const loction = useLocation();
  // console.log("location", loction);
  const abc = loction.state?.rehman?.occurrence;
  const wordcounts = loction.state?.rehman?.count;
  const WordSave = loction.state?.Word;
  const criteria = loction.state?.criteria

  const [data,setData] = useState([])
  const [LN, setLN] = useState(6)
  const [RN, setRN] = useState(6)

  useEffect(()=>{
    // console.log('abc--->',abc)
    if(abc){
      setData(abc)
    }else{

    }
  },[])
  const searchConcordance = async (left=LN,right=RN) => {
    // setIsLoading(true)
    console.log('LN--->',left)
    console.log('RN--->',right)
    if (WordSave) {
      fetch(`${url}/corpus/searchConcordance`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          word: WordSave,
          criteria: criteria,
          LN:left,
          RN:right
        })
      }).then(res => res.json())
        .then((response) => {
          if (response.message === 'Success') {
            // setIsLoading(false)
            // navigation('/Concordance', { state: { rehman: response.doc, Word: Word, criteria } })
            console.log('response--->',response.doc)
            setData(response.doc.occurrence);
          }

        })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      alert('You must type a word to search results')
    }
  }
  return (
    <div>
      <Bar />

      <div style={{ backgroundColor: "#f0faef", height: "100%" }}>
        <div className="container">
          <div className="d-flex justify-content-center p-2 pt-5 pb-5">
            <div className="col-md-10 col-sm-10 bg-white d-flex justify-content-center">
              <div className="container">
                <br />

                <div className="justify-content-center">
                  <div className="container row">
                    <div className="col-md-3"></div>
                    <div className="col-md-3">
                      <label className="d-flex justify-content-center">
                        <strong>Left Word Number:</strong>
                      </label>
                      <select onChange={e=>{
                        if(e.target.value!=='all'){
                          // console.log('inside LN--->',parseInt(e.target.value))
                          setLN(parseInt(e.target.value))
                        }
                      }} className="form-select form-select-lg-3">
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
                      <label className=" d-flex justify-content-center">
                        <strong>Right Word Number:</strong>
                      </label>
                      <select onChange={(e)=>{
                        if(e.target.value!=='all'){
                          setRN(parseInt(e.target.value))
                        }
                      }} className=" form-select form-select-lg-3">
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
                      <div className="col-md-4 pt-4">
                        <button
                          onClick={e=>{
                            e.preventDefault()
                          searchConcordance(LN,RN)
                          }}
                          className="rounded border text-white form-control"
                          style={{ backgroundColor: "#5db959" }}
                        >
                          Sort
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container justify-content-center d-flex">
          <div className="col-md-11 col-sm-11 p-5">
            <div className="col-md-2">
              <Link to="/Search">
                <button className="rounded border text-white form-control bg-primary" style={{width:'100px'}}>
                  Go Back
                </button>
              </Link>
            </div>
            <br />
            <p>Searched Word: {"  "+WordSave}</p>
            <div className="pt-3 border border-2 p-2 border-success pb-3">
              <h5 className="d-flex justify-content-center">Concordance</h5>
              <br />
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Sr.</th>
                    <th scope="col">Left Text</th>
                    <th scope="col">Center Word</th>
                    <th scope="col">Right Text</th>
                  </tr>
                </thead>
                <tbody>
                    {data.length>0 && data.map((doc,index)=><tr>
                    <th scope="row">{index+1}</th>
                    <td>{doc.preText}</td>
                    <td>{WordSave && WordSave}</td>
                    <td>{doc.postText}</td>
                  </tr>)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
