import ClientForm from "./UI/ClientForm";
import CaseReception from "./UI/CaseReception";

const PrivateOffice: React.FC = () => {

    return (
        <>
            <h2>Личный кабинет лаборанта</h2>
            <ClientForm/>
            <CaseReception/>
        </>
    );
};

export default PrivateOffice;
