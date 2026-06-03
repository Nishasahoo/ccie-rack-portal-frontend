
import { useEffect, useState } from "react";
import { getUsers, approveUser } from "../../services/adminApi";
import {
  getStudentById,
  getStudentCredits,
} from "../../services/studentApi";

import StudentModal from "./StudentModal";

import "../../styles/user.css";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [credits, setCredits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
   const [statusFilter, setStatusFilter] =
  useState("all");
  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  const approve = async (email) => {
    await approveUser(email);
    load();
  };

  const viewStudent = async (id) => {
    try {
  const studentRes = await getStudentById(id);
  const creditRes = await getStudentCredits(id);

    setSelectedStudent(studentRes.data.student);

  setBookings(studentRes.data.bookings || []);

  setCredits(creditRes.data || []);

   setShowModal(true);


    } catch (err) {
      console.error(err);
      alert("Failed to load student details");
    }
  };



const filteredUsers =
  users.filter((u) => {

    const matchesSearch =
      u.fullName
        .toLowerCase()
        .includes(
          search.toLowerCase()
        ) ||
      u.email
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchesStatus =
      statusFilter === "all"
        ? true
        : u.status === statusFilter;

    return (
      matchesSearch &&
      matchesStatus
    );

  });
  return (
    <div className="users-container">
      <h1 className="users-title">Student Management</h1>
    
<div className="users-toolbar">

  <input
    type="text"
    placeholder="Search Student..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="all">All Status</option>
    <option value="active">Active</option>
    <option value="pending">Pending</option>
    <option value="rejected">Rejected</option>
  </select>

</div>

       
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Courses</th>
              <th>Bookings</th>
              <th>Credits</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.fullName}</td>

                <td>{u.email}</td>

                <td>{u.phone || "-"}</td>

                <td>{u.courses || "-"}</td>

                <td>{u.totalBookings || 0}</td>

                <td>{u.credits || 0}</td>

                <td>
                  <span
                    className={`status-badge status-${u.status}`}
                  >
                    {u.status}
                  </span>
                </td>

                <td>
                  {new Date(
                    u.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="view-btn"
                      onClick={() => viewStudent(u.id)}
                    >
                      View
                    </button>

                    {u.status === "pending" && (
                      <button
                        className="approve-btn"
                        onClick={() =>
                          approve(u.email)
                        }
                      >
                        Approve
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      {showModal && (
        <StudentModal
          student={selectedStudent}
          bookings={bookings}
          credits={credits}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

