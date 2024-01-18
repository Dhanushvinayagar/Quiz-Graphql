import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CheckLogin = (data) =>{
    const navigate = useNavigate()
    useEffect(() => {
        if (!data) {
            navigate('/login')
        }
    }, [])
}

export default CheckLogin