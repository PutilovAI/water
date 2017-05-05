import React, {Component} from 'react';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs'
const dcopy = require('deep-copy');

import * as AddActions from '../actions/AddActions'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {InputText, InputTextarea, Checkbox} from '../components/Input/Input'
import FileUploader from '../components/FileUploader/FileUploader'
import {MapAdding} from '../components/Map/Map'

export class PageAdd extends Component {

    onSubmit(e){
        e.preventDefault()
        let form = e.target.elements;

        let formBody = {
            title : form.title.value,
            address : form.title.address,
            pressure : form.title.pressure,
            waiting : form.title.waiting
        }

        this.props.actions.postForm(formBody)
    }

    onChangeInput(e){
        let input = e.target;
        let inputValue = input.value;
        let form = dcopy(this.props.form)

        form.fields[input.id].value = inputValue;

        this.props.actions.updateForm.call(this, form)
    }
    render() {

        var fields = this.props.form.fields;

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

                    <form onSubmit={::this.onSubmit}>
                        <fieldset className="form__fieldset">
                            <div className="form__fieldset-header">
                                <div className="form__fieldset-title">Местоположение</div>
                            </div>
                            <div className="form__fieldset-container">
                                <div className="row">
                                    <div className="col_6">
                                        <InputText label="Населеный пункт" id="address"/>
                                        <InputText label="Ориентир" id="landmark" modifier="h-mb_10"/>
                                        <div className="row">
                                            <div className="col_6">
                                                <InputText type="number" id="latitude" value={fields.latitude.value} attr={{"placeholder":"Ширина"}} onChange={::this.onChangeInput}/>
                                            </div>
                                            <div className="col_6">
                                                <InputText type="number" id="longitude" value={fields.longitude.value} attr={{"placeholder":"Долгота"}} onChange={::this.onChangeInput}/>
                                            </div>
                                        </div>

                                        <InputTextarea label="Как проехать" id="route"/>
                                    </div>
                                    <div className="col_6">
                                        <MapAdding zoom="10" form={this.props.form} updateForm={::this.props.actions.updateForm}/>
                                    </div>
                                </div>

                            </div>
                        </fieldset>

                        <fieldset className="form__fieldset">
                            <div className="form__fieldset-header">
                                <div className="form__fieldset-title">Информация</div>
                            </div>
                            <div className="form__fieldset-container">
                                <div className="row">
                                    <div className="col_6">
                                        <InputText label="Название" name="title" id="title"/>
                                    </div>
                                    <div className="col_6">
                                        <InputText label="Напор воды, литр/мин" type="number" name="pressure" id="pressure"/>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col_6">
                                        <InputText label="Ожидание, мин" name="waiting" type="number" id="waiting"/>
                                    </div>
                                    <div className="col_6">
                                        <Checkbox label="Анализ"/>
                                    </div>
                                </div>

                                <div className="row">
                                    <InputTextarea label="Описание" id="description"/>
                                </div>

                            </div>
                        </fieldset>

                        <fieldset className="form__fieldset">
                            <div className="form__fieldset-header">
                                <div className="form__fieldset-title">Фотографии</div>
                            </div>
                            <div className="form__fieldset-container">
                                <FileUploader label="Добавьте фотографии, перетащив их в рамку" ref="photos"/>
                            </div>
                        </fieldset>

                        <fieldset className="form__fieldset">
                            <div className="form__fieldset-header h-mb_10"></div>
                            <div className="form__fieldset-container">
                                <div className="adding__preview-link-wrap">
                                    <a href="#" className="">Предварительный просмотр</a>
                                </div>


                                <div className="adding__buttons">
                                    <button type="submit" className="button button_s-large">Опубликовать</button>
                                    <button type="button" className="button button_s-large button_c-grey">Сохранить в черновиках</button>
                                </div>

                            </div>
                        </fieldset>
                    </form>




                </div>
            </section>
        );
    }
}

function mapStateToProps(state) {
    return {
        form: state.add.form
    }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...AddActions}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageAdd)
