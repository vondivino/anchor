/** 
 * 
 * This is the main UI of the application.
 * 
 * DO NOT TOUCH THIS FILE.
 * 
 */
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
  ListItemText,
  Fab
} from '@material-ui/core'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { useAuth } from '../lib/auth'
import { useStyles } from './layout.style'
import MenuIcon from '@material-ui/icons/Menu'
import CodeIcon from '@material-ui/icons/Code'
import ForumIcon from '@material-ui/icons/Forum'
import SchoolIcon from '@material-ui/icons/School'
import { useTheme } from '@material-ui/core/styles'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'


export default function Layout({ children }) {

  const theme = useTheme()
  const classes = useStyles()

  const { handleLogout } = useAuth()
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
        <Fab 
          onClick={() => handleLogout() }
          color="primary" 
          aria-label="logout" 
          className={classes.fab}
        >
          <ExitToAppIcon />
        </Fab>
      </main>
    </div>
  )
}