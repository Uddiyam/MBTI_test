import React, { useEffect, useMemo } from "react";
import styles from "./styles/Testpage.module.css";
import data from "./mbti_question.json";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    answer_copy.length = 12;
    answer_copy[data_copy[e].number - 1] = data_copy[e].resOption1;
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
    answer_copy.length = 12;

    answer_copy[data_copy[e].number - 1] = data_copy[e].resOption2;
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
  let aaa = [];
  const [result, setResult] = useState();
  const sendData = async () => {
    await axios.post("/api/result", { answer: answer }).then((res) => {
      console.log(res);
      setResult(res.data.data);
    });
  };

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
                    <Button
                      className={
                        isclick_copy1[data_copy[j].number - 1]
                          ? styles.BtnOn
                          : styles.Btn
                      }
                      onClick={() => userAnswer1(j)}
                    >
                      {w.option1}
                    </Button>
                    <Button
                      className={
                        isclick_copy2[data_copy[j].number - 1]
                          ? styles.BtnOn
                          : styles.Btn
                      }
                      onClick={() => userAnswer2(j)}
                    >
                      {w.option2}
                    </Button>
                  </div>
                </Col>
              </>
            );
          })}
        </Row>
      </Container>
      <div className={styles.BtnBox}>
        {count > 1 && (
          <Button
            className={styles.PrevBtn}
            onClick={() => {
              setCount(count - 1);
            }}
            variant="primary"
            size="lg"
          >
            이전
          </Button>
        )}
        {count == 1 && (
          <Button
            className={styles.PrevBtn}
            variant="primary"
            size="lg"
            disabled
          >
            이전
          </Button>
        )}
        {console.log(answer)}
        {count < 3 && (
          <Button
            className={styles.NextBtn}
            onClick={() => {
              {
                aaa = [];
                data.map((q, i) => {
                  aaa.push(
                    isclick1[data_copy[i].number - 1] ||
                      isclick2[data_copy[i].number - 1]
                  );
                  aaa.includes(false) ? setCount(count) : setCount(count + 1);
                  aaa.includes(false) && handleShow();
                });
              }
            }}
            variant="primary"
            size="lg"
          >
            다음
          </Button>
        )}
        {count == 3 && (
          <Button
            className={styles.NextBtn}
            variant="primary"
            size="lg"
            onClick={sendData}
          >
            검사완료
          </Button>
        )}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
