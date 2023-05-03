import {useState } from 'react'

export default function Algorithm({algo, setAlgo}: { algo: string, setAlgo: any }){
    const [toggleAlgo, setToggleAlgo] = useState(true)
    return (
        <div>
            <div className='h-[125px] w-[350px] bg-black text-white p-4'>
                <h1 className='text-center h-11 text-[18px]'>Algorithm</h1>
                <div className='grid grid-col-2 content-center'>
                    <button className="fixed-size px-4 py-2 text-white bg-dark rounded-[10px] hover:bg-slate-600 text-center content-center"
                        onClick={() => setToggleAlgo(!toggleAlgo)}>
                        {toggleAlgo? setAlgo("KMP") : setAlgo("BM")}
                        {toggleAlgo? "KMP" : "Boyer-Moore"}
                    </button>
                </div>      
            </div>
        </div>
    )
}