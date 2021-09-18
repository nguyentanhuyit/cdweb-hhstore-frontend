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
//import context
import { AuthorContext } from "../../context/AuthorContext";

const openNotification = (placement) => {
  notification.success({
    message: "Cập nhật tác giả!",
    description: "Cập nhật tác giả thành công",
    placement,
  });
};
const AdminUpdateAuthor = ({ match }) => {
  const history = useHistory();
  const [authorContext, setAuthorContext] = useContext(AuthorContext);
  const [author, setAuthor] = useState();
  const authorID = match.params.authorID;
  useEffect(() => {
    getAuthor();
  }, []);

  const getAuthor = async () => {
    const URL = `/api/authors/${authorID}`;
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setAuthor(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const style = {
    color: "red",
  };
  //validate form
  const schema = yup.object().shape({
    authorname: yup.string().required("Vui lòng nhập tên tác giả"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    reset();
  }, author);

  const updateAuthorContext = (newAuthor) => {
    const authorContextClone = [...authorContext];
    const index = authorContextClone.findIndex((a) => a.id === author.id);
    authorContextClone[index] = newAuthor;
    setAuthorContext(authorContextClone);
  };

  const onSubmit = async (data) => {
    const URLAddAuthor = `/api/authors`;
    const bodyContent = JSON.stringify({
      id: author.id,
      authorName: data.authorname,
      authorInfo: data.authorinfo,
    });
    try {
      const response = await customFetch(URLAddAuthor, "PUT", bodyContent);
      if (response.status === 200) {
        console.log("success");
        console.log(response);
      }
      const data = await response.json();
      updateAuthorContext(data);
      history.push("/admin/authors");
    } catch (error) {
      console.log(error);
    }
    openNotification("center");
  };

  const h3style = {
    textTransform: "uppercase",
    padding: "15px",
    fontSize: "20px",
    textAlign: "center",
    backgroundColor: "#bfdeff",
  };
  const mainStyle = {
    backgroundColor: "while",
  };

  return (
    <div id="main-content">
      <div className="main_container" style={mainStyle}>
        <span className="admin_form_title">Cập nhật thông tin tác giả</span>
        <form onSubmit={handleSubmit(onSubmit)} className="admin_update_author">
          <div class="form-group">
            <label htmlFor="authorName">Tên tác giả:</label>
            <input
              {...register("authorname")}
              placeholder="Nhập tên tác giả"
              id="authorName"
              className="form-control"
              defaultValue={author?.authorName}
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
              defaultValue={author?.authorInfo}
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
export default AdminUpdateAuthor;
