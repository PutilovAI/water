import React, {Component} from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

import * as AppActions from '../actions/AppActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class PageAdd extends Component {

    render() {

        return (

            <section className="section">
                <div className="container">
                    <Breadcrumbs />
                    <h1 className="section__title section__title_main">
                        Добавление нового источника
                    </h1>

                    <h4 className="">
                        Текст
                    </h4>



                </div>
            </section>
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

export default connect(mapStateToProps, mapDispatchToProps)(PageAdd)
