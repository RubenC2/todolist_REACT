import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import TodoItem from "./TodoItem";
import './TodoList.css';
import data from "./data";
import FormEdit from "./FormEdit";

const TodoList = () => {

// const [items, setItems] = useState(data); 
  const [items, setItems] = useState([]);
  const [values, setValues] = useState({
      title: '',
      
  });
  const [selectedItem, setSelectedItem] = useState(null);

  
  const handleChange = (e) => {
      setValues({
          ...values,
          [e.target.name]: e.target.value,
      })
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
    addItem(values)
    setValues({title: ""});
  
  }
  
    const addItem = (new_item) => {
      setItems([new_item,...items]); 
    }; //actualiza el estado items, si quiero ponerlo al inicio cambio el orden (new_item, ...items)
    
    const removeAllItems = () => {
      setItems([]); //actualiza estado Items
    };
  
    const resetItems = () => {
      setItems(data); //cargar con datos iniciales de nuevo
    }
  
    const removeItem = (i) => {
      const remainingItems = items.filter((item, index) => index!==i);
      setItems(remainingItems);
      alert(`Tarea borrada: ${items[i].title}`)
    }
  
    
    // const editItem = (i) => {
    //   alert (FormEdit)
    //   setItems([new_item, ...items])
    //   alert(`Tarea actualizada: ${items[i].title}`)
    // };

    const editItem = (index) => {
      setSelectedItem({ ...items[index], index }); // Guardamos el ítem y su índice
  };

  const updateItem = (updatedItem) => {
    const updatedItems = [...items];
    updatedItems[updatedItem.index] = {
        ...updatedItems[updatedItem.index],
        ...updatedItem,
    };
    setItems(updatedItems);
    setSelectedItem(null); // Ocultamos el formulario
};
  
    const renderItems = () => {
      return items.map((item, i) => <TodoItem data={item} key={uuidv4()} remove={()=>removeItem(i)} editar={()=>editItem(i)}/>)
    }

    // Precargar datos con fetch
    useEffect(() => {
      const fetchTasks = async () => {

          try {
              const response = await fetch("/data.json"); // Archivo JSON en la carpeta public
              if (!response.ok) {
                  throw new Error("Error al cargar el archivo JSON");
              }
              const data = await response.json();
              setItems(data);
          } catch (error) {
              console.error("Error al cargar las tareas:", error);
          }
      };

      fetchTasks();
  }, []);
  
    return <div className="todo-list">
      <form onSubmit={handleSubmit}>
        <h1>Lista de cositas</h1>
        <label htmlFor="name" className="todo-list">Añade aquí:</label><br/>
        <input type="text" name="title" value={values.title} onChange={handleChange} /><br/>
  
        {values.title ? 
        <button type="submit">ADD</button>:<p className="error">Rellena todos los campos</p>}
        
      </form>
  
      <button onClick={removeAllItems}>Borrar todo</button>
      <button onClick={resetItems}>Reset</button>
      <button onClick={()=>removeItem(0)}>Borrar primero</button>
        
      
      {
        selectedItem
            ? <>
            <h1>Editar tarea</h1>
            <FormEdit item={selectedItem} onSubmit={updateItem} />
            </>
            : renderItems()
        }
    </div>;
  };
  
  export default TodoList;
