import React, {Component} from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'

import * as AppActions from '../actions/AppActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {InputText, InputTextarea, Checkbox} from '../components/Input/Input'

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
                    <fieldset className="form__fieldset">
                        <div className="form__fieldset-header">
                            <div className="form__fieldset-title">Местоположение</div>
                        </div>
                        <div className="form__fieldset-container">
                            <InputText label="Населеный пункт" id="address"/>
                            <InputText label="Ориентир" id="landmark"/>
                            <InputText id=""/>
                            <InputTextarea label="Как проехать" id="route"/>
                        </div>
                    </fieldset>

                    <fieldset className="form__fieldset">
                        <div className="form__fieldset-header">
                            <div className="form__fieldset-title">Информация</div>
                        </div>
                        <div className="form__fieldset-container">
                            <InputText label="Название" name="pressure" id="title"/>
                            <InputText label="Напор воды, литр/мин" name="pressure" id="pressure"/>
                            <InputText label="Ожидание, мин" name="waiting" id="waiting"/>
                            <Checkbox label="Анализ"/>
                            <InputTextarea label="Описание" id="description"/>

                        </div>
                    </fieldset>



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
