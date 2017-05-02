import React, {Component} from 'react';

import createHistory from 'history/createBrowserHistory'
const history = createHistory()

let dcopy =  require('deep-copy')

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

    //парсим get запрос и переводим в объект для фильтра
    strToFilter(str){
        let newFilter = dcopy(this.props.filter),
            searchFilter = newFilter.searchFilter,
            offersFilter = newFilter.offersFilter;

        for (let key in searchFilter.ranges){

            let min = str.match(new RegExp(key + "_min=(\\d+)"))
            let max = str.match(new RegExp(key + "_max=(\\d+)"))

            if (min && min[1] !== undefined) searchFilter.ranges[key].value[0] = parseFloat(min[1])
            if (max && max[1] !== undefined) searchFilter.ranges[key].value[1] = parseFloat(max[1])

        }

        for (let key in searchFilter.checkboxes){
            let cxb = searchFilter.checkboxes[key]

            if (typeof cxb == 'object'){
                for (let keyInner in cxb){
                    let resMatch = str.match(new RegExp(key + "=("+keyInner+")+(?:&|$)", "i"))
                    if (resMatch !== null)
                        searchFilter.checkboxes[key][keyInner] = true
                    else
                        searchFilter.checkboxes[key][keyInner] = false
                }
            } else {
                let resMatch = str.match(new RegExp(key + "=(true|false)(?:&|$)", "i"))
                if (resMatch && resMatch[1] !== undefined)
                    searchFilter.checkboxes[key] = resMatch[1]
            }
        }

        let sort = str.match(/ordering=(.+)(?:&|$)/),
            sortField,
            sortOrder;


        if (sort && sort[1]){
            sortField = sort[1].replace(/^\-/, '');
            sortOrder = sort[1].match(/^(\-)/) ? 'increment' : 'decrement';

            offersFilter.value = sortField;
            offersFilter.order = sortOrder;
        }

        return newFilter;

    }


    componentWillMount(){
        let historySearch = history.location.search;
        let historyState = history.location.state;
        let newFilter = {};


        if (historyState && historyState.filter){//Object
            newFilter = historyState.filter
            newFilter.options.initialized = true;

        } else if(historySearch){//string
            newFilter = this.strToFilter(historySearch)
            newFilter.options.initialized = true;

        } else {//Object
            newFilter = this.props.filter
        }

        //Получаем результаты только после установки параметров фильтра
        this.props.actions.fetchSearchFilterLimits( newFilter, this.props.actions.fetchSearchResults )

    }

    throttle(func, ms){//Тормозилка для запросов к серверу
        var timer = '';
        var self = this;

        function wrapper(){
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(self, arguments)
            }, ms)
        }

        return wrapper
    }

    fetchSearchResultsThrottle = this.throttle(::this.props.actions.fetchSearchResults, 500)

    onChangefilter(filter){
        this.props.actions.searchFiltering(filter)
        this.fetchSearchResultsThrottle(filter)
    }
    onChangeOffersSortSelect(filter){
        this.props.actions.offersFiltering(filter)
        this.fetchSearchResultsThrottle(filter)
    }

    onChangeOffersSort(filter){
        this.props.actions.offersSorting(filter)
        this.fetchSearchResultsThrottle(filter)
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
                                    <OffersFilter filter={this.props.filter} value={this.props.filter.offersFilter.value} selectOnChange={::this.onChangeOffersSortSelect} sortOnChange={::this.onChangeOffersSort} order={this.props.filter.offersFilter.order}/>

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


                            <SearchResults searchFilter={this.props.filter} items={this.props.searchResults} offersFilter={this.props.filter}/>

                        </main>
                        <aside className="search__content-aside">
                            <div className="search__content-aside-inner">
                                <SearchFilter filter={this.props.filter} onChange={::this.onChangefilter}/>
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
        filter: state.search.filter,
        searchResults: state.search.searchResults
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...SearchActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageSearch)
