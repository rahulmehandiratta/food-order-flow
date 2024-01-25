import React from "react";

const KotPrintDesign = () => {
  return (
    <>
      <div className="container" style={{ maxWidth: "310px" , float:"left"}}>
        <h6 style={{ textAlign: "center" }}>02/01/24 17:19</h6>
        <p style={{ textAlign: "center" }}>KOT - 1</p>
        <p style={{ textAlign: "center", fontWeight:"bold" }}>Dine In</p>
        <p style={{ textAlign: "center", fontWeight:"bold" }}>Table No: G1</p>

        <div className="table-kot-design mt-2">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Item </th>
                <th scope="col" className="table-heading" >
                  Special Note
                </th>
                <th scope="col" >
                  Qty.
                </th>
                
              </tr>
            </thead>
            <tbody>
              <tr className="sett">
              <td scope="row" style={{ fontWeight:"bold" }}>Stuffed Kulcha</td>
              <td >---</td>
                <th >1</th>
              
             
              </tr>

              <tr className="sett">
              <td style={{ fontWeight:"bold" }} scope="row"  >Tawa Roti</td>
              <td >---</td>
                <th >1</th>
              
              </tr>
              <tr className="sett">
              <td style={{ fontWeight:"bold" }}  scope="row" >Chicken Rara</td>
              <td >---</td>
                <th>1</th>
              
                
              </tr>
              <tr className="sett">
              <td style={{ fontWeight:"bold" }}  scope="row" >Egg Curry</td>
              <td >---</td>
                <th>1</th>
              
                
              </tr>
              <tr className="sett">
              <td style={{ fontWeight:"bold" }}  scope="row" >Kadai Veg</td>
              <td >---</td>
                <th>1</th>
              
                
              </tr>
              <tr className="sett">
              <td style={{ fontWeight:"bold" }}  scope="row" >Mutton Curry</td>
              <td >---</td>
                <th>1</th>
              
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default KotPrintDesign;
