import React, { useState, useEffect } from "react";
import Bar from '../components/Bar'
import { useNavigate, useLocation } from 'react-router-dom'
import { url } from "../components/Variable";
import useSound from 'use-sound';

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
  const searchConcordance = (des=[]) => {
    console.log('desss-->',des)
    if (abc.length > 0) {
      fetch(`${url}/corpus/findKWIC/1`, {
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
            // console.log('response--->', response.doc)
            if (response.doc.results.length > 0) {
              setdescriptions(des)
              setconcordanceResults(response.doc.results)
              setShowConcordance(true)
            } else {
              alert('No results found for word: ' + abc)
            }

            // setData(response.doc);
          }

        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  useEffect(() => {
    // console.log(loction.state?.value)
    // console.log('idsfsdfi')
    setWord(loction.state?.value)
    if (abc === 'Choudary') {
      let arr = ['File ID: MA-JN-031', 'Link: www.thenews.com.pk/magazine/money-matters/967492-the-ultimate-challenge'
        , 'Concordance: the famous ‘Choudhry ‘of Gujrat', 'Usage in sentence: This matter is discussed by Choudary. Choudary drives them all to the site.',
        'Meaning: A choudary is someone who is head of a tribe or village.', 'Grammatical category: Adjective',
        'Word forms: plural Chudries chodriyon',
        'Spelling variations: choudary, chodry']
      setdescriptions(arr)
      searchConcordance()
      setShowConcordance(true)
    }
    else if (abc === 'Wahhabism') {
      let arr = ['File ID: MA-JL-040', 'Link: www.dawn.com/news/1700077/smokers-corner-slurred-speech',
        'Concordance: Wahhabism is often associated with', 'Usage in sentence: People talk less about Wahhabism. Wahhabism is more in practice in some areas than other school of thoughts.',
        'Meaning : a sect of Muslims', 'Grammatical category : noun', 'Word forms: Wahhaby, Wahabbies, wahabi-yon', 'Possible Spelling variations : Wahhaby, wahhabee']
      setdescriptions(arr)
      searchConcordance()
      setShowConcordance(true)
    }
    else if (abc === 'dera') {
      let arr = ['File ID: BLGPK001', 'Link: blogpakistan.pk/category/entertainment/',
        'Concordance: An eatery named ‘Dera’ provides refreshing and delicious food', 'Usage in sentence: there were many women on Nawab’s dera.',
        'Meaning : camp, mound or settlement', 'Grammatical category: Noun ', 'Word forms: dera, deray (plural)',
        'Possible Spelling variations : derah']
      setdescriptions(arr)
      searchConcordance()
      setShowConcordance(true)
    }
    else if (abc === 'besan') {
      let arr = ['File ID: 8YNG', 'Link: www.dawn.com/news/1696655/the-ultimate-sunscreen-guide',
        'Concordance: Besan is a natural cleanser ', 'Usage in sentence: Besan is traditionally used in several Pakistani recipes.',
        'Meaning: gram flour', 'Grammatical category: noun', 'Word forms: besun', 'Possible Spelling variations: besun, beysan']
      setdescriptions(arr)
      // setWordDescription('adjective')
      searchConcordance(arr)
      setShowConcordance(true)
    }
    else if (abc === 'shias and sunnis') {
      let arr = ['File ID: CH1HF', 'Concordance : when people talk about the enmity between shias and sunnis',
        'Usage in sentence: This conference is organized for both shia and sunni scholars.', 'Meaning : Two muslim sects ',
        'Grammatical category : Noun', 'Word forms: Shiah, sunnee', 'Possible Spelling variations : Shiah and sunnee']
      setdescriptions(arr)
      // searchConcordance()
      setShowConcordance(true)
    }
    else if (abc === 'chappatis') {
      let arr = ['File ID: SRBRD', 'Link: Nadeem Aslam season of rain birds', 'Concordance: got ready to bake chappatis.',
        'Usage in sentence: She made round chappatis for the dinner.', 'Meaning : Indian flat bread.',
        'Grammatical category : Noun', 'Word forms: Chapati', 'Possible Spelling variations : Chapatee, Chapaty']
      setdescriptions(arr)
      // searchConcordance()
      setShowConcordance(true)
    }
    else if (abc === 'ahl-e-hawas') {
      let arr = ['File ID: PHDHEC003', 'Link: http://prr.hec.gov.pk/jspui/handle/123456789/16263',
        'Concordance Taliban are ahl-ehawas', 'Usage in sentence: This gathering is not for ahl-e-hawas.',
        'Meaning : men of greed', 'Grammatical category: Noun', 'Word forms: NA', 'Possible Spelling variations: Ahl-e-hawus']
      setdescriptions(arr)
      searchConcordance()
      setShowConcordance(true)
    }
    else if (abc === 'hijab') {
      let arr = ['File ID: PHDHEC003', 'Link: http://prr.hec.gov.pk/jspui/handle/123456789/16263',
        'Concordance : concept of hijab and physical intimacy', 'Usage in sentence: I like your hijab.',
        'Meaning : clothing that covers head and/or face of women (muslim)', 'Grammatical category : Noun',
        'Word forms: hijaab', 'Possible Spelling variations : Hejab, hijaab']
      setdescriptions(arr)
      searchConcordance()
      setShowConcordance(true)
    }
    else if (abc === 'imam') {
      let arr = ['File ID: PHDHEC004', 'Link: http://prr.hec.gov.pk/jspui/handle/123456789/14436', 'Concordance : merciful followers of a faith…….Imam',
        'Usage in sentence: Imam is now in the masjid.', 'Meaning : A person who is being followed while offering  prayer. He stands in front of everyone.', 'Grammatical category : Noun',
        'Word forms: imams , Imambargah', 'Possible Spelling variations:  imaam']
      setdescriptions(arr)
      searchConcordance()
      setShowConcordance(true)
    }
    else if (abc === 'Jihadi') {
      let arr = ['File ID: PHDHEC004', 'Link: http://prr.hec.gov.pk/jspui/handle/123456789/14436',
        'Concordance: merciful followers of faith……jihadi ', 'Usage in sentence: His son in law is a jihadi.',
        'Meaning:  Who is at war against non-muslims.', 'Grammatical category: Adjective',
        'Word forms: jihad,Jihadi,jihadis, jihadist,jihadists', 'Possible Spelling variations: Jihaadi, Jihady,jihadee']
      setdescriptions(arr)
      searchConcordance()
      setShowConcordance(true)
    }
    else {
      let arr = ['No description found for this word']
      setdescriptions(arr)
      // searchConcordance()
      // setShowConcordance(true)
    }
  }, descriptions)
  const handlePlay = (word) => {
    if(word==='besan'){
      let src = 'https://firebasestorage.googleapis.com/v0/b/pakgentextweb.appspot.com/o/Besan.m4a?alt=media&token=7d3d4662-a409-4a60-abef-f250a2dfc69f'
      const audio = new Audio(src);
      audio.loop = false;
      audio.play();
    }
    else if(word==='Choudary'){
      let src = 'https://firebasestorage.googleapis.com/v0/b/pakgentextweb.appspot.com/o/Choudary.m4a?alt=media&token=22eb596d-070d-49c9-9696-883755d9cfaa'
      const audio = new Audio(src);
      audio.loop = false;
      audio.play();
    }
    else if(word==='Wahhabism'){
      let src = 'https://firebasestorage.googleapis.com/v0/b/pakgentextweb.appspot.com/o/Wahhabism.m4a?alt=media&token=b5899e61-8397-4298-b4bb-6c6014d122b5'
      const audio = new Audio(src);
      audio.loop = false;
      audio.play();
    }
    else if(word==='shias and sunnis'){
      let src = 'https://firebasestorage.googleapis.com/v0/b/pakgentextweb.appspot.com/o/shias%20and%20sunnis.m4a?alt=media&token=869bb59d-0b9e-45ee-b73a-14a708bc7a84'
      const audio = new Audio(src);
      audio.loop = false;
      audio.play();
    }
    else if(word==='chappatis'){
      let src = 'https://firebasestorage.googleapis.com/v0/b/pakgentextweb.appspot.com/o/chappatis.m4a?alt=media&token=8305b083-cca7-403f-ac94-be6a9fab6025'
      const audio = new Audio(src);
      audio.loop = false;
      audio.play();
    }
    else if(word==='ahl-e-hawas'){
      let src = 'https://firebasestorage.googleapis.com/v0/b/pakgentextweb.appspot.com/o/ahl-e-hawas.m4a?alt=media&token=5000ab82-6420-4a65-8271-898f4a96a2be'
      const audio = new Audio(src);
      audio.loop = false;
      audio.play();
    }
    else if(word==='hijab'){
      let src = 'https://firebasestorage.googleapis.com/v0/b/pakgentextweb.appspot.com/o/hijab.m4a?alt=media&token=0dd2f298-157d-4b5a-8143-240f043bd316'
      const audio = new Audio(src);
      audio.loop = false;
      audio.play();
    }
    else if(word==='imam'){
      let src = 'https://firebasestorage.googleapis.com/v0/b/pakgentextweb.appspot.com/o/imam.m4a?alt=media&token=d79a49fe-1055-4ef9-bb63-6c4b8d5fed4f'
      const audio = new Audio(src);
      audio.loop = false;
      audio.play();
    }
    else if(word==='Jihadi'){
      let src = 'https://firebasestorage.googleapis.com/v0/b/pakgentextweb.appspot.com/o/Jihadi.m4a?alt=media&token=d05fa15b-48e9-4496-a229-f6e0c1c1b827'
      const audio = new Audio(src);
      audio.loop = false;
      audio.play();
    }
    else if(word==='dera'){
      let src = 'https://firebasestorage.googleapis.com/v0/b/pakgentextweb.appspot.com/o/Besan.m4a?alt=media&token=7d3d4662-a409-4a60-abef-f250a2dfc69f'
      const audio = new Audio(src);
      audio.loop = false;
      audio.play();
    }
  }
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
                  onClick={()=>handlePlay(Word)}
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
                {descriptions.length>0 && descriptions.map((desc) => <p>
                  <strong><span style={{ color: "#b03e41" }}>{desc.split(':')[0]}:</span></strong><span>{desc.split(':')[0]==='Link'?<a target={'_blank'} href={" https://"+desc.split(':')[1].trim()}>{" https://"+desc.split(':')[1].trim()}</a>:desc.split(':')[1]}</span></p>)}
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
