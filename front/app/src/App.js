import logo from './logo.svg';
import './App.css';

import { useState } from "react"

function App() {

  const [file, setFile] = useState()

  const handleFileChange = (event) => {

    if(event.target.files)
  
    setFile(event.target.files[0]) 
  
    }

  const handleUploadFile = async () => {
  
    if (!file) {

      alert("please select a file to upload");

    } else {

     const formData = new FormData();
     formData.append("image-attachment", file);

      const response = await fetch("http://localhost:8000/images", {
      method: "POST",
      body: formData,
      });

      const data = await response.json();
      console.log(data);
    
    }
  }

  return (
    <div className="App">
      <h3>Uploadss Image</h3>

      <input onChange={handleFileChange} type="file" name="image" id="image"/>
      <button onClick={handleUploadFile}>Upload</button>
    </div>
  );
}

export default App;
