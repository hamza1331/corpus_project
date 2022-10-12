import React, { useState, useEffect } from "react";
import Bar from '../components/Bar'
import { useNavigate, useLocation } from 'react-router-dom'
import { url } from "../components/Variable";
export default function List() {
  const loction = useLocation();
  const abc = loction.state?.value;
  const navigation = useNavigate();
  const [Word, setWord] = useState('');
  const [data, setData] = useState(null)
  const [wordDescription, setWordDescription] = useState('')
  const [showConcordance, setShowConcordance] = useState(false)
  const [concordanceResults, setconcordanceResults] = useState([])
  const [descriptions, setdescriptions] = useState([])
  const searchConcordance = () => {
    // console.log('abcccc-->',abc)
    // if (abc.length > 0) {
    //   fetch(`${url}/corpus/findKWIC/1`, {
    //     method: "POST",
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       word: abc,
    //       criteria: 'all'
    //     })
    //   }).then(res => res.json())
    //     .then((response) => {

    //       // console.log('Data received search word --->', response);
    //       // after
    //       if (response.message === 'Success') {
    //         // setIsLoading(false)
    //         console.log('response--->', response.doc)
    //         if (response.doc.results.length > 0) {
    //           setconcordanceResults(response.doc.results)
    //           setShowConcordance(true)
    //         } else {
    //           alert('No results found for word: ' + abc)
    //         }

    //         // setData(response.doc);
    //       }

    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  }
  useEffect(() => {
    // console.log(loction.state?.value)
    // console.log('idsfsdfi')
    setWord(loction.state?.value)
    if (Word === 'Gohar') {
      // console.log('uhrsfdiuhb ---> ',loction.state?.value)
      setWordDescription('noun')
      setTimeout(() => {
        searchConcordance()
        setShowConcordance(true)
      }, 1000)
    }
    else if (Word === 'Choudary') {
      let arr = ['File ID: MA-JN-031', 'Link: https://www.thenews.com.pk/magazine/money-matters/967492-the-ultimate-challenge'
        , 'Concordance: the famous ‘Choudhry ‘of Gujrat', 'Usage in sentence: This matter is discussed by Choudary. Choudary drives them all to the site.',
        'Meaning: A choudary is someone who is head of a tribe or village.', 'Grammatical category: Adjective',
        'Word forms: plural Chudries chodriyon',
        'Spelling variations: choudary, chodry']
      setdescriptions(arr)
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'Wahhabism') {
      let arr = ['File ID: MA-JL-040', 'Link: https://www.dawn.com/news/1700077/smokers-corner-slurred-speech',
        'Concordance: Wahhabism is often associated with', 'Usage in sentence: People talk less about Wahhabism. Wahhabism is more in practice in some areas than other school of thoughts.',
        'Meaning : a sect of Muslims', 'Grammatical category : noun', 'Word forms: Wahhaby, Wahabbies, wahabi-yon', 'Possible Spelling variations : Wahhaby, wahhabee']
      setdescriptions(arr)
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'dera') {
      let arr = ['File ID: BLGPK001', 'Link: https://blogpakistan.pk/category/entertainment/',
        'Concordance: An eatery named ‘Dera’ provides refreshing and delicious food', 'Usage in sentence: there were many women on Nawab’s dera.',
        'Meaning : camp, mound or settlement', 'Grammatical category: Noun ', 'Word forms: dera, deray (plural)',
        'Possible Spelling variations : derah']
      setdescriptions(arr)
      searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'besan') {
      let arr = ['File ID: 8YNG', 'Link: https://www.dawn.com/news/1696655/the-ultimate-sunscreen-guide',
        'Concordance: Besan is a natural cleanser ', 'Usage in sentence: Besan is traditionally used in several Pakistani recipes.',
        'Meaning: gram flour', 'Grammatical category: noun', 'Word forms: besun', 'Possible Spelling variations: Daadee (singular)']
      setdescriptions(arr)
      // setWordDescription('adjective')
      // searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'shias and sunnis') {
      let arr = ['File ID: CH1HF', 'Concordance : when people talk about the enmity between shias and sunnis',
        'Usage in sentence: This conference is organized for both shia and sunni scholars.', 'Meaning : Two muslim sects ',
        'Grammatical category : Noun', 'Word forms: Shiah, sunnee', 'Possible Spelling variations : Shiah and sunnee']
      setdescriptions(arr)
      // searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'chappatis') {
      let arr = ['File ID: SRBRD', 'Link: Nadeem Aslam season of rain birds', 'Concordance: got ready to bake chappatis.',
        'Usage in sentence: She made round chappatis for the dinner.', 'Meaning : Indian flat bread.',
        'Grammatical category : Noun', 'Word forms: Chapati', 'Possible Spelling variations : Chapatee, Chapaty']
      setdescriptions(arr)
      // searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'ahl-e-hawas') {
      let arr = ['File ID: PHDHEC003', 'Link: http://prr.hec.gov.pk/jspui/handle/123456789/16263',
        'Concordance Taliban are ahl-ehawas', 'Usage in sentence: This gathering is not for ahl-e-hawas.',
        'Meaning : men of greed', 'Grammatical category: Noun', 'Word forms: NA', 'Possible Spelling variations: Ahl-e-hawus']
      setdescriptions(arr)
      // searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'hijab') {
      let arr = ['File ID: PHDHEC003', 'Link: http://prr.hec.gov.pk/jspui/handle/123456789/16263',
        'Concordance : concept of hijab and physical intimacy', 'Usage in sentence: I like your hijab.',
        'Meaning : clothing that covers head and/or face of women (muslim)', 'Grammatical category : Noun',
        'Word forms: hijaab', 'Possible Spelling variations : Hejab, hijaab']
      setdescriptions(arr)
      // searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'imam') {
      let arr = ['File ID: PHDHEC004', 'Link: http://prr.hec.gov.pk/jspui/handle/123456789/14436', 'Concordance : merciful followers of a faith…….Imam',
        'Usage in sentence: Imam is now in the masjid.', 'Meaning : A person who is being followed while offering  prayer. He stands in front of everyone.', 'Grammatical category : Noun',
        'Word forms: imams , Imambargah', 'Possible Spelling variations:  imaam']
      setdescriptions(arr)
      // searchConcordance()
      setShowConcordance(true)
    }
    else if (Word === 'Jihadi') {
      let arr = ['File ID: PHDHEC004', 'Link: http://prr.hec.gov.pk/jspui/handle/123456789/14436',
        'Concordance: merciful followers of faith……jihadi ', 'Usage in sentence: His son in law is a jihadi.',
        'Meaning:  Who is at war against non-muslims.', 'Grammatical category: Adjective',
        'Word forms: jihad,Jihadi,jihadis, jihadist,jihadists', 'Possible Spelling variations: Jihaadi, Jihady,jihadee']
      setdescriptions(arr)
      // searchConcordance()
      setShowConcordance(true)
    }
    else {
      let arr = ['No description found for this word']
      setdescriptions(arr)
      searchConcordance()
      setShowConcordance(true)
    }
  }, null)
  return (
    <div>
      <Bar />
      <div className="container">

        <br />
        <button onClick={e => {
          e.preventDefault()
          navigation('/Search')
        }} className="rounded border text-white form-control bg-primary" style={{ width: '100px' }}>
          Go Back
        </button>
        <br />
        <div className="container row">
          &nbsp;
          <div style={{ color: "#b03e41" }}>
            <h4>Definition of '{Word}'</h4>
          </div>
          <div className="float-start col-md-10 col-sm-10">
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
              <br />
              <span>
                {descriptions.length > 0 && descriptions.map((desc) => <p>
                  <strong><span style={{ color: "#b03e41" }}>{desc.split(':')[0]}:</span></strong><span>{desc.split(':')[1]}</span></p>)}
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
          {/* <div className="float-end col-md-4 col-sm-4">
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
          </div> */}
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
        {showConcordance === true && <table class="table">
          <thead>
            <h2 style={{ textAlign: "center" }}>Concordance</h2>
            <tr>
              <th scope="col">Text From File</th>
              <th scope="col">Left Text</th>
              <th scope="col">Center Word</th>
              <th scope="col">Right Text</th>
            </tr>
          </thead>
          <tbody>
            {concordanceResults.length > 0 && concordanceResults.map((item, index) => <tr>
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
