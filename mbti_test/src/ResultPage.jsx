import React from "react";
import styles from "./styles/ResultPage.module.css";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const result = location.state.result;
  console.log(result);
  return (
    <div className={styles.Container}>
      <div className={styles.ResWrap}>
        <p className={styles.Text}>MBTI 테스트를 모두 마치셨습니다.</p>
        <Button className={styles.Btn} variant="success">
          <a className={styles.Link} target="_blank" href={result}>
            결과보러가기
          </a>
        </Button>
        <br />
        <Button
          className={styles.Btn}
          style={{ marginTop: "1.5%" }}
          variant="dark"
        >
          <Link className={styles.Link} to="/">
            다시 테스트하기
          </Link>
        </Button>
      </div>
    </div>
  );
}
