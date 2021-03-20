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

  function handleLiveSave(code_) {
    if (collection !== 'enrolled') {
      // e.g. Workspaces
      docRef.update({ code: code_ })
    } else {
      // Enrolled
      const course = {...enrolled, code: code_ }
      const updatedEnrolled = { course: course }
      docRef.update(updatedEnrolled)
    }
    setCode(code_)
  }

  useEffect(async () => {
    const doc = await docRef.get()
    if (collection !== 'enrolled') {
      // e.g. Workspaces
      setCode(doc.data().code)
    } else {
      // Enrolled
      setEnrolled(doc.data().course)
      setCode(doc.data().course.code)
    }
    return () => setCode(null)
  }, [])

  return (
    <div style={{
      display: 'flex',
      marginTop: '25px'
    }}>
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