import React, { Component, PropTypes } from 'react';

export class Checkbox extends Component{

    handlerOnChange(e){
        this.props.onChange.call(this, e);
    }

    render () {
        return (
            <div className={'input input_checkbox' + (this.props.checked ? ' checked' : '') + ' '+this.props.modifier} >
                <label className='input__label'>
                    <input type='checkbox' className='input__checkbox' onChange={::this.handlerOnChange}  checked={this.props.checked} {...this.props.attr}></input>
                    <div className='input__label-text'>{this.props.label}</div>
                </label>
            </div>
        )
    }
}
export class InputRange extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputState : ''
        }
    }

    handlerOnChange(e){
        this.props.onChange.call(this, e);
    }

    onFocus(){
        this.setState({
            inputState: ' focus'
        })
    }
    onBlur(){
        this.setState({
            inputState: ''
        })
    }

    render () {
        return (
            <div className={'input input_range' + (this.props.modifier ? (' '+this.props.modifier) : '') + (this.state.inputState)} >

                <label className='input__label'>

                    <input type='number' className='input__field' onChange={::this.handlerOnChange} onFocus={::this.onFocus} onBlur={::this.onBlur} value={this.props.value} {...this.props.attr}></input>

                    <div className='input__label-text'>{this.props.label}</div>

                </label>
            </div>
        )
    }
}
