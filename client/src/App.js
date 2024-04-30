import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001'); // Connect to the server

function App() {
  const [votes, setVotes] = useState([]);

  useEffect(() => {
    socket.on('voteReceived', (vote) => {
      setVotes((prevVotes) => [...prevVotes, vote]);
    });

    return () => socket.off('voteReceived');
  }, []);

  const handleVote = (points) => {
    socket.emit('vote', points);
  };

  return (
    <div>
      <h1>Sprint Pointing Poker</h1>
      <div>
        <button onClick={() => handleVote('1')}>1 Point</button>
        <button onClick={() => handleVote('2')}>2 Points</button>
        <button onClick={() => handleVote('3')}>3 Points</button>
        {/* Add more buttons as needed */}
      </div>
      <h2>Votes:</h2>
      <ul>
        {votes.map((vote, index) => (
          <li key={index}>{vote}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
