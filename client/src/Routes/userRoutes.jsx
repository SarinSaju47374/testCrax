import { Route } from "react-router-dom";
import RegisterStage1 from "../screen/RegisterStage1.jsx"
import PersonalDet from "../screen/PersonalDet.jsx";
import FinancialDet from "../screen/FinancialDet.jsx";

const userRoutes = (

    <>
        <Route path="/user/register" element={<RegisterStage1 />} />
        <Route path="/user/register/1" element={<PersonalDet />} />
        <Route path="/user/register/2" element={<FinancialDet />} />
    </>
);
export default userRoutes;