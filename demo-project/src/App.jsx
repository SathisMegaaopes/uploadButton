import { useState } from 'react'
import './App.css'
import UploadButtons from './ButtonComponent';
import { Container, Typography } from '@mui/material';
// import InputFileUpload from './newButton'

function App() {
  return (
    <div className="App">
      <h1>File and Image Upload</h1>
      <UploadButtons />
      {/* <InputFileUpload/> */}
    </div>

  )
}

export default App



