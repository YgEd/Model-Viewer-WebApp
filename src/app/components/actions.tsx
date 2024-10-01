"use server"
import { revalidatePath} from "next/cache"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { fileType } from "./helpers"


interface s3ClientConfig{
    region: any,
    credentials: any,

}

const s3ClientObj: s3ClientConfig = {
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    }
}

const s3Client = new S3Client(s3ClientObj)

console.log(`s3Client = ${JSON.stringify(s3Client)}`)
console.log("region = " + process.env.AWS_REGION)


interface uploadFileProps{
    prevState: any,
    formData: any
}

const uploadFileToS3 = async (file: any, fileName: string) =>{
    const fileBuffer = file 
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `${fileName}`,
        Body: fileBuffer
    }

    const command = new PutObjectCommand(params)

    try {
        const response= await s3Client.send(command)
        console.log("file uploaded succesfully: ", response)
        return fileName
    } catch (error) {
        console.log("fil upload failed: ", error)
        
    }

}

const uploadFile = async (prevState:any, formData:any) => {
    console.log(formData)
    try {

        const file = formData.get("file")
        console.log(file)

        if(file.size ===0){
            throw {status: "error", message: "file size is too small"}
        }

        if (fileType(file.name) !== "glb" && fileType(file.name) !== "obj"){
            throw {status: "error", message: "file is of wrong type"}
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        await uploadFileToS3(buffer, file.name)
        
        revalidatePath("/gallery")
        console.log("sucess")
        // return{status: "success", message:"File has been uploaded"}
    } catch (error) {
        console.log("error from uploadFile: ", error)
        return error
        // return{status: "error", message:"Failed to upload file"}
    }
    
   
}


export default uploadFile

