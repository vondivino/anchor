import Head from 'next/head'

export default function Home({ user }) {

  return (
    <div className={styles.container}>
      <Head>
        <title>Buoy Tech</title>
      </Head>
      <h1>The index page</h1>
    </div>
  )
}
