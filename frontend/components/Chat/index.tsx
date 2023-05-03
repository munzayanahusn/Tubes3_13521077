import Link from 'next/link'
import { useState,useEffect,use } from 'react'
import { useRef } from 'react';

// let chats = new Map<number, Map<number,string>[]>();
// let chats = new Map<number,string>([
//     [0,"hELLO"],[1,"csdc"],[0,"adsvfvsvfbdbft"]]);

// const element = document.getElementById("Scroll");
// element?.scrollIntoView();
let allMessages: any[] = [];

export default function Chat({algo}: { algo: string }){
    const [messages, setMessages] = useState([] as  any[]);
    const [message, setMessage] = useState('');

    const [response, setResponse] = useState('');

    const submit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        fetch('http://localhost:8000/URL', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ algorithm: algo, isiChat: message })
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
            allMessages.push(['user', message]);
            allMessages.push(['bot', data.answer]);
            setMessages(allMessages);
            setMessage('');
        })
        .catch(err => {
          console.log(err);
        });
    }

    
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
                    {messages.map((message) => {
                        return (
                            <div className={'list-group-item list-group-item-action lh-tight h-fit mr-[150px]'}>
                                <div className='grid grid-cols-1 h-tight my-2'>
                                <div className={'lh-tight w-thight px-4 py-1 rounded-md shadow-md text-justify mx-w-{500px} '+ (message[0]==='user'? 'bg-blue place-self-end':'bg-white place-self-start')}>
                                    <div className="col-10 mb-1 small">{message[1]}</div>
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
                <input className="h-[40px] w-[650px] mx-5 rounded-md shadow-md" type="text" id="chat" value={message} onChange={e=> setMessage(e.target.value)}/>
                <button type="submit" className="bg-slate-500 rounded-md py-1 px-2 shadow-md hover:bg-slate-600">submit</button>
            </form>
        </div>

        </>
    )
}