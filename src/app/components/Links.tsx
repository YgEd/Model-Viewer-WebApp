"use client"

import Link from "next/link"
import {motion} from "framer-motion"


export default function Links(){


    interface Link{
        title: string,
        path: string
    }

    let links: Array<Link> = [
        {title: "Home",
            path: "/"
        },
        {title: "About",
            path: "/about"
        },
        {title: "Gallery",
            path: "/gallery"
        }
    ]

    return(


        <div className="flex flex-row space-x-5">
            {links.map((link: Link) => (
            <motion.div
            initial={{ opacity: 1 }}
            whileHover={{
              opacity: 0.4,
              transition: {
                duration: 0.15,
              },
            }
        }
        key={link.title}
          >
                <Link href={link.path} className={`text-2xl font-mono cursor-pointer`}>
                    {link.title}
                </Link>
            </motion.div>
))}
        </div>
    )




}

