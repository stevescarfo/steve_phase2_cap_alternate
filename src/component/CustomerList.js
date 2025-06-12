function CustomerList({ customers, selectedId, onSelect }) {
  return (
    <div className="boxed">
      <h4>Customer List</h4>
      <table id="customer-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Pass</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((item) => (
            <tr
              key={item.id}
              className={item.id === selectedId ? "selected" : ""}
              onClick={() => onSelect(item)}
            >
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
