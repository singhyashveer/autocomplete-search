const fs=require("fs")

const home=(req,res)=>{
    res.json({data:"Home Page"})
}

const searchQuerry = async (req, res) => {
  const { search } = req.body;
  //Read File
  fs.readFile("data.json", "utf8", (err, rawData) => {
    if (err) {
      return;
    }

    //search word in summaries
    try {
      const data = JSON.parse(rawData);
      const summaries = data.summaries;
      const titles = data.titles;
      function findIdByWord(word) {
        const idOccurrences = {};
        const matchingSummaries = summaries.filter((summary) => {

        //Sort according to occurances
          const matchCount = (
            summary.summary.match(new RegExp(word, "gi")) || []
          ).length;
          if (matchCount > 0) {
            idOccurrences[summary.id] = matchCount;
            return true;
          }
          return false;
        });
        const sortedIds = Object.keys(idOccurrences).sort(
          (id1, id2) => idOccurrences[id2] - idOccurrences[id1]
        );
        return sortedIds;
      }

      function getTitlesByIds(ids) {
        const idTitleMap = {};
        ids.forEach((id) => {
          idTitleMap[id] = titles[id];
        });
        return idTitleMap;
      }

      const ids = findIdByWord(search);
      const idTitleMap = getTitlesByIds(ids);
      res.json(idTitleMap);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
};

const getBookData = async (req, res) => {
  const { id } = req.query;

  fs.readFile("data.json", "utf8", (err, rawData) => {
    if (err) {
      return;
    }

    try {
      const data = JSON.parse(rawData);
      let bookDetails = {
        title: data.titles[id],
        summary: data.summaries[id].summary,
        author: data.authors[id].author,
      };
      res.json(bookDetails);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
  });
}
const add=(a,b)=>{return (a+b)}

module.exports={
    searchQuerry,
    getBookData,
    add
}
