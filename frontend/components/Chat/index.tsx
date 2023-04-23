import Link from 'next/link'
import { useState,useEffect,use } from 'react'

// let chats = new Map<number, Map<number,string>[]>();
// let chats = new Map<number,string>([
//     [0,"hELLO"],[1,"csdc"],[0,"adsvfvsvfbdbft"]]);

let allMessages: any[] = [];

function getAnswer(algo: string,question: string){
    if(algo==="KMP") return question + ' kmp answer'
    else return question + ' bm answer.'
}



export default function Chat(){

    // di sini api untuk kiirim chat

    const [messages, setMessages] = useState([] as  any[]);
    const [message, setMessage] = useState('');

    const [response, setResponse] = useState('');

    // useEffect(() => {
    //     fetch("http://localhost:8000/message")
    //       .then((res) => res.json())
    //       .then((data) => setResponse(data.message));
    //   }, []);

    const submit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        fetch('http://localhost:8000/URL', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ isiChat: message })
        })
        .then(res => {
            if (res.ok) {
              return res.json(); }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
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

    return (
        <>
        {/* <div className='fixed top-0 left-[350px] h-full w-full bg-gradient-to-t from-dark-blue to-light-blue'></div> */}
        <div className='flex flex-col-reverse fixed w-screen top-0 left-0 pr-[150px] pl-[500px] h-full w-{full-350px} bg-dark-blue content-end'>
        <div className='w-32 h-[65px]'></div>
        <div className="d-flex flex-col align-items-stretch flex-shrink-0">
                <div id="scroll" className="list-group list-group-flush border-bottom scrollarea overflow-y-auto">
                    {messages.map((message) => {
                        return (
                            <div className={'list-group-item list-group-item-action lh-tight h-fit'}>
                                <div className='grid grid-cols-1 h-tight my-2'>
                                <div className={'lh-tight w-fit px-4 py-1 rounded-md shadow-md '+ (message[0]==='user'? 'bg-blue place-self-end':'bg-white place-self-start')}>
                                    <div className="col-10 mb-1 small">{message[1]}</div>
                                </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
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