const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')
const fs=require("fs")

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors())

app.post('/search', async(req, res) => {
    const {search}=(req.body)
    fs.readFile('data.json', 'utf8', (err, rawData) => {
        if (err) {
            return;
        }
    
        try {
            const data = JSON.parse(rawData);
            const summaries = data.summaries;
            const titles= data.titles;
            function findIdByWord(word) {
                const idOccurrences = {};
                const matchingSummaries = summaries.filter(summary => {
                const matchCount = (summary.summary.match(new RegExp(word, 'gi')) || []).length;
                    if (matchCount > 0) {
                        idOccurrences[summary.id] = matchCount;
                        return true;
                    }
                    return false;
                });
                const sortedIds = Object.keys(idOccurrences).sort((id1, id2) => idOccurrences[id2] - idOccurrences[id1]);
                return sortedIds;
            }
            

            function getTitlesByIds(ids) {
                const idTitleMap = {};
                ids.forEach(id => {
                        idTitleMap[id] = titles[id];
                });
                return idTitleMap;
            }
    
            const ids = findIdByWord(search);
            const idTitleMap = getTitlesByIds(ids);
            res.json(idTitleMap);
            
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
});



app.get('/getBookData', async(req, res) => {
    const {id} = req.query;
    
    fs.readFile('data.json', 'utf8', (err, rawData) => {
        if (err) {
            return;
        }
    
        try {
            const data = JSON.parse(rawData);
            let bookDetails={
            title:data.titles[id],
            summary:data.summaries[id].summary,
            author:data.authors[id].author
            }
            res.json(bookDetails)
            
            
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });
    
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
