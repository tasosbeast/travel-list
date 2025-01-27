import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description.trim()) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription("");
    setQuantity(1);
  }

  function handleBlur() {
    if (!description.trim()) {
      setDescription("");
    }
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you want to pack?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 30 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="...Item"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onBlur={handleBlur}
      />
      <button>Add</button>
    </form>
  );
}
