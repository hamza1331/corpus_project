import React, { useState, useEffect } from "react";
import "../Styles/Home.css";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from 'react-router-dom'
import { url } from './Variable'
import { Link } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner';
import { categories } from "./categories";
import swal from 'sweetalert'
import Copyright from "./Copyright";
export default function Home() {
    const [data, setdata] = useState([])
    const [Word, setWord] = useState('');
    const [selectedIndex, setselectedIndex] = useState(0)
    const [showFilesTable, setshowFilesTable] = useState(false)
    const [selectedCategory, setselectedCategory] = useState('')
    const [showLoader, setshowLoader] = useState(false)
    const [corpusStats, setCorpusStats] = useState(null)
    const [corpusStatsLoading, setCorpusStatsLoading] = useState(true)
    const [showCat2, setShowCat2] = useState(false)
    const [categories2, setcategories2] = useState([])
    const [cat2Index,setCat2index] = useState(-1)
    const [folders, setFolders] = useState([])
    const toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    }
    useEffect(() => {
        setshowLoader(true)
        fetch(url + '/corpus/downloadCorpus')
            .then((res) => res.json())
            .then(response => {
                setshowLoader(false)
                if (response.message === 'Success') {
                    setdata(response.doc)
                }
            })
    }, [])

    useEffect(() => {
        setCorpusStatsLoading(true)
        fetch(url + '/api/corpus-stats')
            .then(res => res.json())
            .then(response => {
                setCorpusStatsLoading(false)
                if (response.message === 'Success' && response.doc) {
                    setCorpusStats(response.doc)
                }
            })
            .catch(err => {
                console.error('Failed to load corpus stats', err)
                setCorpusStatsLoading(false)
            })
    }, [])

    const formatNumber = (n) => {
        if (n === null || n === undefined) return ''
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    useEffect(() => {
        // Load corpus directory tree and flatten to folders for homepage dynamic list
        fetch(`${url}/corpus-management/structure`)
            .then(res => res.json())
            .then(response => {
                if (response.message === 'Success' && response.doc && Array.isArray(response.doc.structure)) {
                    const flat = []

                    const walk = (items, prefix = '') => {
                        items.forEach(item => {
                            if (item.type === 'directory') {
                                const path = item.path || (prefix ? `${prefix}/${item.name}` : item.name)
                                const filesCount = (item.children || []).filter(c => c.type === 'file').length
                                flat.push({
                                    label: path || '/',
                                    value: path,
                                    name: item.name,
                                    children: item.children || [],
                                    filesCount
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
            .catch(err => console.log('Failed to load corpus structure', err))
    }, [])

    const navigation = useNavigate();
    const Searchword = async (e) => {
        // setIsLoading(true)
            if (Word.length > 0) {
            // prefer explicit selection (`selectedCategory`) if set (e.g., user clicked a main-row),
            // otherwise use the selected index from the categories panel (folders or legacy categories)
            const dirPath = selectedCategory || (folders.length > 0 ? (folders[selectedIndex] && folders[selectedIndex].value) : (categories[selectedIndex] && categories[selectedIndex].value))
            navigation('/Sresult', { state: { Word: Word, dirPath } })

        }
        else {
            swal({
                title: "Invalid search!",
                text: "Search word can not be empty",
                icon: 'error',
            });
        }
    }
    return (
        <div style={{ backgroundColor: "#f0faef" }}>
            <div className="container">
                <div className="row">
                    <span>
                        <br />
                        <h2><strong>"You Shall Know a word by the company it keeps."</strong> Firth (1957)</h2>
                    </span>
                    <div className="pt-4 d-flex justify-content-center">

                        <div class="bg-white p-2 w-75 ">

                            <div className="d-flex justify-content-center">
                                <input
                                    placeholder="Search Word"
                                    className="m-1 rounded border w-75"
                                    onChange={(e) => setWord(e.target.value)}
                                />
                                <button
                                    className="p-1 px-5 rounded border text-white"
                                    style={{ backgroundColor: "#5db959" }}
                                    onClick={() => Searchword()}
                                >
                                    <i class="fa fa-search"></i>
                                </button>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-6 col-sm-6 p-5">
                        <div className="pt-3 border border-2 p-2 border-success pb-3">
                            <h6 className="p-3">
                            PakLocCorp represents corpus of Pakistani English and this corpus is a collection of text from multiple genres and registers. There are currently {corpusStatsLoading ? (
                                        <span style={{display:'inline-block', verticalAlign:'middle'}}>
                                            <ColorRing
                                                visible={true}
                                                height="18"
                                                width="18"
                                                ariaLabel="loading"
                                                wrapperStyle={{ display: 'inline-block', marginLeft: 6, marginRight: 6 }}
                                                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
                                            />
                                        </span>
                                    ) : (
                                        `${formatNumber(corpusStats && corpusStats.files ? corpusStats.files : 0)} files in total and ${formatNumber(corpusStats && corpusStats.words ? corpusStats.words : 0)} words.`
                                    )} These collections are a window to the variations of English. It contains words from magazines, newspapers, fiction, academic texts and research publications. This corpus is expanding and open to contribution. Researchers, academicians, scholars and policy makers may use this corpus. Moreover, you may also contribute relevant data. Data will be added after scrutiny by the team PakLocCorp.
 <br />
                                This non-commercial research project is freely available for academic purposes. By downloading it, or using it online, you agree with the <span><Link to='/Terms'>Term and Conditions</Link></span>. User guide and tutorials are also available. This specialized corpus offers Urduized word list along with source reference for advance research and it is expanding. Scholars are also encouraged for contributions in the form of small or large corpus of local indigenous variety of English.
                            </h6>
                            <br />
                        </div>
                    </div>

                    <div className="col-md-6 col-sm-6 p-5">
                        <div className="pt-3 border border-success border-2">
                            <div className="grid-container">
                                <div className="grid-item">
                                    <div className="d-flex justify-content-center">
                                        <h5 className="pb-2">Categories</h5>
                                    </div>
                                    <div className="d-flex justify-content-center pb-4">
                                        <Scrollbars
                                            style={{
                                                height: "170px",
                                                width: "180px",
                                                paddingLeft: "19px"
                                            }}
                                            className="bg-white border border-2 border-black"
                                        >
                                            {(folders.length > 0 ? folders : categories).map((cat, ind) => {
                                                const usingFolders = folders.length > 0
                                                const hasChildren = Array.isArray(cat.children) && cat.children.length > 0
                                                return <option key={ind} style={{ backgroundColor: selectedIndex === ind ? "lightblue" : "transparent", padding: 5 }} onClick={e => {
                                                    e.preventDefault()
                                                    setselectedIndex(ind)
                                                    if (usingFolders) {
                                                        // only select path, do not expand or show internal files
                                                        setselectedCategory(cat.value || cat.path || cat.label || cat.name)
                                                        setShowCat2(false)
                                                        setcategories2([])
                                                    } else {
                                                        if (hasChildren) {
                                                            setcategories2(cat.children)
                                                            setShowCat2(true)
                                                        }
                                                        else{
                                                            setcategories2([])
                                                            setShowCat2(false)
                                                        }
                                                    }
                                                }} value={cat.value || cat.path || cat.name}>{/* value kept for compatibility */}
                                                    {cat.label ? cat.label : (cat.text ? cat.text : cat.name)}
                                                </option>
                                            })}
                                        </Scrollbars>
                                    </div>
                                </div>
                                {showCat2 === true && categories2.length > 0 && <div className="grid-item">
                                    <div className="d-flex justify-content-center">
                                        <h5 className="pb-2">{categories[selectedIndex].text}</h5>
                                    </div>
                                    <div className="d-flex justify-content-center pb-4">
                                        <Scrollbars
                                            style={{
                                                height: "170px",
                                                width: "180px",
                                                paddingLeft: "19px",
                                            }}
                                            className="bg-white border border-2 border-black"
                                        >
                                            {categories2.length > 0 && categories2.map((cat, ind) => {
                                                    return <option style={{ backgroundColor: cat2Index === ind ? "lightblue" : "transparent", padding: 5 }} onClick={e => {
                                                        e.preventDefault()
                                                        setCat2index(ind)
                                                    }} value={cat.value || cat.path}>{cat.label ? cat.label : (cat.text ? cat.text : cat.name)}</option>
                                                })}
                                        </Scrollbars>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-sm-12 p-5">
                        <div className="pt-3 border border-2 p-2 border-success pb-3">
                            {showFilesTable === true && <a href="#" onClick={e => {
                                e.preventDefault()
                                setshowFilesTable(false)
                                setselectedCategory('')
                            }} style={{ marginLeft: 10 }}>Go Back</a>}
                            <h5 className="d-flex justify-content-center">
                                <b>{showFilesTable === false ? "PakLocCorp Data Sets" : selectedCategory.toUpperCase()}</b>
                            </h5>
                            <br />
                            <div className="table-responsive">
                                {showFilesTable === false && <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Corpus</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Genre</th>
                                            {/* <th scope="col">Frequency (Urduised words)</th> */}
                                        </tr>
                                    </thead>
                                    {showLoader === false && <tbody>
                                        { /* If folders fetched, render them dynamically; otherwise fallback to existing `data` */ }
                                        {folders.length > 0 ? folders.map((f) => (
                                            <tr key={f.value}>
                                                <td onClick={e => {
                                                    e.preventDefault()
                                                    // store selection but do not expand or show internal files
                                                    setselectedCategory(f.value)
                                                }} style={{
                                                    color: "blue",
                                                    textDecoration: "underline",
                                                    cursor: 'pointer'
                                                }}>{toTitleCase(f.label)}</td>
                                                <td>{f.filesCount ? `${f.filesCount} files` : ''}</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        )) : (data.length > 0 && data.map((corp) => <tr key={corp.name}>
                                            <td onClick={e => {
                                                e.preventDefault()
                                                setselectedCategory(corp.name.toLowerCase())
                                                setshowFilesTable(true)

                                            }} style={{
                                                color: "blue",
                                                textDecoration: "underline",
                                                cursor: 'pointer'
                                            }}>{toTitleCase(corp.name)}</td>
                                            <td>{corp.noOfWords + " words"}</td>
                                            <td>{corp.time}</td>
                                            <td>{corp.genre}</td>
                                        </tr>))}
                                    </tbody>}
                                    {showLoader === true && <ColorRing
                                        visible={showLoader}
                                        height="80"
                                        width="80"
                                        ariaLabel="blocks-loading"
                                        wrapperStyle={{ marginLeft: '50%' }}
                                        wrapperClass="blocks-wrapper"
                                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                                    />}
                                </table>}
                                {/* folder children are intentionally not expanded on selection; search will use selected folder as `dirPath` */}
                                {showFilesTable === true && selectedCategory === 'academic' &&
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td><b>File ID</b></td>
                                                <td><b>Genre</b></td>
                                                <td><b>Category/Title</b></td>
                                                <td><b>Files</b></td>
                                                <td><b>Words</b></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>CRT001</td>
                                                <td>Class assignment</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>622</td>
                                            </tr>
                                            <tr>
                                                <td>CRT002</td>
                                                <td>Class assignment</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>928</td>
                                            </tr>
                                            <tr>
                                                <td>CRT003</td>
                                                <td>Student writing</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>356</td>
                                            </tr>
                                            <tr>
                                                <td>CRT004</td>
                                                <td>Story writing</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>1163</td>
                                            </tr>
                                            <tr>
                                                <td>CRT005</td>
                                                <td>Class assignment</td>
                                                <td>A level</td>
                                                <td>1</td>
                                                <td>443</td>
                                            </tr>
                                            <tr>
                                                <td>CRT006</td>
                                                <td>Class assignment</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>784</td>
                                            </tr>
                                            <tr>
                                                <td>CRT007</td>
                                                <td>Fiction writing</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>1268</td>
                                            </tr>
                                            <tr>
                                                <td>CRT008</td>
                                                <td>Class assignment</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>1064</td>
                                            </tr>
                                            <tr>
                                                <td>CRT009</td>
                                                <td>ESSAY</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>325</td>
                                            </tr>
                                            <tr>
                                                <td>CRT010</td>
                                                <td>ESSAY</td>
                                                <td>A LEVEL</td>
                                                <td>1</td>
                                                <td>672</td>
                                            </tr>
                                            <tr>
                                                <td>CRT011</td>
                                                <td>USEFP ESSAY COMPETION</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>1021</td>
                                            </tr>
                                            <tr>
                                                <td>CRT012</td>
                                                <td>essay</td>
                                                <td>O LEVEL</td>
                                                <td>1</td>
                                                <td>2432</td>
                                            </tr>
                                            <tr>
                                                <td>CRT013</td>
                                                <td>LETTTER</td>
                                                <td>O LEVEL</td>
                                                <td>1</td>
                                                <td>413</td>
                                            </tr>
                                            <tr>
                                                <td>CRT014</td>
                                                <td>essay</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>1016</td>
                                            </tr>
                                            <tr>
                                                <td>CRT015</td>
                                                <td>essay</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>905</td>
                                            </tr>
                                            <tr>
                                                <td>CRT016</td>
                                                <td>Class assignment</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>451</td>
                                            </tr>
                                            <tr>
                                                <td>CRT017</td>
                                                <td>ESSAY</td>
                                                <td>A LEVEL</td>
                                                <td>1</td>
                                                <td>344</td>
                                            </tr>
                                            <tr>
                                                <td>CRT018</td>
                                                <td>ESSAY</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>362</td>
                                            </tr>
                                            <tr>
                                                <td>CRT019</td>
                                                <td>Fiction Writing</td>
                                                <td>A LEVEL</td>
                                                <td>1</td>
                                                <td>3228</td>
                                            </tr>
                                            <tr>
                                                <td>CRT020</td>
                                                <td>essay</td>
                                                <td>O LEVEL</td>
                                                <td>1</td>
                                                <td>477</td>
                                            </tr>
                                            <tr>
                                                <td>CRT021</td>
                                                <td>Fiction Writing</td>
                                                <td>O level</td>
                                                <td>1</td>
                                                <td>1962</td>
                                            </tr>
                                            <tr>
                                                <td>CRT022</td>
                                                <td>Fiction Writing</td>
                                                <td>O level</td>
                                                <td>1</td>
                                                <td>397</td>
                                            </tr>
                                            <tr>
                                                <td>CRT023</td>
                                                <td>Essay</td>
                                                <td>A level</td>
                                                <td>1</td>
                                                <td>528</td>
                                            </tr>
                                            <tr>
                                                <td>CRT024</td>
                                                <td>Class assignment</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>442</td>
                                            </tr>
                                            <tr>
                                                <td>CRT025</td>
                                                <td>Essay</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>603</td>
                                            </tr>
                                            <tr>
                                                <td>CRT026</td>
                                                <td>Fiction Writing</td>
                                                <td>Olevel</td>
                                                <td>1</td>
                                                <td>1093</td>
                                            </tr>
                                            <tr>
                                                <td>CRT027</td>
                                                <td>Fiction Writing</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>1436</td>
                                            </tr>
                                            <tr>
                                                <td>CRT028</td>
                                                <td>Fiction Writing</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>3330</td>
                                            </tr>
                                            <tr>
                                                <td>CRT029</td>
                                                <td>Essay</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>363</td>
                                            </tr>
                                            <tr>
                                                <td>CRT030</td>
                                                <td>Essay</td>
                                                <td>undergraduate</td>
                                                <td>1</td>
                                                <td>968</td>
                                            </tr>
                                            <tr>
                                                <td>CRT031</td>
                                                <td>Young author competition</td>
                                                <td>Junior school</td>
                                                <td>1</td>
                                                <td>467</td>
                                            </tr>
                                            <tr>
                                                <td>CRT032</td>
                                                <td>Young author competition</td>
                                                <td>Junior school</td>
                                                <td>1</td>
                                                <td>466</td>
                                            </tr>
                                            <tr>
                                                <td>CRT033</td>
                                                <td>Young author competition</td>
                                                <td>O level</td>
                                                <td>1</td>
                                                <td>639</td>
                                            </tr>
                                            <tr>
                                                <td>CRT034</td>
                                                <td>Young author competition</td>
                                                <td>O level</td>
                                                <td>1</td>
                                                <td>1024</td>
                                            </tr>
                                            <tr>
                                                <td>CRT035</td>
                                                <td>Young author competition</td>
                                                <td>Junior school</td>
                                                <td>1</td>
                                                <td>169</td>
                                            </tr>
                                            <tr>
                                                <td>CRT036</td>
                                                <td>Young author competition</td>
                                                <td>O level</td>
                                                <td>1</td>
                                                <td>460</td>
                                            </tr>
                                            <tr>
                                                <td>CRT037</td>
                                                <td>Young author competition</td>
                                                <td>O level</td>
                                                <td>1</td>
                                                <td>978</td>
                                            </tr>
                                            <tr>
                                                <td>CRT038</td>
                                                <td>TEFL assignments</td>
                                                <td>Graduate</td>
                                                <td>1</td>
                                                <td>9047</td>
                                            </tr>
                                            <tr>
                                                <td>CRT039</td>
                                                <td>TEFL assignments</td>
                                                <td>Graduate</td>
                                                <td>1</td>
                                                <td>5397</td>
                                            </tr>
                                            <tr>
                                                <td>CRT040</td>
                                                <td>TEFL assignments</td>
                                                <td>Graduate</td>
                                                <td>1</td>
                                                <td>4453</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC001</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>76261</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC002</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>56198</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC003</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>96569</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC004</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>56947</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC005</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>61432</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC006</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>85603</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC007</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>70924</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC008</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>142197</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC009</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>34480</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC010</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>110713</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC011</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>84109</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC012</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>118937</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC013</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>180143</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC014</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>73304</td>
                                            </tr>
                                            <tr>
                                                <td>PHDHEC015</td>
                                                <td>PhD theses</td>
                                                <td>Linguistics and literature</td>
                                                <td>1</td>
                                                <td>69750</td>
                                            </tr>
                                        </tbody>
                                        <tr>
                                            <td><b>Total</b></td>
                                            <td></td>
                                            <td></td>
                                            <td><b>55</b></td>
                                            <td><b>1370063</b></td>
                                        </tr>
                                    </table>}
                                {showFilesTable === true && selectedCategory === 'media' &&
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td><b>File ID</b></td>
                                                <td><b>Genre</b></td>
                                                <td><b>Category/Title</b></td>
                                                <td><b>Files</b></td>
                                                <td><b>Words</b></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Af-Pak ties</td>
                                                <td>1</td>
                                                <td>473</td>
                                            </tr>
                                            <tr>
                                                <td>2ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>The accountability show</td>
                                                <td>1</td>
                                                <td>471</td>
                                            </tr>
                                            <tr>
                                                <td>3ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>A presidential system for Pakistan</td>
                                                <td>1</td>
                                                <td>1344</td>
                                            </tr>
                                            <tr>
                                                <td>4ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Crimes in Islamabad</td>
                                                <td>1</td>
                                                <td>136</td>
                                            </tr>
                                            <tr>
                                                <td>5ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Hell on earth</td>
                                                <td>1</td>
                                                <td>161</td>
                                            </tr>
                                            <tr>
                                                <td>6ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>On guard</td>
                                                <td>1</td>
                                                <td>190</td>
                                            </tr>
                                            <tr>
                                                <td>7ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Banking Blues</td>
                                                <td>1</td>
                                                <td>87</td>
                                            </tr>
                                            <tr>
                                                <td>8ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Unrecognized heroes</td>
                                                <td>1</td>
                                                <td>116</td>
                                            </tr>
                                            <tr>
                                                <td>9ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Unsafe in Karachi</td>
                                                <td>1</td>
                                                <td>62</td>
                                            </tr>
                                            <tr>
                                                <td>10ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Beyond laws</td>
                                                <td>1</td>
                                                <td>121</td>
                                            </tr>
                                            <tr>
                                                <td>11ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Rekindling the Anarkali romance</td>
                                                <td>1</td>
                                                <td>1156</td>
                                            </tr>
                                            <tr>
                                                <td>12ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Climate change and the NSP</td>
                                                <td>1</td>
                                                <td>742</td>
                                            </tr>
                                            <tr>
                                                <td>13ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Employing the Yalta model</td>
                                                <td>1</td>
                                                <td>1232</td>
                                            </tr>
                                            <tr>
                                                <td>14ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Dispelling suspicion</td>
                                                <td>1</td>
                                                <td>117</td>
                                            </tr>
                                            <tr>
                                                <td>15ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Planning policy</td>
                                                <td>1</td>
                                                <td>124</td>
                                            </tr>
                                            <tr>
                                                <td>16ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Bumpy rides</td>
                                                <td>1</td>
                                                <td>305</td>
                                            </tr>
                                            <tr>
                                                <td>17ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Laudable move</td>
                                                <td>1</td>
                                                <td>66</td>
                                            </tr>
                                            <tr>
                                                <td>18ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>lone wolf</td>
                                                <td>1</td>
                                                <td>109</td>
                                            </tr>
                                            <tr>
                                                <td>19ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>No ethics</td>
                                                <td>1</td>
                                                <td>81</td>
                                            </tr>
                                            <tr>
                                                <td>20ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Spreading love</td>
                                                <td>1</td>
                                                <td>106</td>
                                            </tr>
                                            <tr>
                                                <td>21ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Guardians of morality</td>
                                                <td>1</td>
                                                <td>21</td>
                                            </tr>
                                            <tr>
                                                <td>22ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Nothing but a farce</td>
                                                <td>1</td>
                                                <td>102</td>
                                            </tr>
                                            <tr>
                                                <td>23ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Targeting minorities</td>
                                                <td>1</td>
                                                <td>427</td>
                                            </tr>
                                            <tr>
                                                <td>24ED2-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Local power</td>
                                                <td>1</td>
                                                <td>564</td>
                                            </tr>
                                            <tr>
                                                <td>25D3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Realities of growth</td>
                                                <td>1</td>
                                                <td>1116</td>
                                            </tr>
                                            <tr>
                                                <td>26ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Fortification interventions</td>
                                                <td>1</td>
                                                <td>739</td>
                                            </tr>
                                            <tr>
                                                <td>27ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Kashmir at the UNGA</td>
                                                <td>1</td>
                                                <td>689</td>
                                            </tr>
                                            <tr>
                                                <td>28ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Nawaz Health</td>
                                                <td>1</td>
                                                <td>481</td>
                                            </tr>
                                            <tr>
                                                <td>29ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Learning, Language and Privilege</td>
                                                <td>1</td>
                                                <td>1161</td>
                                            </tr>
                                            <tr>
                                                <td>30ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>State Of Media</td>
                                                <td>1</td>
                                                <td>417</td>
                                            </tr>
                                            <tr>
                                                <td>31ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Discrimation at home</td>
                                                <td>1</td>
                                                <td>91</td>
                                            </tr>
                                            <tr>
                                                <td>32ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Corruption</td>
                                                <td>1</td>
                                                <td>198</td>
                                            </tr>
                                            <tr>
                                                <td>33ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Baby steps</td>
                                                <td>1</td>
                                                <td>131</td>
                                            </tr>
                                            <tr>
                                                <td>34ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Criminal neglect</td>
                                                <td>1</td>
                                                <td>80</td>
                                            </tr>
                                            <tr>
                                                <td>35ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Ignorance</td>
                                                <td>1</td>
                                                <td>73</td>
                                            </tr>
                                            <tr>
                                                <td>36ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>What a waste</td>
                                                <td>1</td>
                                                <td>79</td>
                                            </tr>
                                            <tr>
                                                <td>37ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Preventing A Pandemic</td>
                                                <td>1</td>
                                                <td>996</td>
                                            </tr>
                                            <tr>
                                                <td>38ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Unheard Greviances</td>
                                                <td>1</td>
                                                <td>153</td>
                                            </tr>
                                            <tr>
                                                <td>39ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Minors At Risk</td>
                                                <td>1</td>
                                                <td>104</td>
                                            </tr>
                                            <tr>
                                                <td>40ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Rising from the ashes</td>
                                                <td>1</td>
                                                <td>181</td>
                                            </tr>
                                            <tr>
                                                <td>41ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Nabbing NAB</td>
                                                <td>1</td>
                                                <td>152</td>
                                            </tr>
                                            <tr>
                                                <td>42ED3-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Strategic Ambiguity</td>
                                                <td>1</td>
                                                <td>134</td>
                                            </tr>
                                            <tr>
                                                <td>43ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>IMF trache</td>
                                                <td>1</td>
                                                <td>728</td>
                                            </tr>
                                            <tr>
                                                <td>44ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Thin Ice</td>
                                                <td>1</td>
                                                <td>125</td>
                                            </tr>
                                            <tr>
                                                <td>45ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Judicial Work</td>
                                                <td>1</td>
                                                <td>437</td>
                                            </tr>
                                            <tr>
                                                <td>46ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Reforms institutional impediments</td>
                                                <td>1</td>
                                                <td>1175</td>
                                            </tr>
                                            <tr>
                                                <td>47ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Bidens gambit</td>
                                                <td>1</td>
                                                <td>482</td>
                                            </tr>
                                            <tr>
                                                <td>48ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Governments dilemma</td>
                                                <td>1</td>
                                                <td>217</td>
                                            </tr>
                                            <tr>
                                                <td>49ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>RUDA Blowback</td>
                                                <td>1</td>
                                                <td>94</td>
                                            </tr>
                                            <tr>
                                                <td>50ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Policy changes</td>
                                                <td>1</td>
                                                <td>91</td>
                                            </tr>
                                            <tr>
                                                <td>51ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Rise and fall</td>
                                                <td>1</td>
                                                <td>104</td>
                                            </tr>
                                            <tr>
                                                <td>52ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Hard truths</td>
                                                <td>1</td>
                                                <td>87</td>
                                            </tr>
                                            <tr>
                                                <td>53ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Risky Roads</td>
                                                <td>1</td>
                                                <td>70</td>
                                            </tr>
                                            <tr>
                                                <td>54ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>The Blindfolded World</td>
                                                <td>1</td>
                                                <td>149</td>
                                            </tr>
                                            <tr>
                                                <td>55ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Judiciary ,Judges and Justice</td>
                                                <td>1</td>
                                                <td>1113</td>
                                            </tr>
                                            <tr>
                                                <td>56ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>A Phenomenal Rise</td>
                                                <td>1</td>
                                                <td>871</td>
                                            </tr>
                                            <tr>
                                                <td>57ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Haphazard</td>
                                                <td>1</td>
                                                <td>130</td>
                                            </tr>
                                            <tr>
                                                <td>58ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Promoting Gandhara</td>
                                                <td>1</td>
                                                <td>647</td>
                                            </tr>
                                            <tr>
                                                <td>59ED4-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Diplomatic Footprints</td>
                                                <td>1</td>
                                                <td>982</td>
                                            </tr>
                                            <tr>
                                                <td>60ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Rising Terror</td>
                                                <td>1</td>
                                                <td>519</td>
                                            </tr>
                                            <tr>
                                                <td>61ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>HEC-a Faustian Bargain</td>
                                                <td>1</td>
                                                <td>1107</td>
                                            </tr>
                                            <tr>
                                                <td>62ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Standing With Kashmir</td>
                                                <td>1</td>
                                                <td>420</td>
                                            </tr>
                                            <tr>
                                                <td>63ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Delays Delays</td>
                                                <td>1</td>
                                                <td>121</td>
                                            </tr>
                                            <tr>
                                                <td>64ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Reality check</td>
                                                <td>1</td>
                                                <td>235</td>
                                            </tr>
                                            <tr>
                                                <td>65ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Outcast</td>
                                                <td>1</td>
                                                <td>83</td>
                                            </tr>
                                            <tr>
                                                <td>66ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>No honour</td>
                                                <td>1</td>
                                                <td>94</td>
                                            </tr>
                                            <tr>
                                                <td>67ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Stormy Teacups</td>
                                                <td>1</td>
                                                <td>229</td>
                                            </tr>
                                            <tr>
                                                <td>68ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Tricky Paths</td>
                                                <td>1</td>
                                                <td>87</td>
                                            </tr>
                                            <tr>
                                                <td>69ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Do More</td>
                                                <td>1</td>
                                                <td>142</td>
                                            </tr>
                                            <tr>
                                                <td>70ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Language Barrier</td>
                                                <td>1</td>
                                                <td>105</td>
                                            </tr>
                                            <tr>
                                                <td>71ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Hellscape</td>
                                                <td>1</td>
                                                <td>151</td>
                                            </tr>
                                            <tr>
                                                <td>72ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>In solidarity with the Kashmiris</td>
                                                <td>1</td>
                                                <td>1036</td>
                                            </tr>
                                            <tr>
                                                <td>73ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Afghanistan Still Bleeding</td>
                                                <td>1</td>
                                                <td>863</td>
                                            </tr>
                                            <tr>
                                                <td>74ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Do More</td>
                                                <td>1</td>
                                                <td>142</td>
                                            </tr>
                                            <tr>
                                                <td>75ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Change In The Air</td>
                                                <td>1</td>
                                                <td>675</td>
                                            </tr>
                                            <tr>
                                                <td>76ED5-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Climate Of Impunity</td>
                                                <td>1</td>
                                                <td>972</td>
                                            </tr>
                                            <tr>
                                                <td>77ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>The Opposition Returns ?</td>
                                                <td>1</td>
                                                <td>573</td>
                                            </tr>
                                            <tr>
                                                <td>78ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Remembering Al-Farabi</td>
                                                <td>1</td>
                                                <td>1227</td>
                                            </tr>
                                            <tr>
                                                <td>79ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>A Song For The Ages</td>
                                                <td>1</td>
                                                <td>378</td>
                                            </tr>
                                            <tr>
                                                <td>80ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Smoking Illegally</td>
                                                <td>1</td>
                                                <td>134</td>
                                            </tr>
                                            <tr>
                                                <td>81ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Hangor Heroes</td>
                                                <td>1</td>
                                                <td>104</td>
                                            </tr>
                                            <tr>
                                                <td>82ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>NSP</td>
                                                <td>1</td>
                                                <td>184</td>
                                            </tr>
                                            <tr>
                                                <td>83ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>New Threat</td>
                                                <td>1</td>
                                                <td>104</td>
                                            </tr>
                                            <tr>
                                                <td>84ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Fighting in FATA</td>
                                                <td>1</td>
                                                <td>162</td>
                                            </tr>
                                            <tr>
                                                <td>85ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Kashmiri Struggle</td>
                                                <td>1</td>
                                                <td>85</td>
                                            </tr>
                                            <tr>
                                                <td>86ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>In Doubt</td>
                                                <td>1</td>
                                                <td>97</td>
                                            </tr>
                                            <tr>
                                                <td>87ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Enough People</td>
                                                <td>1</td>
                                                <td>114</td>
                                            </tr>
                                            <tr>
                                                <td>88ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>National Electricity Plan</td>
                                                <td>1</td>
                                                <td>1228</td>
                                            </tr>
                                            <tr>
                                                <td>89ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Shifting Order</td>
                                                <td>1</td>
                                                <td>815</td>
                                            </tr>
                                            <tr>
                                                <td>90ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Rebasing GDP</td>
                                                <td>1</td>
                                                <td>596</td>
                                            </tr>
                                            <tr>
                                                <td>91ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>A Threat of War</td>
                                                <td>1</td>
                                                <td>920</td>
                                            </tr>
                                            <tr>
                                                <td>92ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Stronger Ties</td>
                                                <td>1</td>
                                                <td>430</td>
                                            </tr>
                                            <tr>
                                                <td>93ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Pak Second War Against Terror</td>
                                                <td>1</td>
                                                <td>1380</td>
                                            </tr>
                                            <tr>
                                                <td>94ED7-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Time to Overhaul</td>
                                                <td>1</td>
                                                <td>450</td>
                                            </tr>
                                            <tr>
                                                <td>95ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>PSL Season</td>
                                                <td>1</td>
                                                <td>466</td>
                                            </tr>
                                            <tr>
                                                <td>96ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>‘O’ is for Omnibuses</td>
                                                <td>1</td>
                                                <td>113</td>
                                            </tr>
                                            <tr>
                                                <td>97ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Pensioners Plight</td>
                                                <td>1</td>
                                                <td>119</td>
                                            </tr>
                                            <tr>
                                                <td>98ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>NSP Nuances</td>
                                                <td>1</td>
                                                <td>189</td>
                                            </tr>
                                            <tr>
                                                <td>99ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>kashmir question</td>
                                                <td>1</td>
                                                <td>123</td>
                                            </tr>
                                            <tr>
                                                <td>100ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>An Arm And A Leg</td>
                                                <td>1</td>
                                                <td>77</td>
                                            </tr>
                                            <tr>
                                                <td>101ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>When The bough Breaks</td>
                                                <td>1</td>
                                                <td>133</td>
                                            </tr>
                                            <tr>
                                                <td>102ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Falling from Grace</td>
                                                <td>1</td>
                                                <td>94</td>
                                            </tr>
                                            <tr>
                                                <td>103ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>National Electricity plan (part 2)</td>
                                                <td>1</td>
                                                <td>1141</td>
                                            </tr>
                                            <tr>
                                                <td>104ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Latas Legacy</td>
                                                <td>1</td>
                                                <td>925</td>
                                            </tr>
                                            <tr>
                                                <td>105ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Tough Decisions</td>
                                                <td>1</td>
                                                <td>967</td>
                                            </tr>
                                            <tr>
                                                <td>106ED8-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Hazy Decisions</td>
                                                <td>1</td>
                                                <td>84</td>
                                            </tr>
                                            <tr>
                                                <td>107ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Crossborder Attacks</td>
                                                <td>1</td>
                                                <td>541</td>
                                            </tr>
                                            <tr>
                                                <td>108ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>National Security Wordplay</td>
                                                <td>1</td>
                                                <td>1267</td>
                                            </tr>
                                            <tr>
                                                <td>109ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>India Under Modi</td>
                                                <td>1</td>
                                                <td>506</td>
                                            </tr>
                                            <tr>
                                                <td>110ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Kashmiris Plight</td>
                                                <td>1</td>
                                                <td>96</td>
                                            </tr>
                                            <tr>
                                                <td>111ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>No Gas</td>
                                                <td>1</td>
                                                <td>58</td>
                                            </tr>
                                            <tr>
                                                <td>112ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Safety First</td>
                                                <td>1</td>
                                                <td>206</td>
                                            </tr>
                                            <tr>
                                                <td>113ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Stealing kashmir</td>
                                                <td>1</td>
                                                <td>75</td>
                                            </tr>
                                            <tr>
                                                <td>114ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Stinking Sewage</td>
                                                <td>1</td>
                                                <td>94</td>
                                            </tr>
                                            <tr>
                                                <td>115ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>City of Gardens</td>
                                                <td>1</td>
                                                <td>138</td>
                                            </tr>
                                            <tr>
                                                <td>116ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Lost in the Dark</td>
                                                <td>1</td>
                                                <td>153</td>
                                            </tr>
                                            <tr>
                                                <td>117ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Pointless PUEET</td>
                                                <td>1</td>
                                                <td>116</td>
                                            </tr>
                                            <tr>
                                                <td>118ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Rebuilding Relations</td>
                                                <td>1</td>
                                                <td>1198</td>
                                            </tr>
                                            <tr>
                                                <td>119ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Half Stability</td>
                                                <td>1</td>
                                                <td>802</td>
                                            </tr>
                                            <tr>
                                                <td>120ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Lessons from china</td>
                                                <td>1</td>
                                                <td>907</td>
                                            </tr>
                                            <tr>
                                                <td>121ED9-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Ways to end a race</td>
                                                <td>1</td>
                                                <td>620</td>
                                            </tr>
                                            <tr>
                                                <td>122ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Exit Vawda</td>
                                                <td>1</td>
                                                <td>604</td>
                                            </tr>
                                            <tr>
                                                <td>123ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Our Diasastrous Preparedness</td>
                                                <td>1</td>
                                                <td>1275</td>
                                            </tr>
                                            <tr>
                                                <td>124ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Respect for talent</td>
                                                <td>1</td>
                                                <td>444</td>
                                            </tr>
                                            <tr>
                                                <td>125ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>EOBI Pittance</td>
                                                <td>1</td>
                                                <td>88</td>
                                            </tr>
                                            <tr>
                                                <td>126ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Non-viable schools</td>
                                                <td>1</td>
                                                <td>119</td>
                                            </tr>
                                            <tr>
                                                <td>127ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Let them be heard</td>
                                                <td>1</td>
                                                <td>157</td>
                                            </tr>
                                            <tr>
                                                <td>128ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Poor mans tale</td>
                                                <td>1</td>
                                                <td>90</td>
                                            </tr>
                                            <tr>
                                                <td>129ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Baby steps</td>
                                                <td>1</td>
                                                <td>131</td>
                                            </tr>
                                            <tr>
                                                <td>130ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Indian protests</td>
                                                <td>1</td>
                                                <td>55</td>
                                            </tr>
                                            <tr>
                                                <td>131ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>The oppressed</td>
                                                <td>1</td>
                                                <td>101</td>
                                            </tr>
                                            <tr>
                                                <td>132ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Kashmir is crying</td>
                                                <td>1</td>
                                                <td>144</td>
                                            </tr>
                                            <tr>
                                                <td>133ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Who will fight for the people?</td>
                                                <td>1</td>
                                                <td>1028</td>
                                            </tr>
                                            <tr>
                                                <td>134ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>The looming crisis in Ukraine</td>
                                                <td>1</td>
                                                <td>850</td>
                                            </tr>
                                            <tr>
                                                <td>135ED10-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>A case for the unions</td>
                                                <td>1</td>
                                                <td>937</td>
                                            </tr>
                                            <tr>
                                                <td>136ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Atrocious Advice</td>
                                                <td>1</td>
                                                <td>48</td>
                                            </tr>
                                            <tr>
                                                <td>137ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Playing politics</td>
                                                <td>1</td>
                                                <td>492</td>
                                            </tr>
                                            <tr>
                                                <td>138ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>A home for the homeless</td>
                                                <td>1</td>
                                                <td>1101</td>
                                            </tr>
                                            <tr>
                                                <td>139ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Eve of destruction</td>
                                                <td>1</td>
                                                <td>72</td>
                                            </tr>
                                            <tr>
                                                <td>140ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Policing problems</td>
                                                <td>1</td>
                                                <td>103</td>
                                            </tr>
                                            <tr>
                                                <td>141ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Costly food</td>
                                                <td>1</td>
                                                <td>73</td>
                                            </tr>
                                            <tr>
                                                <td>142ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Lend them an ear</td>
                                                <td>1</td>
                                                <td>160</td>
                                            </tr>
                                            <tr>
                                                <td>143ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Student Unions</td>
                                                <td>1</td>
                                                <td>407</td>
                                            </tr>
                                            <tr>
                                                <td>144ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Vawda woes MODERN SOLUTIONS</td>
                                                <td>1</td>
                                                <td>143</td>
                                            </tr>
                                            <tr>
                                                <td>145ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Vawda woes</td>
                                                <td>1</td>
                                                <td>108</td>
                                            </tr>
                                            <tr>
                                                <td>146ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Looking for a home</td>
                                                <td>1</td>
                                                <td>72</td>
                                            </tr>
                                            <tr>
                                                <td>147ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Indian atrocities</td>
                                                <td>1</td>
                                                <td>133</td>
                                            </tr>
                                            <tr>
                                                <td>148ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>A bad joke</td>
                                                <td>1</td>
                                                <td>112</td>
                                            </tr>
                                            <tr>
                                                <td>149ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>PUEET problems</td>
                                                <td>1</td>
                                                <td>206</td>
                                            </tr>
                                            <tr>
                                                <td>150ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>An Albatross that won’t go away</td>
                                                <td>1</td>
                                                <td>1104</td>
                                            </tr>
                                            <tr>
                                                <td>151ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>India and the hijab</td>
                                                <td>1</td>
                                                <td>995</td>
                                            </tr>
                                            <tr>
                                                <td>152ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>Politics of pollution</td>
                                                <td>1</td>
                                                <td>872</td>
                                            </tr>
                                            <tr>
                                                <td>153ED11-22</td>
                                                <td>Newpaper Editorials</td>
                                                <td>In memory of late..</td>
                                                <td>1</td>
                                                <td>618</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-001</td>
                                                <td>Opinion articles</td>
                                                <td>PTI decides against joining NA</td>
                                                <td>1</td>
                                                <td>1595</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-002</td>
                                                <td>Opinion articles</td>
                                                <td>Flash flood kills in ….Afghanistan</td>
                                                <td>1</td>
                                                <td>255</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-003</td>
                                                <td>Opinion articles</td>
                                                <td>For 13 Taliban officials:</td>
                                                <td>1</td>
                                                <td>278</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-004</td>
                                                <td>Opinion articles</td>
                                                <td>Pakistan’s political paralysis</td>
                                                <td>1</td>
                                                <td>1318</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-005</td>
                                                <td>Opinion articles</td>
                                                <td>UN to end travel ban</td>
                                                <td>1</td>
                                                <td>438</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-006</td>
                                                <td>Opinion articles</td>
                                                <td>Taliban leader…sharia supreme in all</td>
                                                <td>1</td>
                                                <td>1134</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-007</td>
                                                <td>Opinion articles</td>
                                                <td>China calls world…with Afghan taliban</td>
                                                <td>1</td>
                                                <td>185</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-008</td>
                                                <td>Opinion articles</td>
                                                <td>Have talibaan allowed female…</td>
                                                <td>1</td>
                                                <td>222</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-009</td>
                                                <td>Opinion articles</td>
                                                <td>Taliban violently disperse women</td>
                                                <td>1</td>
                                                <td>376</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-010</td>
                                                <td>Opinion articles</td>
                                                <td>Taliban fighters swap arms for books</td>
                                                <td>1</td>
                                                <td>347</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-011</td>
                                                <td>Opinion articles</td>
                                                <td>Taliban and women</td>
                                                <td>1</td>
                                                <td>815</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-012</td>
                                                <td>Opinion articles</td>
                                                <td>Imran condemns attack on Salman Rushdie</td>
                                                <td>1</td>
                                                <td>391</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-013</td>
                                                <td>Opinion articles</td>
                                                <td>Rupee inches down</td>
                                                <td>1</td>
                                                <td>314</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-014</td>
                                                <td>Opinion articles</td>
                                                <td>Australian HC calls</td>
                                                <td>1</td>
                                                <td>161</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-015</td>
                                                <td>Opinion articles</td>
                                                <td>World cup super league</td>
                                                <td>1</td>
                                                <td>202</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-016</td>
                                                <td>Opinion articles</td>
                                                <td>Application filed against Imran</td>
                                                <td>1</td>
                                                <td>322</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-017</td>
                                                <td>Opinion articles</td>
                                                <td>PTI hired CIA veteran. Former Afghanistan</td>
                                                <td>1</td>
                                                <td>409</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-018</td>
                                                <td>Opinion articles</td>
                                                <td>For the greater good</td>
                                                <td>1</td>
                                                <td>756</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-019</td>
                                                <td>Opinion articles</td>
                                                <td>Reshuffle in foreign office</td>
                                                <td>1</td>
                                                <td>438</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-020</td>
                                                <td>Opinion articles</td>
                                                <td>Broken promises</td>
                                                <td>1</td>
                                                <td>82</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-021</td>
                                                <td>Opinion articles</td>
                                                <td>Death toll in kabul</td>
                                                <td>1</td>
                                                <td>291</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-022</td>
                                                <td>Opinion articles</td>
                                                <td>No more misogyny</td>
                                                <td>1</td>
                                                <td>110</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-023</td>
                                                <td>Opinion articles</td>
                                                <td>Bend or break</td>
                                                <td>1</td>
                                                <td>85</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-024</td>
                                                <td>Opinion articles</td>
                                                <td>PSL vs IPL</td>
                                                <td>1</td>
                                                <td>635</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-024</td>
                                                <td>Opinion articles</td>
                                                <td>Pakistan and Soveit occupation</td>
                                                <td>1</td>
                                                <td>1482</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-026</td>
                                                <td>Opinion articles</td>
                                                <td>World cannot afford era of coldwar</td>
                                                <td>1</td>
                                                <td>532</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-027</td>
                                                <td>Opinion articles</td>
                                                <td>Assange lawers sue CIA</td>
                                                <td>1</td>
                                                <td>473</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-028</td>
                                                <td>Opinion articles</td>
                                                <td>Afghan man charged for murder</td>
                                                <td>1</td>
                                                <td>578</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-029</td>
                                                <td>Opinion articles</td>
                                                <td>Afghan woman Bibi Noor</td>
                                                <td>1</td>
                                                <td>169</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-030</td>
                                                <td>Opinion articles</td>
                                                <td>LHr doctors suceed</td>
                                                <td>1</td>
                                                <td>366</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-031</td>
                                                <td>Opinion articles</td>
                                                <td>Polio rising</td>
                                                <td>1</td>
                                                <td>478</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-032</td>
                                                <td>Opinion articles</td>
                                                <td>Let Afghan Girls learn</td>
                                                <td>1</td>
                                                <td>1260</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-033</td>
                                                <td>Opinion articles</td>
                                                <td>Supporting Afghan women</td>
                                                <td>1</td>
                                                <td>923</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-034</td>
                                                <td>Opinion articles</td>
                                                <td>Taliban dismiss UN concern</td>
                                                <td>1</td>
                                                <td>86</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-035</td>
                                                <td>Opinion articles</td>
                                                <td>Afghan women protest for right of education</td>
                                                <td>1</td>
                                                <td>227</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-036</td>
                                                <td>Opinion articles</td>
                                                <td>US envoy meet Taliban diplomat</td>
                                                <td>1</td>
                                                <td>271</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-037</td>
                                                <td>Opinion articles</td>
                                                <td>Taliban order women to wear Burqa in Public</td>
                                                <td>1</td>
                                                <td>300</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-038</td>
                                                <td>Opinion articles</td>
                                                <td>Afghan women players in Australia</td>
                                                <td>1</td>
                                                <td>467</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-039</td>
                                                <td>Opinion articles</td>
                                                <td>Mufti Taqi urges Afghan Govt to open girls schools</td>
                                                <td>1</td>
                                                <td>340</td>
                                            </tr>
                                            <tr>
                                                <td>AFG-040</td>
                                                <td>Opinion articles</td>
                                                <td>US to increase pressure on Taliban</td>
                                                <td>1</td>
                                                <td>546</td>
                                            </tr>
                                            <tr>
                                                <td>AFG041</td>
                                                <td>Opinion articles</td>
                                                <td>The Afghan Woman</td>
                                                <td>1</td>
                                                <td>623</td>
                                            </tr>
                                            <tr>
                                                <td>AFG042</td>
                                                <td>Opinion articles</td>
                                                <td>Afghan women fear cost of peace will be their freedom</td>
                                                <td>1</td>
                                                <td>679</td>
                                            </tr>
                                            <tr>
                                                <td>AFG043</td>
                                                <td>Opinion articles</td>
                                                <td>Girls excluded from returning to secondary school in Afghanistan</td>
                                                <td>1</td>
                                                <td>368</td>
                                            </tr>
                                            <tr>
                                                <td>AFG044</td>
                                                <td>Opinion articles</td>
                                                <td>Afghan cricketer Rashid Khan prays</td>
                                                <td>1</td>
                                                <td>402</td>
                                            </tr>
                                            <tr>
                                                <td>AFG045</td>
                                                <td>Opinion articles</td>
                                                <td>Orientalism and Afghanistan</td>
                                                <td>1</td>
                                                <td>821</td>
                                            </tr>
                                            <tr>
                                                <td>AFG046</td>
                                                <td>Opinion articles</td>
                                                <td>UNSC calls for reversal of Taliban policies on women</td>
                                                <td>1</td>
                                                <td>196</td>
                                            </tr>
                                            <tr>
                                                <td>AFG047</td>
                                                <td>Opinion articles</td>
                                                <td>What ‘freedom’?</td>
                                                <td>1</td>
                                                <td>83</td>
                                            </tr>
                                            <tr>
                                                <td>AFG048</td>
                                                <td>Opinion articles</td>
                                                <td>Pak religious scholars return home from Afghanistan</td>
                                                <td>1</td>
                                                <td>707</td>
                                            </tr>
                                            <tr>
                                                <td>AFG049</td>
                                                <td>Opinion articles</td>
                                                <td>The Lost land</td>
                                                <td>1</td>
                                                <td>98</td>
                                            </tr>
                                            <tr>
                                                <td>AFG050</td>
                                                <td>Opinion articles</td>
                                                <td>‘Afghans security, livelihoods more important than women’s rights issue’</td>
                                                <td>1</td>
                                                <td>484</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-001</td>
                                                <td>Magazine News Articles</td>
                                                <td>FO rejects Indian reports</td>
                                                <td>1</td>
                                                <td>245</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-002</td>
                                                <td>Magazine News Articles</td>
                                                <td>PDM will 'keep fighting</td>
                                                <td>1</td>
                                                <td>561</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-003</td>
                                                <td>Magazine News Articles</td>
                                                <td>The art of printing blocks</td>
                                                <td>1</td>
                                                <td>1452</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-004</td>
                                                <td>Magazine News Articles</td>
                                                <td>Creamy Tarragon Chicken</td>
                                                <td>1</td>
                                                <td>261</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-005</td>
                                                <td>Magazine News Articles</td>
                                                <td>We rise with reading</td>
                                                <td>1</td>
                                                <td>501</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-006</td>
                                                <td>Magazine News Articles</td>
                                                <td>Rider on the storm</td>
                                                <td>1</td>
                                                <td>1970</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-007</td>
                                                <td>Magazine News Articles</td>
                                                <td>Dark Future</td>
                                                <td>1</td>
                                                <td>773</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-008</td>
                                                <td>Magazine News Articles</td>
                                                <td>The work environment</td>
                                                <td>1</td>
                                                <td>1343</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-009</td>
                                                <td>Magazine News Articles</td>
                                                <td>Inefficiency quotient</td>
                                                <td>1</td>
                                                <td>800</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0010</td>
                                                <td>Magazine News Articles</td>
                                                <td>Sky is the limit</td>
                                                <td>1</td>
                                                <td>800</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0011</td>
                                                <td>Magazine News Articles</td>
                                                <td>There’s no mountain she can’t climb</td>
                                                <td>1</td>
                                                <td>1905</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0012</td>
                                                <td>Magazine News Articles</td>
                                                <td>Beauty is power; a smile is its sword…</td>
                                                <td>1</td>
                                                <td>772</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0013</td>
                                                <td>Magazine News Articles</td>
                                                <td>Twitter Spaces – uniting Pakistani women</td>
                                                <td>1</td>
                                                <td>1905</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0014</td>
                                                <td>Magazine News Articles</td>
                                                <td>Divinity through the strokes</td>
                                                <td>1</td>
                                                <td>1016</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0015</td>
                                                <td>Magazine News Articles</td>
                                                <td>All about retro and classics</td>
                                                <td>1</td>
                                                <td>1317</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0016</td>
                                                <td>Magazine News Articles</td>
                                                <td>For a better tomorrow</td>
                                                <td>1</td>
                                                <td>834</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0017</td>
                                                <td>Magazine News Articles</td>
                                                <td>The Young talent</td>
                                                <td>1</td>
                                                <td>1047</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0018</td>
                                                <td>Magazine News Articles</td>
                                                <td>Woke watching</td>
                                                <td>1</td>
                                                <td>1794</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0019</td>
                                                <td>Magazine News Articles</td>
                                                <td>Exclusive: Spotify largest plans for Pakistan</td>
                                                <td>1</td>
                                                <td>1858</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0020</td>
                                                <td>Magazine News Articles</td>
                                                <td>What’s playing on TV throughout Ramazan?</td>
                                                <td>1</td>
                                                <td>1926</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0021</td>
                                                <td>Magazine News Articles</td>
                                                <td>Quarter Mile</td>
                                                <td>1</td>
                                                <td>1851</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0022</td>
                                                <td>Magazine News Articles</td>
                                                <td>Building The Bridge</td>
                                                <td>1</td>
                                                <td>1733</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0023</td>
                                                <td>Magazine News Articles</td>
                                                <td>Straight from the heart</td>
                                                <td>1</td>
                                                <td>1852</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0024</td>
                                                <td>Magazine News Articles</td>
                                                <td>Xulfi”s new groove</td>
                                                <td>1</td>
                                                <td>2268</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0025</td>
                                                <td>Magazine News Articles</td>
                                                <td>The management let down</td>
                                                <td>1</td>
                                                <td>1175</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0026</td>
                                                <td>Magazine News Articles</td>
                                                <td>Climate threat</td>
                                                <td>1</td>
                                                <td>1011</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0027</td>
                                                <td>Magazine News Articles</td>
                                                <td>Poor Nations squeezed</td>
                                                <td>1</td>
                                                <td>819</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0028</td>
                                                <td>Magazine News Articles</td>
                                                <td>Refuse, rethink, redesign</td>
                                                <td>1</td>
                                                <td>964</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0029</td>
                                                <td>Magazine News Articles</td>
                                                <td>Eid engagement</td>
                                                <td>1</td>
                                                <td>1108</td>
                                            </tr>
                                            <tr>
                                                <td>MA-Nov-0030</td>
                                                <td>Magazine News Articles</td>
                                                <td>The lasting legacy of Pappu Saeen</td>
                                                <td>1</td>
                                                <td>570</td>
                                            </tr>
                                            <tr>
                                                <td>BLGPK001</td>
                                                <td>Blogs</td>
                                                <td>Right to education</td>
                                                <td>1</td>
                                                <td>6289</td>
                                            </tr>
                                            <tr>
                                                <td>BLGPK002</td>
                                                <td>Blogs</td>
                                                <td>Blog Pakistan</td>
                                                <td>1</td>
                                                <td>7389</td>
                                            </tr>
                                            <tr>
                                                <td>1YNG</td>
                                                <td>young world publications</td>
                                                <td>Hobbies You Can Enjoy</td>
                                                <td>1</td>
                                                <td>1067</td>
                                            </tr>
                                            <tr>
                                                <td>2YNG</td>
                                                <td>young world publications</td>
                                                <td>Fantastic dads in Disney and Pixar movies</td>
                                                <td>1</td>
                                                <td>1857</td>
                                            </tr>
                                            <tr>
                                                <td>3YNG</td>
                                                <td>young world publications</td>
                                                <td>Story Time The lost wallet</td>
                                                <td>1</td>
                                                <td>429</td>
                                            </tr>
                                            <tr>
                                                <td>4YNG</td>
                                                <td>young world publications</td>
                                                <td>Movie review Chip and dale</td>
                                                <td>1</td>
                                                <td>401</td>
                                            </tr>
                                            <tr>
                                                <td>5YNG</td>
                                                <td>young world publications</td>
                                                <td>Cook-it-yourself: Mango yoghurt dessert</td>
                                                <td>1</td>
                                                <td>459</td>
                                            </tr>
                                            <tr>
                                                <td>6YNG</td>
                                                <td>young world publications</td>
                                                <td>Opinion: Change starts from within</td>
                                                <td>1</td>
                                                <td>544</td>
                                            </tr>
                                            <tr>
                                                <td>7YNG</td>
                                                <td>young world publications</td>
                                                <td>Story time: Scared of the sea</td>
                                                <td>1</td>
                                                <td>672</td>
                                            </tr>
                                            <tr>
                                                <td>8YNG</td>
                                                <td>young world publications</td>
                                                <td>The ultimate sunscreen guide</td>
                                                <td>1</td>
                                                <td>1652</td>
                                            </tr>
                                            <tr>
                                                <td>9YNG</td>
                                                <td>young world publications</td>
                                                <td>Story time : the bear on the chair</td>
                                                <td>1</td>
                                                <td>1170</td>
                                            </tr>
                                            <tr>
                                                <td>10YNG</td>
                                                <td>young world publications</td>
                                                <td>How to become a writer in school</td>
                                                <td>1</td>
                                                <td>1415</td>
                                            </tr>
                                            <tr>
                                                <td>3.DW-NP</td>
                                                <td>News reports Dawn</td>
                                                <td>Taliban</td>
                                                <td>1</td>
                                                <td>19075</td>
                                            </tr>
                                            <tr>
                                                <td>3.NYT-NP</td>
                                                <td>News reports Newyork Times</td>
                                                <td>Taliban</td>
                                                <td>1</td>
                                                <td>52074</td>
                                            </tr>
                                            <tr>
                                                <td>3.TNI-NP</td>
                                                <td>News reports The NEWS International</td>
                                                <td>Taliban</td>
                                                <td>1</td>
                                                <td>24491</td>
                                            </tr>
                                            <tr>
                                                <td>3.UT-NP</td>
                                                <td>News reports USA Today</td>
                                                <td>Taliban</td>
                                                <td>1</td>
                                                <td>41081</td>
                                            </tr>
                                        </tbody>
                                        <tr>
                                            <td><b>Total</b></td>
                                            <td></td>
                                            <td></td>
                                            <td><b>249</b></td>
                                            <td><b>283416</b></td>
                                        </tr>
                                    </table>}
                                {showFilesTable === true && selectedCategory === 'literary' &&
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td><b>File ID</b></td>
                                                <td><b>Genre</b></td>
                                                <td><b>Category/Title</b></td>
                                                <td><b>Files</b></td>
                                                <td><b>Words</b></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>CH1HF</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Home Fire Chapter 1</td>
                                                <td>1</td>
                                                <td>7371</td>
                                            </tr>
                                            <tr>
                                                <td>CH2HF</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Home Fire Chapter 2</td>
                                                <td>1</td>
                                                <td>7495</td>
                                            </tr>
                                            <tr>
                                                <td>CH3HF</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Home Fire Chapter 3</td>
                                                <td>1</td>
                                                <td>8632</td>
                                            </tr>
                                            <tr>
                                                <td>CH4HF</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Home Fire Chapter 4</td>
                                                <td>1</td>
                                                <td>7314</td>
                                            </tr>
                                            <tr>
                                                <td>CH5HF</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Home Fire Chapter 5</td>
                                                <td>1</td>
                                                <td>10897</td>
                                            </tr>
                                            <tr>
                                                <td>CH6HF</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Home Fire Chapter 6</td>
                                                <td>1</td>
                                                <td>7421</td>
                                            </tr>
                                            <tr>
                                                <td>CH7HF</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Home Fire Chapter 7</td>
                                                <td>1</td>
                                                <td>5528</td>
                                            </tr>
                                            <tr>
                                                <td>CH8HF</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Home Fire Chapter 8</td>
                                                <td>1</td>
                                                <td>7680</td>
                                            </tr>
                                            <tr>
                                                <td>CH9HF</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Home Fire Chapter 9</td>
                                                <td>1</td>
                                                <td>6251</td>
                                            </tr>
                                            <tr>
                                                <td>BRNTSHD</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Burnt shadows</td>
                                                <td>1</td>
                                                <td>119787</td>
                                            </tr>
                                            <tr>
                                                <td>KARTGRPH</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Kartography</td>
                                                <td>1</td>
                                                <td>102316</td>
                                            </tr>
                                            <tr>
                                                <td>BRKVRS</td>
                                                <td>Kamila Shamsie</td>
                                                <td>Broken verses</td>
                                                <td>1</td>
                                                <td>110438</td>
                                            </tr>
                                            <tr>
                                                <td>INOTHER</td>
                                                <td>Daniyal Mueenuddin</td>
                                                <td>In other rooms, other wonders</td>
                                                <td>1</td>
                                                <td>9474</td>
                                            </tr>
                                            <tr>
                                                <td>ICBP</td>
                                                <td>Bipsi sidhwa</td>
                                                <td>Ice Candy Man</td>
                                                <td>1</td>
                                                <td>88921</td>
                                            </tr>
                                            <tr>
                                                <td>MYFLD</td>
                                                <td>Tehmina Durrani</td>
                                                <td>My Feudal Lord</td>
                                                <td>1</td>
                                                <td>115789</td>
                                            </tr>
                                            <tr>
                                                <td>THERLFND</td>
                                                <td>Mohsin Hamid</td>
                                                <td>The reluctant fundamentalist</td>
                                                <td>1</td>
                                                <td>42250</td>
                                            </tr>
                                            <tr>
                                                <td>IMMALA</td>
                                                <td>Malala Yousafzai</td>
                                                <td>I am Malala</td>
                                                <td>1</td>
                                                <td>40887</td>
                                            </tr>
                                            <tr>
                                                <td>SRBRD</td>
                                                <td>Nadeem Aslam</td>
                                                <td>Season of Rain Birds</td>
                                                <td>1</td>
                                                <td>56133</td>
                                            </tr>
                                            <tr>
                                                <td>TRSPSS</td>
                                                <td>Uzma Aslam Khan</td>
                                                <td>Tresspassing</td>
                                                <td>1</td>
                                                <td>110045</td>
                                            </tr>
                                        </tbody>
                                        <tr>
                                            <td><b>Total</b></td>
                                            <td></td>
                                            <td></td>
                                            <td><b>19</b></td>
                                            <td><b>864629</b></td>
                                        </tr>
                                    </table>}

                                <br />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 col-sm-12 p-5 ">
                        <div className="border border-2 p-2 border-success">
                            <h5 className="p-3">How to search Corpus:</h5>
                            <ul className="list-inline p-3">
                                <li className="p-1">
                                    You can browse a word list with frequency counts and it can be
                                    helpful for teachers and students.
                                </li>
                                <hr class="solid"></hr>
                                <li className="p-1">
                                    You can browse through Urduized word list with example
                                    sentences from concordance and actual context.
                                </li>
                                <hr class="solid"></hr>
                                <li className="p-1">
                                    Individual word search is helpful for understanding
                                    collocations and contexts etc.
                                </li>
                                <hr class="solid"></hr>
                                <li className="p-1">
                                    Detailed analysis of grammatical structure and vocabulary is
                                    also possible.
                                </li>
                                <hr class="solid"></hr>
                                <li className="p-1">
                                    Phrases and strings of words are also available.
                                </li>
                                <hr class="solid"></hr>
                                <li className="p-1">
                                    POS tagging and grammatical tagging of Urduized words with
                                    spelling variations is also available.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Copyright />
        </div>
    );
}
