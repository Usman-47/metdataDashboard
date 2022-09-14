import React, { useState, useEffect } from "react";
import "./todoPage.css";
import "font-awesome/css/font-awesome.min.css";
import axios from "axios";
import MetaData from "./MetaData";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MetaDatas() {
  const [searchValue, setSearchValue] = useState();
  const [traitSearchValue, setTraitSearchValue] = useState();
  const [searchData, setSearchData] = useState();
  const [swap1, setSwap1] = useState();
  const [swap2, setSwap2] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLogin, setIsLogin] = useState();
  const [countResult, setCountResult] = useState();
  const [specificFileldsResults, setSpecificFileldsResults] = useState();
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

        for (let i = 0; i < countTraitArray.length; i++) {
          let result = await axios.get(
            `http://localhost:5000/api/v1/metadata/countNumberOfTrait/${countTraitArray[i]}`
          );
          tempArray.push({ data: countTraitArray[i], count: result.data });
        }

        setCountResult(tempArray);
      };
      const getResultWithSpecificFeilds = async () => {
        let spcificFieldResult = await axios.get(
          `http://localhost:5000/api/v1/metadata/getAllResultWithSpecificData`
        );
        setSpecificFileldsResults(spcificFieldResult?.data);
      };
      getResultWithSpecificFeilds();
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
        if (response.data) {
          toast.success("Data Found", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Data Not Found", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
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
        if (response.data) {
          toast.success("Data Found", {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.error("Data Not Found", {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err, {
          position: toast.POSITION.TOP_CENTER,
        });
      });
    event.preventDefault();
  };

  const handleSwap = (event) => {
    try {
      event.preventDefault();

      if ((swap1 && swap1.length < 1) || (swap2 && swap2.length < 1)) {
        toast.error("Please enter both value", {
          position: toast.POSITION.TOP_CENTER,
        });
        return;
      }
      if (swap1?.length !== swap2?.length) {
        toast.error("Please enter both value in same length", {
          position: toast.POSITION.TOP_CENTER,
        });

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
                      .then(function (response) {
                        if (
                          response.data.data.modifiedCount &&
                          response.data.data.modifiedCount >= 1
                        ) {
                          toast.success(`Swap successfully`, {
                            position: toast.POSITION.TOP_CENTER,
                          });
                        } else {
                          toast.error("Swap Failed", {
                            position: toast.POSITION.TOP_CENTER,
                          });
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                        toast.error(err, {
                          position: toast.POSITION.TOP_CENTER,
                        });
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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "kinglion@proudlionclub.com" && password === "HiC^FOl!L&Q4") {
      setIsLogin(true);
      toast.success("Login Successfully");
    } else {
      toast.error("Login Failed");
      // toast.error(`Incorrect Email / Password`);
      // toast.error("Login Failed", {
      //   position: toast.POSITION.TOP_CENTER,
      // });
      console.log("failed");
      setIsLogin(false);
    }
  };
  return (
    <>
      {isLogin ? (
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
          <table>
            <tr>
              <th>File</th>
              <th>Rarity</th>
              <th>Sex</th>
            </tr>
            {specificFileldsResults &&
              specificFileldsResults.map((data, i) => (
                <tr>
                  <td>{++i}</td>
                  <td>{data.attributes[0].value}</td>
                  <td>{data.attributes[1].value}</td>
                </tr>
              ))}
          </table>
          <ToastContainer />
        </div>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>Login to Admin Panel</h1>
          <div
            style={{
              width: 375,
              display: "flex",
              flexDirection: "column",
              padding: 20,
              marginTop: 40,
              backgroundColor: "rgba(0,0,0,0.5)",
              borderRadius: 30,
              marginRight: "auto",
              marginLeft: "auto",
              textAlign: "center",
              alignItems: "center",
            }}
          >
            <label className="whiteColor">
              Email: <br />
              <input
                type="text"
                name="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label className="whiteColor">
              Password: <br />
              <input
                type="password"
                name="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              style={{ marginTop: 20, width: 100, borderRadius: 30 }}
              onClick={handleLogin}
            >
              {" "}
              Login{" "}
            </button>
          </div>
          <ToastContainer />
        </>
      )}
    </>
  );
}
