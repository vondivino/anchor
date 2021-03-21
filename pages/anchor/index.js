import Head from 'next/head'
import Layout from '../../components/Layout'

export default function AnchorHome() {
  return (
    <Layout>
      <Head>
        <title>Anchor | Home</title>
      </Head>
      <div>Hello Anchor</div>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  if (req.cookies.token) {
    return { props: { user: req.cookies.token || null } }
  } else {
    return {
      redirect: { permanent: false, destination: '/auth/login/' }
    }
  }
}