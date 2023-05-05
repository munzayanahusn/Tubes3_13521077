import { useState,useEffect } from "react";
import {Message} from '../../../../pages/index'
import {History} from '../../../../pages/index'

// interface History {
//     id: number;
//     chat: string[][];
// }

// let h: History[] = [
//     {id: 0, chat: [['user','hello'],['bot','hello']]},
//     {id: 1, chat: [['user','helledefo'],['bot','helfsdcsdlo']]},
// ];


export default function HistoryTab({messages, setMessages, histories,setHistories,historyID,setHistoryID}:
    {messages:Message[],setMessages:any; histories:History[], setHistories:any,historyID:number,setHistoryID:any}){

    async function fetchAddNewChat(){
        const res = await fetch('http://localhost:8000/addNewChat');
        const res1 = await res.json();
        console.log(res1)
        return res1;
    }

    const addNewChat = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        fetchAddNewChat();
        var globalHistory: any[] = [...histories];
        if(histories.length == 10){
            globalHistory.pop();
            globalHistory.unshift({id:10,chat:[]});
            setHistories(globalHistory);
        } else {
            globalHistory.unshift({id:histories.length,chat:[]});
            setHistories(globalHistory);
        }
    }

    const setSelectedHistory = async (selectedID:number) => {
        // fetchAddNewChat();
        for(let i=0;i<histories.length;i++){
            if (histories[i].id==selectedID){
                var h : History[] = [...histories];
                setMessages(h[i].chat);
            }
        }
        setHistoryID(selectedID);
        // console.log(historyID);
    }


    return (
        <>
        <div>
        <button className="fixed left-[20px] top-[60px] h-[40px] w-[310px] shadow-inner rounded-xl bg-dark text-white hover:bg-slate-700" onClick={addNewChat}>+ New Chat</button>
        <div className='fixed top-[110px] flex flex-col h-[450px] w-[350px]'>
            <div className={'list-group-item list-group-item-action lh-tight h-fit'}>
                {histories.map((history,index) => {
                    return (
                            <div className='grid grid-cols-1 h-tight' key={index}>
                                <button className={'w-[350px] h-[40px] truncate text-white hover:bg-slate-500 text-start px-6 '+ (historyID==history.id? 'bg-gray-700':'')} onClick={() => {setSelectedHistory(history.id)}}>
                                {history.chat.length==0?"new chat":history.chat[0].q}</button>
                            </div>
                    )})
                }
            </div>
        </div>
        </div>
        </>

    )
}

