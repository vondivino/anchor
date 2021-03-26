import {
  Grid, 
  Typography, 
  Divider
 } from '@material-ui/core'

export default function Discover() {
  return (
    <Grid item md={3}>
      <Grid container style={{ padding: '0 10px' }}>
        <Grid item md={12}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
          >
            Discover
          </Typography>
          <Divider style={{ marginBottom: '15px' }} />
        </Grid>
        <Grid item md={12}>
          <Grid container>
            <Typography>
              Coming soon {';)'}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}