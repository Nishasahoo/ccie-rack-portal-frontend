import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/purchaseHistory.css";

export default function PurchaseHistory() {
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    async function load() {
      try {
        const historyRes = await api.get("/credits/purchase-history");
       const creditRes = await api.get("/credits/balance");

        setHistory(historyRes.data || []);
        setBalance(creditRes.data?.credits || 0);
      } catch (err) {
        console.error("Error loading purchase history", err);
      }
    }

    load();
  }, []);

  return (
    <div className="history-container">
      <div className="history-card">
        <h2>Purchase history</h2>

        <table className="history-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Original value</th>
              <th>Expiry date</th>
              <th>Purchase date</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan="5">No purchase history</td>
              </tr>
            ) : (
              history.map((item, i) => (
                <tr key={i}>
                  <td>{item.productName}</td>
                  <td>${item.price}</td>
               <td>{item.originalCredits} credits</td>
                  <td>
                    {item.expiryDate
                      ? new Date(item.expiryDate).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="credit-summary">
          Credit: {balance} credits
          &nbsp;&nbsp;
          <Link to="/">Back</Link>
        </div>
      </div>
    </div>
  );
}
