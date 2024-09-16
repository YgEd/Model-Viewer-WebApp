"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls, Environment } from '@react-three/drei';
import { Group } from 'three';

interface ModelCardProps{
    modelURL:string
}

const ModelCard: React.FC<ModelCardProps> = ({modelURL}) => {

    interface ModelProps{
        url: string
    }


    const configModel: React.FC<ModelProps> = ({url}) => {
        const gltf = useLoader(GLTFLoader, url)        
        return <primitive object={gltf.scene} dispose={null}/>
    }   


    return(
        <div>
            <Canvas>
                <ambientLight/>
                <color attach="background" args={["#ececec"]} />




            </Canvas>
        
        
        </div>



    )

   



}

export default ModelCard