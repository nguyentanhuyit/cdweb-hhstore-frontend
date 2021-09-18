import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { customFetch } from "../util/customFetch";
//import react hook form
import { set, useForm } from "react-hook-form";
//import react yup (validation)
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { notification } from "antd";
//import context
import { CategoryContext } from "../../context/CategoryContext";
//import toast

const openNotification = (placement) => {
  notification.success({
    message: "Cập nhật thể loại!",
    description: "Cập nhật thể loại thành công",
    placement,
  });
};
const AdminUpdateCategory = ({ match }) => {
  const history = useHistory();
  const [categoryContext, setCategoryContext] = useContext(CategoryContext);
  const [category, setCategory] = useState();
  const categoryID = match.params.categoryID;

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = async () => {
    const URL = `/api/categories/${categoryID}`;
    const body = JSON.stringify({});
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setCategory(data);
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
    categoryName: yup.string().required("Vui lòng nhập tên thể loại"),
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
  }, category);

  const updateCategoryContext = (newCategory) => {
    const categoryContextClone = [...categoryContext];
    const index = categoryContextClone.findIndex((p) => p.id === category.id);
    categoryContextClone[index] = newCategory;
    setCategoryContext(categoryContextClone);
  };

  const onSubmit = async (data) => {
    const URLAddCategory = `/api/categories`;
    const bodyContent = JSON.stringify({
      id: category.id,
      categoryName: data.categoryName,
    });
    try {
      const response = await customFetch(URLAddCategory, "PUT", bodyContent);
      if (response.status === 200) {
        console.log("success");
        console.log(response);
      }
      const data = await response.json();
      updateCategoryContext(data);
      history.push("/admin/categories");
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
        <span className="admin_form_title">Cập nhật thông tin thể loại</span>
        <form onSubmit={handleSubmit(onSubmit)} className="admin_form_category">
          <div class="form-group">
            <label htmlFor="categoryName">Tên thể loại:</label>
            <input
              {...register("categoryName")}
              placeholder="Nhập tên thể loại"
              id="categoryName"
              className="form-control"
              defaultValue={category?.categoryName}
            />
            <p style={style}>{errors.categoryName?.message}</p>
          </div>
          <button type="submit" class="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
export default AdminUpdateCategory;
