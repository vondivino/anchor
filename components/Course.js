import {
  Grid, 
  Typography, 
  Button,
  Card, 
  CardContent,
  CardActions
} from '@material-ui/core'
import firebase from '../lib/firebase'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Course({ course, user }) {

  const router = useRouter()
  const [isEnrolled, setIsEnrolled] = useState(false)

  useEffect(async () => {
    const courses = await firebase
    .firestore()
    .collection('enrolled')
    .where('user', '==', user)
    .get()

    courses.forEach(course => {
      if (course.data().user === user) {
        setIsEnrolled(true)
      }
    })
  }, [])

  async function handleEnroll() {

    const details = {
      user: user,
      course: course
    }

    if (!isEnrolled) {
      firebase
      .firestore()
      .collection('enrolled')
      .doc()
      .set(details)
    }
  }

  return (
    <Grid item md={4}>
      <Card>
        <CardContent>
          <Typography>
            { course.name }
          </Typography>
          <Typography>
            { course.description }
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={() => {
            handleEnroll()
            router.push(`/anchor/courses/${course.slug}/0`)
          }}>
            { (isEnrolled) ? 'Continue': 'Start'}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}