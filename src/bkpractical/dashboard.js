import React,{ useEffect, useState} from 'react';
import { makeStyles,styled,withStyles  } from '@material-ui/core/styles';
import {Button,Grid,Dialog,DialogActions,DialogContent,Popover,DialogContentText,Slide,DialogTitle,FormHelperText,InputLabel,Typography,IconButton,FormControl,Menu,MenuItem,TextField,Select,Slider,Switch} from '@material-ui/core';
import Content from './tutorails_1' ;
import MoreVertIcon from '@material-ui/icons/MoreVert';
const useStyles = makeStyles((theme) => ({
    formmargin:{
        marginTop:"20px"
    },
    formControl:{
        width:"225px"
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
      },
    image:{
        width:'300px',
        height:'300px',
        marginTop:'20px'
    },
    hide:{
        display:'none'
    },
    top:{
        marginTop:theme.spacing(10),
    },
}));
var match = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
function Dashboard(){
    const classes = useStyles();
    const [value,setvalue] = useState({name:'',email:'',sex:''});
    const [error,seterror]= useState({name:'',email:'',sex:''});
    const [zoom,setzoom] = useState(1);
    const [anchorElMenu, setAnchorElMenu] = useState(null);
    const openMenu = Boolean(anchorElMenu);
    const [showimg,setshowimg]=useState(true);
    const [open,setopen] = useState(false);
    let showImage = React.createRef();
    const handleChange =(event)=>{
    seterror({ ...error, [event.target.name]: '' });
    setvalue({ ...value, [event.target.name]: event.target.value });
      console.info(value)
    }
    const handleMenu = (event) => {
        setAnchorElMenu(event.currentTarget);
      };
    
      const handleCloseMenu = () => {
        setAnchorElMenu(null);
      };
    const submitForm =(e)=>{
        e.preventDefault();
        if(value.name.length<5){
            seterror({...error,name:"Too Short"})
        }
        else if(!match.test(value.email)){
            seterror({name:error.name,email:'Invalid Email',sex:error.sex})
        }
        else if(value.sex==''){
            seterror({name:error.name,email:error.email,sex:"Required"})
        }
        else{
            seterror({name:'',email:'',sex:''})
        }
        console.log(error)
        console.log(value)
    }
    function valuetext(value) {
        return value;
    }
    function changeRatio(e,val){
        //console.log(val) 
        setzoom(val/100);
    }
    const toggleImage = (event) =>{
        setshowimg(event.currentTarget.checked)
    }
    function handleClose(){
        setopen(false);
    }
    const  Fancydivdecore = (props) =>{
        return(
            <div className={props.name}>{props.children}</div>
        )
    }
    return(
        <div>
            <Content index='0'/>
            <Grid container className={classes.top} justify='center'>
            <Grid item xs={12} sm={4}>
                <img src={require('../img/cat.jpg')} alt="image" className={classes.image} style={{transform:"scale("+zoom+")"}}></img>
                <Typography id="discrete-slider" gutterBottom>
                    Zoom Image
                </Typography>
                <Slider
                    defaultValue={100}
                    getAriaValueText={valuetext}
                    aria-labelledby="discrete-slider"
                    valueLabelDisplay="auto"
                    step={10}
                    marks
                    min={10}
                    max={100}
                    style={{width:"300px"}}
                    onChange={(e,val) => changeRatio(e,val)}
                />
            </Grid>  
            <Grid item xs={12} sm={4}>
            {showimg && <img src={require('../img/cat.jpg')} alt="image" className={classes.image}></img>}
            <Typography id="discrete-slider" gutterBottom>
                    Toggle Image
            </Typography>
            <Switch
                checked={showimg}
                onChange={toggleImage}
                name="checkedA"
            />
            </Grid> 
            <Grid item xs={12} sm={4}>
            <form className={classes.formmargin} onSubmit={submitForm}>
            <TextField 
            error={(!error.name)?false:true}
            id="outlined-basic"
            name='name' 
            label="User Name" 
            variant="outlined"
            defaultValue={value.name}
            helperText={error.name}
            onChange={handleChange} 
            required
            />
            <br></br>
            <br></br>
            <TextField 
            error={(!error.email)?false:true}
            id="outlined-basic"
            name='email' 
            label="Email" 
            variant="outlined"
            defaultValue={value.email}
            helperText={error.email}
            onChange={handleChange}  
            />
            <br></br>
            <br></br>
            <FormControl variant="outlined" error={(!error.sex)?false:true} className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                <Select
                labelId="demo-simple-select-error-label"
                id="demo-simple-select-error"
                name='sex'
                value={value.sex}
                label="Gender"
                onChange={handleChange}
                >
                <MenuItem value='Male'>Male</MenuItem>
                <MenuItem value='Female'>Female</MenuItem>
                <MenuItem value='Other'>Other</MenuItem>
                </Select>
                <FormHelperText>{error.sex && error.sex}</FormHelperText>
            </FormControl>
            <br></br>
            <br></br>
            <Button variant="contained" color="primary" type='submit'>
            Submit
            </Button>
            </form>
            </Grid>
            <Grid container justify='center'>
            <Grid item xs={6} sm={6}>
            <Fancydivdecore name='some'>
                <div>
                    <h1>Hello</h1>
                </div>
            </Fancydivdecore>
            <Button  variant="contained" color="primary" onClick={()=>setopen(true)}>
                Open alert dialog
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
                disableBackdropClick
                fullScreen
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Disagree
                </Button>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
            <IconButton aria-label="settings" aria-controls='simple-popover' aria-haspopup="true" onClick={handleMenu}>
                                    <MoreVertIcon />
                                    <Popover
                                    id='simple-popover'
                                    open={openMenu}
                                    anchorEl={anchorElMenu}
                                    onClose={() =>setAnchorElMenu(null)}
                                    anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'center',
                                    }}
                                >
                                    <Typography className={classes.typography}>The content of the Popover.</Typography>
                                </Popover>
                                </IconButton>
            </Grid>
            </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;