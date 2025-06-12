import express from 'express';
import 'dotenv/config'; // To load .env variables
import chatRoutes from './routes/chatRoutes';
import './config/firebase'; // This will initialize firebase

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', chatRoutes);

app.get('/', (req, res) => {
  res.send('ChristAI Server is running!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}); 