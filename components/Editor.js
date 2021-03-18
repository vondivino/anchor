import 'file-loader'
import Preview from './Preview'
import AceEditor from 'react-ace'
import config from './editor.config'
import "ace-builds/webpack-resolver"
import firebase from '../lib/firebase'
import { useState, useEffect } from 'react'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/theme-monokai'

export default function Editor({ workspaceID }) {

  const [code, setCode] = useState('')
  const firestore = firebase.firestore()
  const workspacesRef = firestore.collection('workspaces')
  const workspaceRef = workspacesRef.doc(workspaceID)
  const styles = { 
    editor: { 
      display: 'flex',
      marginTop: '25px' 
    }
  }

  /** 
   * 
   * This code architecture below will allow to 
   * save the local code to Firebase synchronously. 
   * Note that the local code refers to the 'code' state.
   * 
   * When there is a change in the code editor,
   * it will change both the code state and the 
   * Firebase in real-time.
   * 
   */
  function handleLiveSave(code_) {
    workspaceRef.update({ code: code_ })
    setCode(code_)
  }

  /** 
   * 
   * In this useEffect, it only happens once. This 
   * will be the initial code value in the code editor.
   * 
   */

  useEffect(async () => {
    const workspace = await workspaceRef.get()
    setCode(workspace.data().code)
    return () => setCode(null)
  }, [])

  return (
    <div style={styles.editor}>
      <AceEditor
        value={code}
        name={workspaceID}
        onChange={handleLiveSave}
        mode={config.mode}
        theme={config.theme}
        width={config.width}
        height={config.height}
        fontSize={config.fontSize}
        // TODO: Not working setOptions
        setOptions={config.options}
      />
      <Preview code={code} />
    </div>
  )
} 