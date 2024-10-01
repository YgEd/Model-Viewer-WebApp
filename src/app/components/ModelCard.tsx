"use client"

import React, { Suspense, useRef, useEffect, useState } from 'react';
import { motion } from "framer-motion-3d";
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CameraControls , Environment, Center, Gltf, Resize, Bounds } from '@react-three/drei';
import { BounceLoader } from 'react-spinners';
import { Box3, Vector3} from 'three';
import './styles.css'
import { div } from 'three/webgpu';
import { useAnimate } from 'framer-motion';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { fileType } from './helpers'


interface ModelCardProps {
  modelURL: string;
  enter: boolean;
  rotation: any;
  setRotation: any;
  orbitRef: any;

}

const ModelCard: React.FC<ModelCardProps> = ({ modelURL, enter, setRotation, rotation, orbitRef}) => {

    

    const modelRef = useRef<any>(null) //create a ref to model to track it
    // const box = new Box3().setFromObject( modelRef.current );
    // const center = box.getCenter( new Vector3() );

    // const [rotation, setRotation] = useState({x:0, y:0, z:0});
    

    useEffect(()=>{
        // setRotation({x:0, y:Math.PI / 8, z:0}) //set initial turn animation on page load
        console.log(orbitRef.current)
        console.log("modelURL " + modelURL + " has type: " + fileType(modelURL))
        // console.log(orbitRef.current.getAzimuthalAngle())
    },[])

    useFrame((state, delta)=>{
        if (!enter){
            setRotation( {x:0, y:rotation.y+= delta/2, z:0})
        }
    })
    


  return (
    <>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <motion.group
            ref={modelRef}
            //scale={[6, 6, 6]} // Use array for scale
            // position={[0, 0, 0]}
            animate={{ rotateX: rotation.x, rotateY:rotation.y, rotateZ:rotation.z, transition:{
                duration: 0.75,
                type: "spring",
                mass: 5,
                stiffness: 500,
                damping: 50,
                restDelta: 0.0001,
            }}}
            
        >
            <Center>
                    {/* <Bounds fit clip observe> */}
                        <Resize precise={true} scale={2}>
                       
                          { fileType(modelURL) == "glb" ? <Gltf ref={modelRef} src={modelURL} /> : fileType(modelURL) == "obj" ? 
                            <primitive object={useLoader(OBJLoader, modelURL)} /> : null
                          }
                             
                        
                        </Resize>
                    {/* </Bounds> */}


            </Center>
       
      </motion.group>
          <Environment preset="sunset" />
          {/* <motion.group ref={orbitRef} animate> */}
          
          <CameraControls  ref={orbitRef} />

        
          {/* </motion.group> */}
    </>
  );
};

export default ModelCard;
