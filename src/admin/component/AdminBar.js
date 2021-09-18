import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import { GrUserAdmin } from "react-icons/gr";
const AdminBar = () => {
  return (
    <div id="sidebar" className="nav-collapse">
      <span className="admin_header_text">
        <GrUserAdmin style={{ fontSize: "1.6rem" }} />
        Admin
      </span>
      <div className="leftside-navigation">
        <ul className="sidebar-menu" id="nav-accordion">
          <Link to="/admin">
            <li>
              <i className="fa fa-home"></i>
              <span>Trang chủ</span>
            </li>
          </Link>
          <Link to="/admin/orders">
            <li>
              <i className="fa fa-shopping-cart"></i>
              <span>Đặt hàng</span>
            </li>
          </Link>
          <Link to="/admin/products">
            <li>
              <i className="fa fa-product-hunt"></i>
              <span>Sản phẩm</span>
            </li>
          </Link>
          <Link to="/admin/categories">
            <li>
              <i className="fa fa-tags"></i>
              <span>Thể loại</span>
            </li>
          </Link>
          <Link to="/admin/authors">
            <li>
              <i className="fa fa-users"></i>
              <span>Tác giả</span>
            </li>
          </Link>
          {/* <li>
            <Link to="/admin/publisher">
              <i className="fa fa-tasks"></i>
              <span>Nhà xuất bản</span>
            </Link>
          </li> */}
          {/* <li>
                        <Link to="users.html">
                            <i class="fa fa-users"></i>
                            <span>Người dùng</span>
                        </Link>
                    </li> */}
          {/* <li class="sub-menu">
                        <Link to="javascript:;">
                            <i class="fa fa-backward"></i>
                            <span>Phản hồi</span>
                        </Link>
                        <ul class="sub">
                            <li><Link to="mail.html">Thư</Link></li>
                            <li><Link to="mail_compose.html">Soạn thư</Link></li>
                            <li><Link to="comment.html">Bình luận</Link></li>
                        </ul>
                    </li>
                    <li>
                        <Link href="..\user\index.html">
                            <i class="fa fa-user"></i>
                            <span>Trang User</span>
                        </Link>
                    </li> */}
        </ul>
      </div>
    </div>
  );
};
export default AdminBar;
