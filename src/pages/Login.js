import React, { useState,useEffect } from "react";
import { url } from "../components/Variable";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigation = useNavigate();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    let data = localStorage.getItem('corpusUserData')
    if(data!==null){
      navigation('/')
    }
  }, [])
  
  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('email--->',email)
    // console.log(validateEmail(email))
    if (email === '') {
      alert('Email is reuired')
      return
    }
    else if (password === '') {
      alert('Password is reuired')
      return
    }
    else if (password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    else if (validateEmail(email) === false) {
      alert('Email is badly formatted. Engter correct email address')
      return
    }
    else {
      let data = {
        email,
        password
      }
      fetch(`${url}/corpus/loginUser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then((response) => {
          // console.log('response--->',response)
          if (response.message === 'Success') {
            // setIsLoading(false)
            if (response.doc !== null && response.doc !== undefined) {
              swal({
                title: "User logged in!",
                text: "User logged in successfully. You can access data functionality now!",
                icon: "success",
              });
              localStorage.setItem('corpusUserData',JSON.stringify(response.doc))
              setEmail('')
              setPassword('')
              navigation('/')
            } else {
              // alert('No results found for word: '+Word)
              swal({
                title: "Login failed!",
                text: response.err,
                icon: "error",
              });
            }

            // setData(response.doc);
          }
          else {
            swal({
              title: "Login failed!",
              text: response.err,
              icon: "error",
            });
          }

        })
        .catch((error) => {
          console.log(error);
        });
    }

  }
  return (
    <div className="container">
      <div className="row">
        <div className="d-flex justify-content-center pt-4">
          <div className="col-md-6 col-sm-6">
            <div className="border border-success border-2 p-2">
              <form className="p-2">
                <div className="d-flex justify-content-center pt-4 pb-4">
                  <img
                    src="https://odoo-ai.com/pakloccorp/pakloc-removebg-preview.png"
                    alt="logo"
                    width="120"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter Email"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="row mb-4">
                  <div className="col-md-6 d-flex justify-content-center">
                    {/* <div className="form-check mb-3 mb-md-0">
                      <input
                        className="form-check-input"
                        style={{
                          backgroundColor: "#5db959",
                          borderColor: "#5db959",
                        }}
                        type="checkbox"
                        defaultValue
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="loginCheck">
                        {" "}
                        Remember me{" "}
                      </label>
                    </div> */}
                  </div>
                  <div className="col-md-6 d-flex justify-content-center">
                    <a href="/Forgot">Forgot password?</a>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-block mb-4 text-white"
                    onClick={handleSubmit}
                    style={{ backgroundColor: "#5db959" }}
                  >
                    Sign in
                  </button>
                </div>
                <div className="text-center">
                  <p>
                    Register? <a href="/Register">Register</a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <footer style={{textAlign:'center'}}>
      <span style={{ color: "#b03e41"}}>
      Last Updated: 20 September, 2022.{"    "}PakLocCorp. Copyrights &copy; pakloccorp.com 
          
        </span>
      </footer>
    </div>
  );
}
