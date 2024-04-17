import React, {useState} from 'react';
import "../../styles/App.scss"

interface ClientData {
    login: string;
    password: string;
    fullName: string;
    birthDate: string;
    passportNumber: string;
    passportSeries: string;
    phone: string;
    email: string;
    companyName?: string; // Необязательное поле для ЮЛ
}

const ClientForm: React.FC = () => {

    const [formData, setFormData] = useState<ClientData>({
        login: '',
        password: '',
        fullName: '',
        birthDate: '',
        passportNumber: '',
        passportSeries: '',
        phone: '',
        email: '',
        companyName: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/auth/clientData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Данные успешно отправлены!');
                setFormData({
                    login: '',
                    password: '',
                    fullName: '',
                    birthDate: '',
                    passportNumber: '',
                    passportSeries: '',
                    phone: '',
                    email: '',
                    companyName: ''
                });
            } else {
                console.error('Ошибка при отправке данных');
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
        }
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div>
            <button onClick={openModal}>Открыть форму клиента</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <form onSubmit={handleSubmit} className={"form-container"}>
                            <h3>Занести клиента в базу данных </h3>
                            <input
                                type="text"
                                name="login"
                                placeholder="Логин"
                                value={formData.login}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="fullName"
                                placeholder="ФИО"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="date"
                                name="birthDate"
                                placeholder="Дата рождения (YYYY-MM-DD)'"
                                value={formData.birthDate}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="passportSeries"
                                placeholder="Серия паспорта"
                                value={formData.passportSeries}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="passportNumber"
                                placeholder="Номер паспорта"
                                value={formData.passportNumber}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="phone"
                                placeholder="Телефон"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="E-mail"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="companyName"
                                placeholder="Название предприятия (для ЮЛ)"
                                value={formData.companyName}
                                onChange={handleChange}
                            />
                            <button type="submit">Отправить</button>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ClientForm;
