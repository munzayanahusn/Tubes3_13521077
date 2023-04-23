import Link from 'next/link'
import Logo from './components/Logo'
import Algorithm from './components/Algorithm'
import { useState } from 'react'


export default function Sidebar(){
    const [nilaiAlgo, setNilaiAlgo] = useState('')
    // di sini api untuk kiirim chat
    return (
        <div className='fixed bg-'>
            <div className='h-screen grid grid-cols-1 content-between bg-gradient-to-b from-black to-dark'>
                <div><Logo /></div>
                <div><Algorithm /></div>
            </div>
        </div>
    )
}