import React, { useState } from "react";
import "./App.css";

function App() {
  const candidates = ["Alice", "Bob", "Charlie"];
  const [votes, setVotes] = useState({ Alice: 0, Bob: 0, Charlie: 0 });

  const handleVote = (candidate) => {
    setVotes({ ...votes, [candidate]: votes[candidate] + 1 });
  };

  // Find the candidate with the highest votes
  const getWinner = () => {
    const maxVotes = Math.max(...Object.values(votes));
    const winners = Object.keys(votes).filter((candidate) => votes[candidate] === maxVotes);

    return maxVotes === 0 ? "No votes yet" : winners.join(", ");
  };

  return (
    <div className="voting-app">
      <h2>Voting Application</h2>
      <div className="candidates">
        {candidates.map((candidate) => (
          <div key={candidate} className="candidate">
            <h3>{candidate}</h3>
            <p>Votes: {votes[candidate]}</p>
            <button onClick={() => handleVote(candidate)}>Vote</button>
          </div>
        ))}
      </div>

      {/* Voting Results */}
      <div className="results">
        <h3>Results</h3>
        <p><strong>Winner:</strong> {getWinner()}</p>
      </div>
    </div>
  );
}

export default App;
