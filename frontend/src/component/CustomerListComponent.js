import React, {useEffect, useState} from 'react'
import CustomerService from "../service/CustomerService";
import {Link} from "react-router-dom";
export const CustomerListComponent = () => {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        customersList()

    },[])

    const customersList = () => {
        CustomerService.getAllCustomers().then(response =>{
            setCustomers(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    const deleteCustomer = (customerId) => {
        CustomerService.deleteCustomer(customerId).then((response) => {
            customersList();
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className='container'>
            <h2 className='text-center'>Lista de Clientes </h2>
            <Link to='create-customer' className='btn btn-dark mb-2'>Agregar Cliente</Link>
            <table className='table table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>E-mail</th>
                        <th>Teléfono</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        customers.map(
                            customer =>
                                <tr key={ customer.id}>
                                    <td>{ customer.id}</td>
                                    <td>{ customer.name }</td>
                                    <td>{ customer.lastname }</td>
                                    <td>{ customer.email }</td>
                                    <td>{ customer.phone }</td>
                                    <td>{ customer.address }</td>
                                    <td>
                                        <Link className='btn btn-info' to={ `/update-customer/${customer.id}` }>Editar</Link>
                                        <button className='btn btn-danger' onClick={() => deleteCustomer(customer.id)} >Eliminar</button>
                                    </td>
                                </tr>
                        )
                    }
                </tbody>

            </table>
        </div>
    )
}

export default CustomerListComponent;