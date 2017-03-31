import React, { Component, PropTypes } from 'react';

export class Checkbox extends Component{

    constructor(props){
        super(props)
        this.state = {
            checked : this.props.checked || false,
            disabled: this.props.disabled || false
        }
    }

    handlerOnChange(e){
        this.setState({
            checked: e.target.checked
        })
        //this.props.onChange(е);
    }

    render () {
        return (
            <div className={'input input_checkbox' + (this.state.checked ? ' checked' : '')}>
                <label className='input__label'>
                    <input type='checkbox' onChange={::this.handlerOnChange}></input>
                    <div className='input__label-text'>{this.props.label}</div>
                </label>
            </div>
        )
    }
}
