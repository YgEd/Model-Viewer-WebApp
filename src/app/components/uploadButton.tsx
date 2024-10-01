"use client"


import { useFormStatus } from "react-dom"
import './styles.css';

interface UploadButtonProps {
    selected: boolean
}

const UploadButton: React.FC<UploadButtonProps> = ({selected}) => {
    const {pending} = useFormStatus()

    //aria-disabled will stop you from accidently double clikcing the button
    return(
        <button type="submit" className={selected ? "fadeIn upload_btn": "fadeOut upload_btn"} aria-disabled={pending}>Upload</button>
    )

}


export default UploadButton