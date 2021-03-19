import { 
  Grid, 
  Divider,
  Typography,
  Button
} from '@material-ui/core'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import firebase from '../../../../lib/firebase'
import Layout from '../../../../components/Layout'
import { makeStyles } from '@material-ui/core/styles'

/**
 * 
 * Since AceEditor runs only on client-side,
 * the 'dynamic' function allows the component
 * to be run only on the client, not on the server.
 * 
 */
const Editor = dynamic(
  import('../../../../components/Editor'),
  { ssr: false }
)

export default function CoursePage({ user, slug, order }) {

  const styles = useStyles()
  const router = useRouter()
  const [course, setCourse] = useState({})
  const [currentStep, setCurrentStep ] = useState({}) 


  /** 
   * 
   * This code architecture below will fetch the 
   * selected course. Remember that each course
   * is user-sessioned. Meaning, all of the course
   * instance are unique to each users.
   * 
   */
  useEffect(async () => {
    let course_ = {}
    let steps_ = []
    const courses = await firebase
      .firestore()
      .collection('enrolled')
      .where('user', '==', user)
      .where('course.slug', '==', slug).get()

    courses.forEach(course => {
      course.data().course.steps.map(step => {
        steps_ = [...steps_, step]
      })

      course_.id = course.id
      course_.code = course.data().course.code
      course_.description = course.data().course.description
      course_.name = course.data().course.name
      course_.steps = steps_
      setCourse(course_)

      /**
       * 
       * Here, if the course's step doesn't exists, 
       * it will redirect to the courses page.
       * 
       * This is the solution for now.
       * 
       */
      const currentStep_ = steps_.filter(step => step.order == order)
      if (currentStep_.length !== 0) {
        setCurrentStep(currentStep_[0])
      } else {
        router.push('/anchor/courses/')
      }
    })

    return () => {
      setCourse({})
      setCurrentStep({})
    }
  }, [order])

  function handleProceed(next) {
    const step = Number(order) + next
    return router.push(`/anchor/courses/${slug}/${step}`)
  }

  return (
    <Layout>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
          >
            { currentStep.name }
          </Typography>
          <Typography 
            variant="subtitle1" 
            component="p" 
            gutterBottom
          >
            { currentStep.description }
          </Typography>
          <Divider />
        </Grid>
        <Grid 
          item 
          xs={12} 
          md={6}
        >
          <Button 
            variant="contained" 
            color="primary"
            className={styles.courseNxtBtn}
            onClick={() => handleProceed(1)}
          >
            Mark as Completed
          </Button>
          <Button 
            variant="outlined" 
            color="primary"
            className={styles.courseNxtBtn}
            onClick={() => handleProceed(-1)}
          >
            Previous Step
          </Button>
        </Grid>
      </Grid>
      { course.id && 
      <Editor 
        id={course.id} 
        collection="enrolled" 
      />}
    </Layout>
  )
}

const useStyles = makeStyles(theme => {
  return {
    courseNxtBtn: { 
      float: 'right' ,
      marginTop: '20px',
      marginLeft: '10px'
    }
  }
})

/**
 *
 * The code below is a server-side render.
 * For authentication purpose only.
 *
 * If a user is authenticated, then continue
 * to fetch the all selected course.
 *
 */
export async function getServerSideProps({ req, params }) {
  if (req.cookies.token) {
    return { props: {
      user: req.cookies.token || null, 
      slug: params.slug || null, 
      order: params.order || null
    }}
  } else {
    return { redirect: {
      permanent: false,
      destination: '/auth/login/'
    }}
  }
}