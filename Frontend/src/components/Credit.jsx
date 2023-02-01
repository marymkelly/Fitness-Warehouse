import React from "react";

const Credit = () => {
  return (
    <>
        <h3 className="text-center improv4 mt-5">Payment Options</h3>

    <div className="row m-3">
        <div className="col-md-3 col-sm-6 mb-3 px-5">
            <img className="card-img-top img" src="./assets/ApplePay.jpg" alt="ApplePay" size={50} />
        </div>
        <div className="col-md-3 col-sm-6 mb-3 px-5">
            <img className="card-img-top img" src="./assets/Bitcoin.jpg" alt="Bitcoin" size={50} />
        </div>
        <div className="col-md-3 col-sm-6 mb-3 px-5">
            <img className="card-img-top img" src="./assets/Paypal.jpg" alt="Paypal" size={50} />
        </div>
        <div className="col-md-3 col-sm-6 mb-3 px-5">
            <img className="card-img-top img" src="./assets/Visa.jpg" alt="Visa" size={50} />
        </div>
    </div>
</>
);
};

export default Credit;
