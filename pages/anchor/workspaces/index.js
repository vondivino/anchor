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
import { makeStyles } from '@material-ui/core/styles'
import Workspace from '../../../components/Workspace'

export default function WorkspacesHome({ user }) {

  const styles = useStyles()
  const router = useRouter()
  const [workspaces, setWorkspaces] = useState([])
  const firestore = firebase.firestore()
  const workspacesRef = firestore.collection('workspaces')

  /** 
   * 
   * This code architecture will fetch all
   * the workspaces made by the current user.
   * 
   * Only fetches if a user is authenticated.
   * 
   */
  useEffect( async () => {
    if (user) {
      const userWorkspaces = workspacesRef.where('userID', '==', user)
      const fetchWorkspaces = await userWorkspaces.get()
      fetchWorkspaces.forEach(workspace => {
        const newWorkspace = { 
          ...workspace.data(), 
          id: workspace.id 
        }
        const workspaces_ = workspaces
        workspaces_.push(newWorkspace)
        setWorkspaces([...workspaces_])
      })
    }
    return () => setWorkspaces([])
  }, [])

  // TODO: Refactor UI
  return (
    <Layout>
      <Grid container>
        <Grid item xs={1} md={6}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
          >
            All Workspaces
          </Typography>
        </Grid>
        <Grid item xs={1} md={6}>
          <Button 
            className={styles.workspaceAddBtn}
            variant="contained" 
            color="primary"
            onClick={() => {
              router.push('/anchor/workspaces/new/')
            }}
          >
            New Workspace
          </Button>
        </Grid>
      <Divider />
        <Grid item xs={1} md={12}>
          <Grid container>
            {workspaces.map(workspace => (
              <Workspace 
                key={workspace.id}
                workspace={workspace}
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  )
}

const useStyles = makeStyles(theme => {
  return {
    workspaceAddBtn: {
      float: 'right'
    }
  } 
})

/**
 *
 * The code below is a server-side render.
 * For authentication purpose only.
 *
 * If a user is authenticated, then continue
 * to fetch all his/her workspaces.
 *
 */
export async function getServerSideProps({ req }) {
  if (req.cookies.token) {
    return { props: { user: req.cookies.token || null } }
  } else {
    return { redirect: { 
      permanent: false, 
      destination: '/auth/login/'
    }}
  }
}