import React from 'react';
import { connect } from "react-redux";
import { addTodo, toggleTodo, activeTodo, fetchuser, deleteTodo } from '../redux/Todo/todoaction'
import { Button, Grid, TextField, List, ListItemText, ListItem, ListItemIcon, ButtonGroup, Fade, Avatar, CircularProgress, TableCell, Chip, Tooltip} from '@material-ui/core';
import { Table,TableBody,TableContainer,TableHead,TablePagination,TableRow} from '@material-ui/core'
import Content from './tutorails_1';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { getVisibleTodos } from '../redux/Todo/TodoFilterReducer';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}))
class reduxTutorials extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            page:0,
            rowsPerPage:100
        }
    }
    componentDidMount() {
        this.props.fetchuser();
        // console.log({'users':this.props.users});
        // this.setState({
        //     data:this.props.users.user
        // })
    }
    addItem = () => {
        this.state.value != '' && this.props.addTodo(this.state.value);
        this.setState({ value: '' });
    }
    toggle = (id) => {
        console.log(id)
        this.props.toggleTodo(id)
    }
    toggleDelete = (id) => {
        this.props.deleteTodo(id)
    }
    handleChangePage = (event, newPage) => {
       this.setState({
           page:newPage
       })
      };
    
    handleChangeRowsPerPage = (event) => {
        this.setState({
            rowsPerPage:+event.target.value,
            page:0
        })
      };
    todoDiv = (todo) =>{
        return (
            <div>
                <Tooltip title={todo.completed?'Completed':'Active'} placement="right-start" arrow>
                    <Chip label={todo.name} variant={todo.completed?'default':'outlined'} color="primary"  onClick={(id) => this.toggle(todo.id)} onDelete={(id) => this.toggleDelete(todo.id)} style={{"margin":"2px"}}></Chip>
                </Tooltip>
            </div>
        )
    }
    render() {
        const { todos, filter, users } = this.props;
        const { data , page , rowsPerPage} = this.state;
        const visibleTodos = getVisibleTodos(
            todos,
            filter,
            users
        );
        return (
            <div>
                <Content index='3' />
                <Grid container justify="center" style={{ 'marginTop': '5%', 'marginLeft': '4%' }}>
                    <Grid container item xs={3}>
                        <TextField
                            id="filled-error-helper-text"
                            label="TODO"
                            required
                            value={this.state.value}
                            onChange={(e) => this.setState({ value: e.target.value })}
                        />
                        <Button color="primary" onClick={this.addItem}>ADD</Button>
                    </Grid>
                </Grid>
                <Grid container justify="center" >
                    <Grid container item xs={1}>
                        <ButtonGroup
                            orientation="vertical"
                            color="primary"
                            aria-label="vertical contained primary button group"
                            variant="text"
                        >
                            <Button onClick={() => this.props.activeTodo('SHOW_ALL')} className={filter == 'SHOW_ALL' ? 'active-bt' : null}>All</Button>
                            <Button onClick={() => this.props.activeTodo('SHOW_ACTIVE')} className={filter == 'SHOW_ACTIVE' ? 'active-bt' : null}>Active</Button>
                            <Button onClick={() => this.props.activeTodo('SHOW_COMPLETED')} className={filter == 'SHOW_COMPLETED' ? 'active-bt' : null}>Completed</Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid container item xs={3}>
                        <List >
                            {
                                visibleTodos && visibleTodos.length
                                    ? visibleTodos.map((todo, ind) => {
                                        //return <ListItem button key={todo.id} className={todo.completed ? 'active' : 'in-active'} onClick={(id) => this.toggle(todo.id)}><ListItemIcon>{todo.completed ? <ThumbUpIcon color="primary" /> : <ThumbUpAltOutlinedIcon color="primary" />}</ListItemIcon><ListItemText primary={todo.name} /></ListItem>
                                        //return <Chip label={todo.name} variant={todo.completed?'default':'outlined'} color="primary"  onClick={(id) => this.toggle(todo.id)} onDelete={(id) => this.toggleDelete(todo.id)} style={{"margin":"2px"}}></Chip>
                                        return this.todoDiv(todo)
                                    })
                                    : "No todos"
                            }
                        </List>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid container item xs={3}>
                        <Fade in={users.loading}>
                            <CircularProgress></CircularProgress>
                        </Fade>
                        <div >
                            {/* {
                                users.user.map((user, e) => {
                                    return <Avatar key={e}>{user.id}</Avatar>
                                })
                            } */}
                            {
                                users.error?(<Button color="secondary" startIcon={<ErrorOutlineIcon color='secondary' />}>{users.error.message}</Button>):(
                                    <div>
                                    <TableContainer>
                            <Table stickyHeader >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            id's
                                        </TableCell>
                                        <TableCell>
                                            Avatar
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                   users.user.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>(
                                        // return(
                                            <TableRow hover>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell><Avatar src={row.thumbnailUrl}></Avatar></TableCell>
                                            </TableRow>
                                        ))
                                    // )
                                }
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[100, 500, 1000]}
                            component="div"
                            count={users.user.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                             </div>   )
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>


        )
    }
}
const mapStatetoProps = state => {
    return {
        todos: state.todoReducer,
        filter: state.visibilityFilter,
        users: state.asyncReducer
    }
}
// const mapDispatchToProps = dispatch => {
//     return {
//         addTodo: addTodo => dispatch(addTodo())
//     }
//   }
export default connect(mapStatetoProps, { addTodo, toggleTodo, activeTodo, fetchuser,deleteTodo })(reduxTutorials)