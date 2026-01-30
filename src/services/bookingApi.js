import api from "./api";

export async function fetchCourses() {
  const { data } = await api.get("/courses");
  return data;
}

export async function fetchCredits() {
  const { data } = await api.get("/bookings/me/credits");
  return data; // {credits}
}

export async function createBooking(payload) {
  const { data } = await api.post("/bookings", payload);
  return data;
}

export async function fetchBookings(params) {
  const { data } = await api.get("/bookings", { params });
  return data;
}
