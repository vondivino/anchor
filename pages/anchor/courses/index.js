import { 
  Typography,
  Divider,
  Grid,
} from '@material-ui/core'
import { useState, useEffect } from 'react'
import firebase from '../../../lib/firebase'
import Layout from '../../../components/Layout'
import Course from '../../../components/Course'


export default function CoursesHome({ user }) {

  const [courses, setCourses] = useState([])

  useEffect(async () => {
    let courses_ = []
    let course_ = {}
    let steps_ = []
    const fetchCourses = await firebase
      .firestore()
      .collection('courses').get()

    fetchCourses.forEach(async course => {
      const steps = await firebase
        .firestore()
        .collection('courses')
        .doc(course.id)
        .collection('steps').get()

      steps.forEach(step => {
        steps_ = [...steps_, step.data()]
      })

      course_.id = course.id
      course_.slug = course.data().slug
      course_.code = course.data().code
      course_.description = course.data().description
      course_.name = course.data().name
      course_.steps = steps_
      courses_ = [...courses_, course_]
      setCourses(courses_)
    })
    
  }, [])

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} md={12}>
          <Typography variant="h4" component="h1" gutterBottom>
            All Courses
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} md={12}>
          <Grid container>
            { courses && 
            courses.map(course => (
              <Course 
                key={course.slug} 
                user={user}
                course={course} 
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

// SERVER SIDE THIS
// THE PROGRESS OF LEARNER
export async function getServerSideProps({ req }) {
  if (req.cookies.token) {
    return {
      props: { user: req.cookies.token || null}
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: '/auth/login/'
      }
    }
  }
}