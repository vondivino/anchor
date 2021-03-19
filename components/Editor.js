// TODO
import 'file-loader'
import Preview from './Preview'
import AceEditor from 'react-ace'
import config from './editor.config'
import "ace-builds/webpack-resolver"
import firebase from '../lib/firebase'
import { useState, useEffect } from 'react'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

export default function Editor({ id, collection }) {

  const [code, setCode] = useState('')
  const [enrolled, setEnrolled] = useState({})
  const firestore = firebase.firestore()
  const collectionRef = firestore.collection(collection)
  const docRef = collectionRef.doc(id)

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
    if (collection !== 'enrolled') {
      docRef.update({ code: code_ })
    } else {
      const course = {...enrolled, code: code_ }
      const updatedEnrolled = { course: course }
      docRef.update(updatedEnrolled)
    }
    setCode(code_)
  }

  /** 
   * 
   * In this useEffect, it only happens once. This 
   * will be the initial code value in the code editor.
   * 
   */
  useEffect(async () => {
    const doc = await docRef.get()
    if (collection !== 'enrolled') {
      setCode(doc.data().code)
    } else {
      setEnrolled(doc.data().course)
      setCode(doc.data().course.code)
    }
    return () => setCode(null)
  }, [])

  return (
    <div style={styles.editor}>
      <AceEditor
        value={code}
        name={id}
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

const styles = {
  editor: {
    display: 'flex',
    marginTop: '25px'
  }
}