import React, { useContext, useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
//import context
import { PublisherContext } from "../../context/PublisherContext";

import { customFetch } from "../util/customFetch";

const AdminPublisher = ()=>{
    const[publishers, setPublishers] = useContext(PublisherContext);
   const[prePublisher, setPrePublisher] = useState([]);
   const [search, setSearch] = useState("");
   const [optionSearchs, setOptionSearch] = useState([]);
   
   useEffect(()=>{
       const newPublisher = publishers;
       setPrePublisher(newPublisher);
   },[prePublisher]);

   //style
   const linkStyle={
       color: "black"
   }

     //delete publisher

     const deletePublisher = async(publisherID) =>{
        const URLDelete = `/api/publishers/${publisherID}`;
        try {
        const response1 = await customFetch(URLDelete, "DELETE", null);
        const publisher = publishers.filter((pl)=>{
            return pl.id !== publisherID;
        });
        setPublishers(publisher);
        setPrePublisher(publisher);
        } catch (error) {
        console.log(error);
        }
        
     }

     //search publisher
     const updateSearch = (e) => {
         console.log(e.target.value);
        setSearch(e.target.value);
      };

     const autoComplete = (e) => {
        if (e.target.value === "") {
          setOptionSearch([]);
          setPublishers(prePublisher);
        } else {
          const options = prePublisher.filter((p) => {
            return p.publisherName
              .toLowerCase()
              .includes(e.target.value.toLowerCase());
          });
          setOptionSearch(options);
          setPublishers(options);
        }
      };

    
    
    const listPublisher = publishers.map((p)=>
    <tr>
        <td className="center">{p.id}</td>
        <td className="uneditable">{p.publisherName}</td>
        <td className="uneditable"><span> <Link to="" style={linkStyle}><i class="fa fa-edit"></i></Link>
            <i className="fa fa-times-circle" onClick={()=>deletePublisher(p.id)}></i>
            </span></td>
    </tr>
    );

    return(
        <div id="main-content">
        
            <div className="table-agile-info col-xs-12 col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        Nhà xuất bản
                    </div>
                    <div>
                        <div className="row w3-res-tb">
                            <div className="col-sm-3 m-b-xs">
                                
                            </div>
                            <div className="col-sm-5">
                                    <div className="input-group">
                                        <input type="text" className="input-sm form-control" placeholder="Search"
                                         value={search} onChange={updateSearch} onKeyUp={autoComplete}/>
                                        <span className="input-group-btn"><button className="btn btn-sm btn-default"
                                                                            type="button"><i
                                                className="fa fa-search"></i></button>
                                        </span>
                                        
                                    </div>
                            </div>
                            <div className="col-sm-4 m-b-xs">
                                <Link to="addPublisher"><button className="btn btn-sm btn-default">Thêm<i class="fa fa-plus"></i></button></Link>
                            </div>
                        </div>
                        <table className="col-xs-12 col-lg-12" id="editable" className="pure-table pure-table-bordered">
                            <tr>
                                <td className="uneditable">Mã</td>
                                <td className="uneditable">Tên nhà xuất bản</td>
                                <td className="uneditable">Action</td>
                            </tr>
                            {listPublisher}
                        </table>
                        <div className="panel-footer">
                           
                                    <ul className="pagination pagination-sm m-t-none m-b-none">
                                        <li><a href=""><i className="fa fa-chevron-left"></i></a></li>
                                        <li><a href="">1</a></li>
                                        <li><a href="">2</a></li>
                                        <li><a href="">3</a></li>
                                        <li><a href="">4</a></li>
                                        <li><a href=""><i className="fa fa-chevron-right"></i></a></li>
                                    </ul>
                        </div>
                       
                    </div>
                </div>
            </div>
    </div>
    );
};
export default AdminPublisher;