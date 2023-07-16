import { useEffect, useMemo, useState } from "react";

import "./header.scss";

export const TopMenu = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const getMinuts = useMemo(() => {
    if (time.getMinutes() < 10) {
      return `0${time.getMinutes()}`;
    } else {
      return time.getMinutes();
    }
  }, [time]);

  const getHours = useMemo(() => {
    if (time.getHours() < 10) {
      return `0${time.getHours()}`;
    } else {
      return time.getHours();
    }
  }, [time]);

  return (
    <header className="header">
      <div className="header_wrapper">
        <div className="header_logo">
          <span>Inventory</span>
        </div>
        <label className="header_search">
          <input type="text" placeholder="Search" />
        </label>
      </div>
      <div className="header_time">
        <div className="header_time__data">
          <span className="header_time__day">
            {time.toLocaleString("en-US", { weekday: "long" })}
          </span>
          <span>{`${time.getDate()} ${time.toLocaleString("en-US", {
            month: "short",
          })} ${time.getFullYear()}`}</span>
        </div>
        <span className="header_time__hours">{`${getHours}:${getMinuts}`}</span>
      </div>
    </header>
  );
};
