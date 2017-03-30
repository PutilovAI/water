import React, { Component, PropTypes } from 'react';
import OfferCard from '../OfferCard/OfferCard'

export default class SearchResults extends Component {
    getResults(){
        var searchResults = this.props.items;
        var sortType = this.props.offersFilter.value;

        var results = searchResults.sort( (a, b) => {
            return parseFloat(a[sortType]) - parseFloat(b[sortType])
        } )

        results = results.map( (item, index) => {

            if (this.props.searchFilter[item.type]){
                return (

                    <div className="search-results__list-item " key={index}>
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
