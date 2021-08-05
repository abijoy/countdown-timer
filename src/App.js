import "./App.css";
import React from "react";
import Play from "./SVG-Icons/Play.svg"
import Cancel from "./SVG-Icons/cancel.svg"
import Pause from "./SVG-Icons/Pause.svg"

import Lol from './SVG-Icons/Pause.svg'
class App extends React.Component {
  constructor(props) {
    super(props);

    // creating a ref for the play/pause button
    this.btnRef = React.createRef();

    this.state = {
      timerLength: "05",
      timeMinD1: "0",
      timeMinD2: "5",
      timeSecD1: "0",
      timeSecD2: "0",
      paused: false
    };

    this.baseState = this.state;

    this.handleTimer = this.handleTimer.bind(this);
    this.cancelTimer = this.cancelTimer.bind(this);
    this.onTimer = this.onTimer.bind(this);
    this.offTimer = this.offTimer.bind(this);
  }

  cancelTimer = () => {
    // stop the timer
    this.offTimer();

    this.setState({
      timerLength: "00",
      timeMinD1: "0",
      timeMinD2: "0",
      timeSecD1: "0",
      timeSecD2: "0",
      paused: false
    });

    // change the button value
    let ppNode = this.btnRef.current;
    ppNode.firstElementChild.src = Play;
    ppNode.lastElementChild.textContent = "Reset";
  };

  onTimer() {
    let totalSec = this.state.timerLength * 60;
    this.timer = setInterval(() => {
      if (!this.state.paused) {
        return;
      }

      if (this.state.paused) {
        let min = Math.floor(totalSec / 60);
        let sec = Math.floor(totalSec % 60);

        totalSec -= 1;

        let timeMin = min > 9 ? min.toString() : "0" + min.toString()
        let timeSec = sec > 9 ? sec.toString() : "0" + sec.toString()


        // now change the minutes and seconds
        this.setState({
          timeMinD1: timeMin[0],
          timeMinD2: timeMin[1],
          timeSecD1: timeSec[0],
          timeSecD2: timeSec[1],
        });

        if (totalSec < 0) {
          this.offTimer();
          // change the button value
          let ppNode = this.btnRef.current;
          ppNode.firstElementChild.src = Play;
          ppNode.lastElementChild.textContent = "Reset";
        }
      }
    }, 1000);
  }

  offTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  handleTimer() {
    // change the button value
    let ppNode = this.btnRef.current;
    let imgNode = ppNode.firstElementChild
    let btnNode = ppNode.lastElementChild

    console.log(btnNode.textContent);
    if (btnNode.textContent === "Reset") {
      this.setState(this.baseState);
      imgNode.src = Play;
      btnNode.textContent = "Play";
      return;
    }
    else if (btnNode.textContent === "Play") {
      imgNode.src = Pause;
      btnNode.textContent = "Pause"
    }
    else {
      imgNode.src = Play
      btnNode.textContent = "Play"
    }


    this.setState(
      (prev) => ({
        ...prev,
        paused: !prev.paused
      }),
      () => !this.timer && this.onTimer()
    );
  }

  render() {
    return (
      <>
        <div class="timer">
          <h3>Time of Timer goes here</h3>
          <div class="countdown-container">
              
              <div class="timer-container">
                  <div class="digit">{this.state.timeMinD1}</div>
                  <div class="digit">{this.state.timeMinD2}</div>

                  <div class="digit1">:</div>

                  <div class="digit">{this.state.timeSecD1}</div>
                  <div class="digit">{this.state.timeSecD2}</div>

              </div>
              <br/>

              <div class="controls">
                  <div class="pp" onClick={this.handleTimer} ref={this.btnRef}>
                      <img class="control-icon" src={Play} alt="play/pause" />
                      <figcaption>Play</figcaption>
                  </div>

                  <div class="pp" onClick={this.cancelTimer}>
                      <img class="control-icon" src={Cancel} alt="cancel"/>
                      <figcaption>Cancel</figcaption>
                  </div>
            </div>
              <br /><br /><br />
          </div>
        <h4>About this timer:</h4>
        <ul>
            <li>Counting down from <span id="timer-limit">5:00</span></li>
            <li>No green or yellow indicators</li>
            <li>Visible only to host</li>
        </ul>
      </div>
      </>
    );
  }
}

export default App;
