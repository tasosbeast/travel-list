import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItems,
  onToggleItems,
  onClearList,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") {
    sortedItems = items;
  } else if (sortBy === "packed") {
    sortedItems = items.toSorted((a, b) => a.packed - b.packed);
  } else if (sortBy === "description") {
    sortedItems = items.toSorted((a, b) =>
      a.description.localeCompare(b.description)
    );
  } else if (sortBy === "quantity") {
    sortedItems = items.toSorted((a, b) => a.quantity - b.quantity);
  }
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => {
          return (
            <Item
              item={item}
              key={item.id}
              onDeleteItems={onDeleteItems}
              onToggleItems={onToggleItems}
            />
          );
        })}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="packed">Sort by packed items</option>
          <option value="description">Sort by description</option>
          <option value="quantity">Sort by quantity</option>
        </select>
        <button onClick={onClearList}>Clear list</button>
      </div>
    </div>
  );
}
