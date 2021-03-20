import { 
  Typography,
  Divider,
  Grid,
  Button
} from '@material-ui/core'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import firebase from '../../../lib/firebase'
import Layout from '../../../components/Layout'
import Workspace from '../../../components/Workspace'

export default function WorkspacesHome({ user }) {

  const [workspaces, setWorkspaces] = useState([])
  const firestore = firebase.firestore()
  const workspacesRef = firestore.collection('workspaces')

  useEffect( async () => {
    if (user) {
      const userWorkspaces = workspacesRef.where('userID', '==', user)
      const fetchWorkspaces = await userWorkspaces.get()
      fetchWorkspaces.forEach(workspace => {
        const workspaceTemp = {...workspace.data(), id: workspace.id}
        const workspaces_ = workspaces
        workspaces_.push(workspaceTemp)
        setWorkspaces([...workspaces_])
      })
    }
    return () => setWorkspaces([])
  }, [])

  return (
    <Layout>
      <Grid container>
      <Header />
      <Divider />
      <WorkspacesGrid workspaces={workspaces} />
      </Grid>
    </Layout>
  )
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
    <Grid item md={12} spacing={2}>
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
