import React from "react";
import Bar from '../components/Bar'
import { Link, useNavigate } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import Searchtool from "./Searchtool";
import List from "./List";
import Definition from "./Definition";
import Copyright from "../components/Copyright";


export default function Home() {
  return (
    <div>
      <Bar />
      <div className="pt-4">
        <Tabs defaultActiveKey="home" className="justify-content-center d-flex">
          <Tab eventKey="home" title="Tools">
            <Searchtool />
          </Tab>

          <Tab eventKey="profile" title="Urduized WordList">
            <List />
          </Tab>
        </Tabs>
        {/* <footer style={{textAlign:'center'}}>
      <span style={{ color: "#b03e41"}}>
      Last Updated: 20 September, 2022.{"    "}PakLocCorp. Copyrights &copy; pakloccorp.com 
          
        </span>
      </footer> */}
        <Copyright />
      </div>

    </div>
  );
}
