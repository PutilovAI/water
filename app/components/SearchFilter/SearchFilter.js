import React, { Component } from 'react';
import { Checkbox } from '../Input/Input';
import { InputRange } from '../Input/Input';
import Slider from 'react-slider';

class SearchRange extends Component{
    onChangeSlider(valuesArray){

        var type = this.props.type,
            oldFilter = this.props.filter;

        var newFilter = Object.assign({}, oldFilter,
            {
                ranges: Object.assign({}, oldFilter.ranges, {
                    [type]: valuesArray
                })

            } );

        this.props.onChange.call(this, newFilter);
    }
    onChangeInput(e){

        var type = this.props.type,
            oldFilter = this.props.filter;

        var newFilter = Object.assign({}, oldFilter,
            {
                ranges: Object.assign({}, oldFilter.ranges, {
                    [type]: e
                })

            } );

        this.props.onChange.call(this, newFilter);
    }
    render(){
        return (
            <div className="search-filter__slider">
                <Slider defaultValue={[10, 100]} max={200} min={0} withBars onChange={::this.onChangeSlider} />

                <div className="search-filter__slider-inputs">
                    <InputRange value="10" label="от" onChange={::this.onChangeInput} attr={{'data-type': 'from'}}/>
                    <InputRange value="99" label="до" onChange={::this.onChangeInput} attr={{'data-type': 'to'}}/>
                </div>
            </div>
        )
    }
}

export default class SerchFilter extends Component {
    handlerChangeCheckbox(e){

        var oldFilter = this.props.filter;

        var newFilter = Object.assign({}, oldFilter,
            {
                checkboxes: Object.assign({}, oldFilter.checkboxes, {
                    [e.target.dataset.type]: e.target.checked
                })

            } );

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

                            <Checkbox label='Родник' modifier="search-filter__checkbox" checked={this.props.filter.checkboxes.rodnik} onChange={::this.handlerChangeCheckbox} attr={{'data-type': 'rodnik'}} />

                            <Checkbox label='Колонка' modifier="search-filter__checkbox" checked={this.props.filter.checkboxes.kolonka} onChange={::this.handlerChangeCheckbox} attr={{'data-type': 'kolonka'}} />

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
                            <SearchRange type="distance" filter={this.props.filter} onChange={::this.props.onChange}/>
                        </div>
                    </div>
                    <div className="search-filter__fieldset">
                        <div className="search-filter__fieldset-label">
                            Напор воды, л/мин:
                        </div>
                        <div className="search-filter__field">
                            <SearchRange type="presure" filter={this.props.filter} onChange={::this.props.onChange}/>
                        </div>
                    </div>
                    <div className="search-filter__fieldset">
                        <div className="search-filter__fieldset-label">
                            Ожидание, мин:
                        </div>
                        <div className="search-filter__field">

                        </div>

                    </div>
                    <div className="search-filter__fieldset">

                        <div className="search-filter__field">
                            <Checkbox label='Анализ воды' modifier="search-filter__checkbox" checked={this.props.filter.checkboxes.analiz} onChange={::this.handlerChangeCheckbox} attr={{'data-type': 'analiz'}} />
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
