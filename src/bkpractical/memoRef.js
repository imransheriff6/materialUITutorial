import { render } from '@testing-library/react';
import React,{useState} from 'react'
import ReactDOM from 'react-dom';
import Content from './tutorails_1';

class MemoRef extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            products:[]
        }
    }
    render() {
        return(
            <div>
                <Content index='4' />
                <h1>class comp</h1>
            </div>
            
        )
    }
}

export default MemoRef;
