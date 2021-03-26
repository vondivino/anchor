export default function Preview({ code, styles_ }) {

  let styles

  if (!styles_) {
    styles = {
      preview: {
        flex: '1',
        border: 'none'
      }
    }
  } else {
    styles = styles_
  }


  return (
    <iframe 
      style={styles.preview} 
      srcDoc={code} 
    />
  )
}