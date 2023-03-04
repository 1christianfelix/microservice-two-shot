import React from "react";

const HatList = () => {
  return (
    <div>
      <div class="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img
          class="bg-white rounded shadow d-block mx-auto mb-4"
          src="./images/logo.svg"
          alt=""
          width="600"
        />
        <h1 class="display-5 fw-bold">Hats</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">All of our hats</p>
          <a
            href="attend-conference.html"
            type="button"
            class="btn btn-primary btn-lg px-4 gap-3"
          >
            Create a Hat
          </a>
        </div>
      </div>
      <div class="container">
        <h2>Hats</h2>
        <div class="row">
          <div class="col-4">test</div>
          <div class="col-4">test</div>
          <div class="col-4">test</div>
        </div>
      </div>
    </div>
  );
};

export default HatList;
