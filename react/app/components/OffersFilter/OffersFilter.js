import React, { Component } from 'react';
let dcopy =  require('deep-copy')

import Select from 'react-select';

export default class OffersFilter extends Component {
    selectOnChange(value){
        let filter = dcopy(this.props.filter);
        filter.offersFilter.value = value;
        this.props.selectOnChange(filter);
    }
    sortOnChange(e){
        let filter = dcopy(this.props.filter);
        filter.offersFilter.order = (filter.offersFilter.order == 'increment') ? 'decrement' : 'increment';

        this.props.sortOnChange(filter);
    }

    render() {
        var options = [
        	{ value: 'distance', label: 'По расстоянию' },
        	{ value: 'pressure', label: 'По напору' },
        	{ value: 'rating', label: 'По рейтингу' }
        ];


        return (
            <div className="offers-filter">
                <div className="offers-filter__select">

                    <Select ref="stateSelect" options={options} simpleValue clearable={false} name="selected-state" value={this.props.value} onChange={::this.selectOnChange} searchable={false} />

                </div>
                <div className="offers-filter__sort">
                    <div className={this.props.order == 'decrement' ? "offers-filter-sort decrement" : "offers-filter-sort"} onClick={::this.sortOnChange}>

                    </div>
                </div>

            </div>
        );
    }
}
