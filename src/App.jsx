import '../src/App.css';
import { useState, useEffect } from 'react';

const App = () => {
  const [team, setTeam] = useState([]);
  const [money, setMoney] = useState(100);
  const [message, setMessage] = useState("");
  const [fightingState, setFightingState] = useState({ updatedTeam: null, fighterPrice: 0 });
  const [zombieFighters, setZombieFighters] = useState([
    { name: 'Survivor', price: 12, strength: 6, agility: 4, img: 'https://via.placeholder.com/150/92c952' },
    { name: 'Scavenger', price: 10, strength: 5, agility: 5, img: 'https://via.placeholder.com/150/771796' },
    { name: 'Shadow', price: 18, strength: 7, agility: 8, img: 'https://via.placeholder.com/150/24f355' },
    { name: 'Tracker', price: 14, strength: 7, agility: 6, img: 'https://via.placeholder.com/150/d32776' },
    { name: 'Sharpshooter', price: 20, strength: 6, agility: 8, img: 'https://via.placeholder.com/150/1ee8a4' },
    { name: 'Medic', price: 15, strength: 5, agility: 7, img: 'https://via.placeholder.com/150/66b7d2' },
    { name: 'Engineer', price: 16, strength: 6, agility: 5, img: 'https://via.placeholder.com/150/56acb2' },
    { name: 'Brawler', price: 11, strength: 8, agility: 3, img: 'https://via.placeholder.com/150/8985dc' },
    { name: 'Infiltrator', price: 17, strength: 5, agility: 9, img: 'https://via.placeholder.com/150/392537' },
    { name: 'Leader', price: 22, strength: 7, agility: 6, img: 'https://via.placeholder.com/150/602b9e' },
  ]);

  const handleAddFighter = (fighter) => {
    if (money < fighter.price) {
      setMessage('You do not have enough money to add this fighter.');
      return;
    }

    setTeam((prevTeam) => [...prevTeam, fighter]);
    setMoney((prevMoney) => prevMoney - fighter.price);
    setMessage(''); // Clear any previous message
  };

  const handleRemoveFighter = (fighter) => {
    const fighterPrice = fighter.price;

    // Create a new team array without the removed fighter
    const updatedTeam = team.filter(item => item.name !== fighter.name);

    // Update team state
    setFightingState({ updatedTeam, fighterPrice });
  };

  // useEffect to update the money state after the team state has been updated
  useEffect(() => {
    if (fightingState.updatedTeam) {
      setTeam(fightingState.updatedTeam);
      setMoney(prevMoney => Math.min(prevMoney + fightingState.fighterPrice, 100));
      setFightingState({ updatedTeam: null, fighterPrice: 0 }); // Reset fighting state
    }
  }, [fightingState]);

  const totalStrength = team.reduce((accumulator, fighter) => accumulator + fighter.strength, 0);
  const totalAgility = team.reduce((accumulator, fighter) => accumulator + fighter.agility, 0);
  const totalMoney = money;

  return (
    <div className="app">
      {/* Header Section */}
      <header className="app-header">
        <h1>Zombie Fighter</h1>
        <h2 id="money">Money: ${totalMoney}</h2>
        <h2 id="strength">Strength: {totalStrength}</h2>
        <h2 id="agility">Agility: {totalAgility}</h2>
        <h2 id="team">Team: {team.map(fighter => fighter.name).join(', ')}</h2>
        <p>{message}</p>
        <p>Manage your team of zombie fighters with your available money.</p>
      </header>

      <ul className="zombie-fighter-list">
        {zombieFighters.map((fighter, index) => (
          <ZombieFighterListItem
            key={index}
            fighter={fighter}
            onAdd={() => handleAddFighter(fighter)}
            onRemove={() => handleRemoveFighter(fighter)}
          />
        ))}
      </ul>
    </div>
  );
};

const ZombieFighterListItem = ({ fighter, onAdd, onRemove }) => (
  <div className="zombie-fighter">
    <img src={fighter.img} alt={`Image of ${fighter.name}`} className="zombie-fighter-image" />
    <h2 className="zombie-fighter-name">{fighter.name}</h2>
    <p className="zombie-fighter-price">Price: ${fighter.price}</p>
    <p className="zombie-fighter-strength">Strength: {fighter.strength}</p>
    <p className="zombie-fighter-agility">Agility: {fighter.agility}</p>
    <button onClick={onAdd}>Add</button>
    <button onClick={onRemove}>Remove</button>
  </div>
);

export default App;
