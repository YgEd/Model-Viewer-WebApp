"use client"

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { motion } from "framer-motion-3d";
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls, Environment, PerspectiveCamera  } from '@react-three/drei';
import { BounceLoader } from 'react-spinners';
import { Box3, Vector3} from 'three';
import './styles.css'
import { div } from 'three/webgpu';
import { useAnimate } from 'framer-motion';


interface ModelCardProps {
  modelURL: string;
}

const ModelCard: React.FC<ModelCardProps> = ({ modelURL }) => {

    

    const modelRef = useRef<any>(null) //create a ref to model to track it
    const cameraRef = useRef<any>(null)
    // const box = new Box3().setFromObject( modelRef.current );
    // const center = box.getCenter( new Vector3() );

    const [rotation, setRotation] = useState({x:0, y:0, z:0});
    // const [cameraPos, setCameraPos] = useState(center)
    const gltf = useLoader(GLTFLoader, modelURL);
    // const { camera } = useThree(); // Access the camera from useThree hook

    
    // camera.position.set(center.x, center.y, 1)
    // camera.lookAt(center); // Ensure the camera points at the center of the model

    useEffect(()=>{
        // console.log("rotation: " + JSON.stringify(rotation))
        // console.log("camera: " + JSON.stringify(cameraRef.current))
        setRotation({x:0, y:Math.PI / 8, z:0}) //set initial turn animation on page load
        console.log(cameraRef.current)
        // console.log(cameraRef.current.getAzimuthalAngle())
    },[])
    

  return (
    <div className="model-viewer-container"
        onMouseLeave={()=>{
            if (cameraRef.current){
            cameraRef.current.object
            }
        }}
       >
      <Suspense fallback={<div className="loader-container"><BounceLoader color="#000" /></div>}>
        <Canvas style={{ height: '100%', width: '100%' }}>
        <PerspectiveCamera makeDefault position={[0,0,5]} fov={45} />
        {/* <color attach="background" args={["#ececec"]} /> */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <motion.group
            ref={modelRef}
            //scale={[6, 6, 6]} // Use array for scale
            position={[0, 0, 0]}
            animate={{ rotateX: rotation.x, rotateY:rotation.y, rotateZ:rotation.z, transition:{
                duration: 0.75,
                type: "spring",
                mass: 5,
                stiffness: 500,
                damping: 50,
                restDelta: 0.0001,
            }}}

            onPointerEnter={() => setRotation({x:0, y:0, z:0})}
            onPointerLeave={() => setRotation({x:0, y:Math.PI / 8, z:0})}
            
        >
        <motion.primitive
            scale={2}
            ref={modelRef}
            position={[0, 0, 0]}
            object={gltf.scene}
            dispose={null}
        />
      </motion.group>
          <Environment preset="sunset" />
          <motion.group ref={cameraRef} animate>
            <OrbitControls ref={cameraRef} enablePan={false} minDistance={0.1} maxDistance={1.5}/>

          </motion.group>
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ModelCard;
