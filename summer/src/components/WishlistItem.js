const WishlistItem = ({ item }) => (
  <div className="border rounded p-2 mb-2">
    <strong>{item.title}</strong> - Added: {new Date(item.addedAt).toLocaleDateString()}
  </div>
);
export default WishlistItem;
