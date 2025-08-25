import { useState } from "react"
import İtem from "./İtem"

export default function PackingList({ items, $handleDeleteİtem, $handleToggleİtem, $handleClearİtems }) {

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

                    {sortedItems.map((item) => <İtem item={item} key={item.id} $handleDeleteİtem={$handleDeleteİtem} $handleToggleİtem={$handleToggleİtem} />

                    )}

               </ul>

               <div className="actions">

                    <select value={sortBy} onChange={e => setSortBy(e.target.value)}>

                         <option value="input">Sort by input order</option> {/* Giriş sırasına göre sırla */}
                         <option value="description">Sort bt description</option> {/* Alfabetik sıralamaya göre sırala */}
                         <option value="packed">Sort by packed status</option>{/* Paket durumuna göre sırala */}

                    </select>

                    <button onClick={$handleClearİtems}>Clear list</button>

               </div>

          </div>

     );

};