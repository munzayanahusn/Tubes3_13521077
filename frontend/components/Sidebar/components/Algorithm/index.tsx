// import Link from 'next/link'
// import { useEffect, useState } from 'react'

// const App = () => {
    
// }

// interface Algo {
//     setAlgo : any
// }

// export default function Algorithm({Algo}){
//     const [algo, setAlgo] = useState('')

//     const handleRadio = (e) => {
//         e.target.value === e.target.name ? setSelected(true) : setSelected(false)
//     }
//     return (
//         <div>
//             <div className='h-[125px] w-[300px] bg-black text-white p-4'>
//                 <h1 className='text-center'>Algorithm</h1>
//                 <div>
//                     <input type="radio" id="kmp" onChange={setAlgo} />
//                     <label htmlFor="kmp">KMP</label>
//                     <br></br>
//                     <input type="radio" id="bm" />
//                     <label htmlFor="bm">Boyer-Moore</label>
//                 </div>
                
//             </div>
//         </div>
//     )
// }

import Link from 'next/link'
import { SetStateAction, useEffect, useState } from 'react'

const App = () => {
    
}

interface Algo {
    setAlgo : any
}

export default function Algorithm(){
    const [toggleAlgo, setToggleAlgo] = useState(true)
    var algo = ""

    return (
        <div>
            <div className='h-[125px] w-[350px] bg-black text-white p-4'>
                <h1 className='text-center h-11 text-[18px]'>Algorithm</h1>
                <div className='grid grid-col-2 content-center'>
                    <button className="fixed-size px-4 py-2 text-white bg-dark rounded-[10px] hover:bg-slate-600 text-center content-center"
                        onClick={() => setToggleAlgo(!toggleAlgo)}>
                        {toggleAlgo? algo= 'KMP' : algo= 'Boyer-Moore'}
                    </button>
                </div>      
            </div>
        </div>
    )
}