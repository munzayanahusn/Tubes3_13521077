import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'
import { useState } from 'react';

export interface Message {
    q:string; a:string;
}

let message1 : Message[] = [];

export interface History {
  id: number;
  chat: Message[];
}

let h2: History[] = [
  {id: 1, chat: [{q:'halooo semuaa',a:'hello'},{q:'fsfwr',a:'hello'}]},
  {id: 2, chat: [{q:'haiiii',a:'helledefo'},{q:'sdfsdfsd',a:'helfsdcsdlo'}]},
];

export default function Home() {
  const [algo, setAlgo] = useState("KMP");
  // const [message, setMessage] = useState([] as Message[]);
  const [messages, setMessages] = useState(message1);
  // const [histories,setHistories] = useState([] as History[]);
  const [histories,setHistories] = useState([] as History[]);
  const [historyID,setHistoryID] = useState(Number);

  async function fetchHistory(){
      const res = await fetch('http://localhost:8000/history');
      const res1 = await res.json();
      console.log(res1)
      return res1;
  }

  const getHistoryFromDatabase = async () => {
    try {
      // console.log("dfsdf");
      const res1 = await fetchHistory();
      const h: History[] = res1.histories;
      setHistories(h);
    } catch (error) {
      console.error(error);
    }
  };

  getHistoryFromDatabase();
  
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


  // const getHistoryFromDatabase = async () => {
  //     // const res = await fetch('http://localhost:8000/history');
  //     // const res1 = await res.json();
  //     // console.log(res1);
  //     // var h : History[] = res1.histories;
  //     // console.log(h);
  //     // setHistories(h);
  //     console.log("ddsf");
  //     fetchHistory().then(res1 => {
  //       res1;
  //       console.log(res1);
  //       // var h : History[] = res1.histories;
  //       var h: number = res1.histories;
  //       console.log("ini h");
  //       console.log(h);
  //       return h;

  //     }).then(res2 => {
  //       setHistoryID(res2)
  //       console.log(historyID);
  //     });
  
  //     // const getHistory = async () => {
  //     //   try {
  //     //     const res1 = await fetchHistory();
  //     //     const h: History[] = res1.histories;
  //     //     setHistories(h);
  //     //   } catch (error) {
  //     //     console.error(error);
  //     //   }
  //     // };
  //     // setHistoryID(histories[0].id);
  // }

  // function getHistoryFromDatabase(){
  //       console.log("ddsf");
  //       fetchHistory().then(res1 => {
  //       res1;
  //       console.log(res1);
  //       var h : History[] = res1.histories;
  //       console.log("ini h");
  //       console.log(h);

  // }