import React,{ useEffect, useState } from 'react';
import { makeStyles,styled,withStyles  } from '@material-ui/core/styles';
import {Button,Grid,List,ListItem,ListItemIcon,ListItemText,AppBar,Link,Toolbar,Typography,IconButton,Divider,MenuItem,Menu,Drawer,Badge,Avatar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { compose, spacing, palette } from '@material-ui/system';
import HomeIcon from '@material-ui/icons/Home';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import GrainIcon from '@material-ui/icons/Grain';
import MinimizeOutlinedIcon from '@material-ui/icons/MinimizeOutlined';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 2,
    textAlign:"left",
  },
  drawerWidth:{
    width:"300px",
  },
  Avatarleft:{
    margin:"10px"
  },
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const Box = styled('div')(compose(spacing, palette));
function Content(prop) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawer,setisDrawer]= useState(false);
  const [selectedIndex, setSelectedIndex] = useState(prop.index);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
      <div>
        <AppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={()=>setisDrawer(true)} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            DASHBOARD
          </Typography>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor='left' open={isDrawer} onClose={()=>setisDrawer(false)} >
      <Grid container spacing={2} justify="space-around" direction="row" alignItems="center" className={classes.Avatarleft}>
        <Grid item xs={2} sm={2}>
            <StyledBadge
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar alt="Remy Sharp" src={require('../img/cat.jpg')} />
          </StyledBadge>
        </Grid>
        <Grid item xs={10} sm={10}>
          <Typography variant="h6" >USER NAME</Typography>
        </Grid>
      </Grid>
      <Divider />
      <List component="nav" aria-label="main mailbox folders" className={classes.drawerWidth}>
        <ListItem
          button
          selected={selectedIndex === '0'}
          onClick={(event) => handleListItemClick(event, '0')}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          {/* <ListItemText primary="Home">
            </ListItemText> */}
            <Link  href='/' color="inherit">Home</Link>
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === '1'}
          onClick={(event) => handleListItemClick(event, '1')}
        >
          <ListItemIcon>
            <WhatsAppIcon />
          </ListItemIcon>
          {/* <ListItemText primary="Section 1">
            </ListItemText> */}
            <Link  href='/waDesign' color="inherit">WA Design</Link>
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === '2'}
          onClick={(event) => handleListItemClick(event, '2')}
        >
          <ListItemIcon>
            <FacebookIcon />
          </ListItemIcon>
          {/* <ListItemText primary="Section 1">
            </ListItemText> */}
            <Link  href='/fbDesign' color="inherit">FB Design</Link>
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === '3'}
          onClick={(event) => handleListItemClick(event, '3')}
        >
          <ListItemIcon>
            <MinimizeOutlinedIcon />
          </ListItemIcon>
          {/* <ListItemText primary="Home">
            </ListItemText> */}
            <Link  href='/reduxTutorials' color="inherit">Redux</Link>
        </ListItem>
        <ListItem
          button
          selected={selectedIndex === '4'}
          onClick={(event) => handleListItemClick(event, '4')}
        >
          <ListItemIcon>
            <GrainIcon />
          </ListItemIcon>
            <Link  href='/MemoRef' color="inherit">others</Link>
        </ListItem>
      </List>
      </Drawer>
      </div>
  );
}
export default Content