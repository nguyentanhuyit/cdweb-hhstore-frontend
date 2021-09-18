import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import context

import { CategoryContext } from "../../context/CategoryContext";
import { customFetch } from "../util/customFetch";

const pageLimit = 5;
const AdminCategory = () => {
  const [category, setCategory] = useContext(CategoryContext);
  const [preCategory, setPreCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [optionSearchs, setOptionSearch] = useState([]);

  useEffect(() => {
    const newCategory = category;
    setPreCategory(newCategory);
  }, [preCategory]);

  //style
  const linkStyle = {
    color: "black",
  };

  //delete category

  const deleteCategory = async (categoryId) => {
    const URLDeleteCategory = `/api/categories/${categoryId}`;
    try {
      const response1 = await customFetch(URLDeleteCategory, "DELETE", null);
      const cate = category.filter((c) => {
        return c.id !== categoryId;
      });
      setCategory(cate);
      setPreCategory(cate);
    } catch (error) {
      console.log(error);
    }
  };

  //search category
  const updateSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const autoComplete = (e) => {
    if (e.target.value === "") {
      setOptionSearch([]);
      setCategory(preCategory);
    } else {
      const options = preCategory.filter((category) => {
        return category.categoryName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setOptionSearch(options);
      setCategory(options);
    }
  };

  //pagination

  const listCategory = category.map((cate) => (
    <tr>
      <td className="center">{cate.id}</td>
      <td className="uneditable">{cate.categoryName}</td>
      <td className="uneditable">
        <span>
          {" "}
          <Link
            to={`/admin/categories/updateCategory/${cate.id}`}
            style={linkStyle}
          >
            <i class="fa fa-edit"></i>
          </Link>
          <i
            className="fa fa-times-circle"
            onClick={() => deleteCategory(cate.id)}
          ></i>
        </span>
      </td>
    </tr>
  ));

  return (
    <div id="main-content">
      <div className="admin">
        <div className="admin_header">Thể loại</div>
        <div className="admin_table">
          <div>
            <div className="row w3-res-tb">
              {/* <div className="col-sm-3 m-b-xs"></div> */}
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
                <Link to="/admin/categories/addCategory">
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
                <td className="uneditable">Thể loại</td>
                <td className="uneditable">Action</td>
              </tr>
              {listCategory}
            </table>
            <div className="panel-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminCategory;
