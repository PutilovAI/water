import React, { Component } from 'react';

export default class Breadcrumbs extends Component {

    render() {
        return (
            <div className="breadcrumbs">
                <div className="breadcrumbs__item">
                    <a href="#" className="breadcrumbs__item-link">
                        Главная
                    </a>
                </div>
                <div className="breadcrumbs__item">
                    <a href="#" className="breadcrumbs__item-link">
                        Источники
                    </a>
                </div>
                <div className="breadcrumbs__item active">
                    <span className="breadcrumbs__item-link">
                        Питьевая вода
                    </span>

                </div>
            </div>
        );
    }
}
