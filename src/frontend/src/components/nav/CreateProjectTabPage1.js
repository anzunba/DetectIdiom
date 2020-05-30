import React, { useState } from "react";
import Dropzone from "react-dropzone";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
export default function App() {
  const [fileNames, setFileNames] = useState([]);
  const handleDrop = acceptedFiles =>
    setFileNames(acceptedFiles[0].name);

  return (
      <div className="p-5">
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone d-flex justify-content-center" })}>
            <input {...getInputProps()} />
            <div className="align-self-center text-center">
                <CloudUploadIcon fontSize="large"/>
                <p>Drag & Drop OR Choose File</p>
                <h4>{fileNames}</h4>
            </div>
          </div>
        )}
      </Dropzone>
      </div>
  );
}