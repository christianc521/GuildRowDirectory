import styles from "./home.module.css"
import List from "./List"
import Search from "../components/Searchbar";
import MultipleSelectPlaceholder from "../components/Filter";
import React, { useState , Image} from 'react';
import { store } from "../src/app/store";
import { Provider } from 'react-redux'
import guildRowLogo from "../public/assets/grIcon.png"
import Head from "next/head";
import { Inter } from '@next/font/google'

const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');
const inter = Inter({ subsets: ['latin'] })


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
      <>
      <main className={inter.className}>
        <Provider store={store}>
              <body className={styles.body}>
                  <header className={styles.top}>
                      {/* <h1 className={styles.title}>Guild Row Directory</h1> */}
                      <img className={styles.topElements} src="static/Gold_LogoBug.png" width="100" height="100"/>
                      <Search />
                  </header>
                  <div className={styles.main}>
                      <div className={styles.mainLeft}>
                        <MultipleSelectPlaceholder />
                      </div>
                      <hr className={styles.divider}></hr>
                      <div className={styles.mainRight}>
                      <List {...{memberList}} />
                      </div>
                      
                  </div>
              </body>
          </Provider>
      </main>
      </>
    )
}