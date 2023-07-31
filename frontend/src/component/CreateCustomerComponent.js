import React, {useEffect, useState} from "react"
import CustomerService from "../service/CustomerService";
import {Link, useNavigate, useParams} from "react-router-dom";

export const CreateCustomerComponent = () => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();
    const saveOrUpdateCustomer = (e) => {
        e.preventDefault();
        const customer = {name, lastname, email, phone, address};
        if(id){
            CustomerService.updateCustomer(id,customer).then((response) => {
                console.log(response.data);
                navigate('/customers');
            }).catch(error => {
                console.log(error)
            })
        }
        else{
            CustomerService.createCustomer(customer).then((response) => {
                console.log(response.data);
                navigate('/customers');
            }).catch(error => {
                console.log(error)
            })
        }
    }

    useEffect(() => {
        CustomerService.getCustomerById(id).then((response) =>{
            setName(response.data.name);
            setLastname(response.data.lastname);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setAddress(response.data.address);
        }).catch(error =>{
            console.log(error);
        })
    },[])

    const title = () => {
        if(id){
            return <h2 className='text-center'>Actualizar Cliente</h2>;
        }
        else{
            return <h2 className='text-center'>Agregar Cliente</h2>;
        }
    }

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='card col-md-6 offset-md-3 offset-md-3'>
                        <h2 className='text-center'>{title()}</h2>
                        <div className='card-body'>
                            <form>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Nombre</label>
                                    <input
                                        type='text'
                                        placeholder='Nombre'
                                        name='name'
                                        className='form-control'
                                        value={ name }
                                        onChange={ (e) => setName(e.target.value) }
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Apellido</label>
                                    <input
                                        type='text'
                                        placeholder='Apellido'
                                        name='lastname'
                                        className='form-control'
                                        value={ lastname }
                                        onChange={ (e) => setLastname(e.target.value) }
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Email</label>
                                    <input
                                        type='email'
                                        placeholder='Email'
                                        name='email'
                                        className='form-control'
                                        value={ email }
                                        onChange={ (e) => setEmail(e.target.value) }
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Teléfono</label>
                                    <input
                                        type='text'
                                        placeholder='Teléfono'
                                        name='phone'
                                        className='form-control'
                                        value={ phone }
                                        onChange={ (e) => setPhone(e.target.value) }
                                    />
                                </div>
                                <div className='form-group mb-2'>
                                    <label className='form-label'>Dirección</label>
                                    <input
                                        type='text'
                                        placeholder='Dirección'
                                        name='address'
                                        className='form-control'
                                        value={ address }
                                        onChange={ (e) => setAddress(e.target.value) }
                                    />
                                </div>
                                <button className='btn btn-success' onClick={(e) => saveOrUpdateCustomer(e)}>Guardar</button>
                                <Link to='/' className='btn btn-danger'>Cancelar</Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateCustomerComponent;