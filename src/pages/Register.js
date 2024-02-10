import React, { useState } from "react";
import { url } from "../components/Variable";
import swal from 'sweetalert';
import * as countries from './Countries'
import Copyright from "../components/Copyright";
export default function Register() {
  const [fName, setfName] = useState('')
  const [lName, setlName] = useState('')
  const [email, setEmail] = useState('')
  const [country, setCountry] = useState('')
  const [category, setcategory] = useState('University professor: not languages / linguistics')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log('email--->',email)
    // console.log(validateEmail(email))
    if (fName === '') {
      alert('First Name is reuired')
      return
    }
    else if (lName === '') {
      alert('Last Name is reuired')
      return
    }
    else if (email === '') {
      alert('Email is reuired')
      return
    }
    else if (country === '') {
      alert('Country is reuired')
      return
    }
    else if (password === '') {
      alert('Password is reuired')
      return
    }
    else if (confirmPassword === '') {
      alert('Confirm Password is reuired')
      return
    }
    else if (password.length < 6) {
      alert('Password must be at least 6 characters')
      return
    }
    else if (confirmPassword.length < 6) {
      alert('Confirm Password must be at least 6 characters')
      return
    }
    else if (validateEmail(email) === false) {
      alert('Email is badly formatted. Engter correct email address')
      return
    }
    else if (password !== confirmPassword) {
      alert('Password and confirm password must match')
      return
    }
    else {
      let data = {
        fName,
        lName,
        email,
        password,
        country,
        userCategory: category
      }
      fetch(`${url}/corpus/registerUser`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data)
      }).then(res => res.json())
        .then((response) => {
          console.log('response--->', response)
          if (response.message === 'Success') {
            // setIsLoading(false)
            if (response.doc !== null && response.doc !== undefined) {
              swal({
                title: "User created!",
                text: "User successfully registered. Login now to continue!",
                icon: "success",
              });
              setfName('')
              setlName('')
              setEmail('')
              setPassword('')
              setCountry('')
              setConfirmPassword('')
            } else {
              // alert('No results found for word: '+Word)
              swal({
                title: "User signup failed!",
                text: response.err,
                icon: "error",
              });
            }

            // setData(response.doc);
          }
          else {
            swal({
              title: "User signup failed!",
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
                    type="text"
                    value={fName}
                    className="form-control"
                    onChange={e => setfName(e.target.value)}
                    placeholder="Enter First Name"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    value={lName}
                    className="form-control"
                    onChange={e => setlName(e.target.value)}
                    placeholder="Enter Last Name"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="form-control"
                    placeholder="Enter Email"
                  />
                </div>
                <div className="form-outline mb-4">

                  <select onChange={e => {
                    setCountry(e.target.value)
                    // console.log('country ---> ',e.target.value)
                  }} value={country} class="form-select" aria-label="Default select example">
                    <option value='0' selected>--SELECT--</option>
                    {countries.map((cnt, index) => {
                      return <option key={index} value={cnt.country}>{cnt.country}</option>
                    })}
                  </select>
                </div>


                <div className="form-outline mb-4">
                  <div className="form-outline mb-4">
                    <input
                      type="select"
                      className="form-control"
                      placeholder="Please Select Category"
                      readOnly
                    />
                  </div>
                  <div>
                    <div className="form-check">
                      <input onClick={(e) => {
                        setcategory('University professor: languages / linguistics')
                      }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                      <label className="form-check-label" htmlFor="flexRadioDefault1">
                        University professor: languages / linguistics
                      </label>
                    </div>
                    <div className="form-check">
                      <input onClick={() => {
                        setcategory('Graduate student: languages or linguistics')
                      }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                      <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Graduate student: languages or linguistics
                      </label>
                    </div>
                    <div className="form-check">
                      <input onClick={() => {
                        setcategory('University professor: not languages / linguistics')
                      }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" defaultChecked />
                      <label className="form-check-label" htmlFor="flexRadioDefault2">
                        University professor: not languages / linguistics
                      </label>
                    </div>
                  </div>
                </div>
                {/* Password input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Enter Password"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    value={confirmPassword}
                    className="form-control"
                    onChange={e => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="btn btn-block mb-3 text-white"
                    style={{ backgroundColor: "#5db959" }}
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <footer style={{ textAlign: 'center' }}>
        <span style={{ color: "#b03e41" }}>
          Last Updated: 20 September, 2022.{"    "}PakLocCorp. Copyrights &copy; pakloccorp.com

        </span>
      </footer> */}

      <Copyright/>
    </div>
  );
}
