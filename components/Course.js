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

  useEffect(async () => {
    /**
     * 
     * Check if the user is already enrolled
     * in a course. If so, we do not want to 
     * re-enroll the user again. Instead, 
     * we will just continue his/her course 
     * session.
     * 
     */
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

    /** 
     * 
     * Enroll only the user if the user is
     * not currently enrolled in a course.
     * 
     * Immediately push the user to the first
     * page of the course.
     * 
     */
    if (!isEnrolled) {
      firebase
      .firestore()
      .collection('enrolled')
      .doc()
      .set(details)
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