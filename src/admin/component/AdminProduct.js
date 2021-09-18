import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import context
import { ProductContext } from "../../context/ProductContext";
import { AuthorContext } from "../../context/AuthorContext";
import { CategoryContext } from "../../context/CategoryContext";
// import { PublisherContext } from "../../context/PublisherContext";
import { customFetch } from "../../util/customFetch";
const AdminProduct = () => {
  const history = useHistory();
  const [authors, setAuthors] = useContext(AuthorContext);
  const [category, setCategory] = useContext(CategoryContext);
  // const[publisher, setPublisher] = useContext(PublisherContext);
  const [productContext, setProductContext] = useContext(ProductContext);
  const [preProductContext, setPreProductContext] = useState([]);
  const [search, setSearch] = useState("");
  const [optionSearchs, setOptionSearch] = useState([]);

  useEffect(() => {
    const newProduct = productContext;
    setPreProductContext(newProduct);
  }, [preProductContext]);

  //get author by id
  const getAuthor = (id) => {
    const author = authors.filter((aut) => {
      return aut.id == id;
    });
    return author[0];
  };

  //get category by id
  const getCategory = (id) => {
    const cate = category.filter((cat) => {
      return cat.id == id;
    });
    return cate[0];
  };

  // get publisher by id
  //  const getPublishers = (id)=>{
  //      const pub = publisher.filter((p)=>{
  //         return p.id == id;
  //      });
  //      return pub[0];
  //  }

  //delete product

  const deleteProduct = async (productID, productDetailID) => {
    const URLDeleteProduct = `/api/products/${productID}`;
    const URLDeleteProductDetail = `/api/productdetails/${productDetailID}`;
    try {
      const response1 = await customFetch(URLDeleteProduct, "DELETE", null);
      const response2 = await customFetch(
        URLDeleteProductDetail,
        "DELETE",
        null
      );

      const product = productContext.filter((p) => {
        return p.id !== productID;
      });
      setProductContext(product);
      setPreProductContext(product);
    } catch (error) {
      console.log(error);
    }
  };

  //get category list
  const categoryList = category.map((cat) => (
    <option value={cat.id}>{cat.categoryName}</option>
  ));

  //sort product by category

  function sortProductByCategory(event) {
    const value = event.target.value;
    if (value != "") {
      const product = preProductContext.filter((p) => {
        return p.category == value;
      });
      setProductContext(product);
    } else {
      setProductContext(preProductContext);
    }
  }

  //search product
  const updateSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const autoComplete = (e) => {
    if (e.target.value === "") {
      setOptionSearch([]);
      setProductContext(preProductContext);
    } else {
      const options = preProductContext.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setOptionSearch(options);
      setProductContext(options);
    }
  };

  const listProduct = productContext.map((product) => (
    <tr>
      <td className="uneditable center">{product.id}</td>
      <td className="uneditable">{product.title}</td>
      <td className="uneditable admin_img">
        <img src={product.mainImage} />
      </td>
      <td className="uneditable center">{product.price}đ</td>
      <td className="uneditable center">
        {getAuthor(product.author)?.authorName}
      </td>
      <td className="center">Kim Đồng</td>
      <td className="uneditable">
        {getCategory(product.category)?.categoryName}
      </td>
      <td>
        <Link to={`/admin/products/productDetail/${product.id}`}>
          <i className="fa fa-eye"></i>
        </Link>
      </td>
      <td className="uneditable">
        <span>
          <i
            className="fa fa-times-circle"
            onClick={() => deleteProduct(product.id, product.productDetail.id)}
          ></i>
        </span>
      </td>
    </tr>
  ));

  return (
    <div id="main-content">
      <div className="admin">
        <div className="admin_header">Product</div>
        <div className="admin_table">
          <div>
            <div className="row w3-res-tb">
              <div className="col-sm-3 m-b-xs">
                <select
                  class="input-sm form-control w-sm inline v-middle"
                  onChange={sortProductByCategory}
                >
                  <option value="">--Tất cả--</option>
                  {categoryList}
                </select>
              </div>
              <div className="col-sm-5">
                <div className="input-group">
                  <input
                    type="text"
                    className="input-sm form-control"
                    placeholder="Search"
                    value={search}
                    onChange={updateSearch}
                    onKeyUp={autoComplete}
                  />
                  <span className="input-group-btn">
                    <button className="btn btn-sm btn-default" type="button">
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </div>
              <div className="col-sm-4 m-b-xs">
                <Link to="/admin/products/addProduct">
                  <button className="btn btn-sm btn-default">
                    Thêm <i class="fa fa-plus"></i>
                  </button>
                </Link>
              </div>
            </div>
            <table
              className="col-xs-12 col-lg-12"
              id="editable"
              className="pure-table pure-table-bordered"
            >
              <tr>
                <td className="uneditable">Mã</td>
                <td className="uneditable">Tên sách</td>
                <td>Hình ảnh</td>
                <td className="uneditable">Giá</td>
                <td className="uneditable">Tác giả</td>
                <td title="Nhà xuất bản" className="uneditable">
                  Nhà XB
                </td>
                <td className="uneditable">Thể loại</td>
                <td className="uneditable">Chi tiết</td>
                <td className="uneditable">Action</td>
              </tr>
              {listProduct}
            </table>
            <div className="panel-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminProduct;
