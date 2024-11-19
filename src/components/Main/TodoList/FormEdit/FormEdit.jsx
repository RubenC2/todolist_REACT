// import React, { useState, useEffect } from "react";
// import { v4 as uuidv4 } from "uuid";


// const FormEdit = ({data, editItem}) => {
//   const {title} = data;
//   return <div className="form-list">
//   <form onSubmit={editItem}>
//     <h1>Actualiza tu tarea</h1>
//     <label htmlFor="name" className="todo-list">tarea 1</label><br/>
//     <input type="text" name="title" value={e.targe.title} onChange={editItem} /><br/>

//     {values.title ? 
//     <button type="submit" onClick={editItem}>Actualizar</button>:<p className="error">Rellena todos los campos</p>}
//   </form>

//   <button onClick={resetItems}>Cancelar</button>

//   {renderItems()}
// </div>;
// };

// export default FormEdit;

import React, { useState } from "react";

const FormEdit = ({ item, onSubmit }) => {
    const [formData, setFormData] = useState(item);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Nombre:
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </label>
            </div>
            <button type="submit">Guardar Cambios</button>
        </form>
    );
};

export default FormEdit;
