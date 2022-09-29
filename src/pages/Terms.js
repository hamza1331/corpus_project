import React from 'react'
import Bar from '../components/Bar'
import { Link} from "react-router-dom";

export default function About() {
  return (
    <div>
      <Bar/>
      <div className="container border border-success border-2 pt-100 pb-70 text-center py-3">
        <div className='container'>
        <br/>
                <div>
                <h2 className='py-3'>Terms and Conditions</h2>
                <h3 style={{fontWeight:'bold'}}>AGREEMENT TO TERMS</h3>
                <p className='py-2'>
                Registration process confirms that you agree to the following terms and conditions.
                <br/>
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text and the trademarks, service marks, and logo contained therein are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws and various other intellectual property rights.
                <br/>
                Provided that you are eligible to use the Site for corpus analysis or review, you are granted a limited license to access and use the Site and Content to which you have properly gained access solely for your personal, non-commercial use. We respect the intellectual property rights.
                <br/>
                You may be required to register with the Site. You agree to keep your password confidential and will be responsible for all use of your account and password. As such, any Contributions you transmit may be treated as non-confidential and non-proprietary.  You need to ensure that your Contributions are not false, inaccurate, or misleading or violate the privacy or publicity rights of any third party.
                <br/>
                There may be information on the Site that contains typographical errors, inaccuracies, or omissions that may relate to the Site, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Site at any time, without prior notice.
                <br/>
                You agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Site, satisfy any legal requirement that such communication be in writing. You are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Site. You agree that by accessing the Site, you agree to be certain by all of these Terms and Conditions. 
                </p>
                <h3 style={{fontWeight:'bold'}}>Contact Us</h3>
                <p>
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please <span><Link to='/Contact'>contact us</Link></span>
                </p>
                </div>
                <br/>
        </div>
               
                
            </div></div>
  )
}
