import React from "react";
import Bar from '../components/Bar'
import { Link,useNavigate } from "react-router-dom";
import { Tab, Tabs } from "react-bootstrap";
import List from './List'
import Searchtool from "./Searchtool";


export default function Home() {
  return (
    <div>
<Bar/>
<div className="pt-4">
        <Tabs defaultActiveKey="home" className="justify-content-center d-flex">
  <Tab eventKey="home" title="List">
    <Searchtool/>
  </Tab>
  
  <Tab eventKey="profile" title="Tools">
    <List/>
  </Tab>
</Tabs>

        </div>
    </div>
  );
}
