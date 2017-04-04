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
            oldFilter = this.props.filter,
            newFilter = {...oldFilter},
            direction = e.target.dataset.direction,
            newValue = oldFilter.ranges[type];


        if (direction == 'from'){
            newValue[0] = parseInt(e.target.value)
        } else {
            newValue[1] = parseInt(e.target.value)
        }

        newFilter.ranges[type] = newValue;

        this.props.onChange.call(this, newFilter);
    }
    render(){
        var self = this,
            type = self.props.type,
            valueFrom = this.props.filter.ranges[type][0],
            valueTo   = this.props.filter.ranges[type][1];
        return (
            <div className="search-filter__slider">
                <Slider  max={200} min={0} value={[valueFrom, valueTo]} withBars onChange={::this.onChangeSlider} />

                <div className="search-filter__slider-inputs">
                    <InputRange value={valueFrom} label="от" onChange={::this.onChangeInput} attr={{'data-direction': 'from'}}/>
                    <InputRange value={valueTo} label="до" onChange={::this.onChangeInput} attr={{'data-direction': 'to'}}/>
                </div>
            </div>
        )
    }
}

export default class SerchFilter extends Component {
    handlerChangeCheckbox(e){

        var oldFilter = this.props.filter,
            cxbGroup = e.target.dataset.group,
            cxbName = e.target.dataset.name,
            newFilter = null;

        if (cxbGroup){
            newFilter = Object.assign({}, oldFilter,
                {
                    checkboxes: Object.assign({}, oldFilter.checkboxes, {
                        [cxbGroup]: Object.assign({}, oldFilter.checkboxes[cxbGroup], {
                            [cxbName]: e.target.checked
                        })
                    })
                } );

        } else {
            newFilter = Object.assign({}, oldFilter,
                {
                    checkboxes: Object.assign({}, oldFilter.checkboxes, {
                        [cxbName]: e.target.checked
                    })
                } );
        }

        this.props.onChange.call(this, newFilter);
    }
    handlerClickReset(e){
        e.preventDefault();
        var oldFilter = this.props.filter;
        var newFilter = {...oldFilter};

        for (var key in oldFilter.checkboxes){
            var group = oldFilter.checkboxes[key];

            if (typeof group === 'boolean'){

                newFilter.checkboxes[key] = false

            } else if ( typeof group == 'object'){
                console.log( key)
                newFilter.checkboxes[key] = {};

                for (let innerkey in group){
                    newFilter.checkboxes[key][innerkey] = false
                }
            }
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

                            <Checkbox label='Родник' modifier="search-filter__checkbox" checked={this.props.filter.checkboxes.type.rodnik} onChange={::this.handlerChangeCheckbox} attr={{'data-group': 'type', 'data-name': 'rodnik' }} />

                            <Checkbox label='Колонка' modifier="search-filter__checkbox" checked={this.props.filter.checkboxes.type.kolonka} onChange={::this.handlerChangeCheckbox} attr={{'data-group': 'type', 'data-name': 'kolonka'}} />

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
                            Рейтинг, балл:
                        </div>
                        <div className="search-filter__field">
                            <SearchRange type="rating" filter={this.props.filter} onChange={::this.props.onChange}/>
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
                            <SearchRange type="pressure" filter={this.props.filter} onChange={::this.props.onChange}/>
                        </div>
                    </div>
                    <div className="search-filter__fieldset">
                        <div className="search-filter__fieldset-label">
                            Ожидание, мин:
                        </div>
                        <div className="search-filter__field">
                            <SearchRange type="waiting" filter={this.props.filter} onChange={::this.props.onChange}/>
                        </div>

                    </div>
                    <div className="search-filter__fieldset">

                        <div className="search-filter__field">
                            <Checkbox label='Анализ воды' modifier="search-filter__checkbox" checked={this.props.filter.checkboxes.analiz} onChange={::this.handlerChangeCheckbox} attr={{'data-name': 'analiz'}} />
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
