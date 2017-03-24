import React, { Component, PropTypes } from 'react';

class ResultItem extends Component{
    render() {
        return (
            <div className="search-results__list-item">
                <div className="search-results__list-item-title">
                    {this.props.title}
                </div>
                <div className="search-results__list-item-type">
                    {this.props.type}
                </div>
            </div>
        );
    }
}

export default class SearchResults extends Component {

    render() {
        var searchResults = this.props.items
        return (
            <div className="search-results">
                <div className="search-results__list">
                    {
                        searchResults.map( (item, index) => {

                            if (this.props.filter[item.type]){
                                return <ResultItem key={index} title={item.title} type={item.type}/>
                            }

                        } )
                    }

                </div>
            </div>
        );
    }
}
