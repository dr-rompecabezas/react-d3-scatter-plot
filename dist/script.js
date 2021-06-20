const { useState, useEffect, useCallback } = React;

const titleLabel = "Doping in Professional Bicycle Racing";
const subtitleLabel = "35 Fastest times up Alpe d'Huez";

const width = 960;
const height = 500;
const margin = { top: 50, right: 20, bottom: 30, left: 110 };
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.right - margin.left;

// App Parent Component
const App = () => {
  data = useData();
  const [hoveredValue, setHoveredValue] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
  event => {
    const { clientX, clientY } = event;
    setMousePosition({ x: clientX, y: clientY });
  },
  [setMousePosition]);


  if (!data) {
    return /*#__PURE__*/React.createElement("pre", null, "Loading...");
  }

  const xValue = d => d.Year;
  const bottomAxisLabel = "Year";

  const yValue = d => d.Time;
  const leftAxisLabel = "Time in minutes";

  const yAxisTickFormat = d3.timeFormat("%M:%S");

  const xScale = d3.
  scaleLinear().
  domain(d3.extent(data, xValue)).
  range([0, innerWidth]).
  nice();

  const yScale = d3.
  scaleTime().
  domain(d3.extent(data, yValue)).
  range([0, innerHeight]).
  nice();

  const place = d => d.Place;
  const doping = d => d.Doping;

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement(Tooltip, {
      hoveredValue: hoveredValue,
      mousePosition: mousePosition,
      yAxisTickFormat: yAxisTickFormat }), /*#__PURE__*/

    React.createElement("div", { id: "viz-container" }, /*#__PURE__*/
    React.createElement("div", { id: "title" }, titleLabel), /*#__PURE__*/
    React.createElement("div", { id: "subtitle" }, subtitleLabel), /*#__PURE__*/
    React.createElement("div", { id: "left-axis-label" }, leftAxisLabel), /*#__PURE__*/
    React.createElement("div", { id: "bottom-axis-label" }, bottomAxisLabel), /*#__PURE__*/
    React.createElement(Legend, { innerWidth: innerWidth, innerHeight: innerHeight }), /*#__PURE__*/
    React.createElement("svg", { id: "svg", width: width, height: height }, /*#__PURE__*/
    React.createElement("g", { transform: `translate(${margin.left}, ${margin.top})` }, /*#__PURE__*/
    React.createElement("g", { id: "y-axis", className: "y-axis" }, /*#__PURE__*/
    React.createElement(AxisLeft, {
      yScale: yScale,
      innerWidth: innerWidth,
      yAxisTickFormat: yAxisTickFormat,
      tickOffset: 20 })), /*#__PURE__*/


    React.createElement("g", { id: "x-axis", className: "x-axis" }, /*#__PURE__*/
    React.createElement(AxisBottom, {
      xScale: xScale,
      innerHeight: innerHeight,
      tickOffset: 8 })), /*#__PURE__*/


    React.createElement(Marks, {
      data: data,
      xScale: xScale,
      xValue: xValue,
      yScale: yScale,
      yValue: yValue,
      place: place,
      doping: doping,
      setHoveredValue: setHoveredValue,
      handleMouseMove: handleMouseMove,
      circleRadius: 7 }))))));






};

// Tooltip Component
const Tooltip = ({ hoveredValue, mousePosition, yAxisTickFormat }) => {
  if (!hoveredValue) {
    return /*#__PURE__*/React.createElement("div", { id: "tooltip-container", style: { visibility: "hidden" } });
  } else {
    const xPosition = mousePosition.x;
    const yPosition = mousePosition.y;
    return /*#__PURE__*/(
      React.createElement("div", {
        id: "tooltip-container",
        style: { left: `${xPosition + 25}px`, top: `${yPosition - 25}px` } }, /*#__PURE__*/

      React.createElement("div", null, /*#__PURE__*/
      React.createElement("div", { id: "tooltip-name" },
      hoveredValue.Name, " (", hoveredValue.Nationality, ")"), /*#__PURE__*/

      React.createElement("hr", null), /*#__PURE__*/
      React.createElement("div", { id: "tooltip", "data-year": hoveredValue.Year }, /*#__PURE__*/
      React.createElement("div", null, "Year: ", hoveredValue.Year), /*#__PURE__*/
      React.createElement("div", null, "Place: ", hoveredValue.Place), /*#__PURE__*/
      React.createElement("div", null, "Time: ", yAxisTickFormat(hoveredValue.Time), " ")), /*#__PURE__*/

      React.createElement("div", { id: "tooltip-doping" },
      !hoveredValue.Doping ?
      "No doping allegations" :
      hoveredValue.Doping), /*#__PURE__*/

      React.createElement("div", null))));



  }
};

