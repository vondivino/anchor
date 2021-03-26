import { 
  Grid, 
  TextField, 
  Button
} from '@material-ui/core'
import firebase from '../lib/firebase'
import { useState } from 'react'

export default function DiscussionInput({ id }) {

  const firestore = firebase.firestore() 

  const [body, setBody] = useState('')

  function handleSubmit() {
    const docRef = firestore.collection('comments').doc()
    try {
      docRef.set({ 
        body, 
        discussion:id,
        created: Date.now()
      })
    } catch {
      console.log('Error creating comment.')
    }
  }


  return (
    <Grid item md={12} style={{ marginTop: '15px' }}>
      <Grid container>
        <Grid item md={9}>
          <TextField
            fullWidth
            label="Write your comment"
            variant="outlined"
            multiline
            rows={4}
            onChange={e => setBody(e.target.value)}
          >
            {body}
          </TextField>
        </Grid>
        <Grid item md={3} style={{ padding: '0 10px' }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => handleSubmit()}
          >
            Post It
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}