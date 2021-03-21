import { 
  Grid, 
  Divider,
  Typography,
  Button,
} from '@material-ui/core'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import firebase from '../../../../lib/firebase'
import Layout from '../../../../components/Layout'
import { makeStyles } from '@material-ui/core/styles'
import Loader from '../../../../components/Loader'

export default function CoursePage({ user, slug, order }) {

  const styles = useStyles()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState({})
  const [currentStep, setCurrentStep ] = useState({}) 
  const firestore = firebase.firestore() 
  const enrolledRef = firestore.collection('enrolled')
  
  useEffect(async () => {
    let course_ = {}
    let steps_ = []
    const courses = await enrolledRef
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

      const currentStep_ = steps_.filter(step => step.order == order)
      if (currentStep_.length !== 0) {
        setCurrentStep(currentStep_[0])
        setLoading(false)
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

  if (!loading) {
    return (
      <Layout>
        <Head>
          <title>Anchor | {currentStep.name}</title>
        </Head>
        <Grid container>
          <Grid item md={6}>
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
          <Grid item md={6}>
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
        <Editor id={course.id} collection="enrolled" />}
      </Layout>
    )
  } else { return <Loader /> }
}

const Editor = dynamic(
  import('../../../../components/Editor'),
  { ssr: false }
)

const useStyles = makeStyles(theme => {
  return {
    courseNxtBtn: { 
      float: 'right' ,
      marginTop: '20px',
      marginLeft: '10px'
    }
  }
})

export async function getServerSideProps({ req, params }) {
  if (req.cookies.token) {
    return { props: {
      user: req.cookies.token || null, 
      slug: params.slug || null, 
      order: params.order || null
    }}
  } else {
    return { redirect: { permanent: false, destination: '/auth/login/' }}
  }
}