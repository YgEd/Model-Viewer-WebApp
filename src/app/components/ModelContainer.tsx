"use client"
import { Canvas } from "@react-three/fiber";
import ModelCard from "./ModelCard";
import {Suspense, useRef, useState} from 'react'
import { BounceLoader } from 'react-spinners';


interface ModelContainerProps {
    modelURL: string;
  }

const ModelContainer: React.FC<ModelContainerProps> = ({modelURL}) => {

    //enter and setEnter handles state of pointer entering the Card container
    const [enter, setEnter] = useState(false)
    //controls the rotation of models
    const [rotation, setRotation] = useState({x:0, y:0, z:0});
    const orbitRef = useRef<any>(null)




    return(
        <div   onPointerEnter={() => {setEnter(true); 
                setRotation({x:0, y:(rotation.y+Math.PI/4), z:0})
            }}
        onPointerLeave={() => {setEnter(false)
            //code to smoothly reset camera angle
            orbitRef.current?.reset(true)
            // setRotation({x:0, y:(rotation.y), z:0})
        }}
        
        className="model-viewer-container">
            <Suspense fallback={<div className="loader-container"><BounceLoader color="#000" /></div>}>
        <Canvas style={{ height: '100%', width: '100%' }}>
            <ModelCard modelURL={modelURL} enter={enter} setRotation={setRotation} rotation={rotation} orbitRef={orbitRef}/>
        </Canvas>
        </Suspense>
        </div>
    )
}


export default ModelContainer