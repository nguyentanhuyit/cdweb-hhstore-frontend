import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import context
import { AuthorContext } from "../../context/AuthorContext";
import { customFetch } from "../util/customFetch";
const pageLimit = 5;
const AdminAuthor = () => {
  const [authors, setAuthors] = useContext(AuthorContext);
  const [preAuthor, setPreAuthor] = useState([]);
  const [search, setSearch] = useState("");
  const [optionSearchs, setOptionSearch] = useState([]);

  useEffect(() => {
    const newAuthor = authors;
    setPreAuthor(newAuthor);
  }, [preAuthor]);

  //style
  const linkStyle = {
    color: "black",
  };

  //delete author

  const deleteAuthor = async (authorID) => {
    const URLDeleteAuthor = `/api/authors/${authorID}`;
    try {
      const response1 = await customFetch(URLDeleteAuthor, "DELETE", null);
      const author = authors.filter((au) => {
        return au.id !== authorID;
      });
      setAuthors(author);
      setPreAuthor(author);
    } catch (error) {
      console.log(error);
    }
  };

  //search author
  const updateSearch = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const autoComplete = (e) => {
    if (e.target.value === "") {
      setOptionSearch([]);
      setAuthors(preAuthor);
    } else {
      const options = preAuthor.filter((au) => {
        return au.authorName
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setOptionSearch(options);
      setAuthors(options);
    }
  };

  const listAuthor = authors.map((au) => (
    <tr>
      <td className="center">{au.id}</td>
      <td className="uneditable">{au.authorName}</td>
      <td className="uneditable">{au.authorInfo}</td>
      <td className="uneditable">
        <span>
          <Link to={`/admin/authors/updateAuthor/${au.id}`} style={linkStyle}>
            <i class="fa fa-edit"></i>
          </Link>
          <i
            className="fa fa-times-circle"
            onClick={() => deleteAuthor(au.id)}
          ></i>
        </span>
      </td>
    </tr>
  ));

  return (
    <div id="main-content">
      <div className="admin">
        <div className="admin_header">Tác giả</div>
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
                <Link to="/admin/authors/addAuthor">
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
                <td className="uneditable">Tên tác giả</td>
                <td className="uneditable">Thông tin tác giả</td>
                <td className="uneditable">Action</td>
              </tr>
              {listAuthor}
            </table>
            <div className="panel-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminAuthor;
