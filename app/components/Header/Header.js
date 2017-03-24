import React, { Component } from 'react';

export default class Header extends Component {

    render() {
        return (
            <header className="header">
                <div className="header__container">
                    <div className="header__col">
                        наша компания
                    </div>
                    <div className="header__col">
                        <div className="header__list">
                            <div className="header__list-item">
                                <a href="#" className="header__list-item-link">
                                    Раздел сайта 1
                                </a>
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
