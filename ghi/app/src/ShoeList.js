import React from 'react'

const ShoeList = () => {
  return (
    <div>
      <div class="px-4 py-5 my-5 mt-0 text-center bg-info">
        <img
          class="bg-white rounded shadow d-block mx-auto mb-4"
          src="./images/logo.svg"
          alt=""
          width="600"
        />
        <h1 class="display-5 fw-bold">Shoe House</h1>
        <div class="col-lg-6 mx-auto">
          <p class="lead mb-4">
            It's time to upgrade your feet. Seriously.
          </p>
          <a
            href="attend-conference.html"
            type="button"
            class="btn btn-primary btn-lg px-4 gap-3"
          >
            Come Create Some Shoes!
          </a>
        </div>
      </div>
      <div class="container">
        <h2>What We Got</h2>
        <div class="row">
          <div class="col-4">Home Comfort</div>
          <div class="col-4">Running Need</div>
          <div class="col-4">Hiking Essential</div>
        </div>
      </div>
    </div>



  )
}

export default ShoeList