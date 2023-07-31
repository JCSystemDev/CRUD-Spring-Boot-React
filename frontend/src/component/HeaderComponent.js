import React from "react"

export const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div>
                        <a href='/customers' className='navbar-brand'>Gestión de clientes</a>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent;