import './App.css';
import { useEffect, useState } from 'react';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false },
]
export function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({...card, id: Math.random() }))
    
    setCards(shuffledCards)
    setTurns(0)
  }

  // console.log(cards, turns)

  const handleChoice = (card) => {
    console.log(card);
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect( () => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        // console.log('those cards match');
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src){
              return {...card, matched: true};
            }
            else{
              return card;
            }
          })
        })
    
        resetTurn();
      }
      else{
        // console.log('those cards dont match');
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  // console.log(choiceOne, choiceTwo);

  // cards.map(card => {
  //   if(choiceOne && choiceTwo){
  //     if(choiceOne.src === choiceTwo.src){
  //       console.log('cards match');
  //       // resetTurn();
  //       setTimeout(resetTurn, 1000); 
  //     }
  //     else{
  //       console.log('cards dont match');
  //       // resetTurn();
  //       setTimeout(resetTurn, 1000); 
  //     }
  //   }
  // })
  // if(setChoiceOne === setChoiceTwo){
  //   resetTurn();
  // }
  // else{
  //   console.log("not matched")
  // }

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick = { shuffleCards }>New Game</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
          card={card} 
          key={card.id} 
          handleChoice = {handleChoice}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
