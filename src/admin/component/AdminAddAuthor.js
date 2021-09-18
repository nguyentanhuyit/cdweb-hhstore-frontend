import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { customFetch } from "../util/customFetch";
//import react hook form
import { useForm } from "react-hook-form";
//import react yup (validation)
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { notification } from "antd";
//
import { AuthorContext } from "../../context/AuthorContext";

const openNotification = (placement) => {
  notification.success({
    message: "Thêm tác giả!",
    description: "Thêm tác giả thành công",
    placement,
  });
};
const AdminAddAuthor = () => {
  const history = useHistory();
  const [authors, setAuthors] = useContext(AuthorContext);
  const updateAuthorsState = (newAuthor) => {
    const authorsClone = [...authors];
    authorsClone.push(newAuthor);
    setAuthors(authorsClone);
  };
  const style = {
    color: "red",
  };
  //validate form
  const schema = yup.object().shape({
    authorname: yup.string().required("Vui lòng nhập tên tác giả"),
    //authorinfo: yup.string().required("Vui lòng nhập tên tác giả"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //toast

  //const notify = () => toast("Wow so easy!", {position:toast.POSITION.BOTTOM_CENTER});

  const onSubmit = async (data) => {
    const URLAddAuthor = `/api/authors`;
    const bodyContent = JSON.stringify({
      authorName: data.authorname,
      authorInfo: data.authorinfo,
    });
    try {
      const response = await customFetch(URLAddAuthor, "POST", bodyContent);
      if (response.status === 200) {
        console.log("success");
        console.log(response);
      }
      const data = await response.json();
      updateAuthorsState(data);
      history.push("/admin/authors");
    } catch (error) {
      console.log(error);
    }
    openNotification("center");
  };

  return (
    <div id="main-content">
      <div className="main_container">
        <span className="admin_form_title">Thêm tác giả</span>
        <form onSubmit={handleSubmit(onSubmit)} className="admin_form_author">
          <div class="form-group">
            <label htmlFor="authorName">Tên tác giả:</label>
            <input
              {...register("authorname")}
              placeholder="Nhập tên tác giả"
              id="authorName"
              className="form-control"
            />
            <p style={style}>{errors.authorname?.message}</p>
          </div>
          <div class="form-group">
            <label htmlFor="authorInfo">Thông tin tác giả:</label>
            <textarea
              {...register("authorinfo")}
              placeholder="Nhập thông tin tác giả "
              id="authorInfo"
              className="form-control"
              rows="5"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminAddAuthor;
