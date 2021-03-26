import {
  Grid, 
  Container
} from '@material-ui/core'

export default function AuthLayout({ children }) {

  const styles = {
    textAlign: 'center',
    marginTop: '100px'
  }

  return (
    <Container style={styles}>
      <Grid container justify="center">
        { children }
      </Grid>
    </Container>
  )
}