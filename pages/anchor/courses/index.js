import {
  Typography,
  Divider,
  Grid,
} from '@material-ui/core'
import Head from 'next/head'
import { useState, useEffect } from 'react'
import firebase from '../../../lib/firebase'
import Layout from '../../../components/Layout'
import Loader from '../../../components/Loader'
import Course from '../../../components/Course'

export default function CoursesHome({ user }) {

  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const firestore = firebase.firestore()
  const coursesRef = firestore.collection('courses')

  useEffect(async () => {
    let course_ = {}
    let courses_ = []
    let steps_ = []
    const fetchCourses = await coursesRef.get()

    fetchCourses.forEach(async course => {
      const steps = await coursesRef
        .doc(course.id)
        .collection('steps').get()

      steps.forEach(step => {
        steps_ = [...steps_, step.data()]
      })

      course_.id = course.id
      course_.slug = course.data().slug
      course_.name = course.data().name
      course_.code = course.data().code
      course_.description = course.data().description
      course_.steps = steps_
      courses_ = [...courses_, course_]
      setCourses(courses_)
      setLoading(false)
    })

    return () => setCourses([])
  }, [])

  if (!loading) {
    return (
      <Layout>
        <Head>
          <title>Anchor | All Courses</title>
        </Head>
        <Grid container>
          <Grid item md={12}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
            >
              All Courses
            </Typography>
            <Divider />
          </Grid>
          <Grid item md={12}>
            <CoursesGrid user={user} courses={courses} />
          </Grid>
        </Grid>
      </Layout>
    )
  } else { return <Loader /> }
}

function CoursesGrid({ courses, user }) {
  return (
    <Grid container>
      {courses &&
      courses.map(course => (
        <Course
          key={course.slug}
          user={user}
          course={course}
        />
      ))}
    </Grid>
  )
}

export async function getServerSideProps({ req }) {
  if (req.cookies.token) {
    return {
      props: { user: req.cookies.token || null }
    }
  } else {
    return {
      redirect: { permanent: false, destination: '/auth/login/' }
    }
  }
}