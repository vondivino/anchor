import { 
  Grid, 
  Typography, 
  Divider, 
  List, 
  ListItem, 
  ListItemText 
} from '@material-ui/core'
import firebase from '../lib/firebase'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => {
  return {
    list: {
      backgroundColor: theme.palette.background.paper
    }
  }
})

export default function DiscussionComments({ id }) {

  const styles = useStyles()
  const [comments, setComments] = useState([])
  const firestore = firebase.firestore()
  const commentsRef = firestore.collection('comments')

  useEffect(async () => {
    const unsubscribe = commentsRef
    .where('discussion', '==', id)
    .onSnapshot(snapshot => {
      let updatedComments = []
      snapshot.forEach(doc => {
        updatedComments.push(doc.data())
      })
      setComments([...comments, ...updatedComments])
    })

    return () => unsubscribe()
  }, [])

  return (
    <Grid item md={12} style={{ marginTop: '15px' }}>
      <List className={styles.list}>
        { comments.length > 0 && comments.map((comment, key) => {
          console.log(comment.body)
          return (
            <div key={key}>
              <ListItem>
              <ListItemText>
                <Typography>
                  { comment.body }
                </Typography>
              </ListItemText>
              </ListItem>
              <Divider />
            </div>
          )
        })}
      </List>
    </Grid>
  )
}