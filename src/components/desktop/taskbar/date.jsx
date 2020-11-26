import React from "react";
import { connect } from "react-redux";

const TaskDate = ({ date }) => {
  const formatter = (val) => (val < 10 ? `0${val}` : val);
  const weekList = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat", "Sun"];
  const monthList = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="centralise">
      {weekList[date.getDay()]}, {monthList[date.getMonth()]}{" "}
      {formatter(date.getDate())}&nbsp;&nbsp;
      {formatter(date.getHours())}:{formatter(date.getMinutes())}
    </div>
  );
};

const mapStateToProps = (state) => ({
  date: state.desktopReducers.date,
});

export default connect(mapStateToProps)(TaskDate);
