import React, { Component, PropTypes } from 'react';
import OfferCard from '../OfferCard/OfferCard'
import { NavLink } from 'react-router-dom'

export default class SearchResults extends Component {
    getResults(){
        var searchFilter = this.props.searchFilter,
            searchResults = this.props.items,
            sortType = this.props.offersFilter.value,
            sortOrder = this.props.offersFilter.order,
            allTypesOff = true,
            cbxTypes = searchFilter.checkboxes.type;


        for (var key in cbxTypes){
            if ( cbxTypes[key] ){
                allTypesOff = false;
            }
        }

        var results = searchResults.sort( (a, b) => {
            if (sortOrder == 'decrement')
                return parseFloat(b[sortType]) - parseFloat(a[sortType])
            else
                return parseFloat(a[sortType]) - parseFloat(b[sortType])

        } )


        results = results.map( (item, index) => {
            var isValidItem = true;

            if (!allTypesOff){
                for (let key in cbxTypes){
                    if ( !cbxTypes[key] && item.type == key ){
                        isValidItem = false
                    }
                }
            }

            if (isValidItem && searchFilter.checkboxes.analiz && !item.analiz){
                isValidItem = false
            }

            if (isValidItem){
                for (let key in searchFilter.ranges){
                    let range = searchFilter.ranges[key],
                        min   = range.value[0],
                        max   = range.value[1],
                        value = item[key] !== undefined ? parseFloat(item[key]) : null;

                    if ( value !== null  ){
                        if ( item[key] <= min || item[key] >= max ){
                            isValidItem = false
                        }
                    }
                }

            }


            if (isValidItem){
                return (
                    <div className="search-results__list-item" key={index}>
                        <NavLink to={`/source/${item.id}`} className="search-results__list-item-link">
                            <OfferCard  {...item} />
                        </NavLink>

                    </div>
                )
            }

        } )

        return (
            <div className="search-results__list">
                {results}
            </div>
        );

    }
    render() {

        return (
            <div className="search-results">
                { this.getResults() }
            </div>
        );
    }
}
