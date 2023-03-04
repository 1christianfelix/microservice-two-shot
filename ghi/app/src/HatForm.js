import React, { useState, useEffect } from "react";

const HatForm = () => {
  //creating states
  const [color, setColor] = useState("");
  const [fabric, setFabric] = useState("");
  const [styleName, setStyleName] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);

  //fetching data
  const fetchData = async () => {
    const url = "http://localhost:8100/api/locations/";
    const response = await fetch(url);
    //set up dropdown list
    if (response.ok) {
      const data = await response.json();
      setLocations(data.locations);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //handlerfunctions
  const handleColorChange = (event) => {
    const value = event.target.value;
    setColor(value);
  };

  const handleFabricChange = (event) => {
    const value = event.target.value;
    setFabric(value);
  };

  const handleStyleNameChange = (event) => {
    const value = event.target.value;
    setStyleName(value);
  };

  const handlePictureURLChange = (event) => {
    const value = event.target.value;
    setPictureURL(value);
  };

  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
  };

  //form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      color: color,
      fabric: fabric,
      style_name: styleName,
      picture_url: pictureURL,
      location: location,
    };

    //POSTING to database
    const hatUrl = "http://localhost:8090/api/hats/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      header: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(hatUrl, fetchConfig);
    if (response.ok) {
      const newHat = await response.json();
      console.log(newHat);
      setColor("");
      setFabric("");
      setLocation("");
      setPictureURL("");
      setStyleName("");
    }
  };

  //return JSX
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Store a Hat</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input
                name="color"
                placeholder="Color"
                required
                type="text"
                id="color"
                className="form-control"
                onChange={handleColorChange}
                value={color}
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="fabric"
                placeholder="Fabric"
                required
                type="text"
                id="fabric"
                className="form-control"
                onChange={handleFabricChange}
                value={fabric}
              />
              <label htmlFor="fabric">Fabric</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="style_name"
                placeholder="Style Name"
                required
                type="text"
                id="style_name"
                className="form-control"
                onChange={handleStyleNameChange}
                value={styleName}
              />
              <label htmlFor="style_name">Style Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="picture_url"
                placeholder="Picture Url"
                required
                type="text"
                id="picture_url"
                className="form-control"
                onChange={handlePictureURLChange}
                value={pictureURL}
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
              <select
                required
                name="location"
                id="location"
                className="form-select"
                onChange={handleLocationChange}
                value={location}
              >
                <option value="">Choose a location</option>
                {locations.map((location) => {
                  return (
                    <option key={location["href"]} value={location["href"]}>
                      {location.closet_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Store</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HatForm;
