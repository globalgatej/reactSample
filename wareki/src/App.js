import React, {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [year, setYear] = useState('2024');
  const [era, setEra] = useState('');
  const [error, setError] = useState('');

  // 和暦に変換する関数
  const convertToEra = (e) => {
    e.preventDefault();
    setError('');

    const yearNumber = parseInt(year);

    // 年が正しい範囲か確認
    if (isNaN(yearNumber) || yearNumber < 1868) {
      setError('1868年以降の西暦を入力してください');
      setEra('');
      return;
    }

    if (yearNumber >= 2019) {
      setEra(`令和 ${yearNumber - 2018}年`);
    } else if (yearNumber >= 1989) {
      setEra(`平成 ${yearNumber - 1988}年`);
    } else if (yearNumber >= 1926) {
      setEra(`昭和 ${yearNumber - 1925}年`);
    } else if (yearNumber >= 1912) {
      setEra(`大正 ${yearNumber - 1911}年`);
    } else if (yearNumber >= 1868) {
      setEra(`明治 ${yearNumber - 1867}年`);
    } else {
      setError('不明なエラーが発生しました');
    }
  };



  return (
    <div className="container">
      <div className="row py-4">
        <div className="col text-center">
          <h1>西暦を和暦に変換</h1>
        </div>
      </div>

      <div className="row text-center">
        <div className="col-12 py-3">
          西暦を入力してください。
        </div>
        <div className="col-12 py-3">
          <div className="row justify-content-center align-items-center">
            <div className="col-auto">

              <input type="number" min="1867" style={{
                width: '100px'
              }} className="form-control" value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
            <div className="col-auto">
              年
            </div>
          </div>
        </div>
        <div className="col-12 py-3">
          <button className="btn btn-primary" onClick={convertToEra}>
            計算する
          </button>
        </div>
        <div className="col-12">
          <div>和暦は</div>
          <div class="py-3 fs-2">
            {era || error}
          </div>
          <div>
            です
          </div>
        </div>
      </div>
    </div>);
}

export default App;
