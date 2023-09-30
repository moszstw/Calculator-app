// server/src/server.ts

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use(cors());

app.post('/api/calculate', (req, res) => {
  const { expression } = req.body;
  const startTime = performance.now();
  try {
    const result = eval(expression);
    const endTime = performance.now();
    const calculationTime = endTime - startTime;
    res.json({ result, calculationTime});
  } catch (error) {
    console.error('Error calculating:', error);
    res.status(500).json({ error: 'Error calculating expression' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
