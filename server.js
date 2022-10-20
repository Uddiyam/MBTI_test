const express = require("express");
const path = require("path");
const app = express();
const port = 8080;
const cors = require("cors");
const bodyParser = require("body-parser");

const xlsxFile = require("read-excel-file/node");
const fs = require("fs");

xlsxFile("./MBTI_sample.xlsx").then((sheets) => {
  let jsonData = [];
  for (let i = 0; i < sheets.length; i++) {
    if (i !== 0) {
      const inputData = {
        number: sheets[i][0],
        question: sheets[i][1],
        option1: sheets[i][2],
        option2: sheets[i][3],
        resOption1: sheets[i][4],
        resOption2: sheets[i][5],
      };
      jsonData.push(inputData);
    }
  }
  const mbti_question = JSON.stringify(jsonData);
  fs.writeFileSync("./mbti_question.json", mbti_question);
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "mbti_test/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/mbti_test/build/index.html"));
});

app.use("/api/result", function (req, res) {
  console.log(req.body.answer); // 받아온 데이터를 콘솔창에 표시합니다. 이 내용은 npm run dev를 입력한 콘솔에 표시됩니다.
  res.json({ code: "200", message: "success!" }); // React에 응답으로서 데이터를 보냅니다. 데이터는 단순 응답 코드, json 등 다양한 형식을 사용할 수 있습니다.
});
/*
app.post("/api/result", (req, res) => {
  const answer = req.body.answer;
  console.log(answer);
});
*/

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
