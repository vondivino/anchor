export default function Preview({ code }) {

  const styles = { 
    preview: { 
      flex: '1', 
      border: 'none' 
    }
  }

  return (
    <iframe 
      style={styles.preview} 
      srcDoc={code} 
    />
  )
}