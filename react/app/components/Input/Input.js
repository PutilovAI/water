import React, { Component, PropTypes } from 'react';

export class Checkbox extends Component{
    constructor(props){
        super(props)
        this.state = {
            checked : props.checked || false
        }
    }

    componentWillReceiveProps(){
        this.setState({
            checked : this.props.checked
        })
    }

    handlerOnChange(e){
        this.setState({
            checked : e.target.checked
        })
        if (this.props.onChange)
            this.props.onChange.call(this, e);
    }

    render () {
        var checked = this.props.checked !== undefined ? this.props.checked : this.state.checked
        return (
            <div className={'input input_checkbox' + (checked ? ' checked' : '') + ' '+this.props.modifier} >
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
export class InputText extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputState : ''
        }
    }

    onChange(e){
        if (this.props.onChange)
            this.props.onChange.apply(this, Array.from(arguments))
    }

    onFocus(e){
        if (this.props.onFocus)
            this.props.onFocus.apply(this, Array.from(arguments))
        this.setState({
            inputState: ' focus'
        })
    }
    onBlur(e){
        if (this.props.onBlur)
            this.props.onBlur.apply(this, Array.from(arguments))
        this.setState({
            inputState: ''
        })
    }

    render () {
        return (
            <div className={'input input_text' + (this.props.modifier ? (' '+this.props.modifier) : '') + (this.state.inputState)} >

                { this.props.label &&
                    <label className='input__label' htmlFor={this.props.id}>
                        <div className='input__label-text'>{this.props.label}</div>
                    </label>
                }

                <input type={this.props.type || 'text'} className='input__field' onChange={::this.onChange} onFocus={::this.onFocus} onBlur={::this.onBlur} value={this.props.value} id={this.props.id} {...this.props.attr}></input>
            </div>
        )
    }
}

export class InputTextarea extends Component{
    constructor(props){
        super(props)
        this.state = {
            inputState : ''
        }
    }

    onChange(e){
        this.props.onChange.call(this, e);
    }

    onFocus(e){
        console.log(arguments)
        //this.props.onFocus.apply(this, arguments)
        this.setState({
            inputState: ' focus'
        })
    }
    onBlur(e){
        //this.props.onBlur.apply(this, arguments)
        this.setState({
            inputState: ''
        })
    }

    render () {
        return (
            <div className={'input input_textarea' + (this.props.modifier ? (' '+this.props.modifier) : '') + (this.state.inputState)} >

                { this.props.label &&
                    <label className='input__label' htmlFor={this.props.id}>
                        <div className='input__label-text'>{this.props.label}</div>
                    </label>
                }

                <textarea className='input__textarea' onChange={::this.onChange} onFocus={::this.onFocus} onBlur={::this.onBlur} value={this.props.value} id={this.props.id} {...this.props.attr}></textarea>
            </div>
        )
    }
}
