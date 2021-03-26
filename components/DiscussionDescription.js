import { 
  Grid, 
  Typography, 
  Divider 
} from '@material-ui/core'

export default function DiscussionDescription({ title, body}) {
  return (
    <>
      <Grid item md={12}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
        >
          { title }
        </Typography>
        <Divider style={{ marginBottom: '15px' }} />
      </Grid>
      <Grid item md={12}>
        <Typography>
          { body }
        </Typography>
      </Grid>
    </>
  )
}