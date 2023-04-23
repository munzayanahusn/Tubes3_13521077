import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'


export default function Home() {
  return (
    <div className="App">
      <Chat />
      <Sidebar />
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