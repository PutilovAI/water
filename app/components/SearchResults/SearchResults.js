import React, { Component, PropTypes } from 'react';
import OfferCard from '../OfferCard/OfferCard'

export default class SearchResults extends Component {
    getResults(){
        var searchFilter = this.props.searchFilter,
            searchResults = this.props.items,
            sortType = this.props.offersFilter.value,
            sortOrder = this.props.offersFilter.order,
            allTypes = true;

        var results = searchResults.sort( (a, b) => {
            if (sortOrder == 'decrement')
                return parseFloat(b[sortType]) - parseFloat(a[sortType])
            else
                return  parseFloat(a[sortType]) - parseFloat(b[sortType])

        } )

        for (var key in searchFilter){
            if ( searchFilter[key] == true ){
                allTypes = false
            }
        }


        results = results.map( (item, index) => {

            if (allTypes || searchFilter[item.type]){
                return (
                    <div className="search-results__list-item" key={index}>
                        <OfferCard  {...item} />
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
