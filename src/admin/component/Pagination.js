import React, { useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types';

Pagination.PropTypes ={
    pagination: PropTypes.object.isRequired,
    onPageChange:PropTypes.func
};
Pagination.defaultProps ={
    onPageChange:null,
}
const Pagination=(props)=>{
    const {pagination, onPageChange} = props;
    const {_page, limit, totalRows} = pagination;
    const totalPage = Math.ceil(totalRows/limit);

    function handlePageChange(newPage){
        if(onPageChange){
            onPageChange(newPage);
        }
    }
return(
    <div>
        <button disabled={_page<=1} onClick={()=>handlePageChange(_page-1)} >
            Prev
        </button>
        <button disabled={_page>= totalPage} onClick={()=>handlePageChange(_page+1)} >
            Next
        </button>
    </div>
);
};
export default Pagination;