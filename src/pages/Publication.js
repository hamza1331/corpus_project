import React, { useState, useEffect } from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Bar from "../components/Bar";
import { url } from "../components/Variable";

export default function Publication() {
  const [data, setdata] = useState([])
  const [isLoggedIn, setIsloggedIn] = useState(false)
  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }
  useEffect(() => {
    let data = localStorage.getItem('corpusUserData')
    if (data !== null) {
      setIsloggedIn(true)
    }
    fetch(url + '/corpus/downloadCorpus')
      .then((res) => res.json())
      .then(response => {
        if (response.message === 'Success') {
        //   setdata(response.doc)
        }
      })
  }, [])
  const downloadFile = (e) => {
    if(isLoggedIn){
      window.open(url+'/corpus/getCorpusFile/'+e.target.innerText.toLowerCase(),'_blank')
    }
  }
  return (
    <div>
      <Bar />
      <div style={{ backgroundColor: "#f0faef", height: "100%" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 p-5">
              <div className="pt-3 border border-2 p-2 border-success pb-3">
                <h2 className="d-flex justify-content-center">
                <strong>PUBLICATIONS</strong>
                </h2>
                <br />
                <p>PakLocCorp is an ongoing research project based on previous research. Pakistani English has unique characteristics and the addition of Urduized words with and without English morphemes is observed in the current discourse. Researchers willing to explore this corpus, can access data through registration.</p>
<p>PakLocCorp is open for contributions and freely available for research purposes.</p>
<br/>
<h4>For Citation</h4>
<p>Zahra, F., Zahra, T., & Abbas, A. (2022, June 15). PakLocCorp. Retrieved July 8, 2022, from https://pakloccorp.com/ </p>
       <br/>
       <h4>Related Publications</h4>
       <p>Reference to works using PakEng for research purposes can be found through the links provided here.</p>
         <br/>
                <div class="table-responsive">
                    <ol>
                        <li>
                        Tariq Rehman (1990) <a href="https://www.researchgate.net/publication/272269971_Pakistani_English" target='__blank'>Pakistani English</a>; First published by the National Institute of Pakistan Studies, Quaid-iAzam University, Islamabad, 1990.
                        </li>
                <br />

                        <li>
                        Ijaz Ali Khan, Ibad Ullah Dr. Muhammad Yousaf Syed Sajjad Ali (eds.) (2019) 
                        <a href="https://discourse.org.pk/index.php/discourse/article/view/131">Extraction and Analysis of Urduized English Words From BBC Urdu Newspaper, Pakistan</a> Vol. 5 No. 2 (2019) The Discourse.
                        </li>
                <br />

                        <li>
                        Mahmood, Mr. Rashid (2009) {"     "} 
                        <a href="http://prr.hec.gov.pk/jspui/handle/123456789/1961" target={'_blank'}>A Lexico-grammatical Study of Noun Phrase in Pakistani English</a> Bahauddin Zakariya University,Multan..
                        </li>
                <br />

                        <li>
                        Humaira Irfan Khan (2012) 
                        <a href="http://www.journals.aiac.org.au/index.php/IJALEL/article/view/747" target={"_blank"}>The Evolution of Pakistani English (PakE) as a Legitimate Variety of English;</a> Vol. 1 No. 5; September 2012 International Journal of Applied Linguistics & English Literature.
                        </li>
                <br />

                        <li>
                        Dr. Mubina Talaat (2002) 
                        <a href="https://www.semanticscholar.org/paper/THE-FORM-AND-FUNCTIONS-OF-ENGLISH-IN-PAKISTAN-Talaat/65f8e498d015fed2954413e71b8554684068c6e7">THE FORM AND FUNCTIONS OF ENGLISH IN PAKISTAN;</a> Linguistics.
                        </li>
                <br />

                        <li>
                        Dr. Mubina Talaat (2003)
                        <a href="https://jorurdu.bzu.edu.pk/website/journal/article/5e84d6ec8e776/page" target={"_blank"}>Pakistani English: A Socialinguistic Variety</a> Journal of Research (Urdu), Vol # 4, Issue # 1.
                        </li>
                <br />

                        <li>
                        M Hamza, Rooman Khan, A. M Abbasi (2017) {"   "}
                        <a href="https://web.p.ebscohost.com/abstract?direct=true&profile=ehost&scope=site&authtype=crawler&jrnl=19302940&AN=123784286&h=262QffhNfHuePcrN7x6jlnXNNiTP%2fvjV%2f8uaObWHUopqE5GoXvkYXs2U7nG5UZg8m%2bRhW%2bYQ3Tb%2fgkjnPOvdfw%3d%3d&crl=c&resultNs=AdminWebAuth&resultLocal=ErrCrlNotAuth&crlhashurl=login.aspx%3fdirect%3dtrue%26profile%3dehost%26scope%3dsite%26authtype%3dcrawler%26jrnl%3d19302940%26AN%3d123784286" target={"_blank"}>
                        Error Analysis of English Paragraphs by Pakistani Undergraduates;
                        </a>
                <br />

                        Language in India. Jun2017, Vol. 17 Issue 6, p482-496.
                        </li>
                    </ol>
                    <br/>

                </div>
              </div>
            </div>
          </div>
        </div>
        <footer style={{textAlign:'center'}}>
      <span style={{ color: "#b03e41"}}>
      Last Updated: 1st July, 2022.{"    "}PakLocCorp. Copyrights &copy; pakloccorp.com 
          
        </span>
      </footer>
      </div>
      
    </div>
  );
}
