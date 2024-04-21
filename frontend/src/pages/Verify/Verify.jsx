import React, { useEffect } from 'react'
import './Verify.css'
import { useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    console.log(success,orderId);
    const {url}=useContext(StoreContext);
    const navigate=useNavigate();

    console.log(success,orderId)

    const verifyPayment=async()=>{
      const response=await axios.post(url+'/api/order/verify',{success,orderId});
      if(response.data.success){
        navigate('/myorders');
      }
      else{
        navigate('/home');
      }
    }

    useEffect(()=>{
      verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className="spinner">
            
        </div>
    </div>
  )
}

export default Verify
