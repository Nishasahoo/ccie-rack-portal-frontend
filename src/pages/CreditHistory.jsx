import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
export default function CreditHistory() {
  const [credits, setCredits] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    api.get("/my-credits-history")
      .then(res => {
        setCredits(res.data.credits);
        setHistory(res.data.history);
      });
  }, []);

  return (
    <div className="creditPage">
      <h2>Purchase history</h2>

      <table>
        <thead>
          <tr>
            <th>Change</th>
            <th>Reason</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history.map(row => (
            <tr key={row.id}>
              <td>{row.delta}</td>
              <td>{row.reason}</td>
              <td>{new Date(row.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p>
        <strong>Credit:</strong> {credits} credits
        &nbsp; | &nbsp;
      <Link to="/buy-credits">Buy credit</Link>
      </p>
    </div>
  );
}
