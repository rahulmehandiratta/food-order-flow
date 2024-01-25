import React, {useEffect, useState} from "react"
import PageHeader from "../../../components/Elements/pageHeader";
import {groupedProductFxn} from "../actions";
import OwlCarousel from 'react-owl-carousel'

import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'

const PosComponent = (props) => {
    const options = {
        autoplay: false,
        loop: false,
        nav: true,
        dots: false,
        dotClass: 'owl-dot',
        margin: 15,
        autoplayTimeout: 2000,
        responsive: {
            0: {
                items: 8,
                nav: true
            },
            600: {
                items: 8,
                nav: false
            },
            1000: {
                items: 8,
                nav: true,
                loop: false
            }
        }
        // autoWidth:true,

    }


    let [productList, setProductList] = useState([])
    let [activeIndex, setActiveIndex] = useState(0)
    let loadProduct = async () => {
        let {data} = await groupedProductFxn();
        setProductList(data);
    }
    useEffect(() => {
        loadProduct()
    }, [])
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
                        <ul className={'tabs'}>
                            {productList && productList.length ? <OwlCarousel
                                className="owl-carousel owl-theme owl-product  border-0"
                                {...options}>
                                {productList.map((item, index) => {
                                    return (
                                        <li className={index == activeIndex ? "active" : ""} id={item.name}
                                            key={item._id}
                                            onClick={() => setActiveIndex(index)}>
                                            <div className="product-details">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product62.png"
                                                    alt="img"/>
                                                <h6>{item.name}</h6>
                                            </div>
                                        </li>
                                    )
                                })}
                            </OwlCarousel> : null}
                        </ul>


                        {/* {productList && productList.length ?
                            <ul className=" tabs owl-carousel owl-theme owl-product border-0 ">
                                {productList.map((item, index) => {
                                    return (
                                        <li className={index == activeIndex ? "active" : ""} id={item.name}
                                            key={item._id}
                                            onClick={() => setActiveIndex(index)}>
                                            <div className="product-details">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product62.png"
                                                    alt="img"/>
                                                <h6>{item.name}</h6>
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul> : null}*/}


                        <ul className=" tabs owl-carousel owl-theme owl-product  border-0 ">
                            <li className="active" id="fruits">
                                <div className="product-details ">
                                    <img
                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product62.png"
                                        alt="img"/>
                                    <h6>Fruits</h6>
                                </div>
                            </li>
                            <li id="headphone">
                                <div className="product-details ">
                                    <img
                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product63.png"
                                        alt="img"/>
                                    <h6>Headphones</h6>
                                </div>
                            </li>
                            <li id="Accessories">
                                <div className="product-details">
                                    <img
                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product64.png"
                                        alt="img"/>
                                    <h6>Accessories</h6>
                                </div>
                            </li>
                            <li id="Shoes">
                                <a className="product-details">
                                    <img
                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product65.png"
                                        alt="img"/>
                                    <h6>Shoes</h6>
                                </a>
                            </li>
                            <li id="computer">
                                <a className="product-details">
                                    <img
                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product66.png"
                                        alt="img"/>
                                    <h6>Computer</h6>
                                </a>
                            </li>
                            <li id="Snacks">
                                <a className="product-details">
                                    <img
                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product67.png"
                                        alt="img"/>
                                    <h6>Snacks</h6>
                                </a>
                            </li>
                            <li id="watch">
                                <a className="product-details">
                                    <img
                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product68.png"
                                        alt="img"/>
                                    <h6>Watches</h6>
                                </a>
                            </li>
                            <li id="cycle">
                                <a className="product-details">
                                    <img
                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product61.png"
                                        alt="img"/>
                                    <h6>Cycles</h6>
                                </a>
                            </li>
                            <li id="fruits1">
                                <div className="product-details ">
                                    <img
                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product62.png"
                                        alt="img"/>
                                    <h6>Fruits</h6>
                                </div>
                            </li>
                            <li id="headphone1">
                                <div className="product-details ">
                                    <img
                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product63.png"
                                        alt="img"/>
                                    <h6>Headphones</h6>
                                </div>
                            </li>
                        </ul>
                        <div className="tabs_container">
                            <div className="tab_content active" data-tab="fruits">
                                <div className="row ">
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill active">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product29.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Fruits</h5>
                                                <h4>Orange</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product31.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Fruits</h5>
                                                <h4>Strawberry</h4>
                                                <h6>15.00</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product35.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Fruits</h5>
                                                <h4>Banana</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product37.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Fruits</h5>
                                                <h4>Limon</h4>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product54.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Fruits</h5>
                                                <h4>Apple</h4>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab_content" data-tab="headphone">
                                <div className="row ">
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product44.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Headphones</h5>
                                                <h4>Earphones</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product45.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Headphones</h5>
                                                <h4>Earphones</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product36.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Headphones</h5>
                                                <h4>Earphones</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab_content" data-tab="Accessories">
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product32.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Accessories</h5>
                                                <h4>Sunglasses</h4>
                                                <h6>15.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product46.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Accessories</h5>
                                                <h4>Pendrive</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product55.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Accessories</h5>
                                                <h4>Mouse</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab_content" data-tab="Shoes">
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product60.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Shoes</h5>
                                                <h4>Red nike</h4>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab_content" data-tab="computer">
                                <div className="row">

                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product56.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Computers</h5>
                                                <h4>Desktop</h4>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab_content" data-tab="Snacks">
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product47.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Snacks</h5>
                                                <h4>Duck Salad</h4>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product48.png"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Snacks</h5>
                                                <h4>Breakfast board</h4>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product57.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Snacks</h5>
                                                <h4>California roll</h4>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product58.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Snacks</h5>
                                                <h4>Sashimi</h4>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab_content" data-tab="watch">
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product49.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h4>Watch</h4>
                                                <h5>Watch</h5>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product51.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                            </div>
                                            <div className="productsetcontent">
                                                <h4>Watch</h4>
                                                <h5>Watch</h5>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab_content" data-tab="cycle">
                                <div className="row">
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product52.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h4>Cycle</h4>
                                                <h5>Cycle</h5>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product53.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h4>Cycle</h4>
                                                <h5>Cycle</h5>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab_content" data-tab="fruits1">
                                <div className="row ">

                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product29.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Fruits</h5>
                                                <h4>Orange</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product31.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 1.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Fruits</h5>
                                                <h4>Strawberry</h4>
                                                <h6>15.00</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product35.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Fruits</h5>
                                                <h4>Banana</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product37.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Fruits</h5>
                                                <h4>Limon</h4>
                                                <h6>1500.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab_content" data-tab="headphone1">
                                <div className="row ">
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product44.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Headphones</h5>
                                                <h4>Earphones</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product45.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Headphones</h5>
                                                <h4>Earphones</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-sm-6 d-flex ">
                                        <div className="productset flex-fill">
                                            <div className="productsetimg">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product36.jpg"
                                                    alt="img"/>
                                                <h6>Qty: 5.00</h6>
                                                <div className="check-product">
                                                    <i className="fa fa-check"></i>
                                                </div>
                                            </div>
                                            <div className="productsetcontent">
                                                <h5>Headphones</h5>
                                                <h4>Earphones</h4>
                                                <h6>150.00</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-sm-12 ">
                        <div className="order-list">
                            <div className="orderid">
                                <h4>Order List</h4>
                                <h5>Transaction id : #65565</h5>
                            </div>
                            <div className="actionproducts">
                                <ul>
                                    <li>
                                        <a href="javascript:void(0);" className="deletebg confirm-text"><img
                                            src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/delete-2.svg"
                                            alt="img"/></a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" data-bs-toggle="dropdown" aria-expanded="false"
                                           className="dropset">
                                            <img
                                                src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/ellipise1.svg"
                                                alt="img"/>
                                        </a>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton"
                                            data-popper-placement="bottom-end">
                                            <li>
                                                <a href="#" className="dropdown-item">Action</a>
                                            </li>
                                            <li>
                                                <a href="#" className="dropdown-item">Another Action</a>
                                            </li>
                                            <li>
                                                <a href="#" className="dropdown-item">Something Elses</a>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="card card-order">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <a href="javascript:void(0);" className="btn btn-adds" data-bs-toggle="modal"
                                           data-bs-target="#create"><i className="fa fa-plus me-2"></i>Add Customer</a>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="select-split ">
                                            <div className="select-group w-100">
                                                <select className="select">
                                                    <option>Walk-in Customer</option>
                                                    <option>Chris Moris</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="select-split">
                                            <div className="select-group w-100">
                                                <select className="select">
                                                    <option>Product</option>
                                                    <option>Barcode</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="text-end">
                                            <a className="btn btn-scanner-set"><img
                                                src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/scanner1.svg"
                                                alt="img" className="me-2"/>Scan bardcode</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="split-card">
                            </div>
                            <div className="card-body pt-0">
                                <div className="totalitem">
                                    <h4>Total items : 4</h4>
                                    <a href="javascript:void(0);">Clear all</a>
                                </div>
                                <div className="product-table">
                                    <ul className="product-lists">
                                        <li>
                                            <div className="productimg">
                                                <div className="productimgs">
                                                    <img
                                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product30.jpg"
                                                        alt="img"/>
                                                </div>
                                                <div className="productcontet">
                                                    <h4>Pineapple
                                                        <a href="javascript:void(0);" className="ms-2"
                                                           data-bs-toggle="modal" data-bs-target="#edit"><img
                                                            src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/edit-5.svg"
                                                            alt="img"/></a>
                                                    </h4>
                                                    <div className="productlinkset">
                                                        <h5>PT001</h5>
                                                    </div>
                                                    <div className="increment-decrement">
                                                        <div className="input-groups">
                                                            <input type="button" value="-"
                                                                   className="button-minus dec button"/>
                                                            <input type="text" name="child" value="0"
                                                                   className="quantity-field"/>
                                                            <input type="button" value="+"
                                                                   className="button-plus inc button "/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>3000.00</li>
                                        <li><a className="confirm-text" href="javascript:void(0);"><img
                                            src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/delete-2.svg"
                                            alt="img"/></a></li>
                                    </ul>
                                    <ul className="product-lists">
                                        <li>
                                            <div className="productimg">
                                                <div className="productimgs">
                                                    <img
                                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product34.jpg"
                                                        alt="img"/>
                                                </div>
                                                <div className="productcontet">
                                                    <h4>Green Nike
                                                        <a href="javascript:void(0);" className="ms-2"
                                                           data-bs-toggle="modal" data-bs-target="#edit"><img
                                                            src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/edit-5.svg"
                                                            alt="img"/></a>
                                                    </h4>
                                                    <div className="productlinkset">
                                                        <h5>PT001</h5>
                                                    </div>
                                                    <div className="increment-decrement">
                                                        <div className="input-groups">
                                                            <input type="button" value="-"
                                                                   className="button-minus dec button"/>
                                                            <input type="text" name="child" value="0"
                                                                   className="quantity-field"/>
                                                            <input type="button" value="+"
                                                                   className="button-plus inc button "/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>3000.00</li>
                                        <li><a className="confirm-text" href="javascript:void(0);"><img
                                            src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/delete-2.svg"
                                            alt="img"/></a></li>
                                    </ul>
                                    <ul className="product-lists">
                                        <li>
                                            <div className="productimg">
                                                <div className="productimgs">
                                                    <img
                                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product35.jpg"
                                                        alt="img"/>
                                                </div>
                                                <div className="productcontet">
                                                    <h4>Banana
                                                        <a href="javascript:void(0);" className="ms-2"
                                                           data-bs-toggle="modal" data-bs-target="#edit"><img
                                                            src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/edit-5.svg"
                                                            alt="img"/></a>
                                                    </h4>
                                                    <div className="productlinkset">
                                                        <h5>PT001</h5>
                                                    </div>
                                                    <div className="increment-decrement">
                                                        <div className="input-groups">
                                                            <input type="button" value="-"
                                                                   className="button-minus dec button"/>
                                                            <input type="text" name="child" value="0"
                                                                   className="quantity-field"/>
                                                            <input type="button" value="+"
                                                                   className="button-plus inc button "/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>3000.00</li>
                                        <li><a className="confirm-text" href="javascript:void(0);"><img
                                            src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/delete-2.svg"
                                            alt="img"/></a></li>
                                    </ul>
                                    <ul className="product-lists">
                                        <li>
                                            <div className="productimg">
                                                <div className="productimgs">
                                                    <img
                                                        src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/product/product31.jpg"
                                                        alt="img"/>
                                                </div>
                                                <div className="productcontet">
                                                    <h4>Strawberry
                                                        <a href="javascript:void(0);" className="ms-2"
                                                           data-bs-toggle="modal" data-bs-target="#edit"><img
                                                            src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/edit-5.svg"
                                                            alt="img"/></a>
                                                    </h4>
                                                    <div className="productlinkset">
                                                        <h5>PT001</h5>
                                                    </div>
                                                    <div className="increment-decrement">
                                                        <div className="input-groups">
                                                            <input type="button" value="-"
                                                                   className="button-minus dec button"/>
                                                            <input type="text" name="child" value="0"
                                                                   className="quantity-field"/>
                                                            <input type="button" value="+"
                                                                   className="button-plus inc button "/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        <li>3000.00</li>
                                        <li><a className="confirm-text" href="javascript:void(0);"><img
                                            src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/delete-2.svg"
                                            alt="img"/></a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="split-card">
                            </div>
                            <div className="card-body pt-0 pb-2">
                                <div className="setvalue">
                                    <ul>
                                        <li>
                                            <h5>Subtotal </h5>
                                            <h6>55.00$</h6>
                                        </li>
                                        <li>
                                            <h5>Tax </h5>
                                            <h6>5.00$</h6>
                                        </li>
                                        <li className="total-value">
                                            <h5>Total </h5>
                                            <h6>60.00$</h6>
                                        </li>
                                    </ul>
                                </div>
                                <div className="setvaluecash">
                                    <ul>
                                        <li>
                                            <a href="javascript:void(0);" className="paymentmethod">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/cash.svg"
                                                    alt="img" className="me-2"/>
                                                Cash
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="paymentmethod">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/debitcard.svg"
                                                    alt="img" className="me-2"/>
                                                Debit
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:void(0);" className="paymentmethod">
                                                <img
                                                    src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/scan.svg"
                                                    alt="img" className="me-2"/>
                                                Scan
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className="btn-totallabel">
                                    <h5>Checkout</h5>
                                    <h6>60.00$</h6>
                                </div>
                                <div className="btn-pos">
                                    <ul>
                                        <li>
                                            <a className="btn"><img
                                                src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/pause1.svg"
                                                alt="img" className="me-1"/>Hold</a>
                                        </li>
                                        <li>
                                            <a className="btn"><img
                                                src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/edit-6.svg"
                                                alt="img" className="me-1"/>Quotation</a>
                                        </li>
                                        <li>
                                            <a className="btn"><img
                                                src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/trash12.svg"
                                                alt="img" className="me-1"/>Void</a>
                                        </li>
                                        <li>
                                            <a className="btn"><img
                                                src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/wallet1.svg"
                                                alt="img" className="me-1"/>Payment</a>
                                        </li>
                                        <li>
                                            <a className="btn" data-bs-toggle="modal" data-bs-target="#recents"><img
                                                src="https://dreamspos.dreamstechnologies.com/html/template/assets/img/icons/transcation.svg"
                                                alt="img" className="me-1"/> Transaction</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageHeader>
        </>
    )
}
export default PosComponent
