import React, { useEffect, useMemo } from "react";
import styles from "./styles/Testpage.module.css";
import data from "./mbti_question.json";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

let now = 0;
let count_progress = 0;

export default function Testpage() {
  const [isclick1, setIsClick1] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [isclick2, setIsClick2] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [answer, setAnswer] = useState([]);

  let isclick_copy1 = [...isclick1];
  let isclick_copy2 = [...isclick2];

  const AA = (e, i) => {
    i[data_copy[e].number - 1]
      ? (now = now) && (count_progress = count_progress)
      : (now -= 100 / 12) && (count_progress -= 1);
  };

  const BB = (e, i) => {
    i[data_copy[e].number - 1]
      ? (now += 100 / 12) && (count_progress += 1)
      : (now -= 100 / 12) && (count_progress -= 1);
  };

  const userAnswer1 = (e) => {
    let answer_copy = [...answer, data[e].resOption1];
    setAnswer(answer_copy);
    isclick_copy1[data_copy[e].number - 1] =
      !isclick_copy1[data_copy[e].number - 1];
    setIsClick1(() => {
      return isclick_copy1;
    });
    isclick2[data_copy[e].number - 1] &&
      (isclick_copy2[data_copy[e].number - 1] =
        !isclick_copy2[data_copy[e].number - 1]);
    setIsClick2(() => {
      return isclick_copy2;
    });

    isclick2[data_copy[e].number - 1]
      ? AA(e, isclick_copy1)
      : BB(e, isclick_copy1);
  };

  const userAnswer2 = (e) => {
    let answer_copy = [...answer, data[e].resOption2];
    setAnswer(answer_copy);
    isclick_copy2[data_copy[e].number - 1] =
      !isclick_copy2[data_copy[e].number - 1];
    setIsClick2(() => {
      return isclick_copy2;
    });
    isclick1[data_copy[e].number - 1] &&
      (isclick_copy1[data_copy[e].number - 1] =
        !isclick_copy1[data_copy[e].number - 1]);
    setIsClick1(() => {
      return isclick_copy1;
    });

    isclick1[data_copy[e].number - 1]
      ? AA(e, isclick_copy2)
      : BB(e, isclick_copy2);
  };

  let navigate = useNavigate();
  const [count, setCount] = useState(1);

  let data_copy = [];

  return (
    <div className={styles.Container}>
      <ProgressBar now={now} label={`${count_progress}/12`} />
      {data.map((q, i) => {
        count == 1 && q.number < 5 && data_copy.push(q);
        count == 2 && q.number < 9 && q.number >= 5 && data_copy.push(q);
        count == 3 && q.number < 13 && q.number >= 9 && data_copy.push(q);
      })}

      <Container>
        <Row>
          {data_copy.map((w, j) => {
            return (
              <>
                <Col sm={6}>
                  <div className={styles.Question}>{w.question}</div>
                  <div className={styles.BtnWrap}>
                    <button
                      className={
                        isclick_copy1[data_copy[j].number - 1]
                          ? styles.BtnOn
                          : styles.Btn
                      }
                      onClick={() => userAnswer1(j)}
                    >
                      {w.option1}
                    </button>

                    <button
                      className={
                        isclick_copy2[data_copy[j].number - 1]
                          ? styles.BtnOn
                          : styles.Btn
                      }
                      onClick={() => userAnswer2(j)}
                    >
                      {w.option2}
                    </button>
                  </div>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
      <button
        onClick={() => {
          count > 1 && setCount(count - 1);
        }}
      >
        이전
      </button>
      <button
        onClick={() => {
          count < 3 && setCount(count + 1);
        }}
      >
        다음
      </button>
    </div>
  );
}
