import React, { Component } from 'react';
let dcopy =  require('deep-copy')

import { Checkbox } from '../Input/Input';
import { InputRange } from '../Input/Input';
import Slider from 'react-slider';

class SearchRange extends Component{
    onChangeSlider(valuesArray){

        var type = this.props.type,
            oldFilter = this.props.filter,
            newFilter = dcopy(oldFilter),
            newValue  = oldFilter.ranges[type].value;

        if (newValue[0] == newValue[1]) {
            newValue[1] += 1
        }

        newValue[0] = Math.max(newValue[0], oldFilter.ranges[type].limit[0]);
        newValue[1] = Math.min(newValue[1], oldFilter.ranges[type].limit[1]);

        newFilter.ranges[type].value = valuesArray;

        this.props.onChange.call(this, newFilter);
    }
    onChangeInput(e){
        var type = this.props.type,
            oldFilter = this.props.filter,
            newFilter = dcopy(oldFilter),
            direction = e.target.dataset.direction,
            newValue  = oldFilter.ranges[type].value,
            targetValue = parseInt(e.target.value);

        if (direction == 'from'){
            newValue[0] = Math.max(targetValue, oldFilter.ranges[type].limit[0]);

        } else {
            newValue[1] = Math.min(targetValue, oldFilter.ranges[type].limit[1])
        }

        newFilter.ranges[type].value = newValue;

        this.props.onChange.call(this, newFilter);
    }
    render(){
        var self = this,
            type = self.props.type,
            valueFrom = this.props.filter.ranges[type].value[0],
            valueTo   = this.props.filter.ranges[type].value[1],
            limitMin  = this.props.filter.ranges[type].limit[0],
            limitMax  = this.props.filter.ranges[type].limit[1];
        return (
            <div className="search-filter__slider">
                <Slider  min={limitMin} max={limitMax} value={[valueFrom, valueTo]} withBars onChange={::this.onChangeSlider} />

                <div className="search-filter__slider-inputs">
                    <InputRange value={valueFrom} label="от" onChange={::this.onChangeInput} attr={{'data-direction': 'from'}}/>
                    <InputRange value={valueTo} label="до" onChange={::this.onChangeInput} attr={{'data-direction': 'to'}}/>
                </div>
            </div>
        )
    }
}

export default class SearchFilter extends Component {
    handlerChangeCheckbox(e){

        var oldFilter = this.props.filter,
            cxbGroup = e.target.dataset.group,
            cxbName = e.target.dataset.name,
            newFilter = dcopy(oldFilter);

        if (cxbGroup)
            newFilter.checkboxes[cxbGroup][cxbName] = e.target.checked
        else
            newFilter.checkboxes[cxbName] = e.target.checked

        this.props.onChange.call(this, newFilter);
    }
    handlerClickReset(e){
        e.preventDefault();
        var oldFilter = this.props.filter;
        var newFilter = dcopy(oldFilter);

        for (let key in newFilter.checkboxes){
            var group = newFilter.checkboxes[key];

            if (typeof group === 'boolean'){
                newFilter.checkboxes[key] = false

            } else if ( typeof group == 'object'){
                newFilter.checkboxes[key] = {};

                for (let innerkey in group){
                    newFilter.checkboxes[key][innerkey] = false
                }
            }
        }

        for (let key in newFilter.ranges){
            let range = newFilter.ranges[key];
            range.value[0] = range.limit[0]
            range.value[1] = range.limit[1]
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
                            <SearchRange limit={[0,10]} type="rating" filter={this.props.filter} onChange={::this.props.onChange}/>
                        </div>
                    </div>
                    <div className="search-filter__fieldset">
                        <div className="search-filter__fieldset-label">
                            Расстояние от меня, км:
                        </div>
                        <div className="search-filter__field">
                            <SearchRange limit={[0,9999]} type="distance" filter={this.props.filter} onChange={::this.props.onChange}/>
                        </div>
                    </div>
                    <div className="search-filter__fieldset">
                        <div className="search-filter__fieldset-label">
                            Напор воды, л/мин:
                        </div>
                        <div className="search-filter__field">
                            <SearchRange limit={[0,30]} type="pressure" filter={this.props.filter} onChange={::this.props.onChange}/>
                        </div>
                    </div>
                    <div className="search-filter__fieldset">
                        <div className="search-filter__fieldset-label">
                            Ожидание, мин:
                        </div>
                        <div className="search-filter__field">
                            <SearchRange limit={[0,60]} type="waiting" filter={this.props.filter} onChange={::this.props.onChange}/>
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
