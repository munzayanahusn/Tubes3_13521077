import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useState } from 'react';

export interface Message {
    q:string; a:string;
}

let message1 : Message[] = [{q:"halo semuaaa",a:"haiiiii"},{q:"kenapaa",a:"haiiiii"}];

export interface History {
  id: number;
  chat: Message[];
}

let h: History[] = [
  {id: 0, chat: [{q:'halooo semuaa',a:'hello'},{q:'fsfwr',a:'hello'}]},
  {id: 1, chat: [{q:'haiiii',a:'helledefo'},{q:'sdfsdfsd',a:'helfsdcsdlo'}]},
];


export default function Home() {
  const [algo, setAlgo] = useState("KMP");
  // const [message, setMessage] = useState([] as Message[]);
  const [messages, setMessages] = useState(message1);
  const [histories,setHistories] = useState(h);
  const [historyID,setHistoryID] = useState(histories[0].id);


  // const handleAlgo = (e: { target: { value: any; }; }) => {
  //   setAlgo(e.target.value);
  // };
  
  return (
    <div className="App">
      <Chat algo={algo} messages={messages} setMessages={setMessages} histories={histories} setHistories={setHistories} historyID={historyID} setHistoryID={setHistoryID}/>
      <Sidebar algo={algo} messages={messages} setMessages={setMessages} setAlgo={setAlgo} histories={histories} setHistories={setHistories} historyID={historyID} setHistoryID={setHistoryID}/>
    </div>
  )
}

// import { useState } from 'react';

// function App() {
//   const [response, setResponse] = useState('');

//   const handleClick = () => {
//     fetch('http://localhost:8000/URL', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ isiChat: 'halkjkllo' })
//     })
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         }
//         throw new Error('Network response was not ok.');
//       })
//       .then(data => {
//         setResponse(data.response);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>Say Hallo</button>
//       {response && <p>{response}</p>}
//     </div>
//   );
// }

// export default App;