import {
  Grid, 
  Container
} from '@material-ui/core'

export default function AuthLayout({ children }) {
  return (
    <Container style={{ textAlign: 'center' }}>
      <Grid container justify="center">
        { children }
      </Grid>
    </Container>
  )
}