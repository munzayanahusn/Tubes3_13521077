import Link from 'next/link'
import { useState,useEffect,use } from 'react'
import { Message } from '../../pages/index';
import { History } from '../../pages/index';

// let chats = new Map<number, Map<number,string>[]>();
// let chats = new Map<number,string>([
//     [0,"hELLO"],[1,"csdc"],[0,"adsvfvsvfbdbft"]]);

// const element = document.getElementById("Scroll");
// element?.scrollIntoView();

// let allMessages: Message[] = [];

export default function Chat({algo,messages,setMessages,histories,setHistories,historyID,setHistoryID}:
    {messages:Message[],setMessages:any,algo:string,histories:History[], setHistories:any,historyID:number,setHistoryID:any}){

        // function messageHandler(){
        //     for(let i=0;i<histories.length;i++){
        //         if (histories[i].id==historyID){
 
        //             allMessages = [...histories[i].chat];
        //             return histories[i].chat;
        //         }
        //     }
        //     return [];
        // }

    // const [messages, setMessages] = useState(messageHandler);
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');



    const submit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        await fetch('http://localhost:8000/URL', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ historyID: historyID, algorithm: algo, isiChat: message })
        })
        .then(res => {
            if (res.ok) {
              return res.json(); }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            if (typeof window !== "undefined") {
                var chatHistory = document!.getElementById("scroll");
                chatHistory!.scrollTop = chatHistory!.scrollHeight;
            }
            setResponse(data.answer);
            var allMessages: Message[] = [...messages];
            allMessages.push({q:message, a:data.answer});
            setMessages(allMessages);
            var h: History[] = [...histories];
            for(let i=0;i<h.length;i++){
                if (h[i].id == historyID){
                    h[i].chat = [...allMessages]
                }
                setHistories(h);
            }
            setMessage('');
        })
        .catch(err => {
          console.log(err);
        });
    }

    // async function fetchAnswer(){
    //     const res = await fetch('http://localhost:8000/history',
    //         {method:'POST',
    //          headers: {'Content-Type': 'application/json'},
    //          body: JSON.stringify({ algorithm: algo, isiChat: message })
    //     });
    //     const res1 = await res.json();
    //     return res1;
    // }

    // const submit = async (e: { preventDefault: () => void; }) => {
    //     e.preventDefault;
    //     try {
    //         const res1 = await fetchAnswer();
    //         setResponse(res1.answer);
    //         var allMessages: Message[] = [...messages];
    //         allMessages.push({q:message, a:res1.answer});
    //         setMessages(allMessages);
    //         var h: History[] = [...histories];
    //         for(let i=0;i<h.length;i++){
    //             if (h[i].id == historyID){
    //                 h[i].chat = [...allMessages]
    //             }
    //             setHistories(h);
    //         }
    //         setMessage('');
    //     }  catch (error) {
    //         console.error(error);
    //     }
    // }

    
    const goToBottom = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (typeof window !== "undefined") {
            var chatHistory = document!.getElementById("scroll");
            chatHistory!.scrollTop = chatHistory!.scrollHeight;
        }
    }

    return (
        <>
        <div className='flex flex-col-reverse fixed w-screen top-0 left-0 pb-[65px] pl-[530px] h-full w-{full-350px} bg-dark-blue content-end'>
                <div id="scroll" className="h-screen list-group list-group-flush border-bottom scrollarea overflow-y-scroll scroll-smooth" onScroll={goToBottom}>
                    {messages.map((m,index) => {
                        return (
                            <div className={'list-group-item list-group-item-action lh-tight h-fit mr-[150px]'} key={index}>
                                <div className='grid grid-cols-1 h-tight my-[10px]'>
                                <div className={'lh-tight w-thight px-4 py-1 rounded-md shadow-md text-justify mx-w-{500px} bg-blue place-self-end'}>
                                    <div className="col-10 mb-1 small text-black">{m.q}</div>
                                </div>
                                <div className="h-[10px]"></div>
                                <div className={'lh-tight w-thight px-4 py-1 rounded-md shadow-md text-justify mx-w-{400px} bg-white place-self-start'}>
                                    <div className="col-10 mb-1 small text-black">{m.a}</div>
                                </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
        </div>
        <div className='grid grid-cols-1 fixed bottom-0 h-[65px] w-full pl-[350px] pt-[12px] bg-grey place-items-center'>
            <form className="h-[65px]" onSubmit={submit}>
                <label></label>
                <input className="h-[40px] w-[650px] mx-5 rounded-md shadow-md text-black" type="text" id="chat" value={message} onChange={e=> setMessage(e.target.value)}/>
                <button type="submit" className="bg-slate-500 rounded-md text-black py-1 px-2 shadow-md hover:bg-slate-600">submit</button>
            </form>
        </div>

        </>
    )
}