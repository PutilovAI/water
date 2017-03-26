import React, {Component} from 'react';
import Header from '../Header/Header'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'
import Footer from '../Footer/Footer'
import SearchResults from '../SearchResults/SearchResults'
import SearchFilter from '../SearchFilter/SearchFilter'
import OffersToolbar from '../OffersToolbar/OffersToolbar'

import * as AppActions from '../../actions/SearchActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class App extends Component {

    render() {

        return (

            <div className="wrapper__page">

                <div className='wrapper__page-top'>
                    <Header />
                    <div className="wrapper__content">
                        <section className="section">
                            <div className="container">
                                <Breadcrumbs />
                                <h1 className="section__title section__title_main">
                                    Источники в Свердловской области
                                </h1>

                                <div className="search__content">
                                    <main className="search__content-main">
                                        <OffersToolbar offersFilter={this.props.offersFilter}/>
                                        <SearchResults filter={this.props.filter} items={this.props.searchResults}/>

                                    </main>
                                    <aside className="search__content-aside">
                                        <SearchFilter filter={this.props.filter} change={this.props.actions.filtering}/>
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
    filter: state.app.filter,
    searchResults: state.app.searchResults
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...AppActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
