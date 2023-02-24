import styles from "./home.module.css"
import List from "./List"
import Search from "../components/Searchbar";
import MultipleSelectPlaceholder from "../components/Filter";
import React, { useState , Image, useEffect} from 'react';
import { store } from "../src/app/store";
import { Provider } from 'react-redux'
import guildRowLogo from "../public/assets/grIcon.png"
import Head from "next/head";
import { Inter } from '@next/font/google'
import { getStaticProps } from "./fetchMembers";

const inter = Inter({ subsets: ['latin'] })


export default function Home() {

    const [domLoaded, setDomLoaded] = useState(false);

    useEffect(() => {
      setDomLoaded(true);
    }, []);

    store.dispatch(getStaticProps())

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
                        <div className={styles.mainRight}>
                        <List />
                        </div>
                    </div>
                </body>
            </Provider>
        </main>
      </>
    )
}