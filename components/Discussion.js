import Grid from '@material-ui/core/Grid'
import { useEffect, useState } from 'react'
import firebase from '../lib/firebase'
import DiscussionInput from './DiscussionInput'
import DiscussionComments from './DiscussionComments'
import DiscussionDescription from './DiscussionDescription'

 export default function Discussion({ id }) {

  const [discussion, setDiscussion] = useState({})
  const firestore = firebase.firestore() 
  const discussionsRef = firestore.collection('discussions')

  useEffect(async () => {
    discussionsRef.doc(id).get() 
    .then(data => setDiscussion(data.data()))
    .catch(err => console.log(err))
  }, [])


   return (
    <Grid item md={9}>
      <Grid container style={{ padding: '0 30px' }}>
        <DiscussionDescription {...discussion} />
        <DiscussionComments id={id} />
        <DiscussionInput id={id} />
      </Grid>
    </Grid>
   )
 }