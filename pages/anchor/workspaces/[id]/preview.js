import { useEffect, useState } from 'react'
import firebase from '../../../../lib/firebase'

import Layout from "../../../../components/Layout"
import Preview from "../../../../components/Preview"



export default function WorkspacePreview({ id }) {

  const [workspace, setWorkspace] = useState({})
  const firestore = firebase.firestore()
  const workspacesRef = firestore.collection('workspaces')
  const workspaceRef = workspacesRef.doc(id)

  const styles = {
    preview: {
      width: '100%',
      height: '100%',
      border: 'none',
      margin: '0',
      padding: '0',
      overflow: 'hidden',
      zIndex: '99999',
      position: 'fixed',
      top: '0',
      left: '0',
      bottom: '0',
      right: '0'
    }
  }

  useEffect(() => {
    const unsubscribe = workspaceRef.onSnapshot(snapshot => {
      setWorkspace(snapshot.data())
    })

    return () => unsubscribe()
  }, [])


  return <Preview code={workspace.code} styles_={styles} />
}

export async function getServerSideProps({ req, params }) {
  if (req.cookies.token) {
    return { props: { id: params.id || null } }
  } else {
    return { redirect: { permanent: false, destination: '/auth/login/' } }
  }
}