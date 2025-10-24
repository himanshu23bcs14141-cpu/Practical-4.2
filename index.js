const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// In-memory array to store cards
let cards = [
  { id: 1, suit: 'Hearts', value: 'Ace' },
  { id: 2, suit: 'Spades', value: 'King' },
  { id: 3, suit: 'Diamonds', value: 'Queen' },
];

// 1️⃣ GET - Retrieve all cards
app.get('/cards', (req, res) => {
  res.json({
    success: true,
    message: 'List of all playing cards',
    data: cards
  });
});

// 2️⃣ GET - Retrieve a specific card by ID
app.get('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const card = cards.find(c => c.id === cardId);

  if (!card) {
    return res.status(404).json({ success: false, message: 'Card not found' });
  }

  res.json({ success: true, data: card });
});

// 3️⃣ POST - Add a new card
app.post('/cards', (req, res) => {
  const { suit, value } = req.body;

  if (!suit || !value) {
    return res.status(400).json({ success: false, message: 'Suit and value are required' });
  }

  const newCard = {
    id: cards.length > 0 ? cards[cards.length - 1].id + 1 : 1,
    suit,
    value
  };

  cards.push(newCard);
  res.status(201).json({ success: true, message: 'Card added successfully', data: newCard });
});

// 4️⃣ DELETE - Delete a card by ID
app.delete('/cards/:id', (req, res) => {
  const cardId = parseInt(req.params.id);
  const index = cards.findIndex(c => c.id === cardId);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Card not found' });
  }

  const deletedCard = cards.splice(index, 1);
  res.json({ success: true, message: 'Card deleted successfully', data: deletedCard });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
