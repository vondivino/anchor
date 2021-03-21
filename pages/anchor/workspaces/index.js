import { 
  Typography,
  Divider,
  Grid,
  Button
} from '@material-ui/core'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import firebase from '../../../lib/firebase'
import Layout from '../../../components/Layout'
import Loader from '../../../components/Loader'
import Workspace from '../../../components/Workspace'

export default function WorkspacesHome({ user }) {

  const [workspaces, setWorkspaces] = useState([])
  const [loading, setLoading] = useState(true)
  const firestore = firebase.firestore()
  const workspacesRef = firestore.collection('workspaces')

  useEffect( async () => {
    if (user) {
      const userWorkspaces = workspacesRef.where('userID', '==', user)
      const fetchWorkspaces = await userWorkspaces.get()
      if (fetchWorkspaces.size > 0) {
        fetchWorkspaces.forEach(workspace => {
          const workspaceTemp = {...workspace.data(), id: workspace.id}
          const workspaces_ = workspaces
          workspaces_.push(workspaceTemp)
          setWorkspaces([...workspaces_])
          setLoading(false)
        })
      } else {
        setLoading(false)
      }
    }
    return () => setWorkspaces([])
  }, [])

  if (!loading) {
    return (
      <Layout>
        <Head>
          <title>Anchor | Your Workspaces</title>
        </Head>
        <Grid container>
        <Header />
        <Divider />
        <WorkspacesGrid workspaces={workspaces} />
        </Grid>
      </Layout>
    )
  } else { return <Loader /> }
}


function Header() {

  const router = useRouter()
  const newWorkspace = '/anchor/workspaces/new/'

  return (
    <>
      <Grid item md={6}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
        >
          All Workspaces
        </Typography>
      </Grid>
      <Grid item md={6}>
        <Button 
          style={{float: 'right'}}
          variant="contained" 
          color="primary"
          onClick={() => {
            router.push(newWorkspace)
          }}
        >
          New Workspace
        </Button>
      </Grid>
    </>
  )
}


function WorkspacesGrid({ workspaces }) {
  return (
    <Grid item md={12}>
      <Grid container>
        {workspaces && 
        workspaces.map(workspace => (
          <Workspace
            key={workspace.id}
            workspace={workspace}
          />
        ))}
      </Grid>
    </Grid>
  )
}

export async function getServerSideProps({ req }) {
  if (req.cookies.token) {
    return { props: { user: req.cookies.token || null } }
  } else {
    return {
      redirect: { permanent: false, destination: '/auth/login/' }
    }
  }
}
