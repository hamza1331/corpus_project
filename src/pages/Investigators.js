import React from 'react'
import Bar from '../components/Bar'

export default function About() {
  return (
    <div>
      <Bar/>
      <div className="container border border-success border-2 pt-100 pb-70 text-center py-3">
        <div className='container'>
        <br/>
                <h2>Investigators</h2>
        </div>
                <div className="container">
                    <div className="row">
<h5 className='py-3'>Team PakLocCorp</h5>
                        <div className="col-lg-4 col-sm-6">
                            <div className="card p-2">
                                <h3>Dr. Tahseen Zahra</h3>
                                <p>Assistant Professor</p>
                                <br/>
                                <p>Department of English</p>
                                <br/>
                                <h6>Air University Islamabad</h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="card p-2"><h3>Dr. Akhtar Abbas</h3>
                                <p>Assistant Professor</p>
                                <br/>
                                <p>Department of English</p>
                                <br/>
                                <h6>Air University Islamabad</h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="card p-2"><h3>Fatima Tuz Zahra</h3>
                                <br/>
                                <p>PhD Research Scholar</p>
                                <br/>
                                <br/>
                                <h6>Air University Islamabad</h6>
                            </div>
                            <br/>
                        </div>

                    </div>
                </div>

                
            </div></div>
  )
}
