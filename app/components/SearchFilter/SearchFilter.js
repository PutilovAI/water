import React, { Component } from 'react';
import { Checkbox } from '../Input/Input';
import Slider from 'react-slider';


export default class SerchFilter extends Component {
    handlerChangeCheckbox(e){
        //e.preventDefault();

        var oldFilter = this.props.filter;

        var newFilter = Object.assign({}, oldFilter, {[e.target.dataset.type]: e.target.checked});

        this.props.onChange.call(this, newFilter);
    }
    handlerClickReset(e){
        e.preventDefault();
        var oldFilter = this.props.filter;
        var newFilter = {};

        for (var key in oldFilter){
            newFilter[key] = false
        }

        this.props.onChange.call(this, newFilter);
    }

    render() {
        return (
            <div className="search-filter">
                <div className="search-filter__section">
                    <div className="search-filter__fieldset">
                        <div className="search-filter__fieldset-label">
                            Тип источника:
                        </div>
                        <div className="search-filter__field">

                            <Checkbox label='Родник' modifier="search-filter__checkbox" checked={this.props.filter.rodnik} onChange={::this.handlerChangeCheckbox} attr={{'data-type': 'rodnik'}} />

                            <Checkbox label='Колонка' modifier="search-filter__checkbox" checked={this.props.filter.kolonka} onChange={::this.handlerChangeCheckbox} attr={{'data-type': 'kolonka'}} />

                        </div>
                    </div>
                    <div className="search-filter__fieldset">
                        <div className="search-filter__fieldset-label">
                            Рейтинг, балл:
                        </div>
                        <div className="search-filter__field">

                        </div>
                    </div>
                    <div className="search-filter__fieldset">
                        <div className="search-filter__fieldset-label">
                            Расстояние от меня, км:
                        </div>
                        <div className="search-filter__field">

                        </div>
                    </div>
                    <div className="search-filter__fieldset">
                        <div className="search-filter__fieldset-label">
                            Напор воды, л/мин:
                        </div>
                        <div className="search-filter__field">

                        </div>
                    </div>
                    <div className="search-filter__fieldset">
                        <div className="search-filter__fieldset-label">
                            Ожидание, мин:
                        </div>
                        <div className="search-filter__field">
                            <Slider defaultValue={[0, 100]} withBars />
                        </div>
                    </div>
                    <div className="search-filter__fieldset">

                        <div className="search-filter__field">
                            <Checkbox label='Анализ воды' modifier="search-filter__checkbox" checked={this.props.filter.analiz} onChange={::this.handlerChangeCheckbox} attr={{'data-type': 'analiz'}} />
                        </div>
                    </div>

                    <div className="search-filter__fieldset">
                        <div className="search-filter__buttons">
                            <div className="search-filter__reset" onClick={::this.handlerClickReset}>
                                <span className="search-filter__reset-text">
                                    Сбросить
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
