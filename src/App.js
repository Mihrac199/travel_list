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
            <Stats $items={items} />

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
    const [quantity, setQuantity] = useState(1);


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

    const [sortBy, setSortBy] = useState("input");

    let sortedItems;

    if (sortBy === "input") {
        sortedItems = items;
    }

    if (sortBy === "description") {
        sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
    }

    if (sortBy === "packed") {
        sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
    }

    return (

        <div className="list">

            <ul>

                {sortedItems.map((item) =>

                    <İtem item={item} key={item.id} $handleDeleteİtem={$handleDeleteİtem} $handleToggleİtem={$handleToggleİtem} />

                )}

            </ul>

            <div className="actions">

                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>

                    <option value="input">Sort by input order</option> {/* Giriş sırasına göre sırla */}
                    <option value="description">Sort bt description</option> {/* Alfabetik sıralamaya göre sırala */}
                    <option value="packed">Sort by packed status</option>{/* Paket durumuna göre sırala */}

                </select>

            </div>

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


function Stats({ $items }) {

    if (!$items.length) {

        return (
            <p className="stats">
                <em>
                    Start adding some items to your packing list...
                </em>
            </p>
        );

    };


    const numItems = $items.length;
    const numPacked = $items.filter(item => item.packed).length;
    const percentage = Math.round(numPacked * 100 / numItems);


    return (

        <footer className="stats">

            <em>
                {percentage === 100 ? `You got everything! Ready to go` : `You have ${numItems} items on your list, and you already packed ${numPacked} %${percentage}`}
            </em>

        </footer>

    );

};