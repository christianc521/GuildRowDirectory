import styles from "pages/list.module.css"
import Accordion from "../components/Accordion";
import ReactDOM from 'react-dom';
import React, { useState } from "react";
const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');

export async function getServerSideProps({query}) {

    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
      });
    const sheets = google.sheets({ version: 'v4', auth});

    const { id } = query
    const range = 'FormResponses1!A2:L300';

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    const numRows = response.data.values ? response.data.values.length : 0;
    console.log(`${numRows} rows retrieved.`);
    
    const memberList = []; //storing all members in a single array
    let memberInfo = {
      timestamp: "",
      fullName: "",
      pronouns: "",
      email: "",
      jobTitle: "",
      occupation: "",
      otherOccupation: "",
      interests: "",
      otherInterests: "",
      skills: "",
      otherSkills: "",
      consent: ""
    }

    const [timestamp, fullName] = response.data.values[numRows - 1];
    for (let i = 0; i < numRows; i++) {
     
      memberInfo = response.data.values[i];

      if (memberInfo[11] == "No") {
        continue;
      }

      if (memberInfo[6] != "") {
        memberInfo[5] = memberInfo[6];
      }
      memberList.push(memberInfo);
    }
    return {
        props: {
            memberList
        }
    }
}

export default function List({ memberList }) {
    console.log({memberList});
    const [value, setValue] = useState('')

    // allow search bar to be dynamically changed
    const onChange = (e) => {
      setValue(e.target.value);
    }

    // called search button click
    const onSearch = (searchTerm) => {
    // this is where list can be fetched 
    // logs are printed in browser console
    console.log("searching: ", searchTerm)
  }
    return (
        <div>
          <h1>Guild Row Directory</h1>
          <input type="text" name="searchBar" value={value} placeholder="Enter a member's name" onChange={onChange}/>
          <button onClick={() => onSearch(value)}> Search it!</button>
          <ul>
            {memberList.map(function(member){
                let memberInfoHTML = "<ul><li>" + member[2] + "</li> <li>e-mail: " + member[3] + "</li><li>Job Title: " + member[4] + "</li><li>Occupation: " + member[5] + "</li></ul>" 
                if (member[1].toLowerCase().includes(value)) {
                  return (
                    <div style={styles}>
                      <Accordion title={member[1]} content= {memberInfoHTML}/>
                    </div>
                  )
                }
                

              })}
          </ul>
        </div>
        
    )
}


// export default function Post() {
//   return (
//     <List />
//   )
// }