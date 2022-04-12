import React from "react";

export default function From() {
  const [timer, setTimer] = React.useState({
    minutes: 1,
    seconds: 0,
  });

  const [password, setPassword] = React.useState("");
  const [label, setLabel] = React.useState("");
  const [login, setLogin] = React.useState({
    rotate: false,
    display: false,
    door: false,
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const checkPassword = (e) => {
    e.preventDefault();
    const pass = e.target.children[1].value;
    if (pass === "123445") {
      setLabel("");
      setLogin((prevValue) => ({ ...prevValue, rotate: !prevValue.rotate }));
      setTimeout(() => {
        setLogin((prevValue) => ({
          ...prevValue,
          display: !prevValue.display,
        }));
      }, 1000);
    } else {
      setLabel("Wrong password try again!!");
    }
  };

  React.useEffect(() => {
    const time = setTimeout(() => {
      const { minutes, seconds } = timer;
      if (seconds > 0) {
        setTimer((prevValue) => ({
          ...prevValue,
          seconds: prevValue.seconds - 1,
        }));
      } else if (seconds === 0) {
        if (minutes === 0) {
          setLogin((prevValue) => ({
            ...prevValue,
            rotate: !prevValue.rotate,
          }));
          setTimeout(() => {
            setLogin((prevValue) => ({
              ...prevValue,
              display: !prevValue.display,
            }));
          }, 1000);
          return clearTimeout(time);
        } else {
          setTimer((prevValue) => ({
            ...prevValue,
            minutes: prevValue.minutes - 1,
            seconds: 59,
          }));
        }
      }
    }, 1000);
  }, [timer]);

  const handleSignOut = () => {
    setLogin((prevValue) => ({ ...prevValue, rotate: !prevValue.rotate }));
    setTimeout(() => {
      setLogin((prevValue) => ({
        ...prevValue,
        display: !prevValue.display,
      }));
    }, 1000);
  };

  return (
    <div className="security-screen">
      <div className={`slide-door ${login.rotate ? "left" : ""}`}></div>
      <div className="logged-in">
        <h1>Welcome to main page</h1>
        <p>
          Either stay signed in or you can sign out by clicking the button
          below.Do fast before the timer reach to zero
        </p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
      <div style={{ display: `${login.display ? "none" : ""}` }}>
        <div className={`item2 ${login.rotate ? "rotate" : ""}`}>
          <img alt="fingerPrint" src="logo191.png" />
          <form onSubmit={checkPassword}>
            <p>ENTER YOUR PILEARNING PASSWORD</p>
            <input
              type="password"
              value={password}
              name="Password"
              id="Password"
              onChange={handleChange}
            />
            <label for="Password">{label}</label>
            <button>Enter Lab</button>
          </form>
        </div>
      </div>
      <div className={`slide-door ${login.rotate ? "right" : ""}`}></div>
      <div className="countdown">
        {timer.minutes}:
        {timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}
      </div>
    </div>
  );
}
