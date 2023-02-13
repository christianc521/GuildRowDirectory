import styles from "./home.module.css"
import List from "./List"
import Search from "../components/Searchbar";
import React, { useState } from 'react';
import { store } from "../src/app/store";
import { Provider } from 'react-redux'

const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');


export async function getServerSideProps() {

    const auth = new GoogleAuth({
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
      });
    const sheets = google.sheets({ version: 'v4', auth});
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

export default function Home({memberList}) {

    return (
        <Provider store={store}>
            <body className={styles.body}>
                <div className={styles.top}>
                    <h1 className={styles.title}>Guild Row Directory</h1>
                    <Search />
                </div>
                <div>
                    <List {...{memberList}} />
                </div>
            </body>
        </Provider>
    )
}