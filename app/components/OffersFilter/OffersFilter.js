import React, { Component } from 'react';
import Select from 'react-select';

export default class OffersFilter extends Component {

    render() {
        var options = [
        	{ value: 'one', label: 'По расстоянию' },
        	{ value: 'two', label: 'По напору' },
        	{ value: 'three', label: 'По рейтингу' }
        ];

        function logChange(val) {
        	console.dir(val);
        }
        return (
            <div className="offers-filter">
                <div className="offers-filter__select">

                    <Select ref="stateSelect" options={options} simpleValue clearable={this.state.clearable} name="selected-state" disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue} searchable={this.state.searchable} />

                </div>
                <div className="offers-filter__sort">
                    <div className="offers-filter-sort">

                    </div>
                </div>

            </div>
        );
    }
}
