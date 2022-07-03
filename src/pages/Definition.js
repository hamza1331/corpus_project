import React,{useState,useEffect} from "react";
import Bar from '../components/Bar'
import { useNavigate,useLocation } from 'react-router-dom'
import { url } from "../components/Variable";
export default function List() {
  const loction = useLocation();
  const abc = loction.state?.value;
  const navigation = useNavigate();
  const [Word, setWord] = useState('');
  const [data, setData] = useState(null)
  const [wordDescription,setWordDescription] = useState('')
  const [showConcordance,setShowConcordance] = useState(false)
  const [concordanceResults, setconcordanceResults] = useState([])
  const searchConcordance = () => {
    // console.log('abcccc-->',abc)
      if (abc.length > 0) {
        fetch(`${url}/corpus/findKWIC`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            word: abc,
            criteria: 'all'
          })
        }).then(res => res.json())
          .then((response) => {
  
            // console.log('Data received search word --->', response);
            // after
            if (response.message === 'Success') {
              // setIsLoading(false)
              console.log('response--->',response.doc)
              if(response.doc.results.length>0){
                setconcordanceResults(response.doc.results)
                setShowConcordance(true)
              }else{
                alert('No results found for word: '+abc)
              }
  
              // setData(response.doc);
            }
  
          })
          .catch((error) => {
            console.log(error);
          });
      }
  }
  useEffect(()=>{
    // console.log(loction.state?.value)
    // console.log('idsfsdfi')
    setWord(loction.state?.value)
    if (Word === 'Gohar') {
      // console.log('uhrsfdiuhb ---> ',loction.state?.value)
      setWordDescription('noun')
      setTimeout(()=>{
        searchConcordance()
        setShowConcordance(true)
      },1000)
    }
    else if (Word === 'Azaan') {
      setWordDescription('noun')
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'Betiyan') {
      setWordDescription('Beti-yan noun plural')
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'Dadis') {
      setWordDescription('Dadi-s   noun plural')
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'Kaala') {
      setWordDescription('adjective')
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'Sarees') {
      setWordDescription('Saree-s noun plural')
      searchConcordance()
      setShowConcordance(true)
    }
    else{
      setWordDescription("POS not added for this word")
      searchConcordance()
      setShowConcordance(true)
    }
  },null)
  return (
    <div>
      <Bar/>
      <div className="container">
        
        <br />
        <button onClick={e=>{
          e.preventDefault()
          navigation('/Search')
        }} className="rounded border text-white form-control bg-primary" style={{width:'100px'}}>
                  Go Back
                </button>
                <br/>
        <div className="container row">
          &nbsp;
          <div style={{ color: "#b03e41" }}>
            <h4>Definition of '{Word}'</h4>
          </div>
          <div className="float-start col-md-4 col-sm-4">
            <br />
            <h2>{Word}
            {"    "}
            <span>
            <i
              class="fa fa-volume-up fa-lg"
              
              style={{ color: "#b03e41" }}
              aria-hidden="true"
            ></i>{" "}
            &nbsp;{" "}
            <i
              class="fa fa-info-circle fa-lg"
              aria-hidden="true"
              style={{ color: "grey" }}
            ></i>
            
          </span>
          <br/>
          <span style={{ color: "#b03e41" }}>
            <strong>{wordDescription}</strong>
          </span>
            </h2>
            
            {/* <p>
              <span>
                <strong>Collins</strong>
              </span>{" "}
              COBUILD
            </p> */}
            <br />
          </div>
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          &nbsp; &nbsp; &nbsp;
          <div className="float-end col-md-4 col-sm-4">
            <br />
            <h6>
              Word Frequency &nbsp;
              <i
                class="fa fa-ellipsis-h fa-2x"
                style={{ position: "absolute", color: "#b03e41" }}
                aria-hidden="true"
              ></i>
            </h6>

            <i class="fa fa-share-alt-square  fa-3x"></i>
          </div>
        </div>
        <div>
          {/* &nbsp; &nbsp; &nbsp; Words forms: plural hunch backs &nbsp;{" "} */}
          
          <br />
          <br />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
          <br />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
          {/* <span>
            <strong>
              A <span style={{ color: "#b03e41" }}>hunch back</span> is someone who
              has a large lump on their back because their spine is curved.
            </strong>{" "}
          </span> */}
          <br />
          <br />
          &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;{" "}
          {/* <span>
            <strong>[Offensive, old-fashioned]</strong>{" "}
          </span> */}
        </div>
        {showConcordance===true && <table class="table">
                <thead>
                  <h2 style={{textAlign:"center"}}>Concordance</h2>
                  <tr>
                    <th scope="col">Text From File</th>
                    <th scope="col">Left Text</th>
                    <th scope="col">Center Word</th>
                    <th scope="col">Right Text</th>
                  </tr>
                </thead>
                <tbody>
                  {concordanceResults.length>0 && concordanceResults.map((item,index)=><tr>
                    <th scope="row">{item.filename}</th>
                    <td>{item.preText}</td>
                    <td>{Word}</td>
                    <td>{item.postText}</td>
                  </tr>)}

                </tbody>
              </table>}
        <br />
        <span style={{ color: "#b03e41" }}>
          PakLocCorp. Copyrights &copy; pakloccorp.com 
        </span>
      </div>
    </div>
  );
}
