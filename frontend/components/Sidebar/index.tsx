import Link from 'next/link'
import Logo from './components/Logo'
import Algorithm from './components/Algorithm'
import HistoryTab from './components/HistoryTab'
import {Message} from '../../pages/index'
import {History} from '../../pages/index'
import { useState } from 'react'


export default function Sidebar({algo,setAlgo, messages, setMessages, histories,setHistories,historyID,setHistoryID}: 
    { algo: string, setAlgo: any, messages:Message[], setMessages:any, histories:History[], setHistories:any,historyID:number,setHistoryID:any}){

    return (
        <div className='fixed bg-'>
            <div className='h-screen grid grid-cols-1 content-between bg-gradient-to-b from-black to-dark'>
                <div><Logo/></div>
                <div><HistoryTab messages={messages} setMessages={setMessages} histories={histories} setHistories={setHistories} historyID={historyID} setHistoryID={setHistoryID}/></div>
                <div className="bottom-0"><Algorithm algo={algo} setAlgo={setAlgo} /></div>
            </div>
        </div>

    )
}