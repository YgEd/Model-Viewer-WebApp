import React, { useState, useRef } from 'react';
import './styles.css';
import UploadButton from './uploadButton';
import { useFormState } from 'react-dom'; // Assuming you're using this hook as part of your setup
import uploadFile from './actions'; // Import your uploadFile action
import { AnyCnameRecord } from 'dns';

interface stateConfig{
    status: string,
    message: string | null
}



const Uploader = () => {
  const [state, formAction] = useFormState(uploadFile, null); // Hook to handle form state and file upload
  const [file, setFile] = useState<File | null | any>(null); // Track file
  const [selected, setSelected] = useState(false)

  const handleChange = (e:any) => {
    // console.log("e equal = " + e.target.files[0].name)
   
     if (Object.keys(e.target.files).length == 0){
      setSelected(false)
      setFile(null)
     }else{
       console.log(JSON.stringify(e.target.files))
      setSelected(true)
      setFile(e.target.files[0].name)
     }
      
  }

  const handleAction = (e:any) => {
    const msg = formAction(e)
    console.log(JSON.stringify(e))
    console.log(msg)
  }

  //use this to clear input component value 
  const inputRef:any = useRef(null)

  const handleCancel = (e:any) => {
    //clear input value
    if (inputRef.current){
      inputRef.current.value = ""
    }
    setSelected(false)
    setFile(null)
  }


  return (
    <>
      <div className="input-group">
        <form className="upload-form" action={handleAction}>
          <input onChange={handleChange} type="file" ref={inputRef} id="file-btn" name="file" hidden />
          {selected ? 
          <>
      
                
          {/* <div className={`chosen_file space-x-4`}> */}
          <div className={`chose_file ${selected ? "fadeIn" : "fadeOut"}`}>
            <UploadButton selected={selected}/>
            <label htmlFor="file-btn" className='file_display'>{file}</label>

          </div>

          <button onClick={handleCancel} className="filechooser_cancel">Cancel</button>
            
          {/* </div> */}
          </>
          :
          <>
            <div className={`chose_file ${selected ? "fadeIn" : "fadeOut"}`}>
            <UploadButton selected={selected}/>
            
            </div>

          <label className="filechooser_btn" htmlFor="file-btn">Upload Model</label>
          
          </>
          }
          
          
        </form>
      </div>

     
    </>
  );
};

export default Uploader;
