import React, {useState} from 'react';
import Modal from 'react-modal';
import clientForm from "./ClientForm";
import ClientForm from "./ClientForm";

const CaseReception: React.FC = () => {
    const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
    const [isOrderFormModalOpen, setIsOrderFormModalOpen] = useState(false);
    const [caseCode, setCaseCode] = useState('');
    const [clientName, setClientName] = useState('');
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [IsClientFormVisible, setIsClientFormVisible] = useState(false);
    const handleCaseModalOpen = () => {
        setIsCaseModalOpen(true);
    };

    const handleCaseModalClose = () => {
        setIsCaseModalOpen(false);
    };

    const handleOrderFormModalOpen = () => {
        setIsOrderFormModalOpen(true);
    };

    const handleOrderFormModalClose = () => {
        setIsOrderFormModalOpen(false);
    };

    const handleCaseCodeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCaseCode(e.target.value);
    };

    const handleClientNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setClientName(e.target.value);
    };

    const handleServiceSelect = (service: string) => {
        setSelectedServices(prevServices => [...prevServices, service]);
    };

    const handleServiceDeselect = (service: string) => {
        setSelectedServices(prevServices => prevServices.filter(item => item !== service));
    };

    const handleCaseCodeSubmit = async () => {

        setIsCaseModalOpen(false);
        setIsOrderFormModalOpen(true);
    };

    const handleFullNameSubmit = async () => {
        try {
            // Отправка ФИО клиента на сервер
            const response = await fetch('http://localhost:3001/auth/clientCheckData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName: clientName })
            });

            // Обработка ответа сервера
            if (response.ok) {
                const data = await response.json();
                // Если клиент с таким ФИО уже существует
                if (data.message === 'Клиент с таким ФИО уже существует') {
                    // Вывести сообщение об ошибке
                    console.log('Клиент с таким ФИО уже существует');
                } else {
                    // Если клиента с таким ФИО нет, установить флаг для отображения формы для добавления клиента
                    setIsClientFormVisible(true);
                }
            } else {
                // Если произошла ошибка при запросе к серверу, отобразить форму для добавления клиента
                setIsClientFormVisible(true);
            }
        } catch (error) {
            console.error('Ошибка при отправке ФИО клиента на сервер:', error);
        }
    };



    return (
        <div>
            <button onClick={handleCaseModalOpen}>Прием кейса</button>
            <Modal isOpen={isCaseModalOpen} onRequestClose={handleCaseModalClose}>
                <input type="text" value={caseCode} onChange={handleCaseCodeInput}/>
                <button onClick={handleCaseCodeSubmit}>Подтвердить</button>
            </Modal>
            <Modal isOpen={isOrderFormModalOpen} onRequestClose={handleOrderFormModalClose}>
                <input type="text" value={clientName} onChange={handleClientNameInput} placeholder="ФИО клиента"/>
                {IsClientFormVisible ? <ClientForm /> : (
                    <div>
                        <h3>Выберите услуги:</h3>
                        <label>
                            <input type="checkbox" checked={selectedServices.includes("Услуга 1")}
                                   onChange={() => handleServiceSelect("Услуга 1")}/>
                            Услуга 1
                        </label>
                        <label>
                            <input type="checkbox" checked={selectedServices.includes("Услуга 2")}
                                   onChange={() => handleServiceSelect("Услуга 2")}/>
                            Услуга 2
                        </label>
                        <button onClick={handleFullNameSubmit}>Подтвердить</button>
                    </div>
                )}
            </Modal>
        </div>
    );

};

export default CaseReception;
