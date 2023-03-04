import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

function HatColumn(props) {
  return (
    <div className="col-4">
      {props.list.map((data) => {
        const hat = data.hat;
        return (
          <div key={hat.href} className="card mb-3 shadow">
            <img src={hat.picture_url} className="card-img-top" />
            <div className="card-body">
              <h5 className="card-title">{hat.style_name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{hat.color}</h6>
              <p className="card-text">{hat.fabric}</p>
            </div>
            <div className="card-footer">
              <p>Closet: {hat.location.closet_name}</p>
              <p>Section: {hat.location.section_number}</p>
              <p>Shelf: {hat.location.shelf_number}</p>
            </div>
            <DeleteButton type="button" href={hat.href}></DeleteButton>
          </div>
        );
      })}
    </div>
  );
}

class HatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hatColumns: [[], [], []],
    };
  }

  async componentDidMount() {
    const url = "http://localhost:8090/api/hats/";

    try {
      const response = await fetch(url);
      if (response.ok) {
        // Get the list of hats
        const data = await response.json();

        // Create a list of for all the requests and
        // add all of the requests to it
        const requests = [];
        for (let hat of data.hats) {
          const detailUrl = `http://localhost:8090${hat.href}`;
          requests.push(fetch(detailUrl));
        }

        // Wait for all of the requests to finish
        // simultaneously
        const responses = await Promise.all(requests);

        // Set up the "columns" to put the conference
        // information into
        const hatColumns = [[], [], []];

        // Loop over the conference detail responses and add
        // each to to the proper "column" if the response is
        // ok
        let i = 0;
        for (const hatResponse of responses) {
          if (hatResponse.ok) {
            const details = await hatResponse.json();
            hatColumns[i].push(details);
            i = i + 1;
            if (i > 2) {
              i = 0;
            }
          } else {
            console.error(hatResponse);
          }
        }

        // Set the state to the new list of three lists of
        // conferences
        this.setState({ hatColumns: hatColumns });
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
          <h1 className="display-5 fw-bold">Hats! Woah!</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">Look at these hats!</p>
            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
              <Link
                to="/hats/new"
                className="btn btn-primary btn-lg px-4 gap-3"
              >
                Make hats here!
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h2>Hats!</h2>
          <div className="row">
            {this.state.hatColumns.map((hatList, index) => {
              return <HatColumn key={index} list={hatList} />;
            })}
          </div>
        </div>
      </>
    );
  }
}

export default HatList;
