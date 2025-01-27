export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>No items in your list. Add some items to pack! 🧳</em>
      </footer>
    );

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((100 * packedItems) / numItems);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go! ✈️"
          : `You have ${numItems} items in your list and you already packed
          ${packedItems} (${percentage}%)`}
      </em>
    </footer>
  );
}
