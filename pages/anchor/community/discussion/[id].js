import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import Layout from '../../../../components/Layout'
import Discover from '../../../../components/Discover'
import Discussion from '../../../../components/Discussion'

export default function DiscussionIdPage({ id }) {
  return (
    <Layout>
      <Head>
        <title>Anchor | Discussion</title>
      </Head>
      <Grid container>
        <Discussion id={id} />
        <Discover />
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  if (req.cookies.token) {
    return { props: { id: params.id } }
  } else {
    return { redirect: { permanent: false, destination: '/auth/login ' } }
  }
}