// Marks (Dots) Component
const Marks = ({
  data,
  xScale,
  xValue,
  yScale,
  yValue,
  place,
  doping,
  setHoveredValue,
  handleMouseMove,
  circleRadius }) =>

data.map((d, i) => /*#__PURE__*/
React.createElement(React.Fragment, null, /*#__PURE__*/
React.createElement("circle", {
  key: place(d),
  id: "place" + place(d),
  "data-xvalue": xValue(d),
  "data-yvalue": yValue(d),
  className: "dot",
  cx: xScale(xValue(d)),
  cy: yScale(yValue(d)),
  r: circleRadius,
  fill: doping(d) ? "#E25A42" : "#6BBBA1",
  onMouseEnter: () => setHoveredValue(d),
  onMouseLeave: () => setHoveredValue(null),
  onMouseMove: handleMouseMove })));




// AxisLeft Component
const AxisLeft = ({ yScale, innerWidth, yAxisTickFormat, tickOffset }) =>
yScale.ticks().map((tickValue) => /*#__PURE__*/
React.createElement("g", {
  key: tickValue,
  className: "tick",
  transform: `translate(0,${yScale(tickValue)})` }, /*#__PURE__*/

React.createElement("line", { x2: innerWidth, stroke: "#f1f2f3" }), /*#__PURE__*/
React.createElement("text", { style: { textAnchor: "end" }, x: -tickOffset, dy: ".32em" },
yAxisTickFormat(tickValue))));




// AxisBottom Component
const AxisBottom = ({ xScale, innerHeight, tickOffset }) =>
xScale.ticks().map((tickValue) => /*#__PURE__*/
React.createElement("g", {
  key: tickValue,
  className: "tick",
  transform: `translate(${xScale(tickValue)},0)` }, /*#__PURE__*/

React.createElement("line", { y2: innerHeight, stroke: "#f1f2f3" }), /*#__PURE__*/
React.createElement("text", {
  style: { textAnchor: "middle" },
  dy: ".71em",
  y: innerHeight + tickOffset },

tickValue)));




// Legend Component
const Legend = ({ innerWidth, innerHeight }) => /*#__PURE__*/
React.createElement("div", {
  id: "legend",
  style: { left: `${innerWidth * 0.82}px`, top: `${innerHeight * 0.32}px` } }, /*#__PURE__*/

React.createElement("div", { id: "doping-label" }, /*#__PURE__*/
React.createElement("div", { style: { paddingRight: "5px" } }, "Riders with doping allegations"), /*#__PURE__*/
React.createElement("div", { id: "doping-dot" })), /*#__PURE__*/

React.createElement("div", { id: "clean-label" }, /*#__PURE__*/
React.createElement("div", { style: { paddingRight: "5px" } }, "No doping allegations"), /*#__PURE__*/
React.createElement("div", { id: "clean-dot" })));




// useData custom Hook
const useData = () => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

  useEffect(() => {
    d3.json(url).then(json => {
      setData(json);
    });
  }, []);

  useEffect(() => {
    if (data) {
      data.forEach(d => {
        let minutes = d.Time.substring(0, 2);
        let seconds = d.Time.substring(3);
        d.Time = new Date(1976, 6, 28, 0, minutes, seconds);
      });
      setLoaded(true);
    }
  }, [data]);

  return data;
};

const rootElement = document.getElementById("root");
ReactDOM.render( /*#__PURE__*/React.createElement(App, null), rootElement);