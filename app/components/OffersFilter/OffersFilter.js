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

                    <Select ref="stateSelect" options={options} simpleValue clearable={false} name="selected-state" value={this.props.value} onChange={this.props.onChange} searchable={false} />

                </div>
                <div className="offers-filter__sort">
                    <div className="offers-filter-sort">

                    </div>
                </div>

            </div>
        );
    }
}
