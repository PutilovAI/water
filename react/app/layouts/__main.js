import React, {Component} from 'react';
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

import * as AppActions from '../actions/AppActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router'

const __main = ( {component: Component, ...rest} ) => {

    return (
        <Route onUpdate={window.scrollTo(0,0)} {...rest} render={ props => (
            <div className="wrapper__page">

                <div className='wrapper__page-top'>
                    <Header />

                    <div className="wrapper__content">
                        <Component {...props} />
                    </div>

                </div>

                <div className='wrapper__page-bot'>
                    <Footer />
                </div>

            </div>
        )} />
    );
}

export default  __main;
