import React, {useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  const [price, setPrice] = useState('300');
  const [send, setSend] = useState('');
  const [rate, setRate] = useState('10');
  const [cost, setCost] = useState('');
  const [profit, setProfit] = useState('');

  const checkCost = (e) => {
    e.preventDefault();
    const priceNumber = parseInt(price)
    const sendNumber = parseInt(send)
    const rateNumber = parseInt(rate)

    const calculatedCost = parseInt(priceNumber * (rateNumber / 100))
    setCost(calculatedCost)

    setProfit((priceNumber - calculatedCost - sendNumber))





  }

  return (
    <div className="container">
      <div className="row py-4">
        <div className="col text-center">
          <h1 class="fw-bold fs-2">メルカリ手数料計算機</h1>
        </div>
      </div>

      <div className="row align-items-center justify-content-center py-2">

        <div className="col-2">
          販売価格

        </div>
        <div className="col-auto">
          <input type="number" min="300" className="form-control"
            style={{
              width: '200px'
            }}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="col-auto">円</div>
      </div>

      <div className="row align-items-center  justify-content-center py-2">

        <div className="col-2">
          送料
        </div>
        <div className="col-auto">
          <input type="number" min="0" className="form-control"
            style={{
              width: '200px'
            }}
            value={send}
            onChange={(e) => setSend(e.target.value)}
          />
        </div>        <div className="col-auto">円</div>

      </div>

      <div className="row align-items-center  justify-content-center py-2">

        <div className="col-2">
          手数料率
        </div>
        <div className="col-auto">
          <input type="number" min="0" className="form-control"
            style={{
              width: '200px'
            }}
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>
        <div className="col-auto">%</div>
      </div>

      <div className="row justify-content-center py-2">
        <div className="col-auto">
          <button className="btn btn-primary"
            onClick={checkCost}
          >
            計算する
          </button>
        </div>
      </div>

      <div className="row pt-4">
        <div className="col-12 text-center">
          手数料は<span className="fs-2 fw-bold px-1">{cost}</span>円、利益は<span className="fs-2 fw-bold px-1">{profit}</span>円です。
        </div>

      </div>

    </div>
  );
}

export default App;
