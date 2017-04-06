import React, {Component} from 'react';
import Header from '../components/Header/Header'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Footer from '../components/Footer/Footer'

import * as AppActions from '../actions/AppActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class PageMain extends Component {

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
                                    Главная
                                </h1>

                                <h4 className="">
                                    Текст
                                </h4>



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

export default connect(mapStateToProps, mapDispatchToProps)(PageMain)
