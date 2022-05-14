import React, {useState, useEffect,useRef} from 'react';
import logo from './logo.svg';
import './App.css';

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

const initPos = [window.innerHeight/2 -100, window.innerWidth/2 - 100]

const initV = [300,200]



function App() {
  const [pos, setpos] = useState(initPos)
  const [vVector, setvVector] = useState(initV)
  const [count, setcount] = useState(0)
  const [time, setTime] = useState("");
  const [int, setint] = useState(0)

  const calc = (p,v) => {
   
    const sh = window.innerHeight 
    const sw = window.innerWidth
    let [x0, y0] = p
    const [vx, vy] = v
    const w = (vx<0)? x0 : sw-x0 
    const h = (vy<0)? y0 : sh-y0 
    let xf, yf, vxf, vyf
    if (Math.abs(w/vx) < Math.abs(h/vy)) {
      xf = (vx<0)? 0 : sw 
      console.log(x0,xf)
      yf = (vy/vx)*(xf - x0) + y0
      vxf = -vx
      vyf = vy
    }else {
      yf = (vy<0)? 0 : sh
      xf = (vx/vy)*(yf - y0) + x0
      vxf = vx
      vyf = -vy
    }

    const d = Math.sqrt((x0-xf)**2 + (y0-yf)**2)
    const vf = Math.sqrt(vx*vx + vy*vy)
    const tf = d/vf
    const posf = [xf,yf]
    const vVectorf = [vxf,vyf]


    return {posf, vVectorf,tf}
  }

  const tick = (p,v) => {

    const { posf, vVectorf, tf } = calc(pos,vVector)
    const time = `all ${tf}s linear`
    setcount(count-1)
    setint(tf*1000)
    setpos(posf)
    setvVector(vVectorf)
    setTime(time)
  }

  useInterval(tick, int);
  // useEffect(() => {
  //   const interval = setInterval( () => tick(), 3000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="App">
      <header className="App-header">
          <img 
            style={{position:"absolute", top:(window.innerHeight-pos[1]) * (window.innerHeight-200)/window.innerHeight, left:(pos[0]*(window.innerWidth-200)/window.innerWidth), transition:time}}
            src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" 
            width="200" height="200"
          />
      </header>
    </div>
  );
}

export default App;
