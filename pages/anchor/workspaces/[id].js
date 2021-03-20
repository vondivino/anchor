import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import firebase from '../../../lib/firebase'
import Layout from '../../../components/Layout'
import { Typography, Divider } from '@material-ui/core'

const Editor = dynamic(
  import('../../../components/Editor'),
  { ssr: false }
)

export default function WorkspacesID({ id }) {

  const [workspace, setWorkspace] = useState({})
  const firestore = firebase.firestore()
  const workspacesRef = firestore.collection('workspaces')
  
  useEffect(async () => {
    if (id) {
      const workspaceRef = workspacesRef.doc(id)
      const workspace = await workspaceRef.get()
      setWorkspace(workspace.data())
    }
  }, [])

  return (
    <Layout>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
      >
        { workspace.projectName }
      </Typography>
      <Typography
        variant="body2"
        component="p"
        gutterBottom
      >
        { workspace.projectDescription }
      </Typography>
      <Divider />
      <Editor id={id} collection="workspaces"/>
    </Layout>
  )
}

export async function getServerSideProps({ req, params }) {
  if (req.cookies.token ) {
    return { props: { id: params.id || null }}
  } else {
    return { redirect: { permanent: false, destination: '/auth/login/' }}
  }
}