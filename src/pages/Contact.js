import React from 'react'
import Bar from '../components/Bar'

export default function Contact() {
  return (
    <div>
      <Bar/>
      <div className="container border border-success border-2 p-4 pt-100 pb-70 text-center ">
        <div className='container '>
        <br/>
                <p>Contact Information</p>
                <div>
                  <br/>
                <h2>Let's Plan A Meeting</h2>
                <p>It's the right time to start a project with our team of professionals and bring the ideas into reality,
                     more efficiently and effectively. Let us help you to ensure enterprise success through technological
                     and Digital Transformation with AI and Automation Services and solutions that we develop.
                </p>
                </div>
                <br/>
        </div>
                <div className="container">
                    <div className="row py-3">

                        <div className="col-lg-4 col-sm-6">
                            <div className="card p-2">
                            <i class="fa fa-map-marker fa-lg" aria-hidden="true"></i>
                                <h3>Location</h3>
                                <p>VISIT TO EXPLORE THE WORLD</p>
                                <br/>
                                <h6>264-A main college road UET</h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="card p-2">
                            <i class="fa fa-phone fa-lg" aria-hidden="true"></i>
                                <h3>Make a Call</h3>
                                <p>LET'S TALK WITH OUR EXPERTS</p>
                                <br/>
                                <h6>04232326502</h6>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="card p-2">
                            <i class="fa fa-envelope fa-lg" aria-hidden="true"></i>
                                <h3>Send a Mail</h3>
                                <p>DON'T HESITATE TO MAIL</p>
                                <br/>
                                <h6>info@odoo-ai.com</h6>
                            </div>
                        </div>

                    </div>
                    
                    <br/>

                    <div className="row">
                        <div>
                            <div className="about-img">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.156289277303!2d74.26957801514
                            793!3d31.40981978140627!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa76ccca835a19297!2z
                            MzHCsDI0JzM1LjQiTiA3NMKwMTYnMTguNCJF!5e0!3m2!1sen!2s!4v1648394855547!5m2!1sen!2s" width="980" height="400"  allowfullscreen="" ></iframe>
                            </div>
                            <br/>
                        </div>

                    </div>
                </div>

                
            </div>
    </div>
  )
}
