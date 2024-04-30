import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// https://ant.design/components/overview
import { Layout, Typography, Button } from 'antd';

const { Header, Content, Footer } = Layout;

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
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: 'white' }}>
        <Typography.Title>Pointing Poker</Typography.Title>
      </Header>

      <Content style={{ padding: '20px 48px', display: 'flex', flexDirection: 'column' }}>
        <div>
          <Button onClick={() => handleVote('1')}>1 Point</Button>
          <Button onClick={() => handleVote('2')}>2 Points</Button>
          <Button onClick={() => handleVote('3')}>3 Points</Button>
          {/* Add more buttons as needed */}
        </div>
     
        <div style={{ padding: '20px 0'}}>
          <Typography.Text>Votes:</Typography.Text>
          <ul>
            {votes.map((vote, index) => (
              <li key={index}>{vote}</li>
            ))}
          </ul>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
