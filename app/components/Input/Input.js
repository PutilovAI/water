import React, { Component, PropTypes } from 'react';

export class Checkbox extends Component{

    handlerOnChange(e){
        this.props.onChange.call(this, e);
    }

    render () {
        return (
            <div className={'input input_checkbox' + (this.props.checked ? ' checked' : '') + ' '+this.props.modifier} >
                <label className='input__label'>
                    <input type='checkbox' className='input__checkbox' onChange={::this.handlerOnChange} defaultChecked={this.props.checked} {...this.props.attr}></input>
                    <div className='input__label-text'>{this.props.label}</div>
                </label>
            </div>
        )
    }
}
