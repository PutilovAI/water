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
                        <div className="header__list">
                            <div className="header__list-item">

                                <a href="#" className="header__list-item-link">
                                    Раздел сайта 2
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
