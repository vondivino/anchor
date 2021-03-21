import { 
  Backdrop, 
  Typography, 
  CircularProgress,
  Divider,
  Box
} from '@material-ui/core'
import { useEffect, useState } from 'react'

const loaderWords = [
  'Please wait...',
  'Analyzing...',
  'Learning is hard but just be patient :)',
  'Patience is a virtue :)'
]

export default function Loader() {
  
  const [word, setWord] = useState('')
  
  useEffect(() => {
    setWord(loaderWords[Math.floor(Math.random() * loaderWords.length)])
  }, [])

  return (
    <Backdrop open invisible>
      <Box textAlign="center">
      <Typography gutterBottom>
        { word }
      </Typography>
      <CircularProgress />
      </Box>
    </Backdrop>
  )
}