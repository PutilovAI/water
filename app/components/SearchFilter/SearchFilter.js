import React, { Component } from 'react';
import { Checkbox } from '../Input/Input';

export default class SerchFilter extends Component {
    handleChangeCheckbox(e){

        var oldFilter = this.props.filter;
        var newFilter = Object.assign({}, oldFilter, {[e.target.dataset.type]: e.target.checked});

        this.props.change(newFilter);
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
                            <Checkbox label='new checkbox'/>
                            {/* <div className="input">
                                <input type="checkbox" data-type="rodnik" defaultChecked={this.props.filter.rodnik} onChange={this.handleChangeCheckbox.bind(this)}></input>
                                <label className="h-mr_15">
                                    Родник
                                </label>
                            </div> */}
                        </div>
                    </div>
                </div>
                <label className="h-mr_15">
                    <input type="checkbox" data-type="rodnik" defaultChecked={this.props.filter.rodnik} onChange={this.handleChangeCheckbox.bind(this)}></input>
                    Родник
                </label>
                <label>
                    <input type="checkbox" data-type="kolonka" defaultChecked={this.props.filter.kolonka} onChange={this.handleChangeCheckbox.bind(this)}></input>
                    Колонка
                </label>
            </div>
        );
    }
}
