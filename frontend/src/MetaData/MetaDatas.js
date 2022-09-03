import React, { useState, useEffect } from "react";
import "./todoPage.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import MetaData from "./MetaData";

export default function MetaDatas() {
  const [searchValue, setSearchValue] = useState();
  const [traitSearchValue, setTraitSearchValue] = useState();
  const [searchData, setSearchData] = useState();
  const [swap1, setSwap1] = useState();
  const [swap2, setSwap2] = useState();
  const [countResult, setCountResult] = useState();
  const [countTraitArray, setCountTraitArray] = useState([
    "Male",
    "Female",
    "Omega",
    "Gamma",
    "Delta",
    "Beta",
  ]);
  useEffect(() => {
    try {
      const getResult = async () => {
        let tempArray = [];
        // countTraitArray?.map(async (data, i, arr) => {
        //   let result = await axios.get(
        //     `http://localhost:5000/api/v1/metadata/countNumberOfTrait/${data}`
        //   );
        //   tempArray.push({ data, count: result.data });
        //   if (arr.length - 1 === i) {
        //     setCountResult(tempArray);
        //   }
        // });

        for (let i = 0; i < countTraitArray.length; i++) {
          let result = await axios.get(
            `http://localhost:5000/api/v1/metadata/countNumberOfTrait/${countTraitArray[i]}`
          );
          tempArray.push({ data: countTraitArray[i], count: result.data });
        }
        // Promise.all(tempArray).then(() => {
        setCountResult(tempArray);
        // });
      };
      getResult();
    } catch (err) {
      console.log(err.message);
      alert(err.message);
    }
  }, []);

  const handleSearch = (event) => {
    axios
      .get(`http://localhost:5000/api/v1/metadata/${searchValue}`)
      .then(function (response) {
        let tempArray = [];
        tempArray.push(response.data);
        setSearchData(tempArray);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    event.preventDefault();
  };

  const handleTraitSearch = (event) => {
    axios
      .get(
        `http://localhost:5000/api/v1/metadata/getByTrait/${traitSearchValue}`
      )
      .then(function (response) {
        setSearchData(response.data);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
    event.preventDefault();
  };

  const handleSwap = (event) => {
    try {
      event.preventDefault();

      if (!swap1 || !swap2) {
        alert("Please enter both value");
        return;
      }
      if (swap1?.length !== swap2?.length) {
        alert("Please enter both value in same length");
        return;
      }
      swap1?.map((v1, i1) => {
        swap2?.map((v2, i2) => {
          if (i1 === i2) {
            var SwapIdFor2;

            axios
              .get(`http://localhost:5000/api/v1/metadata/${v2}`)
              .then(function (response) {
                SwapIdFor2 = response?.data?._id;

                axios
                  .patch(`http://localhost:5000/api/v1/metadata/${v1}`, {
                    searchData: { name: `Proud Lions Club #${v2}` },
                  })
                  .then(function (response) {
                    let body = {
                      name: v1,
                    };
                    axios
                      .patch(
                        `http://localhost:5000/api/v1/metadata/updateMetadataById/${SwapIdFor2}`,
                        body
                      )
                      .then(function (response) {})
                      .catch((err) => {
                        console.log(err);
                        alert(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                    alert(err);
                  });
              })
              .catch((err) => {
                console.log(err);
                alert(err);
              });
          }
        });
      });
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className="todo-container">
      <div>
        <h3 className="display-1 text-white">Stats</h3>
        {countResult &&
          countResult?.map((data) => (
            <>
              <div>{`${data.data} : ${data.count}`}</div>
              <br />
            </>
          ))}

        <h3 className="display-1 text-white">Update MetaData</h3>
        <form>
          <label>
            Name :
            <input
              type="text"
              name="name"
              value={searchValue}
              onChange={(event) => {
                setSearchValue(`${event.target.value}`);
                setTraitSearchValue("");
              }}
            />
          </label>
          <input type="submit" value="Search" onClick={handleSearch} />
        </form>
        <br />
        <form>
          <label>
            Trait :
            <input
              type="text"
              name="name"
              value={traitSearchValue}
              onChange={(event) => {
                setTraitSearchValue(`${event.target.value}`);
                setSearchValue("");
              }}
            />
          </label>
          <input type="submit" value="Search" onClick={handleTraitSearch} />
        </form>
        <br />

        {searchData &&
          searchData?.map((data) => (
            <>
              <MetaData
                data={data}
                searchValue={
                  searchValue
                    ? searchValue
                    : data?.name?.replace("Proud Lions Club #", "")
                }
              />
              <br />
              <br />
            </>
          ))}

        <h3 className="display-1 text-white">Swap Metadata</h3>
        <form>
          <label>
            Name #1:
            <input
              type="text"
              name="name"
              onChange={(e) => setSwap1(e?.target?.value?.split(","))}
            />
          </label>
          <label>
            Name #2:
            <input
              type="text"
              name="name"
              onChange={(e) => setSwap2(e?.target?.value?.split(","))}
            />
          </label>
          <br />
          <input type="submit" value="Swap" onClick={handleSwap} />
        </form>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}
