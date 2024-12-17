import React, { useEffect, useState } from "react";
//import "./index.css";
//const classNames = require("classnames");

const FootballMatchesData = () => {
  const [selectedYear, setSelectedYear] = React.useState("2011");
  const url = "https://jsonmock.hackerrank.com/api/football_competitions";
  const [dataArr, setDataArr] = useState([]);
  const [dataSelect, setDataSelect] = useState(undefined);
  const onclick = (year) => {
    setSelectedYear(year);
  };

  useEffect(() => {
    async function fetchData() {
      await fetch(`${url}?year=${selectedYear}`)
        .then((res) => res.json())
        .then((data) => setDataArr(data))
        .catch((err) => {});
    }
    fetchData();
  }, [selectedYear]);

  useEffect(() => {
    const dataFind = dataArr?.data;
    const selectData =
      (dataFind && dataFind?.filter((item) => item?.year === selectedYear)) ||
      [];
    if (selectData.length > 0) {
      setDataSelect({ total: dataArr.total, data: dataFind || [] });
    }
  }, [dataArr]);

  let years = [2011, 2012, 2013, 2014, 2015, 2016, 2017];

  return (
    <div className="layout-row">
      <div className="section-title">Select Year</div>
      <ul className="sidebar" data-testid="year-list">
        {years.map((year) => {
          return (
            <li
              //   style={classNames({
              //     "sidebar-item": true,
              //     active: selectedYear === year,
              //   })}
              onClick={() => onclick(year)}
              key={year}
            >
              <a>{year}</a>
            </li>
          );
        })}
      </ul>

      <section className="content">
        {dataSelect !== undefined ? (
          <section>
            <div className="total-matches" data-testid="total-matches">
              Total Matches : {dataSelect.total}
            </div>

            <ul className="mr-20 matches styled" data-testid="match-list">
              {dataSelect?.data.length > 0 &&
                dataSelect?.data?.map((ele, index) => {
                  return (
                    <li key={index} className="slide-up-fade-in">
                      Match {ele?.name} won by {ele?.winner}{" "}
                    </li>
                  );
                })}
            </ul>
          </section>
        ) : (
          <div data-testid="no-result" className="slide-up-fade-in no-result">
            No Results Found
          </div>
        )}
      </section>
    </div>
  );
};

export default FootballMatchesData;
