import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:9999";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

const getOrCreateDeviceId = (): string => {
  let deviceId = localStorage.getItem("device_id");
  if (!deviceId) {
    // Generate a simple RFC4122 compliant UUID
    deviceId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    localStorage.setItem("device_id", deviceId);
  }
  return deviceId;
};

// Auto attach Authorization and device_id headers if token exists in localStorage
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers.device_id = getOrCreateDeviceId();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Unified response interceptor to handle custom NestJS boilerplate error wrapping on HTTP 200
instance.interceptors.response.use(
  (response) => {
    const res = response.data;
    if (res && res.status === false) {
      const error = new Error(res.message || "Lỗi hệ thống");
      (error as any).response = { data: res };
      throw error;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const getPageConfig = async () => {
  const response = await instance.get("/cau-hinh-trang/public");
  return response.data.data;
};

export const getPitches = async (params?: any) => {
  const response = await instance.get("/san", { params });
  return response.data.data;
};

export const getPitchDetail = async (id: number | string) => {
  const response = await instance.get(`/san/${id}`);
  return response.data.data;
};

export const getLoaiSanOptions = async () => {
  const response = await instance.get("/loai-san/options");
  return response.data.data;
};

export const getTinhOptions = async () => {
  const response = await instance.get("/tinh/options");
  return response.data.data;
};

export const getXaOptions = async (tinhId?: number) => {
  const params: any = {};
  if (tinhId) {
    params["f[0][field]"] = "province_code";
    params["f[0][operator]"] = "equal";
    params["f[0][value]"] = tinhId;
  }
  const response = await instance.get("/xa/options", { params });
  return response.data.data;
};

export const login = async (data: { tai_khoan: string; mat_khau: string }) => {
  const response = await instance.post("/auth/login", data);
  return response.data.data;
};

export const register = async (data: any) => {
  const response = await instance.post("/auth/register", data);
  return response.data.data;
};

export const getBookedSlots = async (id_san: number | string, ngay: string) => {
  const response = await instance.get("/dat-san/public/booked-slots", {
    params: { id_san, ngay },
  });
  return response.data.data || [];
};

export const createBooking = async (data: {
  tai_khoan: string;
  id_san: number;
  ngay_dat: string;
  gio_bat_dau: string;
  gio_ket_thuc: string;
  tong_tien: number;
  ghi_chu?: string;
}) => {
  const response = await instance.post("/dat-san/public/book", data);
  return response.data.data;
};

export const getMyBookings = async (tai_khoan: string) => {
  const response = await instance.get("/dat-san/public/my-bookings", {
    params: { tai_khoan },
  });
  return response.data.data || [];
};

export const getReviewsBySan = async (
  id_san: number | string,
  page: number = 1,
  limit: number = 10,
) => {
  const response = await instance.get(`/danh-gia/public/${id_san}`, {
    params: { page, limit },
  });
  return response.data.data;
};

export const getReviewSummary = async (id_san: number | string) => {
  const response = await instance.get(`/danh-gia/public/summary/${id_san}`);
  return response.data.data;
};

export const createReview = async (data: {
  tai_khoan: string;
  id_san: number;
  so_sao: number;
  noi_dung: string;
}) => {
  const response = await instance.post("/danh-gia/public", data);
  return response.data.data;
};

export const getProfile = async () => {
  const response = await instance.get("/profile");
  return response.data.data;
};

export const updateProfile = async (data: any) => {
  const response = await instance.patch("/profile", data);
  return response.data.data;
};

export const changePassword = async (data: any) => {
  const response = await instance.patch("/profile/change-password", data);
  return response.data.data;
};

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await instance.post("/profile/avatar", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.data;
};

export default instance;
