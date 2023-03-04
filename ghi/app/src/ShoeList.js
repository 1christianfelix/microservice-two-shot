import React from 'react';
import { Link } from "react-router-dom";
import DeleteButton from './DeleteButton';

function ShoesColumn(props) {

  return (
    <div className="col-4">
      {props.list.map((data) => {
        const shoe = data.shoe;
        return (
          <div key={shoe.href} className="card mb-3 shadow">
            <img
              src={shoe.pictureURL}
              className="card-img-top"
            />
            <div className="card-body">
              <h5 className="card-title">{shoe.model_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {shoe.color}
              </h6>
              <p className="card-text">{shoe.manufacturer}</p>
            </div>
            <div className="card-footer">
              <p>Closet: {shoe.bin.closet_name}</p>
              <p>Bin: {shoe.bin.bin_number}</p>
              <p>Size: {shoe.bin.bin_size}</p>
            </div>
            <DeleteButton type="button" href={shoe.href}></DeleteButton>
          </div>
        );
      })}
    </div>
  );
}

class ShoeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shoesColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8080/api/shoes/";

    try {
      const response = await fetch(url);
      if (response.ok) {


        // Get the list of conferences
        const data = await response.json();

        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let shoe of data.shoes) {
          const detailUrl = `http://localhost:8080${shoe.href}`;
          requests.push(fetch(detailUrl));
        }

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);

        // Set up the "columns" to put the conference
        // information into
        const shoesColumns = [[], [], []];

        // Loop over the conference detail responses and add
        // each to to the proper "column" if the response is
        // ok
        let i = 0;
        for (const shoeResponse of responses) {
          if (shoeResponse.ok) {
            const details = await shoeResponse.json();
            shoesColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(shoeResponse);
          }
        }

        // Set the state to the new list of three lists of
        // conferences
        this.setState({ shoesColumns: shoesColumns });
      }
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <>
        <div className="px-4 py-5 my-5 mt-0 text-center bg-info">
          <img
            className="bg-white rounded shadow d-block mx-auto mb-4"
            src="/logo.svg"
            alt=""
            width="600"
          />
          <h1 className="display-5 fw-bold">Shoe House</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">
              You need new shoes seriously.
            </p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link
                to="/shoes/new"
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Create some new ones b
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>What We Got</h2>
          <div className="row">
            {this.state.shoesColumns.map((ShoeList, index) => {
              return <ShoesColumn key={index} list={ShoeList} />;
            })}
          </div>
        </div>
      </>
    );
  }
}









export default ShoeList;