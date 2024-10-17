import { useState } from 'react';
import './App.css';
import axios from 'axios';

// console.log(axios);


function App() {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");

  const key = "AIzaSyDPLLMYyDrHHwYFVm6bJkGbtTkQrFPTVpU";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${key}`;

  const generateAnswer = async () => {
    try {
      if (query !== "") {
        setAnswer("Loading........")
        setQuery("");
        const response = await axios({
          url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDPLLMYyDrHHwYFVm6bJkGbtTkQrFPTVpU",
          method: "post",
          data: {
            contents: [
              { parts: [{ text: query }] }
            ]
          }
        })
        setAnswer(response.data.candidates[0].content.parts[0].text);
        console.log(response.data);
      }

    } catch (error) {
      console.error("Error generating answer:", error);
    }
  }







  // function prettyPrintContent(content) {
  //   // Create a container div
  //   const container = document.createElement('div');

  //   // Split content into sections by headers and paragraphs
  //   const sections = content.split(/\*\*|\*\*|\r?\n/).map(section => section.trim());

  //   sections.forEach(section => {
  //     if (section.startsWith('##')) {
  //       const header = document.createElement('h2');
  //       header.textContent = section.replace(/^##\s*/, '');
  //       container.appendChild(header);
  //     } else if (section.startsWith('*')) {
  //       const ul = document.createElement('ul');
  //       section.split('*').forEach(item => {
  //         if (item.trim()) {
  //           const li = document.createElement('li');
  //           li.innerHTML = item.trim().replace(/:\s*/, ': <strong>').replace(/\./g, '</strong>');
  //           ul.appendChild(li);
  //         }
  //       });
  //       container.appendChild(ul);
  //     } else {
  //       const p = document.createElement('p');
  //       p.innerHTML = section.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  //       container.appendChild(p);
  //     }
  //   });

  //   return container;
  // }

  return (
    <div style={{
      width:'100%',
      marginBottom:'100px',
      position:'absolute',
      left:0,
      top:-30
    }}>
      <div style={{
        textAlign:'left',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
      }}>
        <PrettyContent content={answer} />
      </div>
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        background: 'black',
        padding: '20px 10px',
        display: 'flex',
        zIndex: 10,
        justifyContent: 'center',
        gap: '10px',
      }}>
        <input style={{
          width: '85%',
          padding: '0px 10px'
        }} onChange={(e) => setQuery(e.target.value)} value={query} type="text" />
        <button onClick={generateAnswer}>Generate</button>
      </div>

    </div>
  );
}

export default App;



const PrettyContent = ({ content }) => {
  const formatContent = (content) => {
    const container = document.createElement('div');

    const sections = content.split(/\*\*|\*\*|\r?\n/).map(section => section.trim());

    sections.forEach(section => {
      if (section.startsWith('##')) {
        const header = document.createElement('h2');
        header.classList.add('header-main-title');
        header.textContent = section.replace(/^##\s*/, '');
        container.appendChild(header);
      } else if (section.startsWith('*')) {
        const ul = document.createElement('ul');
        section.split('*').forEach(item => {
          if (item.trim()) {
            const li = document.createElement('li');
            li.innerHTML = item.trim().replace(/:\s*/, ': <strong>').replace(/\./g, '</strong>');
            ul.appendChild(li);
          }
        });
        container.appendChild(ul);
      } else {
        const p = document.createElement('p');
        p.innerHTML = section.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        container.appendChild(p);
      }
    });
    return container.innerHTML;
  };

  return (
    <div className='content-box' dangerouslySetInnerHTML={{ __html: formatContent(content) }} />
  );
};
