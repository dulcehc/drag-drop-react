import React, { Component } from 'react';
import Dropzone from "react-dropzone";
import styled from 'styled-components';
import request from "superagent";

const ContainerFile = styled.div`
  border: black 2px dashed;
  padding: 0 16px;
`;

class Basic extends Component {
  constructor() {
    super()
    this.state = {
      files: []
    }
  }

  onDrop = (files) => {
    this.setState( prevState => ({
      files: [...prevState.files, files[0]]
    }))
    /* const req = request.post('https://httpbin.org/post');

    files.forEach(file => {
      req.attach(file.name, file);
    });

    req.end(); */
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
          const fileAsBinaryString = reader.result;
          // do whatever you want with the file content
      };
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');

      reader.readAsBinaryString(file);
    });
  }

  onCancel = () => {
    this.setState({
      files: []
    });
  }

  handleRemove = (item, index) => e => {
    console.log('handle remove');
    console.log('this:', item);
    console.log('i: ', index)
    this.setState( {
      files: this.state.files.filter((file, i) => i !== index)
    })
  }

  render() {
    console.log('files: ', this.state.files);
    const files = this.state.files.map((file, i) => (
      <li key={file.name}>
        {file.name} <span onClick={this.handleRemove(file, i)}><u>Remove</u></span>
      </li>
    ))

    return (
      <section>
        <Dropzone
          onDrop={this.onDrop}
          onFileDialogCancel={this.onCancel}
        >
          {({getRootProps, getInputProps}) => (
            <ContainerFile {...getRootProps()}>
              <input {...getInputProps()} />
                <p>Drop files here, or click to <u>select files</u></p>
            </ContainerFile>
          )}
        </Dropzone>
        <aside>
          <h4>Files</h4>
          <ul>{files}</ul>
        </aside>
      </section>
    );
  }
}

export default Basic