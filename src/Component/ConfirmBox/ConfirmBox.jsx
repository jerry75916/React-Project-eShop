import React,{useState} from 'react'
import "./ConfirmBox.scss"

const ConfirmBox = ({imgUrl,deletefun}) => {
  const setDeleteStatus=(status)=>{
    deletefun(status);
  }
  return (
    <div className={`Confirm_Over`}>
    <div  className='ConfirmBox'>
        <div className='Confirm_Header'>Product Delete Confirm</div>
        <div className='Confirm_Content'><p>Do you want to delete this product?</p>
        <img src={imgUrl}></img>
        </div>
        <div className='Confirm_Footer'>
           <button className=' --btn --btn-danger'onClick={()=>setDeleteStatus(true)}>Yes</button> 
           <button className=' --btn --btn-info' onClick={()=>setDeleteStatus(false)}>No</button> 
        </div>
    </div></div>
  
  )
}

export default ConfirmBox