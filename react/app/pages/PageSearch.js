import React, {Component} from 'react';
import Header from '../components/Header/Header'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Footer from '../components/Footer/Footer'
import SearchResults from '../components/SearchResults/SearchResults'
import SearchFilter from '../components/SearchFilter/SearchFilter'
import OffersFilter from '../components/OffersFilter/OffersFilter';

import * as SearchActions from '../actions/SearchActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class PageSearch extends Component {
    componentWillMount(){
        var filter = this.props.searchFilter;
        this.props.actions.fetchSearchResults(filter)
    }
    render() {

        return (

            <section className="section">

                <div className="container">
                    <Breadcrumbs />
                    <h1 className="section__title section__title_main">
                        Источники в Свердловской области
                    </h1>

                    <h4 className="search__results-count">
                        Найдены {this.props.searchResults.length} источника
                    </h4>


                    <div className="search__content">
                        <main className="search__content-main">

                            <div className="offers-toolbar">
                                <div className="offers-toolbar__filters">
                                    <OffersFilter value={this.props.offersFilter.value} selectOnChange={this.props.actions.offersFiltering} sortOnChange={this.props.actions.offersSorting} order={this.props.offersFilter.order}/>

                                </div>
                                <div className="offers-toolbar__switches">
                                    <div className="offers-toolbar__switch offers-toolbar__switch_list active">
                                        Списком
                                    </div>
                                    <div className="offers-toolbar__switch offers-toolbar__switch_map">
                                        На карте
                                    </div>
                                </div>

                            </div>


                            <SearchResults searchFilter={this.props.searchFilter} items={this.props.searchResults} offersFilter={this.props.offersFilter}/>

                        </main>
                        <aside className="search__content-aside">
                            <div className="search__content-aside-inner">
                                <SearchFilter filter={this.props.searchFilter} onChange={::this.props.actions.searchFiltering}/>
                            </div>

                        </aside>

                    </div>
                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
  return {
    offersFilter: state.search.offersFilter,
    searchFilter: state.search.searchFilter,
    searchResults: state.search.searchResults
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...SearchActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSearch)
