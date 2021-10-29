import React,{ useEffect, useState } from 'react';
import {AppBar,Tabs,Tab,Typography,Zoom,Fab,Box,InputBase,Input,InputAdornment,FormControl,Grid,Badge,List,ListItem,ListItemAvatar,ListItemText,Avatar,Divider,Toolbar,IconButton,Dialog,Button,Menu,MenuItem} from '@material-ui/core'
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import clsx from 'clsx';
import { fade,makeStyles, useTheme,withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PhoneIcon from '@material-ui/icons/Phone';
import VideocamIcon from '@material-ui/icons/Videocam';
import KeyboardIcon from '@material-ui/icons/Keyboard';
import MicSharpIcon from '@material-ui/icons/MicSharp';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { green } from '@material-ui/core/colors';
import Content from './tutorails_1'
function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`action-tabpanel-${index}`}
        aria-labelledby={`action-tab-${index}`}
        {...other}
      >
        {value === index && <Box p={0}>{children}</Box>}
      </Typography>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `action-tab-${index}`,
      'aria-controls': `action-tabpanel-${index}`,
    };
  }
  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      width: 500,
      position: 'relative',
      minHeight: 200,
    },
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    fabGreen: {
      color: theme.palette.common.white,
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[600],
      },
      large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
      ptop:{
        paddingTop:"80px"
      }
    },
  }));
const useStyles_1 = makeStyles((theme) => ({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    formWidth:{
      width:"100%",
      border: "1px solid darkgrey",
      borderRadius: "10px",
    },
    gridplace:{
      bottom: "10px",
      position: "absolute",
    },
    alignright:{
      marginLeft:theme.spacing(2)
    }
  }));
function WADesign(){
  const classes = useStyles();
  const classes_1 = useStyles_1();
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [open,setopen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user,setuser] = useState({id:'',src:'cat.jpg',primary:'',secondary:''})
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  const handleListItemClick =(event,id)=>{
    //console.log(id);
    let obj = users.find(e => e.id === id);
    setuser({id:obj.id,src:obj.src,primary:obj.primary})
    setopen(true)
  }
  const handleClose_modal=()=>{
    setopen(false);
    //setAnchorEl(null);
  }
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const fabs = [
    {
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary',
      className: classes.fab,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit',
      className: clsx(classes.fab, classes.fabGreen),
      icon: <PhoneIcon />,
      label: 'Call',
    },
  ];
  const users = [
      {
          id:'1',
          src:'cat.jpg',
          primary:'User 1',
          secondary:'Message from Someone'
      },
      {
        id:'2',
        src:'slide_1.jpg',
        primary:'User 2',
        secondary:'Message from Someone'
      },
      {
        id:'3',
        src:'slide_3.jpg',
        primary:'User 3',
        secondary:'Message from Someone'
      },
      {
        id:'4',
        src:'slide_4.jpg',
        primary:'User 4',
        secondary:'Message from Someone'
      },
      {
        id:'5',
        src:'slide_11.jpg',
        primary:'User 5',
        secondary:'Message from Someone'
      }
  ]
    return(
        <div>
            <Content index='1'/>
            <Grid container >
                <Grid item  xs={12} sm={12}  >
                <AppBar position="static" color="default">
                        <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="action tabs example"
                        // className={classes.ptop}
                        style={{paddingTop:"65px"}}
                        >
                        <Tab label={<Badge color="primary" badgeContent={4}>Chats</Badge>} {...a11yProps(0)} />
                        <Tab label={<Badge color="primary" variant="dot">Status</Badge>} {...a11yProps(1)} />
                        <Tab label="Calls" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={value} index={0}>
                        <List>
                            {
                                users.map((users,i)=>(
                                <>
                                <ListItem 
                                button 
                                alignItems="flex-start"
                                onClick={(event)=>handleListItemClick(event,users.id)}
                                key={users.id}
                                >
                                <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src={require(`../img/${users.src}`)} style={{width: theme.spacing(6),height: theme.spacing(6)}}/>
                                </ListItemAvatar>
                                <ListItemText
                                primary={users.primary}
                                secondary={users.secondary}
                                />
                                </ListItem>
                                <Divider variant="inset" component="li" />
                                </>
                                ))
                            }
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                        {fabs.map((fab, index) => (
                            <Zoom
                            key={fab.color}
                            in={value === index}
                            timeout={transitionDuration}
                            style={{
                                transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
                            }}
                            unmountOnExit
                            >
                            <Fab aria-label={fab.label} className={fab.className} color={fab.color}>
                                {fab.icon}
                            </Fab>
                            </Zoom>
                        ))}
                    <Dialog 
                    open={open} 
                    onClose={handleClose_modal}
                    // TransitionComponent={Transition}
                    fullScreen 
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
                      <div>
                        <AppBar className={classes_1.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={handleClose_modal} aria-label="close">
                            <ArrowBackIcon />
                            </IconButton>
                            <Avatar alt="Remy Sharp" src={require(`../img/${user.src}`)} style={{width: theme.spacing(6),height: theme.spacing(6)}}/>
                            <Typography variant="h6" className={classes_1.title}>
                            {user.primary}
                            </Typography>
                            <IconButton edge="start" color="inherit" aria-label="call" >
                            <VideocamIcon />
                            </IconButton>
                            <IconButton edge="start" color="inherit" aria-label="call" >
                            <PhoneIcon />
                            </IconButton>
                            <IconButton edge="start" color="inherit" onClick={(event)=>setAnchorEl(event.currentTarget)} aria-label="more" aria-controls="menu-appbar" aria-haspopup="true">
                            <MoreVertIcon />
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
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem onClick={handleCloseMenu}>Setting</MenuItem>
                                <MenuItem onClick={handleCloseMenu}>More</MenuItem>
                            </Menu>
                        </Toolbar>
                        </AppBar>
                        <List>
                        <ListItem button>
                            <ListItemText primary="Phone ringtone" secondary="Titania" />
                        </ListItem>
                        <Divider />
                        <ListItem button>
                            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                        </ListItem>
                        </List>
                        <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes_1.gridplace}
                        >
                        <Grid item xs={10} sm={11}>
                        <FormControl className={classes_1.formWidth}>
                        <Input
                          id="input-with-icon-adornment"
                          disableUnderline
                          multiline
                          placeholder='Type Message'
                          startAdornment={
                            <InputAdornment position="start" style={{padding:"13px"}}>
                              <KeyboardIcon />
                            </InputAdornment> 
                          }
                          endAdornment={
                            <InputAdornment position="start">
                              <AttachFileIcon />
                            </InputAdornment> 
                          }
                        />
                        </FormControl>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                        <Fab color="secondary" aria-label="add" className={classes_1.alignright} size='medium'>
                        <MicSharpIcon />
                        </Fab>
                        </Grid>
                        </Grid>
                        </div>
                        </Slide>
                    </Dialog>
                </Grid>
            </Grid>
        </div>
        

    )
}
export default WADesign