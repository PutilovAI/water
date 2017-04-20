import React, { Component } from 'react';

export default class Footer extends Component {

    render() {
        return (
            <footer className="footer">
                <div className="footer__container">
                    <div className="footer__col">
                        наша компания
                    </div>
                    <div className="footer__col">
                        <div className="footer__list">
                            <div className="footer__list-item">
                                <a href="#" className="footer__list-item-link">
                                    Раздел сайта 1
                                </a>
                                <a href="#" className="footer__list-item-link">
                                    Раздел сайта 2
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
