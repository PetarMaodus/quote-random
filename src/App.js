import { useState } from 'react';
import './App.css';

function App() {
    const [quote, setQuote] = useState('The greater danger for most of us lies not in setting our aim too high and falling short; but in setting our aim too low and achieving our mark.');
    const [quoteAuthor, setQuoteAuthor] = useState('Michelangelo');
    const [quoteTag, setQuoteTag] = useState(['wisdom']);
    const [loading, setLoading] = useState(false);
    let currnetTag = quoteTag.join(', ');
    
    const randomize = (ele) => {
        setLoading(true);
        let author = `?author=${quoteAuthor}`;
        let tags = `?tags=${quoteTag}`;
        let cururl = `https://api.quotable.io/random`;
       
        if (ele.target.value === 'tagz') { cururl = `https://api.quotable.io/random${tags}`; }
        else if (ele.target.value === 'auth') {
            cururl = `https://api.quotable.io/random${author}`;
        }

        fetch(cururl)
            .then((res) => res.json())
            .then((data) => { setQuote(data.content); setQuoteAuthor(data.author); setQuoteTag(data.tags); setLoading(false) })
            .catch((error) => {
                console.error('Error:', error);
            });
       
    };
   
  return (
      <div className="App">
          <div>
          {!loading ? <>
          <p>{quote}</p>
          <p>Author: {quoteAuthor}</p>
          <p>Tag: {currnetTag}</p>
          <button onClick={randomize}>RANDOM</button>
          <button value="tagz" onClick={randomize}>SAME TAGS</button>
          <button value="auth" onClick={randomize}>SAME AUTHOR</button>
          </> : 'loading....'
              }
          </div>
      </div>
  );
}

export default App;
