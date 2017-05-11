import React, {Component} from 'react';

import * as SourceActions from '../actions/SourceActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

import {MapPlacemark} from '../components/Map/Map'

export class PageSource extends Component {

    componentWillMount(){
        var id = this.props.match.params.id
        this.props.actions.fetchItem(id)
    }
    render() {

        if (!this.props.sourceFetchedSuccess) return false;

        var ratingMod = 'low',
            rating = parseFloat(this.props.item.rating);

        if (rating >= 4 && rating < 8 ){
            ratingMod = 'mid'
        } else if (rating >= 8){
            ratingMod = 'high'
        }

        var coords = [this.props.item.latitude, this.props.item.longitude]

        return (

            <section className="section">
                <div className="container">
                    <Breadcrumbs />

                    <h1 className="section__title section__title_main">
                        {this.props.item.title}
                    </h1>

                    <p>{this.props.item.address}</p>
                    <p>{this.props.item.landmark}</p>



                    <div className="page__row">

                        <main className="page__col-main">

                            <div>
                                <img src={this.props.item.img}></img>
                            </div>

                            <div dangerouslySetInnerHTML={{ __html: this.props.item.description }}></div>

                            <h2>Как проехать</h2>

                            <MapPlacemark coords={coords} success={this.props.sourceFetchedSuccess}/>
                            <div dangerouslySetInnerHTML={{ __html: this.props.item.route }}></div>


                        </main>

                        <aside className="page__col-aside">
                            <div className="page__col-aside-inner">
                                <ul className="source-props">
                                    <li className="source-props__item source-props__item_rating">
                                        <span className="source-props__name">Рейтинг:</span>
                                        <b className={'source-props__value source-props__rating source-props__rating_' +ratingMod}>{this.props.item.rating}</b>
                                    </li>
                                    <li className="source-props__item">
                                        <span className="source-props__name">Тип источника:</span>
                                        <b className="source-props__value">{this.props.item.typeText}</b>
                                    </li>
                                    <li className="source-props__item">
                                        <span className="source-props__name">Расстояние от меня:</span>
                                        <b className="source-props__value">{this.props.item.distance} км</b>
                                    </li>
                                    <li className="source-props__item">
                                        <span className="source-props__name">Напор воды:</span>
                                        <b className="source-props__value">{this.props.item.pressure} л/мин</b>
                                    </li>
                                    <li className="source-props__item">
                                        <span className="source-props__name">Анализ воды:</span>
                                        <b className="source-props__value">{(this.props.item.analiz ? 'есть': 'нет')}</b>
                                    </li>
                                </ul>
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
    item: state.source.item,
    sourceFetchedSuccess: state.source.sourceFetchedSuccess
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...SourceActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSource)
