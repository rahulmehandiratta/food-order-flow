import {apiUrl} from "../../../setting";

export const getProductDataUrl = () => {
    return `${apiUrl}/routes/product/getProductDataByCompanyId`;
};

export const getServiceUrl = () => {
    return `${apiUrl}/routes/product/getOnlyService`;
};

export const getStockUrl = () => {
    return `${apiUrl}/productList`;
};
export const getProductDataUrl2 = () => {
    return `${apiUrl}/routes/product/ProductList`;
};
export const addProductUrl = () => {
    return `${apiUrl}/createProduct`;
};
export const getproducts = () => {
    return `${apiUrl}/routes/product/getProductData`;
};
export const getbatchRecordByProductIdUrl = () => {
    return `${apiUrl}/routes/sale/getBatchRecordByProductId`;
}
export const getBrandUrl = () => {
    return `${apiUrl}/routes/brand/getBrandData`;
}

export const getCategoryUrl = () => {
    return `${apiUrl}/routes/category/getCategoryData`;
}

// export const singleProductUrl = (productId) => {
//     return apiUrl + "/routes/product/getSingleProduct/" + productId;
// };
// export const updateProductUrl = () => {
//     return `${apiUrl}/routes/product/updateProduct`;
//   };
  export const updateServiceUrl = () => {
    return `${apiUrl}/routes/product/updateService`;
  };
  export const getbatchRecordByBatchUrl = () => {
    return `${apiUrl}/routes/sale/getBatchRecordByBatch`;
}
export const deleteProductUrl = (id) => {
    return apiUrl + "/routes/product/deleteProduct/" + id;
  };
  export const updateProductUrl = () => {
    return `${apiUrl}/updateProduct`;
};
export const singleProductUrl = (id) => {
    return apiUrl + "/getSingleProduct/" + id;
  };