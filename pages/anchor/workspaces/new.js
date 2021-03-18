import { useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import firebase from '../../../lib/firebase'
import Layout from '../../../components/Layout'


export default function WorkspacesNew({ user }) {

  // TODO: Add a datetime field here
  // Not important :)
  const workspace = { 
    code: '', 
    userID: user 
  }
  const router = useRouter()
  const projectNameInput = useRef()
  const projectDescInput = useRef()
  const firestore = firebase.firestore()
  const workspacesRef = firestore.collection('workspaces')

  /** 
   * 
   * This code architecture will create
   * a new workspace when user is authenticated.
   * 
   */
  function handleSubmit(e) {
    e.preventDefault()

    const workspaceID = uuidv4()
    workspace.projectName = projectNameInput.current.value 
    workspace.projectDescription = projectDescInput.current.value 

    try {
      workspacesRef.doc(workspaceID).set(workspace)
    } catch {
      console.log('Error creating a workspace.')
      return null
    }

    return router.push(`/anchor/workspaces/${workspaceID}`)
  }

  // TODO: Improve UI
  return (
    <Layout>
      <form onSubmit={handleSubmit} >
        <input type="text" ref={projectNameInput} />
          <textarea ref={projectDescInput} />
          <button type="submit" >Create</button>
      </form>
    </Layout>
  )
}

/**
 *
 * The code below is a server-side render.
 * For authentication purpose only.
 *
 * If a user is authenticated, then continue
 * to to add his/her workspaces.
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