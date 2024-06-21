import expres from 'express';
import cors from 'cors';
import morgan from 'morgan';
import axios from 'axios';
import { topGainer } from './groww.js';

const app = expres();

app.use(cors({
    origin: "*",
    credentials: true,
}))

app.use(expres.json({limit : '50mb'}))
app.use(expres.urlencoded({extended : true , limit : '50mb'}))
app.use(morgan('dev'))

app.post('/convert', async (req, res) => {
    const { csrfToken , sessionId , searchTerm} = req.body;
    const cookies = `csrftoken=${csrfToken}; sessionid=${sessionId}`;
  
    try {
      const response = await axios.get(`https://www.screener.in/api/company/search/?q=${searchTerm}&v=3&fts=1`, {
        headers: {
          Cookie: cookies
        }
      });
  
      res.json(response.data); // Assuming you want to send the data back to the client
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
});
app.post('/data', async (req, res) => {
  const { stateId, pcNo } = req.body;

  try {
    const response = await axios.get(`https://liveresults.indiastatelections.com/api/LiveGeApi/GePCCC`, {
      params: {
          stateid: stateId,
          pcno: pcNo,
          _: Date.now() // Adding a timestamp to avoid caching
      }
  });

    res.json(response.data); // Assuming you want to send the data back to the client
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

    
app.get('/groww/topGainer',topGainer);

let port = 8000;
app.listen(port || 3000 , () => {
  console.log(`Server listening on port ${port || 3000}`);
});