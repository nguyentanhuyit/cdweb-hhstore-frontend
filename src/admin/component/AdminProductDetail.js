import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import context
import { ProductContext } from "../../context/ProductContext";
import { AuthorContext } from "../../context/AuthorContext";
import { CategoryContext } from "../../context/CategoryContext";
import { PublisherContext } from "../../context/PublisherContext";
//import util
import { customFetch } from "../util/customFetch";
//import react hook form
import { useForm } from "react-hook-form";
//import react yup (validation)
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
//import notify
import { notification } from "antd";

const openNotification = (placement) => {
  notification.success({
    message: "Cập nhật sản phẩm!",
    description: "Cập nhật sản phẩm thành công",
    placement,
  });
};
const AdminProductDetail = ({ match }) => {
  //get image default
  const [mainImg, setMainImg] = useState("");
  const [Img1, setImg1] = useState("");
  const [Img2, setImg2] = useState("");
  const [uploadFileMain, setuploadFileMain] = useState();
  const [uploadFile1, setuploadFile1] = useState();
  const [uploadFile2, setuploadFile2] = useState();
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [authors, setAuthors] = useContext(AuthorContext);
  const [categorys, setCategorys] = useContext(CategoryContext);
  const [product, setProduct] = useState(null);
  const productId = match.params.productID;
  //const[publishers, setPublishers] = useContext(PublisherContext);
  const [productContext, setProductContext] = useContext(ProductContext);
  const history = useHistory();

  //get product by ID
  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const URL = `/api/products/${productId}`;
    try {
      const response = await customFetch(URL, "GET", null);
      const data = await response.json();
      setProduct(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProductContext = (newProduct) => {
    const productContextClone = [...productContext];
    const index = productContextClone.findIndex((p) => p.id === product.id);
    productContextClone[index] = newProduct;
    setProductContext(productContextClone);
  };

  //validate form
  const schema = yup.object().shape({
    productname: yup.string().required("Vui lòng nhập tên sách"),
    productprice: yup
      .number()
      .positive("Giá phải là số dương")
      .integer()
      .typeError("Vui lòng nhập giá")
      .required("Vui lòng nhập giá"),
    category: yup
      .number()
      .typeError("Vui lòng chọn thể loại")
      .required("Vui lòng chọn thể loại"),
    author: yup
      .number()
      .typeError("Vui lòng chọn tác giả")
      .required("Vui lòng chọn tác giả"),
    publisher: yup
      .number()
      .typeError("Vui lòng chọn NXB")
      .required("Vui lòng chọn NXB"),
    language: yup.string().required("Vui lòng nhập ngôn ngữ"),
    code: yup.string().required("Vui lòng nhập code"),
    quantity: yup
      .number()
      .positive("Số lượng phải là số dương")
      .integer()
      .typeError("Số lượng phải là số")
      .required("Vui lòng nhập số lượng"),
    format: yup
      .number()
      .positive("Định dạng phải là số dương")
      .integer()
      .typeError("Định dạng phải là số"),
    promotion: yup
      .number()
      .positive("Khuyễn mãi phải là số dương")
      .integer()
      .typeError("Khuyễn mãi phải là số"),
  });
  // handle
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //reset các field của form
  useEffect(() => {
    reset({
      category: product?.category,
      author: product?.author,
      publisher: product?.publisher,
    });
  }, product);

  //color error
  const style = {
    color: "red",
  };
  const chooseImageStyle = {
    display: "none",
  };

  //list author
  const listAuthor = authors.map((au) => (
    <option value={au.id}>{au.authorName}</option>
  ));

  //list category
  const listCategory = categorys.map((cat) => (
    <option value={cat.id}>{cat.categoryName}</option>
  ));

  //upload image to gg drive

  const bgMain = {
    backgroundImage: "url(" + mainImg + ")",
  };

  const bgImg1 = {
    backgroundImage: "url(" + Img1 + ")",
  };
  const bgImg2 = {
    backgroundImage: "url(" + Img2 + ")",
  };

  const bgDefault = {
    backgroundImage: "url(" + product?.mainImage + ")",
  };
  const bgDefault1 = {
    backgroundImage: "url(" + product?.productDetail.image1 + ")",
  };
  const bgDefault2 = {
    backgroundImage: "url(" + product?.productDetail.image2 + ")",
  };

  //form style
  const formStyle = {
    width: "100%",
  };

  //chọn ảnh
  const changeMainImage = async (e) => {
    const files = e.target.files[0];
    setLoading(true);
    setuploadFileMain(files);
    setMainImg(URL.createObjectURL(files));
  };
  //chọn ảnh
  const changeImage1 = async (e) => {
    const files = e.target.files[0];
    setLoading1(true);
    setuploadFile1(files);
    setImg1(URL.createObjectURL(files));
  };
  //chọn ảnh
  const changeImage2 = async (e) => {
    const files = e.target.files[0];
    setLoading2(true);
    setuploadFile2(files);
    setImg2(URL.createObjectURL(files));
  };

  //submit form
  let productMainLink = product?.mainImage;
  let productLink1 = product?.productDetail.image1;
  let productLink2 = product?.productDetail.image2;

  const onSubmit = async (data) => {
    //upload main image to cloud server
    if (loading === true) {
      const fileImgMain = uploadFileMain;
      const dataImgMain = new FormData();
      dataImgMain.append("file", fileImgMain);
      dataImgMain.append("upload_preset", "tanhuy");
      const resMain = await fetch(
        "https://api.cloudinary.com/v1_1/tanhuy/image/upload",
        {
          method: "POST",
          body: dataImgMain,
        }
      );
      const fileImgMainRes = await resMain.json();
      productMainLink = fileImgMainRes.secure_url;
    }
    // //upload image1 to cloud server
    if (loading1 === true) {
      const fileImg1 = uploadFile1;
      const dataImg1 = new FormData();
      dataImg1.append("file", fileImg1);
      dataImg1.append("upload_preset", "tanhuy");
      const res1 = await fetch(
        "https://api.cloudinary.com/v1_1/tanhuy/image/upload",
        {
          method: "POST",
          body: dataImg1,
        }
      );
      const fileImg1Res = await res1.json();
      productLink1 = fileImg1Res.secure_url;
    }
    // //upload image2 to cloud server
    if (loading2 === true) {
      const fileImg2 = uploadFile2;
      const dataImg2 = new FormData();
      dataImg2.append("file", fileImg2);
      dataImg2.append("upload_preset", "tanhuy");
      const res2 = await fetch(
        "https://api.cloudinary.com/v1_1/tanhuy/image/upload",
        {
          method: "POST",
          body: dataImg2,
        }
      );
      const fileImg2Res = await res2.json();
      productLink2 = fileImg2Res.secure_url;
    }
    try {
      //update product detail
      const URLAddProductDetail = `/api/productdetails`;
      const productDetailBody = JSON.stringify({
        id: product.productDetail.id,
        language: data.language,
        format: data.format,
        dimensions: data.dimension,
        country: data.country,
        code: data.code,
        detailDescription: data.discription,
        dateRelease: data.dateRealese,
        image1: productLink1,
        image2: productLink2,
        numberOfProduct: data.quantity,
        purchaseNumber: data.purchasenumber,
        promotion: data.promotion,
      });
      const response1 = await customFetch(
        URLAddProductDetail,
        "PUT",
        productDetailBody
      );
      if (response1.status === 200) {
        console.log(response1);
      }
      const dataProductDetail = await response1.json();
      //insert product
      const URLAddProduct = `/api/products`;
      const productBody = JSON.stringify({
        id: product.id,
        title: data.productname,
        mainImage: productMainLink,
        price: data.productprice,
        author: { id: data.author },
        publisher: { id: data.publisher },
        productDetail: dataProductDetail,
        category: { id: data.category },
      });
      const response2 = await customFetch(URLAddProduct, "PUT", productBody);
      if (response1.status === 200) {
        console.log(response2);
      }
      const datas = await response2.json();
      updateProductContext(datas);
      history.push("/admin/products");
    } catch (error) {
      console.log(error);
    }
    openNotification("center");
  };

  return (
    <div id="main-content">
      <div className="main_container">
        <span className="admin_form_title">Chi tiết sản phẩm</span>
        <form onSubmit={handleSubmit(onSubmit)} style={formStyle}>
          <div className="content">
            <div className="left-menu">
              <div className="profile">
                {loading ? (
                  <label htmlFor="mainImage" style={bgMain} />
                ) : (
                  <label htmlFor="mainImage" style={bgDefault} />
                )}
                <input
                  {...register("mainImg")}
                  type="file"
                  accept=".jpg,.jpeg,.png"
                  id="mainImage"
                  onChange={changeMainImage}
                />
              </div>
              <div className="img_bonus">
                <div className="bonus_item">
                  {loading1 ? (
                    <label htmlFor="Image1" style={bgImg1} />
                  ) : (
                    <label htmlFor="Image1" style={bgDefault1} />
                  )}
                  <input
                    {...register("img1")}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    id="Image1"
                    onChange={changeImage1}
                  />
                </div>
                <div className="bonus_item">
                  {loading2 ? (
                    <label htmlFor="Image2" style={bgImg2} />
                  ) : (
                    <label htmlFor="Image2" style={bgDefault2} />
                  )}
                  <input
                    {...register("img2")}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    id="Image2"
                    onChange={changeImage2}
                  />
                </div>
              </div>
            </div>
            <div className="my-profile">
              <div className="profile-form">
                <div className="profile-form-info">
                  <div className="mb-3 row">
                    <label
                      htmlFor="productName"
                      className="col-sm-2 col-form-label obligate"
                    >
                      Tên sách:
                    </label>
                    <div className="col-sm-10">
                      <input
                        {...register("productname")}
                        type="text"
                        className="form-control"
                        id="productName"
                        defaultValue={product?.title}
                      />
                      <p style={style}>{errors.productname?.message}</p>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="productPrice"
                      className="col-sm-2 col-form-label obligate"
                    >
                      Giá:
                    </label>
                    <div className="col-sm-4">
                      <input
                        {...register("productprice")}
                        type="text"
                        className="form-control"
                        id="productPrice"
                        defaultValue={product?.price}
                      />
                      <p style={style}>{errors.productprice?.message}</p>
                    </div>
                    <label
                      htmlFor="category"
                      className="col-sm-2 col-form-label obligate"
                    >
                      Thể loại:
                    </label>
                    <div className="col-sm-4">
                      <select
                        {...register("category")}
                        className="form-control"
                        id="category"
                        defaultValue={product?.category}
                      >
                        <option value="">--Chọn thể loại--</option>
                        {listCategory}
                      </select>
                      <p style={style}>{errors.category?.message}</p>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="author"
                      className="col-sm-2 col-form-label obligate"
                    >
                      Tác giả:
                    </label>
                    <div className="col-sm-4">
                      <select
                        {...register("author")}
                        className="form-control"
                        id="author"
                        defaultValue={product?.author}
                      >
                        <option value="">--Chọn tác giả--</option>
                        {listAuthor}
                      </select>
                      <p style={style}>{errors.author?.message}</p>
                    </div>
                    <label
                      htmlFor="publisher"
                      className="col-sm-2 col-form-label obligate"
                      title="Nhà xuất bản"
                    >
                      NXB:
                    </label>
                    <div className="col-sm-4">
                      <select
                        {...register("publisher")}
                        className="form-control"
                        id="publisher"
                        defaultValue={product?.publisher}
                      >
                        <option value="">--Chọn NXB--</option>
                        <option value="1">Nhà xuất bản Hà Nội</option>
                        <option value="2">Nhà xuất bản Kim Đồng</option>
                        <option value="3">Nhà xuất bản TPHCM</option>
                      </select>
                      <p style={style}>{errors.publisher?.message}</p>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="language"
                      className="col-sm-2 col-form-label obligate"
                    >
                      Ngôn ngữ:
                    </label>
                    <div className="col-sm-4">
                      <input
                        {...register("language")}
                        type="text"
                        className="form-control"
                        id="language"
                        defaultValue={product?.productDetail.language}
                      />
                      <p style={style}>{errors.language?.message}</p>
                    </div>
                    <label htmlFor="format" className="col-sm-2 col-form-label">
                      Định dạng:
                    </label>
                    <div className="col-sm-4">
                      <input
                        {...register("format")}
                        type="text"
                        className="form-control"
                        id="format"
                        defaultValue={product?.productDetail.format}
                      />
                      <p style={style}>{errors.format?.message}</p>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="dimention"
                      className="col-sm-2 col-form-label"
                    >
                      Kích thước:
                    </label>
                    <div className="col-sm-4">
                      <input
                        {...register("dimension")}
                        type="text"
                        className="form-control"
                        id="dimention"
                        defaultValue={product?.productDetail.dimensions}
                      />
                    </div>
                    <label
                      htmlFor="country"
                      className="col-sm-2 col-form-label"
                    >
                      Quốc gia:
                    </label>
                    <div className="col-sm-4">
                      <input
                        {...register("country")}
                        type="text"
                        className="form-control"
                        id="country"
                        defaultValue={product?.productDetail.country}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="code"
                      className="col-sm-2 col-form-label obligate"
                    >
                      Code:
                    </label>
                    <div className="col-sm-4">
                      <input
                        {...register("code")}
                        type="text"
                        className="form-control"
                        id="code"
                        defaultValue={product?.productDetail.code}
                      />
                      <p style={style}>{errors.code?.message}</p>
                    </div>
                    <label
                      htmlFor="dateRelease"
                      className="col-sm-2 col-form-label"
                      title="Ngày xuất bản"
                    >
                      Ngày XB:
                    </label>
                    <div className="col-sm-4">
                      <input
                        {...register("dateRealese")}
                        type="date"
                        className="form-control"
                        id="dateRelease"
                        defaultValue={product?.productDetail.dateRelease}
                      />
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="quantity"
                      className="col-sm-2 col-form-label obligate"
                    >
                      Số lượng:
                    </label>
                    <div className="col-sm-2">
                      <input
                        {...register("quantity")}
                        type="text"
                        className="form-control"
                        id="quantity"
                        defaultValue={product?.productDetail.numberOfProduct}
                      />
                      <p style={style}>{errors.quantity?.message}</p>
                    </div>
                    <label
                      htmlFor="purchaseNumber"
                      className="col-sm-2 col-form-label"
                    >
                      SL đã bán:
                    </label>
                    <div className="col-sm-2">
                      <input
                        {...register("purchasenumber")}
                        type="text"
                        className="form-control"
                        id="purchaseNumber"
                        disabled
                        defaultValue={product?.productDetail.purchaseNumber}
                      />
                    </div>
                    <label
                      htmlFor="promotion"
                      className="col-sm-2 col-form-label"
                      title="Khuyến mãi"
                    >
                      KM:
                    </label>
                    <div className="col-sm-2">
                      <input
                        {...register("promotion")}
                        type="text"
                        className="form-control"
                        id="promotion"
                        defaultValue={product?.productDetail.promotion}
                      />
                      <p style={style}>{errors.promotion?.message}</p>
                    </div>
                  </div>
                  <div className="mb-3 row">
                    <label
                      htmlFor="discription"
                      className="col-sm-2 col-form-label"
                    >
                      Mô tả:
                    </label>
                    <div className="col-sm-10">
                      <textarea
                        {...register("discription")}
                        className="form-control"
                        rows="5"
                        defaultValue={product?.productDetail.detailDescription}
                      />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Cập nhật
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AdminProductDetail;
