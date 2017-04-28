import React, { Component, PropTypes } from 'react';
import OfferCard from '../OfferCard/OfferCard'
import { NavLink } from 'react-router-dom'

export default class SearchResults extends Component {
    getResults(){
        var searchResults = this.props.items;

        var results = searchResults.map( (item, index) => {
            return (
                <div className="search-results__list-item" key={index}>
                    <NavLink to={`/source/${item.id}`} className="search-results__list-item-link">
                        <OfferCard  {...item} />
                    </NavLink>

                </div>
            )

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
