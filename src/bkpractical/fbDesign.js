import React,{ useEffect, useState } from 'react';
import {Button,Grid,Typography,IconButton,Stepper,Step,StepLabel,StepContent,Avatar,GridList,GridListTile,GridListTileBar,ListSubheader,FormControl,Paper,Checkbox,Input,Divider,ButtonGroup,Card,CardHeader,CardMedia,CardContent,CardActions,Menu,MenuItem} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import PhotoIcon from '@material-ui/icons/Photo';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MessageIcon from '@material-ui/icons/Message';
import LanguageIcon from '@material-ui/icons/Language';
import InfoIcon from '@material-ui/icons/Info';
import Slide from '@material-ui/core/Slide';
import Content from './tutorails_1' ;
const useStyles = makeStyles((theme) => ({
    formWidth:{
        width:"100%",
        borderRadius:"10px",
        border:"1px solid darkgrey"
    },
    top:{
        marginTop:theme.spacing(10),
        // maxHeight:window.innerHeight,
        // overflow:'scroll',
    },
    icon: {
        marginTop:"5px"
      },
    wid:{
        height:"10px",
        marginTop:"5px"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    fsize:{
        fontSize:'1rem'
    },
    hidden:{
        display:'none'
    },
    gridList: {
        width: 450,
        height: 450,
    },
    icon_color: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
    fweight:{
        fontSize:'16px',
        fontWeight:'bold'
    }
}));

const data=[
    {
        id:1,
        title:'Brown Cat',
        subheader:'September 14, 2016',
        src:"cat.jpg",
        body:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like'
    },
    {
        id:2,
        title:'Black Cat',
        subheader:'September 14, 2016',
        src:"slide_3.jpg",
        body:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like'
    },
    {
        id:3,
        title:'Black Eye Cat',
        subheader:'September 14, 2016',
        src:"slide_11.jpg",
        body:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like'
    },
    {
        id:4,
        title:'Playing Cat',
        subheader:'September 14, 2016',
        src:"slide_4.jpg",
        body:'This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like'
    }
];
function getSteps() {
    return ['Select room name', 'Add People', 'Create a room'];
}
function getStepContent(step) {
    switch (step) {
      case 0:
        return `For each ad campaign that you create, you can control how much
                you're willing to spend on clicks and conversions, which networks
                and geographical locations you want your ads to show on, and more.`;
      case 1:
        return 'An ad group contains one or more ads which target a shared set of keywords.';
      case 2:
        return `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`;
      default:
        return 'Unknown step';
    }
  }
function FBdesign(){
    const classes = useStyles();
    const [show,setshow] = useState({live:true,photo:false,room:false});
    const [activeStep, setActiveStep] = useState(0);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const steps = getSteps();
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleReset = () => {
        setActiveStep(0);
      };
    const changeTAb = (event) =>{
        setshow({[event.currentTarget.name]:true})
    } 
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    return(
        <div>
            <Content index='2'/>
            <Grid container justify='center' className={classes.top} >
                <Grid item xs={12} sm={4}>
                    <Grid container>
                    <Grid item xs={3} sm={2}><Avatar alt="Remy Sharp" src={require(`../img/cat.jpg`)}></Avatar></Grid>
                    <Grid item xs={9} sm={10}>
                    <FormControl className={classes.formWidth}>
                        <Input
                          id="input-with-icon-adornment"
                          disableUnderline
                          multiline
                          placeholder='Type Message'
                        />
                        </FormControl>
                    </Grid>
                    </Grid>
                    <br></br>
                    <Divider />
                    <ButtonGroup variant="text"  aria-label="text primary button group" fullWidth className={classes.icon}>
                        <Button name='live' startIcon={<LiveTvIcon />} onClick={changeTAb}>Live</Button>
                        <Button name='photo' startIcon={<PhotoIcon />} onClick={changeTAb}>Photo</Button>
                        <Button name='room' startIcon={<VideoCallIcon />} onClick={changeTAb}>Room</Button>
                    </ButtonGroup>
                    <br></br>
                    {
                        data.map((data,i)=>(
                            <div key={data.id} className={(!show.live)?'hidden':null}>
                            <Divider className={classes.wid} ></Divider>
                            <Card className={classes.icon} >
                            <CardHeader
                                avatar={
                                <Avatar aria-label="recipe" src={require(`../img/${data.src}`)}>
                                </Avatar>
                                }
                                action={
                                <div>
                                <Button aria-describedby="simple-menu" variant='text' onClick={handleMenu}>
                                <MoreVertIcon/> 
                                </Button>
                                    <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    dataValue={data.id}
                                >
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                                </Menu>
                                </div>
                                }
                                title={data.title}
                                subheader={
                                <Typography className={classes.fsize}>{data.subheader} <LanguageIcon className={classes.fsize} color='primary'></LanguageIcon></Typography>
                                        
                                }
                            />
                            <CardMedia
                                className={classes.media}
                                image={require(`../img/${data.src}`)}
                                title="Kitten"
                            />
                            <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {data.body}
                            </Typography>
                            </CardContent>
                            <CardActions disableSpacing>
                            <Checkbox icon={<FavoriteIcon />} checkedIcon={<FavoriteIcon color='red' />} name="checkedH" />
                                <IconButton>
                                <MessageIcon />
                                </IconButton>
                                <IconButton aria-label="share">
                                <ShareIcon />
                                </IconButton>
                            </CardActions>
                            </Card>
                    </div>
                        ))
                    }
                    <div className={(!show.photo)?'hidden':null}>
                    <Divider className={classes.wid} ></Divider>
                    <Slide direction="up" in={show.photo} mountOnEnter unmountOnExit>
                    <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Gallery</ListSubheader>
                    </GridListTile>
                    {data.map((tile) => (
                    <GridListTile key={tile.id}>
                        <img src={require(`../img/${tile.src}`)} alt={tile.title} />
                        <GridListTileBar
                        title={tile.title}
                        subtitle={<span>{tile.subheader}</span>}
                        actionIcon={
                            <IconButton aria-label={`info about ${tile.title}`} className={classes.icon_color}>
                            <InfoIcon />
                            </IconButton>
                        }
                        />
                    </GridListTile>
                    ))}
                    </GridList>
                    </Slide>
                    </div>
                    <div className={(!show.room)?'hidden':null}>
                    <Divider className={classes.wid} ></Divider>
                    <Slide direction="up" in={show.room} mountOnEnter unmountOnExit>
                    <Stepper activeStep={activeStep} orientation="vertical">
                            {steps.map((label, index) => (
                            <Step key={label}>
                                <StepLabel><Typography variant='h6'>{label}</Typography></StepLabel>
                                <StepContent>
                                <Typography>{getStepContent(index)}</Typography>
                                <div className={classes.actionsContainer}>
                                    <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                    </Button>
                                    </div>
                                </div>
                                </StepContent>
                            </Step>
                            ))}
                        </Stepper>
                        </Slide>
                        {activeStep === steps.length && (
                            <Paper square elevation={0} className={classes.resetContainer}>
                            <Typography>All steps completed - you&apos;re room created successfully</Typography>
                            <Button onClick={handleReset} className={classes.button}>
                                Reset
                            </Button>
                            </Paper>
                        )}
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
export default FBdesign;