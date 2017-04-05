import React, {Component} from 'react';
import Header from '../Header/Header'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import Footer from '../Footer/Footer'
import SearchResults from '../SearchResults/SearchResults'
import SearchFilter from '../SearchFilter/SearchFilter'
import OffersFilter from '../OffersFilter/OffersFilter';

import * as AppActions from '../../actions/AppActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class App extends Component {

    render() {

        return (

            <div className="wrapper__page">

                <div className='wrapper__page-top'>
                    <Header />
                    <div className="wrapper__content search">
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

                    </div>

                </div>

                <div className='wrapper__page-bot'>
                    <Footer />
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    offersFilter: state.app.offersFilter,
    searchFilter: state.app.searchFilter,
    searchResults: state.app.searchResults
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...AppActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
