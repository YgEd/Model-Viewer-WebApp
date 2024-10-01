import AWS from 'aws-sdk';

// Configure AWS SDK
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS Access Key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS Secret Access Key
  region: 'us-east-2' // Your S3 region
});

// Create an S3 instance
const s3 = new AWS.S3();

// Function to upload a file to S3
export const uploadFileToS3 = async (file) => {
  // Ensure file object has required properties
  if (!file || !file.name || !file.data) {
    throw new Error('Invalid file object');
  }

  // Define parameters for S3 upload
  const params = {
    Bucket: 'modelviewerbucket-yged', // Your S3 bucket name
    Key: file.name, // The name of the file
    Body: file.data, // The file data (Buffer or ReadableStream)
    ContentType: 'model/gltf-binary', // The content type for .glb files
    ACL: 'public-read' // Make the file publicly accessible
  };

  try {
    // Upload the file to S3 and get the response
    const uploadResponse = await s3.upload(params).promise();
    return uploadResponse.Location; // Returns the URL of the uploaded file
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

// Export the S3 instance for additional operations if needed
export default s3;
