import React from 'react';
import emailjs from 'emailjs-com';
import { EmailSenderProps } from '../types/index';


const EmailSender: React.FC<EmailSenderProps> = ({ formValues, onSuccess, onError }) => {
    const sendEmail = () => {
        fetch('/data/emailbody.html')
            .then((response) => response.text())
            .then((html) => {
                const templateParams = {
                    nombre: formValues.nombre,
                    apellidos: formValues.apellidos,
                    fechaNacimiento: formValues.fechaNacimiento,
                    genero: formValues.genero,
                    documento: formValues.documento,
                    email: formValues.email,
                    telefono: formValues.telefono,
                    contactoEmergenciaNombre: formValues.contactoEmergencia.nombreCompleto,
                    contactoEmergenciaTelefono: formValues.contactoEmergencia.telefono,
                    html: html,
                };

                emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
                    .then((response) => {
                        console.log('Email sent successfully!', response.status, response.text);
                        onSuccess();
                    }, (error) => {
                        console.error('Failed to send email.', error);
                        onError(error);
                    });
            });
    };

    return (
        <button onClick={sendEmail} className="hidden">
            Send Email
        </button>
    );
};

export default EmailSender;
