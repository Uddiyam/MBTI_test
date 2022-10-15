const express = require("express");
const path = require("path");
const app = express();

const xlsxFile = require("read-excel-file/node");
const fs = require("fs");

xlsxFile("./MBTI_sample.xlsx").then((sheets) => {
  console.log(sheets);
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

app.listen(8080, function () {
  console.log("listening on 8080");
});

app.use(express.static(path.join(__dirname, "mbti_test/build")));

app.get("/", function (요청, 응답) {
  응답.sendFile(path.join(__dirname, "/mbti_test/build/index.html"));
});
