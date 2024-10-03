import React, {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [message, setMessage] = useState('');

  // BMIを計算する関数
  const calculateBMI = (e) => {
    e.preventDefault();

    // 身長と体重が入力されていない場合は計算しない
    if (!height || !weight) {
      setMessage('身長と体重を入力してください');
      return;
    }

    // BMIの計算
    const heightInMeters = height / 100; // 身長をcmからmに変換
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    setBmi(bmiValue);

    // BMIの範囲に応じてメッセージを設定
    if (bmiValue < 18.5) {
      setMessage('低体重です');
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setMessage('標準体重です');
    } else {
      setMessage('過体重です');
    }
  };


  return (
    <div className="container">
      <div className="row py-3">
        <div className="col-12 text-center">
          <h1>BMI計算機</h1>
        </div>
      </div>
      <div className="row align-items-center">
        <div className="col-auto">
          身長：
        </div>
        <div className="col">
          <input className="form-control"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="身長を入力"

          />
        </div>
        <div className="col-auto">
          cm
        </div>
        <div className="col-auto">
          体重：
        </div>
        <div className="col">
          <input className="form-control"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="体重を入力" />
        </div>
        <div className="col-auto">
          kg
        </div>
      </div>

      <div className="row justify-content-center mt-4">
        <div className="col-auto">
          <button className="btn btn-primary"
            onClick={calculateBMI}
          >
            BMIを計算する
          </button>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col text-center">
          <div>
            あなたのBMIは<span className="strong fs-3">{bmi}</span>
          </div>
          <div className="fs-4 mt-4">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
