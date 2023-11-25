import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { financialSchema } from "../schemas";
import { Link, useNavigate } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import { saveFinancialData } from "../toolkit/slices/user/userSlice";
import { ToastContainer, toast } from "react-toastify"
// import axios from "axios";
import { Dna } from "react-loader-spinner"
import axios from "../axios";
import "../scss/screen/register.scss"
function HomePage() {
    let data2 = useSelector(state => state?.user?.user);    
    const [data, setData] = useState({});
    const [otpPage, setOtpPage] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function run(){
        let response = await axios.get("/get-data",{
            params:{email:data2?.email}
        })
        setData(response.data)
    }
    useEffect(() => {
        setIsLoading(false);
        run();
        if(!data2){
            navigate("/user/register")
        }
    }, []);
    
  
 console.log(data)
    return (
        <>
            {isLoading &&
                <Dna
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="dna-loading"
                    wrapperStyle={{ position: "fixed", zIndex: "100", width: "100%", height: "20%", top: "40%" }}
                    wrapperClass="dna-wrapper"
                />
            }
            {
                !isLoading && data &&

                <div className="register-container">
                    <div className="data-wel">
                        <p>Welcome Back {data?.fName}  your email address is {data?.email}</p>
                        <p>Your Address is {data?.addr}</p>
                        <pre>(The data is coming from the DataBase)</pre>
                    </div>
                </div>
            }
        </>
    )
}

export default HomePage