"use client"

import {useRef} from "react"
import {Canvas, useFrame} from "@react-three/fiber"
import { OrbitControls, useTexture} from "@react-three/drei"

const SphereObj = () => {

    const sphereRef:any = useRef(null)
    const texture = useTexture("/men.jpg")
    
    useFrame((state, delta)=>{
        sphereRef.current.rotation.y += delta/2
    })

    return(
        <>
        <mesh ref={sphereRef} position={[0,0,0]} scale={[3, 3, 3]}>
        <sphereGeometry/>
        <meshStandardMaterial map={texture}/>
        </mesh>
         </>
    )       
}


export const Sphere = () => {

return(
    <Canvas className="sphere">
        <ambientLight/>
            <SphereObj/>
        <OrbitControls enablePan={false} enableZoom={false}/>


    </Canvas>
)





}