import { useState } from "react";


export default function App() {

    const [items, setİtems] = useState([]);

    function handleAddİtems(newItem) {
        setİtems(items => [...items, newItem]);
    };

    function handleDeleteİtem(id) {
        setİtems(items => items.filter(item => item.id !== id));
    };

    function handleToggleİtem(id) {
        setİtems(items => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item));
    };

    return (

        <div className="app">

            <Logo />
            <Form $handleAddİtems={handleAddİtems} />
            <PackingList items={items} $handleDeleteİtem={handleDeleteİtem} $handleToggleİtem={handleToggleİtem} />
            <Stats />

        </div>

    );

};


function Logo() {

    return (

        <h1>Far Away</h1>

    );

};


function Form({ $handleAddİtems }) {

    const [description, setDescription] = useState(null);
    const [quantity, setQuantity] = useState(null);


    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;

        const newItem = { description, quantity, packed: false, id: Date.now() };
        $handleAddİtems(newItem);

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


function PackingList({ items, $handleDeleteİtem, $handleToggleİtem }) {

    return (

        <div className="list">

            <ul>

                {items.map((item) =>

                    <İtem item={item} key={item.id} $handleDeleteİtem={$handleDeleteİtem} $handleToggleİtem={$handleToggleİtem} />

                )}

            </ul>

        </div>

    );

};


function İtem({ item, $handleDeleteİtem, $handleToggleİtem }) {

    return (

        <li>

            <input type="checkbox" value={item.packed} onChange={() => $handleToggleİtem(item.id)} />

            <span style={item.packed ? { textDecoration: "line-through" } : null}>

                {item.quantity} {item.description}

            </span>

            <button onClick={() => $handleDeleteİtem(item.id)}>❌</button>

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