import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MetaData({ data, searchValue }) {
  const [searchData, setSearchData] = useState();

  useEffect(() => {
    if (data) {
      setSearchData(data);
    }
  }, [data]);

  const handleUpdate = (event) => {
    let body = {
      searchData,
    };
    axios
      .patch(`http://localhost:5000/api/v1/metadata/${searchValue}`, body)
      .then(function (response) {
        if (response?.data?.data?.acknowledged) {
        } else {
          alert("Something went wrong");
        }
      });
    event.preventDefault();
  };

  const handleChangeForAttributes = (e, i) => {
    let tempArray = [...searchData?.attributes];
    let trait_type = tempArray[i].trait_type;
    tempArray[i] = { trait_type, value: e.target.value };
    setSearchData((prev) => ({
      ...prev,
      attributes: tempArray,
    }));
  };
  return (
    <form>
      <label>
        Sex:
        <input
          name="name"
          type="text"
          value={searchData?.Sex}
          onChange={(e) =>
            setSearchData((prev) => ({
              ...prev,
              Sex: e.target.value,
            }))
          }
        />
      </label>
      <br />
      <label>
        Image:
        <input
          name="name"
          type="text"
          value={searchData?.image}
          onChange={(e) =>
            setSearchData((prev) => ({
              ...prev,
              image: e.target.value,
            }))
          }
        />
      </label>
      <br />
      <label>
        Name:
        <input
          name="name"
          type="text"
          value={searchData?.name}
          onChange={(e) =>
            setSearchData((prev) => ({
              ...prev,
              name: e.target.value,
            }))
          }
        />
      </label>
      <br />
      <label>
        Description:
        <input
          name="name"
          type="text"
          value={searchData?.description}
          onChange={(e) =>
            setSearchData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </label>
      <br />
      <label>
        <br />
        Attributes:
        {searchData?.attributes?.map((data, i) => (
          <>
            <br />
            <input
              name="name"
              type="text"
              value={data?.trait_type}
              disabled={true}
            />
            <input
              name="name"
              type="text"
              value={data?.value}
              onChange={(e) => handleChangeForAttributes(e, i)}
            />
          </>
        ))}
      </label>
      <br />
      <br />

      <label>
        Dna:
        <input
          name="name"
          type="text"
          value={searchData?.dna}
          onChange={(e) =>
            setSearchData((prev) => ({
              ...prev,
              dna: e.target.value,
            }))
          }
        />
      </label>
      <br />
      <label>
        Edition:
        <input
          name="name"
          type="text"
          value={searchData?.edition}
          onChange={(e) =>
            setSearchData((prev) => ({
              ...prev,
              edition: e.target.value,
            }))
          }
        />
      </label>
      <br />
      <label>
        Compiler:
        <input
          name="name"
          type="text"
          value={searchData?.compiler}
          onChange={(e) =>
            setSearchData((prev) => ({
              ...prev,
              compiler: e.target.value,
            }))
          }
        />
      </label>
      <br />
      <input type="submit" value="Update" onClick={handleUpdate} />
    </form>
  );
}
