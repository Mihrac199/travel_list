export default function İtem({ item, $handleDeleteİtem, $handleToggleİtem }) {

     return (

          <li>

               <input type="checkbox" value={item.packed} onChange={() => $handleToggleİtem(item.id)} />

               <span style={item.packed ? { textDecoration: "line-through" } : null}>

                    {item.quantity} {item.description}

               </span>

               <button onClick={() => $handleDeleteİtem(item.id)}>❌</button>

          </li>

     );

};