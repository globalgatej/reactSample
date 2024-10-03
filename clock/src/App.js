import React, {useEffect, useRef} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const radius = Math.min(canvas.width, canvas.height) / 2;
    // 初回だけtranslateを行う
    ctx.save();
    ctx.translate(radius, radius); // キャンバスの中心を (0, 0) に設定
    const clockRadius = radius * 0.9;

    const drawClock = () => {
      ctx.clearRect(-radius, -radius, canvas.width, canvas.height); // 既存の描画をクリア
      drawFace(ctx, clockRadius);
      drawNumbers(ctx, clockRadius);
      drawTime(ctx, clockRadius);
    };

    const drawFace = (ctx, radius) => {
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, 2 * Math.PI);
      ctx.fillStyle = 'white';
      ctx.fill();

      ctx.strokeStyle = '#333';
      ctx.lineWidth = radius * 0.05;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
      ctx.fillStyle = '#333';
      ctx.fill();
    };

    const drawNumbers = (ctx, radius) => {
      ctx.font = `${radius * 0.15}px arial`;
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';

      for (let num = 1; num <= 12; num++) {
        const ang = ((num * Math.PI) / 6) - Math.PI / 2; // -90度（真上から開始）
        const x = radius * 0.85 * Math.cos(ang);
        const y = radius * 0.85 * Math.sin(ang);
        ctx.fillText(num.toString(), x, y);
      }
    };

    const drawTime = (ctx, radius) => {
      const now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();

      // Hour hand
      hour = hour % 12;
      hour =
        (hour * Math.PI) / 6 +
        (minute * Math.PI) / (6 * 60) +
        (second * Math.PI) / (360 * 60);
      drawHand(ctx, hour, radius * 0.5, radius * 0.07);

      // Minute hand
      minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
      drawHand(ctx, minute, radius * 0.8, radius * 0.07);

      // Second hand
      second = (second * Math.PI) / 30;
      drawHand(ctx, second, radius * 0.9, radius * 0.02, 'red');
    };

    const drawHand = (ctx, pos, length, width, color = '#333') => {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = 'round';
      ctx.strokeStyle = color;
      ctx.moveTo(0, 0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
    };

    const interval = setInterval(drawClock, 1000); // 1秒ごとに時計を描画
    drawClock(); // 初回描画

    return () => {
      clearInterval(interval); // コンポーネントのアンマウント時にクリア
      ctx.restore(); // translate状態を元に戻す
    };
  }, []);

  return (
    <div className="container">
      <div className="row py-4">
        <div className="col text-center">
          <h1 className="fs-2 fw-bold">アナログ時計</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-auto">
          <canvas
            ref={canvasRef}
            width="300"
            height="300" // 確実に正方形にするために幅と高さを指定
          />
        </div>
      </div>
    </div>
  );
}

export default App;