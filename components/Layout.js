import { useState } from 'react'
import clsx from 'clsx'
import SchoolIcon from '@material-ui/icons/School'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CodeIcon from '@material-ui/icons/Code'
import ForumIcon from '@material-ui/icons/Forum'
import { useTheme } from '@material-ui/core/styles'
import { 
  CssBaseline,
  Drawer, 
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { useStyles } from './layout.style'

import Link from 'next/link'


export default function Layout({ children }) {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => setOpen(true)
  const handleDrawerClose = () => setOpen(false)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Anchor
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' 
            ? <ChevronRightIcon /> 
            : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button key='courses'>
            <Link href="/anchor/courses/">
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
            </Link>
            <ListItemText primary='Courses' />
          </ListItem>
          <Link href="/anchor/workspaces/">
            <ListItem button key='workspaces'>
              <ListItemIcon>
                <CodeIcon />
              </ListItemIcon>
              <ListItemText primary='Workspaces' />
            </ListItem>
          </Link>
          <Link href="/anchor/community/">
            <ListItem button key='community'>
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary='Community' />
            </ListItem>
          </Link>
        </List>
        <Divider />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  )
}
