import { 
  Grid, 
  Card,
  CardContent,
  CardActions,
  Button,
  Typography
} from '@material-ui/core'
import Link from 'next/link'

export default function Workspace({ workspace }) {
  return (
    <Grid item md={3} key={workspace.id}>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">
            {workspace.projectName}
          </Typography>
          <Typography variant="subtitle2">
            {workspace.projectDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <Link href={`/anchor/workspaces/${workspace.id}`}>
            <Button>
              Play!
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
}