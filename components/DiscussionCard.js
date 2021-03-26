import {
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core'
import Link from 'next/link'

export default function DiscussionCard({ discussion }) {

  const title = discussion.title 
  const body = discussion.body
  const id = discussion.id 

  return (
    <Grid item md={3}>
      <Card style={{ marginTop: '15px', padding: '10px' }}>
        <CardContent>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
          >
            { title }
            </Typography>
          <Divider style={{ marginBottom: '15px' }} />
          <Typography>
            { body }
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={`/anchor/community/discussion/${id}`}>
            <Button
              variant="contained"
              color="primary"
              size="small"
            >
              View More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
}