import { 
  Grid,
  Typography,
  Divider,
  TextField,
  Button
} from '@material-ui/core'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import firebase from '../../../../lib/firebase'
import Layout from '../../../../components/Layout'

export default function DiscussionNew() {

  const router = useRouter()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const firestore = firebase.firestore()
  const discussionsRef = firestore.collection('discussions')


  function handleSubmit() {
    const docID = uuidv4()
    const data = { title, body }
    const discussionRef = discussionsRef.doc(docID)
    discussionRef.set(data)
    .finally(() => router.push(`/anchor/community/discussion/`))
    .catch(err => console.log(err))
  }

  return (
    <Layout>
      <Head>
        <title>Anchor | New Discussion</title>
      </Head>

      <Grid container>
        <Grid item md={12}>
          <Typography 
            variant="h4"
            component="h1"
            gutterBottom
          >
            New Discussion
          </Typography>
        <Divider />
        <Grid item md={6}>
          <Grid container>
            <Grid item md={12} style={{ marginTop: '15px' }}>
              <TextField 
                fullWidth
                variant="outlined"
                value={title}
                label="Discussion Title" 
                onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item md={12} style={{ marginTop: '15px' }}>
              <TextField 
                fullWidth
                multiline
                rows={10}
                variant="outlined"
                label="Discussion Body" 
                onChange={e => setBody(e.target.value)}
              >
                {body}
              </TextField>
            </Grid>
            <Grid item md={12} style={{ marginTop: '15px' }}>
              <Link href="/anchor/community/discussion">
                <Button style={styles.btn} variant="contained">
                  Cancel
                </Button>
              </Link>
              <Button
                variant="contained"
                color="primary"
                style={styles.btn}
                onClick={() => handleSubmit()}
              >
                Add Discussion
              </Button>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}


const styles = {
  btn: {
    float: 'right',
    marginLeft: '5px'
  }
}





