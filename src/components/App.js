import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";


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

    function handleClearİtems() {
        const confirmed = window.confirm("Are you sure you want to delete all items?");
        if (confirmed) setİtems([]);
    };

    return (

        <div className="app">

            <Logo />
            <Form $handleAddİtems={handleAddİtems} />
            <PackingList items={items} $handleDeleteİtem={handleDeleteİtem} $handleToggleİtem={handleToggleİtem} $handleClearİtems={handleClearİtems} />
            <Stats $items={items} />

        </div>

    );

};