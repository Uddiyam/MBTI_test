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
  console.log(req.body.answer);
  let result = req.body.answer;
  let t = 0;
  let p = 0;
  let n = 0;
  let e = 0;
  for (let i = 0; i < result.length; i++) {
    if (result[i] === "T") {
      t++;
    } else if (result[i] === "P") {
      p++;
    } else if (result[i] === "N") {
      n++;
    } else if (result[i] === "F") {
      t--;
    } else if (result[i] === "J") {
      p--;
    } else if (result[i] === "S") {
      n--;
    } else if (result[i] === "E") {
      e++;
    } else if (result[i] === "I") {
      e--;
    }
  }
  t < 0 ? (t = "f") : (t = "t");
  p < 0 ? (p = "j") : (p = "p");
  n < 0 ? (n = "s") : (n = "n");
  e < 0 ? (e = "i") : (e = "e");
  console.log(t, p, n, e);
  res.json({
    code: "200",
    message: "success!",
    data: `https://www.16personalities.com/ko/%EC%84%B1%EA%B2%A9%EC%9C%A0%ED%98%95-${e}${n}${t}${p}`,
  }); // React에 응답으로서 데이터를 보냅니다. 데이터는 단순 응답 코드, json 등 다양한 형식을 사용할 수 있습니다.
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
