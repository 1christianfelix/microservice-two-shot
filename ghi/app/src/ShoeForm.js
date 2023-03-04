import React, { useState, useEffect } from 'react';

const ShoeForm = () => {

  //creating states
  const [modelname, setModelname] = useState("");
  const [color, setColor] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [bins, setBins] = useState([]);
  const [bin, setBin] = useState("");

  //fetching data
  const fetchData = async () => {
    const url = "http://localhost:8100/api/bins/"
    const response = await fetch(url);

    //set up dropdown list
    if (response.ok) {
      const data = await response.json();
      setBins(data.bins);
    }

  };

  useEffect(() => {
    fetchData();
  }, []);

  //handlerfunction

  const handleModelname = (event) => {
    const value = event.target.value;
    setModelname(value)
  }
  const handleColor = (event) => {
    const value = event.target.value;
    setColor(value)
  }
  const handleManufacturer = (event) => {
    const value = event.target.value;
    setManufacturer(value)
  }
  const handlePictureURL = (event) => {
    const value = event.target.value;
    setPictureURL(value)
  }
  const handleBin = (event) => {
    const value = event.target.value;
    setBin(value)
  }

  //form submission

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = {
      model_name: modelname,
      color: color,
      manufacturer: manufacturer,
      pictureURL: pictureURL,
      bin: bin,

    };
  //POSTING to database
    const shoeURL = "http://localhost:8080/api/shoes/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      header: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(shoeURL, fetchConfig);
    if (response.ok) {
      const newShoe = await response.json();
      console.log(newShoe);
      setModelname("");
      setColor("");
      setManufacturer("");
      setPictureURL("");
      setBin("");
    }



  };




  //return JSX
  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create Shoes!</h1>
          <form onSubmit={handleSubmit} id="create-conference-form">
            <div className="form-floating mb-3">
              <input
                name="model_name"
                placeholder="Color"
                required
                type="text"
                id="model_name"
                className="form-control"
                onChange={handleModelname}
                value={modelname}
              />
              <label htmlFor="color">Model Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="color"
                placeholder="Fabric"
                required
                type="text"
                id="color"
                className="form-control"
                onChange={handleColor}
                value={color}
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="manufacturer"
                placeholder="Style Name"
                required
                type="text"
                id="manufacturer"
                className="form-control"
                onChange={handleManufacturer}
                value={manufacturer}
              />
              <label htmlFor="manufacturer">Manufacturer Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                name="pictureURL"
                placeholder="Style Name"
                required
                type="text"
                id="pictureURL"
                className="form-control"
                onChange={handlePictureURL}
                value={pictureURL}
              />
              <label htmlFor="pictureURL">Picture URL</label>
            </div>
            <div className="mb-3">
              <select
                required
                name="bin"
                id="bin"
                className="form-select"
                onChange={handleBin}
                value={bin}
              >

                <option value="">Where is it?</option>
                {bins.map((bin) => {
                  return (
                    <option
                      key={bin["href"]}
                      value={bin["href"]}
                    >
                      {bin.closet_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );

}

export default ShoeForm