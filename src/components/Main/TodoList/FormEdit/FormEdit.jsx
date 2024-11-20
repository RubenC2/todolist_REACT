import React, { useState } from "react";

const FormEdit = ({ item, onSubmittt }) => {
    const [formData, setFormData] = useState(item);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // funcion prop emitida por el componente padre
		// donde enviamos todo el objeto 
        onSubmittt(formData);
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
