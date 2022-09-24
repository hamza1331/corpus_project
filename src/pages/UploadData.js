import React from 'react'
import Bar from '../components/Bar'

export default function Upload() {
  return (
    <div>
      <Bar/>
      <br/>
      <br/>
      <div className="container border border-success border-2 p-4 pt-100 pb-70 text-center ">
        <div className='container '>
        <br/>
                <p>Upload Data</p>
                <div>
                  <br/>
                <h2>Let's Plan A Meeting</h2>
                <p>It's the right time to start a project with our team of professionals and bring the ideas into reality,
                     more efficiently and effectively. Let us help you to ensure enterprise success through technological
                     and Digital Transformation with AI and Automation Services and solutions that we develop.
                </p>
                </div>
                <br/>
                <br/>
        </div>
                <div className="container">
                    <div className="row py-4">
                        <div className="col-lg-6 col-sm-8">
                            <div className="card p-1 py-3">
                            <i class="fa fa-phone fa-lg" aria-hidden="true"></i>
                                <h3>Make a Call</h3>
                                <p>Emails 📧 or message with querry in subject would be appreciated.</p>
                                <br/>
                                <h6>(+92) 3084432015</h6>
                            </div>
                        </div>

                        <div className="col-lg-6 col-sm-8">
                            <div className="card p-1 py-3">
                            <i class="fa fa-envelope fa-lg" aria-hidden="true"></i>
                                <h3>Send a Mail</h3>
                                <p>DON'T HESITATE TO MAIL</p>
                                <br/>
                                <h6>Fatematuzzehra@gmail.com</h6>
                            </div>
                        </div>

                    </div>
                </div>

                
            </div>
    </div>
  )
}
