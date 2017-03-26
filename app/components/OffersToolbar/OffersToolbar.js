import React, { Component } from 'react';

import OffersFilter from '../OffersFilter/OffersFilter';

export default class OffersToolbar extends Component {

    render() {

        return (
            <div className="offersToolbar">
                <div className="offersToolbar__filters">
                    <OffersFilter offersFilter={this.props.offersFilter}/>

                </div>
                <div className="offersToolbar__switches">

                </div>

            </div>
        );
    }
}
