import React from 'react'
import Bar from '../components/Bar'
import Copyright from '../components/Copyright'

export default function Listresult() {
  return (
    <div>
      <Bar />
      <div style={{ backgroundColor: "#f0faef", minWidth: '100%', minHeight: '100%', position: 'absolute', backgroundSize: 'cover', backgroundPosition: 'center' }}>

        <div className='container'>

          <div className='col-md-11 col-sm-11 pt-4'>
            <br />
            <p className='pb-2'>Searched Word</p>
            <div className='pt-3 border border-2 p-2 border-success pb-3' >
              <h5 className='d-flex justify-content-center'>Word</h5>
              <br />
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Left Text</th>
                    <th scope="col">Center Word</th>
                    <th scope="col">Right Text</th>
                    <th scope="col">End Text</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>Zakar</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <footer style={{textAlign:'center'}}>
      <span style={{ color: "#b03e41"}}>
      Last Updated: 20 September, 2022.{"    "}PakLocCorp. Copyrights &copy; pakloccorp.com 
          
        </span>
      </footer> */}

      <Copyright/>
    </div>
  )
}
