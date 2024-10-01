import styles from "./home.module.css"
import List from "./List"
import Search from "../components/Searchbar";
import MultipleSelectPlaceholder from "../components/Filter";
import React, { useState, useEffect , Image} from 'react';
import { store } from "../src/app/store";
import { Provider } from 'react-redux'
import guildRowLogo from "../public/assets/grIcon.png"
import Head from "next/head";
import { Inter } from '@next/font/google'

const {GoogleAuth} = require('google-auth-library');
const {google} = require('googleapis');
const inter = Inter({ subsets: ['latin'] })

export async function getStaticProps() {
  const auth = new GoogleAuth({
    scopes: 'https://www.googleapis.com/auth/spreadsheets',
    credentials: {
      client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
      private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  });
  const sheets = google.sheets({ version: 'v4', auth });
  const range = 'FormResponses1!A2:L300';

  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range,
  });

  const numRows = response.data.values ? response.data.values.length : 0;
  // console.log(`${numRows} rows retrieved.`);

  const memberList = []; //storing all members in a single array

  for (let i = 0; i < numRows; i++) {
    const memberInfo = response.data.values[i];

    if (memberInfo[11] == 'No') {
      continue;
    }

    if (memberInfo[6] != '') {
      memberInfo[5] = memberInfo[6];
    }
    memberList.push(memberInfo);
  }
  return {
    props: {
      memberList: JSON.parse(JSON.stringify(memberList)),
    },
    revalidate: 60, // Regenerate the static page every 60 seconds
  };
}

const FullHeightPage = () => (
  <div>
    Hello World!
    <style global jsx>{`
      html,
      body,
      body > div:first-child,
      div#__next,
      div#__next > div {
        height: 100%;
      }
    `}</style>
  </div>
)

export default function Home({memberList}) {
    const [clientMemberList, setClientMemberList] = useState([]);

    // console.log('Server-rendered data:', memberList);
    // console.log('Client-rendered data:', clientMemberList);

    return (
      <>
      <div className={styles.body}>
          <Provider store={store}>
                    <header className={styles.header}>
                        <img className={styles.topElements} src="static/Gold_LogoBug.png" width="100" height="100"/>
                        <Search />
                    </header>
                    <div className={styles.main}>
                        <div className={styles.mainLeft}>
                          <MultipleSelectPlaceholder />
                        </div>
                        <hr className={styles.divider}></hr>
                        <div className={styles.mainRight}>
                        <h1 className={styles.resultsHeader}>Results</h1>
                        <List {...{memberList}} />
                        </div>
                    </div>
                    <footer className={styles.footer}>
                      <h1> footer information here </h1>
                    </footer>
            </Provider>
      </div>
      
      </>
      // <div>
      // <h1>Member List</h1>
      // <ul> test
      //   {memberList.map((member, index) => (
      //     <li key={index}>{member[1]}</li>
      //   ))}
      // </ul>
      // </div>
    )
}