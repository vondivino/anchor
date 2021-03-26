import { 
  Typography, 
  Divider, 
  Grid, 
  Button
} from '@material-ui/core'
import Link from 'next/link'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import firebase from '../../../../lib/firebase'
import Layout from "../../../../components/Layout"
import DiscussionCard from '../../../../components/DiscussionCard'

export default function DiscussionHomePage() {



  const [discussions, setDiscussions] = useState([])
  const firestore = firebase.firestore()
  const discussionsRef = firestore.collection('discussions')

  useEffect(async () => {
    const fetchedDiscussions = await discussionsRef.get() 

    let discussions_ = []
    fetchedDiscussions.forEach(discussion => {
      discussions_.push({...discussion.data(), id: discussion.id})
    })
    setDiscussions(discussions_)

    return () => setDiscussions([])
  }, [])

  return (
    <Layout>
      <Head>
        <title>Anchor | Discussion</title>
      </Head>
      <Grid container>
        <Grid item md={6}>
          <Typography 
            variant="h4" 
            component="h1"
            gutterBottom
          >
            All Discussions
          </Typography>
          
        </Grid>
        <Grid item md={6}>
          <Link href="/anchor/community/discussion/new">
            <Button 
              style={{ float: 'right' }} 
              variant="contained" 
              color="primary"
            >
              New Post
            </Button>
          </Link>
        </Grid>
      </Grid>
      <Divider />
      <Grid container spacing={2}>
        {discussions.length > 0 && discussions.map((discussion, key) => {
          return <DiscussionCard key={key} discussion={discussion}  />
        })}
      </Grid>
    </Layout>
  )
}

export async function getServerSideProps({ req, params}) {
  if (req.cookies.token) {
    return { props: { test: 'test' }}
  } else {
    return { redirect: { permanent: false, destination: '/auth/login '}}
  }
}