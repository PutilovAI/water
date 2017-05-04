import React, { Component } from 'react'

var dcopy = require('deep-copy')

export default class FileUploader extends Component{
    constructor(props){
        super(props)
        this.state = {
            files: []
        }
    }

    handleFiles(files){
        let self = this;

        Array.from(files).forEach(item => {
            var file = {
                name: item.name,
                file: item
            };

            let arrInd = 0;
            let isExsist = false;

            var reader = new FileReader();

            reader.onload = function(e){
                let stateFiles = dcopy(self.state.files);

                stateFiles.forEach((tempItem, tempItemInd) => {
                    if (tempItem.name == file.name){
                        isExsist = true
                        arrInd = tempItemInd;
                        return false;
                    }
                })

                file.src = e.target.result;

                if (isExsist){
                    stateFiles.splice(arrInd, file)
                } else {
                    stateFiles.push(file)
                }

                self.setState({
                    files: stateFiles
                })
            }
            reader.readAsDataURL(item);
        })
    }

    onChange(e){
        let files = e.target.files;

        if (!files.length) return;

        this.handleFiles.call(this, files)
    }


    onDrop(e){
        e.stopPropagation();
        e.preventDefault();

        var files = e.dataTransfer.files;

        if (!files.length) return;

        this.handleFiles.call(this, files)

        this.setState({
            dropzone: ''
        })

    }
    onDragEnter(e) {
      e.stopPropagation();
      e.preventDefault();
      let cont = this.refs.dropzoneContainer
      cont.style.pointerEvents = 'none'

      this.setState({
          dropzone: 'dragenter'
      })
    }

    onDragOver(e) {
      e.stopPropagation();
      e.preventDefault();
    }

    onDragLeave(e) {
      e.stopPropagation();
      e.preventDefault();

      this.setState({
          dropzone: ''
      })
    }

    render(){
        var files = this.state.files.map((item, ind) => {
            return (
                <div className="fileuploader__file" key={item.name}>
                    <div className="fileuploader__file-img-wrap">
                        <img src={item.src} className="fileuploader__file-img"></img>
                    </div>
                </div>
            )
        })
        return(
            <div className="fileuploader">
                <div className="fileuploader__files">
                    {files}
                </div>
                <label className={`fileuploader__dropzone ` + this.state.dropzone} onDragEnter={::this.onDragEnter} onDragOver={::this.onDragOver} onDrop={::this.onDrop} onDragLeave={::this.onDragLeave}>
                    <div className="fileuploader__dropzone-container" ref="dropzoneContainer">
                        {
                            this.props.label &&
                            <div className="fileuploader__label">{this.props.label}</div>
                        }

                        <input type="file" multiple accept="image/*" className="fileuploader__field" onChange={::this.onChange}></input>
                    </div>
                </label>
            </div>
        )
    }
}
