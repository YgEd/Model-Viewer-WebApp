import Image from "next/image";

export default function AboutPage(){


    return(

        <div className="center about-container">
            <h1>Hey, it's me the</h1>
            <Image height={800} width={800} alt="creator" src="/creator.jpg"/>
            <span>CREATOR</span>    
        </div>

        
    )
}