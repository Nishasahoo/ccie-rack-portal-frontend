import { useState } from "react";
import "../../styles/StudentModal.css";
import { toast } from "react-toastify";

import {
  addCredits,
  rejectStudent,
  updateStudent,
  reactivateStudent,
} from "../../services/studentApi";

export default function StudentModal({
  student,
  bookings,
  credits,
  onClose,
}) {

const [showCreditModal, setShowCreditModal] =
  useState(false);

const [creditAmount, setCreditAmount] =
  useState("");

const [creditReason, setCreditReason] =
  useState("Admin Topup");


const [loading, setLoading] = useState(false);
const [showEditModal, setShowEditModal] =
  useState(false);
const [showRejectModal, setShowRejectModal] =
  useState(false);

const [rejectReason, setRejectReason] =
  useState("");

const [rejectLoading, setRejectLoading] =
  useState(false);

  if (!student) return null;
  
  const [editData, setEditData] = useState({
    fullName: student.fullName || "",
    phone: student.phone || "",
    country: student.country || "",
    address: student.address || "",
    status: student.status || "active",
  });

 const handleAddCredits = async () => {

  if (!creditAmount) {

    toast.error(
      "Please Enter Credits"
    );

    return;

  }

  try {

    await addCredits(
      student.id,
      Number(creditAmount),
      creditReason
    );

    toast.success(
      "Credits Added Successfully"
    );

    setShowCreditModal(false);

    setTimeout(() => {
      window.location.reload();
    }, 1000);

  } catch (err) {

    toast.error(
      "Failed To Add Credits"
    );

  }

};


  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveStudent = async () => {
    try {

      setLoading(true);

      await updateStudent(
        student.id,
        editData
      );

      toast.success(
        "Student Updated Successfully"
      );

      setShowEditModal(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {

      console.error(err);

      toast.error(
        "Failed To Update Student"
      );

    } finally {

      setLoading(false);

    }
  };

  const handleRejectStudent = async () => {

  if (!rejectReason.trim()) {

    toast.error(
      "Please Enter Rejection Reason"
    );

    return;

  }

  try {

    setRejectLoading(true);

    await rejectStudent(
      student.id,
      rejectReason
    );

    toast.success(
      "Student Rejected Successfully"
    );

    setShowRejectModal(false);

    setTimeout(() => {
      window.location.reload();
    }, 1000);

  } catch (err) {

    console.error(err);

    toast.error(
      "Failed To Reject Student"
    );

  } finally {

    setRejectLoading(false);

  }

};



const handleReactivate = async () => {

  try {

    await reactivateStudent(
      student.id
    );

    toast.success(
      "Student Reactivated"
    );

    setTimeout(() => {
      window.location.reload();
    }, 1000);

  } catch (err) {

    console.error(err);

    toast.error(
      "Failed To Reactivate"
    );

  }

};


  return (
    <div className="modal-overlay">

      <div className="student-modal">

        <div className="modal-header">

          <h2>Student Profile</h2>

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

        </div>

        <div className="student-info">

          <p>
            <b>Name:</b> {student.fullName}
          </p>

          <p>
            <b>Email:</b> {student.email}
          </p>

          <p>
            <b>Phone:</b> {student.phone || "-"}
          </p>

          <p>
            <b>Country:</b> {student.country || "-"}
          </p>

          <p>
            <b>Status:</b> {student.status}
          </p>

          <p>
            <b>Credits:</b> {student.credits}
          </p>

        </div>

        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
          }}
        >
         <button
       className="approve-btn"
        onClick={() =>
        setShowCreditModal(true)
       }
      >
      Add Credits
      </button>

          <button
            className="edit-btn"
            onClick={handleEdit}
          >
            Edit Student
          </button>


      <button
    className="reject-btn"
     onClick={() =>
      setShowRejectModal(true)
     }
    >
     Reject Student
     </button>

     {student.status === "rejected" && (

    <button
    className="approve-btn"
      onClick={handleReactivate}
    >
       Reactivate Student
      </button>

     )}

        </div>

        <hr />

        <h3>Bookings</h3>

        <table className="booking-table">

          <thead>
            <tr>
              <th>Course</th>
              <th>Credits</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {bookings.length > 0 ? (
              bookings.map((b, i) => (
                <tr key={i}>
                  <td>{b.course}</td>
                  <td>{b.creditsUsed}</td>
                  <td>{b.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">
                  No Bookings Found
                </td>
              </tr>
            )}

          </tbody>

        </table>

        <hr />

        <h3>Credit History</h3>

        <table className="booking-table">

          <thead>
            <tr>
              <th>Reason</th>
              <th>Credits</th>
            </tr>
          </thead>

          <tbody>

            {credits.length > 0 ? (
              credits.map((c, i) => (
                <tr key={i}>
                  <td>{c.reason}</td>
                  <td>{c.delta}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">
                  No Credit History
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

      {showEditModal && (

        <div className="modal-overlay">

          <div className="edit-modal">

            <h2>Edit Student</h2>

            <label>Email</label>

            <input
              type="text"
              value={student.email}
              disabled
            />

            <label>Full Name</label>

            <input
              type="text"
              value={editData.fullName}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  fullName: e.target.value,
                })
              }
            />

            <label>Phone</label>

            <input
              type="text"
              value={editData.phone}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  phone: e.target.value,
                })
              }
            />

            <label>Country</label>

            <input
              type="text"
              value={editData.country}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  country: e.target.value,
                })
              }
            />

            <label>Status</label>

            <select
              value={editData.status}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  status: e.target.value,
                })
              }
            >
              <option value="active">
                Active
              </option>

              <option value="rejected">
                Rejected
              </option>
            </select>

            <label>Address</label>

            <textarea
              value={editData.address}
              onChange={(e) =>
                setEditData({
                  ...editData,
                  address: e.target.value,
                })
              }
            />

            <div className="edit-actions">

              <button
                className="approve-btn"
                onClick={handleSaveStudent}
                disabled={loading}
              >
                {loading
                  ? "Saving..."
                  : "Save Changes"}
              </button>

              <button
                className="reject-btn"
                onClick={() =>
                  setShowEditModal(false)
                }
              >
                Cancel
              </button>

            </div>

          </div>

        </div>

      )}



      {showRejectModal && (

  <div className="modal-overlay">

    <div className="edit-modal">

      <h2>
        Reject Student
      </h2>

      <label>
        Rejection Reason
      </label>

      <textarea
        rows="5"
        placeholder="Enter Rejection Reason"
        value={rejectReason}
        onChange={(e) =>
          setRejectReason(
            e.target.value
          )
        }
      />

      <div className="edit-actions">

        <button
          className="reject-btn"
          onClick={handleRejectStudent}
          disabled={rejectLoading}
        >
          {rejectLoading
            ? "Rejecting..."
            : "Reject Student"}
        </button>

        <button
          className="approve-btn"
          onClick={() =>
            setShowRejectModal(false)
          }
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}


{showCreditModal && (

  <div className="modal-overlay">

    <div className="edit-modal">

      <h2>
        Add Credits
      </h2>

      <label>
        Credit Amount
      </label>

      <input
        type="number"
        value={creditAmount}
        onChange={(e) =>
          setCreditAmount(
            e.target.value
          )
        }
      />

      <label>
        Reason
      </label>

      <input
        type="text"
        value={creditReason}
        onChange={(e) =>
          setCreditReason(
            e.target.value
          )
        }
      />

      <div className="edit-actions">

        <button
          className="approve-btn"
          onClick={handleAddCredits}
        >
          Add Credits
        </button>

        <button
          className="reject-btn"
          onClick={() =>
            setShowCreditModal(false)
          }
        >
          Cancel
        </button>

      </div>

    </div>

  </div>

)}

    </div>
  );
}