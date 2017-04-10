import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'

class NavItem extends Component{

    render(){
        return (
            <div className="header__item">
                <NavLink to={this.props.to} activeClassName="active" className="header__item-link">
                    <span className="header__item-link-text">
                        {this.props.text}
                    </span>
                </NavLink>
            </div>
        )
    }
}

export default class Header extends Component {

    render() {
        return (
            <header className="header">
                <div className="header__container">
                    <div className="header__col">
                        <div className="header__item header__item_logo">
                            <Logo />
                        </div>
                        <NavItem to="/search" text="Источники"/>
                        <NavItem to="/articles" text="Статьи"/>
                        <NavItem to="/recreation" text="Отдых"/>
                    </div>
                    <div className="header__col">
                        <div className="header__item header__item_user-bar">
                            <NavLink to="/add" className="button button_icon button_icon-add">Добавить источник</NavLink>
                        </div>
                        <div className="header__item header__item_user-bar">
                            <NavLink to="/login" className="header__link-user-bar header__link-user-bar_login">Войти</NavLink>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
