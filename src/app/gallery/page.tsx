"use client"
import Image from "next/image";
import ModelContainer from "../components/ModelContainer"
import Uploader from "../components/Uploader";
export default function Home() {

//   interface file{
//     name: string,
//     data: any,
//   }

//   // Path to the file you want to upload
//   const filePath = path.join(process.cwd(), 'public', 'team_fortress_2_engineer_toolbox.glb');

//   // Read the file content
//   const fileData = fs.readFileSync(filePath);

//   // Create a file object
//   const file = {
//     name: 'team_fortress_2_engineer_toolbox.glb', // The name of the file in S3
//     data: fileData // The file content
//   };

//  const upload = async () => {
//     try {
      
//       const fileUrl = await uploadFileToS3(file);
//       console.log('File uploaded successfully:', fileUrl);
//       // Here you might store the fileUrl in your database
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//  }

//   useEffect(()=>{
//     upload()
//   },[])
 
  return (
    <div className="gallery-container">
      <Uploader/>
      <div className="model-cards-container">

          <ModelContainer modelURL={"/team_fortress_2_engineer_toolbox.glb"}/>
        <ModelContainer modelURL={"/keypad_from_half_life_2_prop.glb"}/>
        <ModelContainer modelURL={"/wrench.glb"}/>
        <ModelContainer modelURL={"/old_fridge.glb"}/>
        <ModelContainer modelURL={"/monitor.glb"}/>
        <ModelContainer modelURL={"/bread.glb"}/>
        <ModelContainer modelURL={"/monitor2.glb"}/>
        <ModelContainer modelURL={"/model.obj"}/>
      </div>
    </div>
  );
}
