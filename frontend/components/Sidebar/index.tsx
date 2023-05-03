import Link from 'next/link'
import Logo from './components/Logo'
import Algorithm from './components/Algorithm'
import { useState } from 'react'


export default function Sidebar({algo,setAlgo}: { algo: string, setAlgo: any }){

    return (
        <div className='fixed bg-'>
            <div className='h-screen grid grid-cols-1 content-between bg-gradient-to-b from-black to-dark'>
                <div><Logo/></div>
                <div className="bottom-0"><Algorithm algo={algo} setAlgo={setAlgo}/></div>
            </div>
        </div>

    )
}