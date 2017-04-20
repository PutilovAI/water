import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'


export default class Logo extends Component{
    render(){
        return(
            <NavLink to='/' className="logo"/>
        )
    }
}
