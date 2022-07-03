import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Bar from '../components/Bar'
import { url } from "../components/Variable";
import { useLocation } from "react-router-dom";
export default function Kwic() {
  const loction = useLocation();
  // console.log("location", loction);
  const abc = loction.state?.rehman?.results;
  const wordcounts = loction.state?.rehman?.count;
  const WordSave = loction.state?.Word;
  const criteria = loction.state?.criteria

  return (
    <div>
      <Bar />


      <div style={{ backgroundColor: "#f0faef", height: "100%" }}>


        <div className='container justify-content-center'>
          <div className='col-md-11 col-sm-11 p-5'>
            <div className='col-md-2 pt-4'>
              <Link to='/Search'>

                <button className='rounded border text-white form-control bg-primary' style={{ width: '100px' }}>Go Back</button>
              </Link>
            </div>
            <br />
            <p>Searched Word: {"  "+ WordSave}</p>
            <div className='pt-3 border border-2 p-2 border-success pb-3' >
              <h5 className='d-flex justify-content-center'>KWIC</h5>
              <br />
              <div className='table-responsive'>

              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Text From File</th>
                    <th scope="col">Left Text</th>
                    <th scope="col">Center Word</th>
                    <th scope="col">Right Text</th>
                  </tr>
                </thead>
                <tbody>
                  {abc?.map((item,index)=><tr>
                    <th scope="row">{item.filename}</th>
                    <td>{item.preText}</td>
                    <td>{WordSave}</td>
                    <td>{item.postText}</td>
                  </tr>)}

                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
