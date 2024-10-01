
import Image from "next/image";
import ModelCard from "./components/ModelCard"
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
    <div className="h1">

      <h1>Welcome!</h1>
    </div>
  );
}
