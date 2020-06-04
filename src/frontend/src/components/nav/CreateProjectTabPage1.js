import React, { useState } from 'react';

import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { getText } from '../../actions/edit';


//PASS DATA
const App = ({getFileContentCallback}) =>{
	const [ fileNames, setFileNames ] = useState([]);
	const [ fileContent, setFileContent ] = useState('');
	// const handleDrop = (acceptedFiles) => setFileNames(acceptedFiles[0].name);
  
	const showFile = (e) => {
		e.preventDefault();
    const reader = new FileReader();
		reader.onload = (e) => { 
			const text = e.target.result;
      setFileContent(text);
      //dispatch(getText(text))
      getFileContentCallback(text)
		};
    reader.readAsText(e.target.files[0]);
    setFileNames(e.target.files[0].name)
  };
  

	return (
		<div className="p-5">
			<Dropzone >
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps({ className: 'dropzone d-flex justify-content-center' })}>
						<input {...getInputProps()} type="file" onChange={(e) => showFile(e)} />
						<div className="align-self-center text-center">
							<CloudUploadIcon fontSize="large" />
							<p>Drag & Drop OR Choose File</p>
							<h4>{fileNames}</h4>
							<p>{fileContent}</p>
						</div>
					</div>
				)}
			</Dropzone>
		</div>
	);
}

export default App;
