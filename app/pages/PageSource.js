import React, {Component} from 'react';
import Header from '../components/Header/Header'
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
import Footer from '../components/Footer/Footer'

import * as SourceActions from '../actions/SourceActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

export class PageSource extends Component {

    componentWillMount(){
        var id = this.props.match.params.id
        this.action.fetchItem(id)

    }
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
                                    {this.props.item.title}
                                </h1>

                                <p>{this.props.item.address}</p>


                                <div className="page__row">

                                    <main className="page__col-main">

                                        <div>
                                            <img src={this.props.item.img}></img>
                                        </div>


                                    </main>

                                    <aside className="page__col-aside">
                                        <div className="page__col-aside-inner">

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
    item: state.source.item,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...SourceActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSource)
