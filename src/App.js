import { useState } from "react";

// const initialItems = [

//     { id: 1, description: "Passports", quantity: 2, packed: false },
//     { id: 2, description: "Socks", quantity: 12, packed: false },
//     { id: 3, description: "Charger", quantity: 1, packed: false },

// ];

export default function App() {

    const [items, setİtems] = useState([]);

    function handleAddİtems(newItem) {
        setİtems(items => [...items, newItem]);
    };


    return (

        <div className="app">

            <Logo />
            <Form onAddİtems={handleAddİtems} />
            <PackingList items={items} />
            <Stats />

        </div>

    );

};


function Logo() {

    return (

        <h1>Far Away</h1>

    );

};


function Form({ onAddİtems }) {

    const [description, setDescription] = useState(null);
    const [quantity, setQuantity] = useState(null);


    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;

        const newItem = { description, quantity, packed: false, id: Date.now() };
        onAddİtems(newItem);

        setDescription("");
        setQuantity(1);
    };

    return (

        <form className="add-form" onSubmit={handleSubmit}>

            <h3>What do you need for your trip?</h3>

            <select value={quantity} onChange={e => setQuantity(+e.target.value)}>

                {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (

                    <option value={num} key={num}>

                        {num}

                    </option>

                ))}

            </select>

            <input type="text" placeholder="item..." value={description} onChange={e => setDescription(e.target.value)} />

            <button type="submit">Add</button>

        </form >

    );

};


function PackingList({ items }) {

    return (

        <div className="list">

            <ul>

                {items.map((item) =>

                    <İtem item={item} key={item.id} />

                )}

            </ul>

        </div>

    );

};


function İtem({ item }) {

    return (

        <li>

            <span style={item.packed ? { textDecoration: "line-through" } : null}>

                {item.quantity} {item.description}

            </span>

            <button>❌</button>

        </li >

    );

};


function Stats() {

    return (

        <footer className="stats">

            <em>You have X items on your list, and you already packed X (%X)</em>

        </footer>

    );

};