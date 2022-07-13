import React from 'react'
import Bar from '../components/Bar'

export default function Help() {
  return (
    <div>
      <Bar/>
      <br/>
      <div className='container border border-success border-2 p-4'>
        <div className='d-flex justify-content-center'>

        <h5>Please Inform Us If You Want Any Help</h5>
        </div>
        <br/>
                        <form>
                            <div class="mb-3">
                                <label for="exampleInput"><h6>Your Name</h6></label>
                                <input type="text" class="form-control" id="exampleInput" aria-describedby="emailHelp" placeholder="Name Here"/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInput" class="form-label"><h6>Email Address</h6></label>
                                <input type="email" class="form-control" id="exampleInput" placeholder="Email Address"/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label"><h6>Subject</h6></label>
                                <input type="text" class="form-control" id="exampleInput" placeholder="Subject"/>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInput" class="form-label"><h6>Message</h6></label>
                                <input type="text" class="form-control" id="exampleInpu" placeholder="Message goes here"/>
                            </div>
                            <br/>
                            <div style={{justifyItems:'center'}}>
                            <button type="submit" class="btn btn-success">Send Your Message</button>
                            </div>
                        </form>
                        </div>
                
      </div>
  )
}
