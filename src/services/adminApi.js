import api from "./api";

export const getUsers = () =>
  api.get("/admin/users");

export const approveUser = (email) =>
  api.get(
    `/admin/users/approve?email=${email}`
  );

export const getBookings = () =>
  api.get("/admin/bookings");

export const getReportSummary = () =>
  api.get("/admin/reports/summary");