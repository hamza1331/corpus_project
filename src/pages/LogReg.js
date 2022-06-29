import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import Login from './Login'
import Register from './Register'
import Bar from '../components/Bar'
import List from './List'

export default function LogReg() {
  return (
    <div>
      <Bar />
      <div className="pt-4">
        <Tabs defaultActiveKey="home" className="justify-content-center d-flex">
          <Tab eventKey="home" title="Login">
            <Login />
          </Tab>

          <Tab eventKey="profile" title="Register">
            <Register />
          </Tab>
        </Tabs>

      </div>
    </div>
  )
}
