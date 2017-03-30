import React, { Component } from 'react';
import Select from 'react-select';

export default class OffersFilter extends Component {

    render() {
        var options = [
        	{ value: 'distance', label: 'По расстоянию' },
        	{ value: 'pressure', label: 'По напору' },
        	{ value: 'rating', label: 'По рейтингу' }
        ];


        return (
            <div className="offers-filter">
                <div className="offers-filter__select">

                    <Select ref="stateSelect" options={options} simpleValue clearable={false} name="selected-state" value={this.props.value} onChange={this.props.selectOnChange} searchable={false} />

                </div>
                <div className="offers-filter__sort">
                    <div className={this.props.order == 'decrement' ? "offers-filter-sort decrement" : "offers-filter-sort"} onClick={this.props.sortOnChange}>

                    </div>
                </div>

            </div>
        );
    }
}
