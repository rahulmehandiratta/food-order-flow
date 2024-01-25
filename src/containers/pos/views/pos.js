import React, { useEffect, useRef, useState } from "react";
import PageHeader from "../../../components/Elements/pageHeader";
import {
  addKotFxn,
  addOrderFxn,
  getOldKotFxn,
  groupedProductFxn,
  saveOrderFxn,
} from "../actions";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import _, { size } from "lodash";
import Modal from "../../../components/Elements/Modal";
import { Card, notification } from "../../../components/Elements/appUtils";
import { RenderImage } from "../../../components/_utils/_utils";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { tab } from "@testing-library/user-event/dist/tab";
import moment from "moment";
import AddCustomerDrawer from "../../../components/addCustomerDrawer";

let initState = {
  totalAmount: 0,
  tax: 0,
  netAmount: 0,
};
const PosComponent = (props) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const options = {
    autoplay: false,
    loop: false,
    nav: true,
    dots: false,
    dotClass: "owl-dot",
    // margin: 15,
    autoplayTimeout: 2000,
    responsive: {
      0: {
        items: 10,
        nav: true,
      },
      600: {
        items: 10,
        nav: false,
      },
      1000: {
        items: 10,
        nav: true,
        loop: false,
      },
    },
  };
  let [productList, setProductList] = useState([]);
  let [activeIndex, setActiveIndex] = useState(0);
  let [selectedProducts, setSelectedProducts] = useState([]);
  let [OldKots, setOldKots] = useState([]);
  let [OldKotTotalAmount, setOldKotTotalAmount] = useState("");
  let [totalProductsLength, setTotalProductsLength] = useState("");
  let [orderId, setOrderId] = useState("");
  let [formData, setFormData] = useState({});
  let [tableNo, setTableNo] = useState({});
  let [state, setState] = useState(initState);
  let [isModalOpen, setIsModalOpen] = useState(false);
  let [variantData, setVariantData] = useState({});
  let [bgIndex, setBgIndex] = useState(null);
  let [customerState, setCustomerState] = useState({
    visible: false,
    lead: {},
  });
  useEffect(() => {
    events.calculatePrice();
  }, [selectedProducts, OldKotTotalAmount]);
  let events = {
    showCustomerModal: (lead) => {
      setCustomerState({
        visible: true,
        lead: lead,
      });
    },
    hide: () => {
      setCustomerState({
        visible: false,
      });
      // events.reloadTable();
    },

    addProduct: (data) => {
      data.productId = data._id;
      delete data._id;
      let clonePro = _.clone(selectedProducts);
      let findPro = _.find(clonePro, (item) => {
        if (item.productId == data.productId && item.price == data.price) {
          return item.productId == data.productId;
        } else if (
          item.productId == data.productId &&
          item.price != data.price
        ) {
          return null;
        }
      });
      if (findPro) {
        findPro.quantity = findPro.quantity + 1;
        findPro.totalAmount = findPro.quantity * parseFloat(findPro.price);
      } else {
        clonePro.push({ ...data, quantity: 1, totalAmount: data.price });
      }
      setSelectedProducts(clonePro);
    },
    incQty: (data) => {
      let clonePro = _.clone(selectedProducts);
      let findPro = _.find(clonePro, (item) => {
        return item.productId == data.productId && item.price == data.price;
      });
      if (findPro) {
        findPro.quantity = findPro.quantity + 1;
        findPro.totalAmount = findPro.quantity * parseFloat(findPro.price);
      }
      setSelectedProducts(clonePro);
    },
    descQty: (data) => {
      let clonePro = _.clone(selectedProducts);
      let findPro = _.find(clonePro, (item) => {
        return item.productId == data.productId && item.price == data.price;
      });
      if (findPro) {
        findPro.quantity = findPro.quantity - 1;
        findPro.totalAmount = findPro.quantity * parseFloat(findPro.price);
      }
      if (findPro.quantity == 0) {
        selectedProducts = _.reject(clonePro, (item) => {
          return item.productId == data.productId && item.price == data.price;
        });
        setSelectedProducts(selectedProducts);
      } else {
        setSelectedProducts(clonePro);
      }
    },
    _updateState: (data) => {
      setState((prevState) => {
        return {
          ...prevState,
          ...data,
        };
      });
    },
    calculatePrice: () => {
      let clonePro = _.clone(selectedProducts);
      let discount = 0;
      let gst = 5;
      let servicetax = 5;
      let cgst = gst / 2;
      let sgst = gst / 2;
      let totalAmount = 0;
      let discountAmount = 0;
      let serviceTaxAmount = 0;
      let cgstAmount = 0;
      let sgstAmount = 0;
      let tax = 0;
      let netAmount = 0;
      _.each(clonePro, (item) => {
        let amount =
          parseFloat(item.price) * (item.quantity ? item.quantity : 1);
        totalAmount = parseFloat(totalAmount) + amount;
        if (discount) {
          discountAmount = (totalAmount * discount) / 100;
        }
        totalAmount = totalAmount - discountAmount;
        serviceTaxAmount = (totalAmount * servicetax) / 100;
        cgstAmount = (totalAmount * cgst) / 100;
        sgstAmount = (totalAmount * sgst) / 100;
        tax = serviceTaxAmount + cgstAmount + sgstAmount;
        netAmount = totalAmount + tax;
      });

      if (OldKotTotalAmount) {
        if (discount) {
          discountAmount = (totalAmount * discount) / 100;
        }
        totalAmount = totalAmount - discountAmount;

        //if old kot then adding the previous amount to the total amount
        totalAmount = totalAmount + OldKotTotalAmount;
        serviceTaxAmount = (totalAmount * servicetax) / 100;
        cgstAmount = (totalAmount * cgst) / 100;
        sgstAmount = (totalAmount * sgst) / 100;
        tax = serviceTaxAmount + cgstAmount + sgstAmount;
        netAmount = totalAmount + tax;
      }

      events._updateState({
        totalAmount,
        discountAmount: discountAmount,
        cgstAmount: cgstAmount,
        sgstAmount: sgstAmount,
        serviceTaxAmount: serviceTaxAmount,
        tax: tax,
        netAmount: netAmount,
      });
    },
  };

  let loadProduct = async () => {
    let { data } = await groupedProductFxn();
    setProductList(data);
  };
  useEffect(() => {
    loadProduct();
  }, []);

  useEffect(() => {
    const currentURL = window.location.href;
    const tableNumber = currentURL.split("/").pop();
    setTableNo(tableNumber);
  }, []);

  const getOldKotData = (params) => {
    return new Promise(async (resolve) => {
      try {
        const data = await getOldKotFxn({ ...params, tableNo: tableNo });
        console.log(data.netAmount, "this is old kot netamoutn");
        if (data) {
          setOldKots(data.data.data);
          setOldKotTotalAmount(data.totalAmount);
          console.log(data,"fawn");
          const totalProductsLength = data.data.data.reduce((acc, kot) => {
            return acc + kot.products.length;
          }, 0);
          setOrderId(data.data.data[0].orderId)

          // Set the total length of products in state
          setTotalProductsLength(totalProductsLength);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    });
  };

  useEffect(() => {
    getOldKotData();
  }, [tableNo]);

  let handleAddOrder = async (selectedProducts) => {
    formData.products = selectedProducts;
    formData.tableNo = tableNo;
    const {
      totalAmount,
      discountAmount,
      cgstAmount,
      sgstAmount,
      serviceTaxAmount,
      tax,
      netAmount,
    } = state;
    formData.totalAmount = totalAmount;
    formData.discountAmount = discountAmount;
    formData.cgstAmount = cgstAmount;
    formData.sgstAmount = sgstAmount;
    formData.serviceTaxAmount = serviceTaxAmount;
    formData.tax = tax;
    formData.netAmount = netAmount;
    let x = await dispatch(addOrderFxn(formData));
    if (x && x.success == true) {
      setTimeout(() => {
        navigate("/tables");
      }, 2000);
    }
  };


  let handleSaveOrder = async (selectedProducts) => {
    formData.products = selectedProducts;
    formData.tableNo = tableNo;
    const {
      totalAmount,
      discountAmount,
      cgstAmount,
      sgstAmount,
      serviceTaxAmount,
      tax,
      netAmount,
    } = state;
    formData.totalAmount = totalAmount;
    formData.discountAmount = discountAmount;
    formData.cgstAmount = cgstAmount;
    formData.sgstAmount = sgstAmount;
    formData.serviceTaxAmount = serviceTaxAmount;
    formData.tax = tax;
    formData.netAmount = netAmount;
    formData.orderId = orderId
    let x = await dispatch(saveOrderFxn(formData));
    if (x && x.success == true) {
      setTimeout(() => {
        navigate("/tables");
      }, 2000);
    }
  };

  return (
    <>
      <PageHeader>
        <div className="row">
          <div className="col-lg-8 col-sm-12 tabs_wrapper">
            <div className="page-header ">
              <div className="page-title">
                <h4>Categories</h4>
                <h6>Manage your purchases</h6>
              </div>
            </div>
            <ul className={"tabs"}>
              {productList && productList.length ? (
                <OwlCarousel
                  key={activeIndex}
                  className="owl-carousel owl-theme owl-product  border-0"
                  {...options}
                >
                  {productList.map((item, index) => {
                    return (
                      <li
                        className={index == activeIndex ? "active" : ""}
                        id={item.name}
                        key={item.productId}
                        onClick={() => setActiveIndex(index)}
                      >
                        <div className="product-details">
                          {item.categoryFile && item.categoryFile.path ? (
                            <img
                              src={RenderImage(item.categoryFile.path)}
                              alt="img"
                            />
                          ) : null}
                          <h6>{item.name}</h6>
                        </div>
                      </li>
                    );
                  })}
                </OwlCarousel>
              ) : null}
            </ul>

            {productList && productList.length ? (
              <div className="tabs_container" key={activeIndex}>
                {productList.map((item, index) => {
                  return (
                    <div
                      className={`tab_content ${
                        activeIndex == index ? "active" : ""
                      }`}
                      data-tab={item.name}
                      key={item.productId}
                    >
                      <div className="row ">
                        {item && item.product
                          ? item.product.map((eachPro) => {
                              return (
                                <div
                                  className="col-lg-2 col-sm-4 d-flex"
                                  style={{ width: "130px" }}
                                  key={eachPro.productId}
                                  onClick={() => {
                                    if (eachPro.variants.length == 0) {
                                      events.addProduct({
                                        ...eachPro,
                                        productId: eachPro._id,
                                      });
                                    } else {
                                      setVariantData({
                                        ...eachPro,
                                      });
                                      setIsModalOpen(true);
                                    }
                                  }}
                                >
                                  <div className="productset flex-fill">
                                    <div className="productsetimg">
                                      {eachPro &&
                                        eachPro.productFile &&
                                        eachPro.productFile.path && (
                                          <img
                                            src={RenderImage(
                                              eachPro.productFile.path
                                            )}
                                            alt="img"
                                          />
                                        )}
                                      {eachPro &&
                                        eachPro.productFile &&
                                        eachPro.productFile.fileName && (
                                          <div className="check-product">
                                            <i className="fa fa-check"></i>
                                          </div>
                                        )}
                                    </div>
                                    <div className="productsetcontent">
                                      <h4>{eachPro.name}</h4>
                                      <h6>Rs. {eachPro.price}</h6>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : null}

            {/* MODAL For Choose Variant */}

            {isModalOpen && (
              <Modal
                visible={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                  setBgIndex();
                }}
                title={variantData.name}
              >
                <Card>
                  <div className={"rest-table-box"}>
                    <div className={"tab-header"}>
                      <span>Variants</span>
                    </div>
                    <div className={"table-list"}>
                      {variantData?.variants?.map((item, index) => (
                        <div
                          key={index}
                          className={`tab-box mb-0`}
                          style={{
                            background: bgIndex === index ? "#FF9F43" : "",
                            color: bgIndex === index ? "white" : "",
                          }}
                          onClick={() => {
                            setBgIndex(index);
                            let obj = { ...variantData };
                            obj.price = item.price;
                            obj.variant = item.name;
                            setVariantData(obj);
                            // setSelectedProducts(...selectedProducts,obj)
                          }}
                        >
                          <p className="mb-0">{item.name}</p>
                          <p className="mb-0">Rs. {item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => {
                        setBgIndex();
                        setIsModalOpen(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        if (!variantData.variant) {
                          notification.warning({
                            message: "Please Choose Varient",
                          });
                          return;
                        } else {
                          setBgIndex();
                          setIsModalOpen(false);
                          delete variantData.variants;
                          events.addProduct(variantData);
                        }
                      }}
                    >
                      Save
                    </button>
                  </div>
                </Card>
              </Modal>
            )}
          </div>
          <div className="col-lg-4 col-sm-12 width ms-auto">
            <div className="order-list">
              <div className="orderid">
                <h4>Order List</h4>
              </div>
              <div className="actionproducts">
                <ul>
                  <li>
                    <a
                      href="javascript:void(0);"
                      className="deletebg confirm-text"
                    >
                      <img
                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/delete-2.svg"
                        alt="img"
                      />
                    </a>
                  </li>
                  <li>
                    <a
                      href="javascript:void(0);"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      className="dropset"
                    >
                      <img
                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/ellipise1.svg"
                        alt="img"
                      />
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                      data-popper-placement="bottom-end"
                    >
                      <li>
                        <a href="#" className="dropdown-item">
                          Action
                        </a>
                      </li>
                      <li>
                        <a href="#" className="dropdown-item">
                          Another Action
                        </a>
                      </li>
                      <li>
                        <a href="#" className="dropdown-item">
                          Something Elses
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="card card-order h-25 mt-2 mb-0">
              <div className="card-body pt-0 pb-0">
                <div className="row">
                  <div className="col-12 mt-2">
                    <a
                      className="btn btn-adds"
                      onClick={() => events.showCustomerModal()}
                    >
                      <i className="fa fa-plus me-2"></i>Add Customer
                    </a>
                  </div>
                </div>
              </div>
              <div className="split-card m-0"></div>
              <div className="card-body pt-0">
                <div className="totalitem">
                  <h4>
                    Total items :{" "}
                    {selectedProducts.length + totalProductsLength}
                  </h4>
                  <a>Clear all</a>
                </div>
                <div>
                  {OldKots && OldKots.length
                    ? OldKots.map((item) => {
                        return (
                          <div key={item.kotNo}>
                            <div className="dark-background">
                              <h7>
                                Kot - {item.kotNo} Time -{" "}
                                {moment(item.time).format("hh:mm A")}
                              </h7>
                            </div>
                            {item.products.map((product) => (
                              <ul className="product-lists" key={product._id}>
                                <li className="w-50">
                                  <div className="productimg">
                                    <div className="productcontet">
                                      <h4>
                                        {product.name}{" "}
                                        {product.variant &&
                                          ` (${product.variant})`}
                                      </h4>
                                      <div className="productlinkset">
                                        <h5>{product.code}</h5>
                                      </div>
                                    </div>
                                  </div>
                                </li>

                                <li>
                                  <div className="increment-decrement">
                                    <div className="input-groups">
                                      <h7>Qty:</h7>
                                      <input
                                        type="text"
                                        name="child"
                                        value={product.quantity}
                                        className="quantity-field"
                                      />
                                    </div>
                                  </div>
                                </li>
                                <li>
                                  {" "}
                                  <strong>Rs. {product.totalAmount}</strong>
                                  <br />(
                                  <span style={{ fontSize: "80%" }}>
                                    Rs. {product.price}
                                  </span>
                                  )
                                </li>
                              </ul>
                            ))}
                          </div>
                        );
                      })
                    : null}
                </div>

                <div>
                  {OldKots.length == 0 ? null : (
                    <div className="dark-background">
                      <h7>New kot</h7>
                    </div>
                  )}
                  {selectedProducts && selectedProducts.length
                    ? selectedProducts.map((item) => {
                        return (
                          <ul className="product-lists" key={item.productId}>
                            <li className="w-50 p-1">
                              <div className="productimg">
                                <div className="productcontet">
                                  <h4>
                                    {item.name}
                                    {item.variant && ` (${item.variant})`}
                                    <a
                                      href="javascript:void(0);"
                                      className="ms-2"
                                      data-bs-toggle="modal"
                                      data-bs-target="#edit"
                                    >
                                      <img
                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/edit-5.svg"
                                        alt="img"
                                      />
                                    </a>
                                  </h4>
                                  <div className="productlinkset">
                                    <h5>{item.code}</h5>
                                  </div>
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="increment-decrement">
                                <div className="input-groups">
                                  <input
                                    type="button"
                                    value="-"
                                    onClick={() => {
                                      events.descQty(item);
                                    }}
                                    className="button-minus dec button"
                                  />
                                  <input
                                    type="text"
                                    name="child"
                                    value={item.quantity}
                                    className="quantity-field"
                                  />
                                  <input
                                    type="button"
                                    value="+"
                                    onClick={() => {
                                      events.incQty(item);
                                    }}
                                    className="button-plus inc button "
                                  />
                                </div>
                              </div>
                            </li>
                            <li>
                              {" "}
                              <strong>Rs. {item.totalAmount}</strong>
                              <br />(
                              <span style={{ fontSize: "80%" }}>
                                Rs. {item.price}
                              </span>
                              )
                            </li>
                          </ul>
                        );
                      })
                    : null}
                </div>
              </div>
              <div className="split-card"></div>
              <div className="card-body pt-0 pb-2 amount-box-inner">
                <div className="setvalue">
                  <ul>
                    <li>
                      <h5>Subtotal </h5>
                      <h6>Rs. {state.totalAmount}</h6>
                    </li>
                    <li>
                      <h5>Discount (Apply Discount / Coupon)</h5>
                      <h6>Rs. {state.discountAmount}</h6>
                    </li>
                    <li>
                      <h5>Service tax</h5>
                      <h6>Rs. {state.serviceTaxAmount}</h6>
                    </li>
                    <li>
                      <h5>CGST </h5>
                      <h6>Rs. {state.cgstAmount}</h6>
                    </li>
                    <li>
                      <h5>SGST </h5>
                      <h6>Rs. {state.sgstAmount}</h6>
                    </li>
                    {/* <li>
                      <h5>Tax </h5>
                      <h6>Rs. {state.tax}</h6>
                    </li> */}
                    <li className="total-value">
                      <h5>Total </h5>
                      <h6>Rs. {state.netAmount}</h6>
                    </li>
                  </ul>
                </div>
                {/* <div className="btn-totallabel">
                  <h5>Checkout</h5>
                  <h6>Rs. {state.netAmount}</h6>
                </div> */}
                <div className="d-flex">
                  <button
                    className="btn btn-success ms-1"
                    onClick={() => {
                      handleAddOrder(selectedProducts);
                    }}
                  >
                    Kot
                  </button>
                  <button className="btn btn-success ms-1">kot & print</button>
                  <button className="btn btn-success ms-1"
                  onClick={() => {
                    handleSaveOrder(selectedProducts);
                  }}
                  >Save</button>
                  <button className="btn btn-success ms-1">Save & Print</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {customerState.visible ? (
          <AddCustomerDrawer
            onClose={events.hide}
            onSubmit={() => {
              events.hide();
            }}
            visible={customerState.visible}
          />
        ) : null}
      </PageHeader>
    </>
  );
};
export default PosComponent;
