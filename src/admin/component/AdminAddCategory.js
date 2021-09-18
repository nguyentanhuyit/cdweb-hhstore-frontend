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
import { CategoryContext } from "../../context/CategoryContext";

const openNotification = (placement) => {
  notification.success({
    message: "Thêm thể loại!",
    description: "Thêm thể loại thành công",
    placement,
  });
};
const AdminAddCategory = () => {
  const history = useHistory();
  const [category, setCategory] = useContext(CategoryContext);
  const updateCategoryContext = (newCategory) => {
    const categoryContextClone = [...category];
    categoryContextClone.push(newCategory);
    setCategory(categoryContextClone);
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
  } = useForm({
    resolver: yupResolver(schema),
  });

  //toast

  //const notify = () => toast("Wow so easy!", {position:toast.POSITION.BOTTOM_CENTER});

  const onSubmit = async (data) => {
    const URLAddCategory = `/api/categories`;
    const bodyContent = JSON.stringify({
      categoryName: data.categoryName,
    });
    try {
      const response = await customFetch(URLAddCategory, "POST", bodyContent);
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

  return (
    <div id="main-content">
      <div className="main_container">
        <span className="admin_form_title">Thêm thể loại</span>
        <form onSubmit={handleSubmit(onSubmit)} className="admin_form_category">
          <div class="form-group">
            <label htmlFor="categoryName">Tên thể loại:</label>
            <input
              {...register("categoryName")}
              placeholder="Nhập tên thể loại"
              id="categoryName"
              className="form-control"
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
export default AdminAddCategory;
