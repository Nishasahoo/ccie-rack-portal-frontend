import api from "./api";

export async function getBusy(params) {
  const res = await api.get("/scheduler/busy", { params });
  return res.data;
}
