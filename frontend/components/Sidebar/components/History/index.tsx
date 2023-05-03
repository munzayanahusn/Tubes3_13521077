import { useState,useEffect } from "react";


interface History {
    id: number;
    chat: string[][];
}

let h: History[] = [
    {id: 0, chat: [['user','hello'],['bot','hello']]},
    {id: 1, chat: [['user','helledefo'],['bot','helfsdcsdlo']]},
];


export default function History(){

    const [histories, setHistories] = useState(h);

    const [selectedHistory, setSelectedHistory] = useState(histories[0].id);

    function showHistoryTab(){
        return (
            <div className='fixed top-[110px] flex flex-col h-[450px] w-[350px]'>
                <div className={'list-group-item list-group-item-action lh-tight h-fit'}>
                    {histories.map((history) => {
                        return (
                                <div className='grid grid-cols-1 h-tight'>
                                    <button className={'w-[350px] h-[40px] text-white hover:bg-slate-500 '+ (selectedHistory==history.id? 'bg-gray-700':'')} onClick={() => setSelectedHistory(history.id)}>
                                    {history.chat[0][1]}</button>
                                </div>
                        )})
                    }
                </div>
            </div>
        )
    }


    const addNewChat = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        var globalHistory: any[] = [...histories];
        if(histories.length == 10){
            globalHistory.pop();
            globalHistory.unshift({id:10,chat:[[]]});
            setHistories(globalHistory);
        } else {
            globalHistory.unshift({id:histories.length,chat:[[]]});
            setHistories(globalHistory);
        }
    }
    

    return (
        <>
        <div>
        <button className="fixed left-[20px] top-[60px] h-[40px] w-[310px] shadow-inner rounded-xl bg-dark text-white hover:bg-slate-700" onClick={addNewChat}>+ New Chat</button>
        <div className='fixed top-[110px] flex flex-col h-[450px] w-[350px]'>
            <div className={'list-group-item list-group-item-action lh-tight h-fit'}>
                {histories.map((history) => {
                    return (
                            <div className='grid grid-cols-1 h-tight'>
                                <button className={'w-[350px] h-[40px] text-white hover:bg-slate-500 '+ (selectedHistory==history.id? 'bg-gray-700':'')} onClick={() => setSelectedHistory(history.id)}>
                                {history.chat[0][1]}</button>
                            </div>
                    )})
                }
            </div>
        </div>
        </div>
        </>

    )
}

