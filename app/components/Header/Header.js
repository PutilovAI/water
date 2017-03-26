import React, { Component } from 'react';
import Logo from '../Logo/Logo'

export default class Header extends Component {

    render() {
        return (
            <header className="header">
                <div className="header__container">
                    <div className="header__col">
                        <div className="header__item header__item_logo">
                            <Logo />
                        </div>
                        <div className="header__item active">
                            <a href="#" className="header__item-link">
                                <span className="header__item-link-text">
                                    Источники
                                </span>
                            </a>
                        </div>
                        <div className="header__item">
                            <a href="#" className="header__item-link">
                                <span className="header__item-link-text">
                                    Статьи
                                </span>
                            </a>
                        </div>
                        <div className="header__item">
                            <a href="#" className="header__item-link">
                                <span className="header__item-link-text">
                                    Отдых
                                </span>
                            </a>
                        </div>
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
