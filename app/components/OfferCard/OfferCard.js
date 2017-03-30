import React, { Component, PropTypes } from 'react';


export default class OfferCard extends Component {
    getResults(){

    }
    render() {
        return (
            <div className="offer-card">
                <div className="offer-card__col offer-card__col_img">
                    <img className="offer-card__img" src={this.props.img}></img>

                </div>

                <div className="offer-card__col offer-card__col_info">
                    <div className="offer-card__col offer-card__col_main">
                        <div className="offer-card__title">
                            {this.props.title}
                        </div>
                        <div className="offer-card__address">
                            {this.props.address}
                        </div>
                        <div className="offer-card__type">
                            {this.props.type}
                        </div>
                    </div>

                    <div className="offer-card__col offer-card__col_props">
                        <div className="offer-card__prop offer-card__prop_distance">
                            {this.props.distance}
                        </div>
                        <div className="offer-card__prop offer-card__prop_pressure">
                            {this.props.pressure}
                        </div>
                    </div>
                </div>

                <div className="offer-card__rating">
                    {this.props.rating}
                </div>

                <div className="offer-card__visitors">
                    {this.props.visitors}
                </div>

            </div>
        );
    }
}
