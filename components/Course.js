import {
  Grid, 
  Typography, 
  Button,
  Card, 
  CardContent,
  CardActions
} from '@material-ui/core'
import firebase from '../lib/firebase'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export default function Course({ course, user }) {

  const router = useRouter()
  const { name, description, slug } = course
  const [isEnrolled, setIsEnrolled] = useState(false)
  const firestore = firebase.firestore()
  const enrolledRef = firestore.collection('enrolled')

  useEffect(async () => {
    const courses = await enrolledRef
    .where('user', '==', user)
    .get()

    courses.forEach(course => {
      if (course.data().user === user) {
        setIsEnrolled(true)
      }
    })

    return () => setIsEnrolled(false)
  }, [])

  async function handleEnroll() {
    const details = { user: user, course: course }
    if (!isEnrolled) {
      enrolledRef.doc().set(details)
    }
    router.push(`/anchor/courses/${slug}/0`)
  }

  return (
    <Grid item md={4}>
      <Card>
        <CardContent>
          <Typography>
            { name }
          </Typography>
          <Typography>
            { description }
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => {
            handleEnroll()
          }}>
            { (isEnrolled) 
            ? 'Continue'
            : 'Start'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}