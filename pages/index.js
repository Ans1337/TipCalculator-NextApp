import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header from "../components/Header"
import Tipp from "../components/Tipp"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SPLITTER</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>   
      <Tipp></Tipp>
    </div>
  )
}
