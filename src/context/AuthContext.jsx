// "use client";

// import { getUserApi, signupApi, singinApi } from "@/services/authService";
// import { useRouter } from "next/navigation";
// import { createContext, useReducer, useContext, useEffect } from "react";
// import toast from "react-hot-toast";

// const AuthContext = createContext();

// const initialState = {
//   user: null,
//   isAuthenticated: false,
//   isLoading: true,
//   error: null,
// };

// const authReducer = (state, action) => {
//   switch (action.type) {
//     case "loading":
//       return {
//         ...state,
//         isLoading: true,
//       };
//     case "rejected":
//       return {
//         ...state,
//         isLoading: false,
//         error: action.payload,
//       };
//     case "signin":
//       return {
//         user: action.payload,
//         isAuthenticated: true,
//       };
//     case "signup":
//       return {
//         user: action.payload,
//         isAuthenticated: true,
//       };
//     case "user/loaded":
//       return {
//         user: action.payload,
//         isAuthenticated: true,
//       };
//   }
// };

// export default function AuthProvider({ children }) {
//   const router = useRouter();
//   const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
//     authReducer,
//     initialState
//   );

//   async function signin(values) {
//     dispatch({ type: "loading" });
//     try {
//       const { user, message } = await singinApi(values);
//       dispatch({ type: "signin", payload: user });
//       toast.success(message);
//       router.push("/profile");
//     } catch (error) {
//       const errorMsg = error?.response?.data?.message;
//       dispatch({ type: "rejected", payload: errorMsg });
//       toast.error(errorMsg);
//     }
//   }

//   async function signup(values) {
//     dispatch({ type: "loading" });
//     try {
//       const { user, message } = await signupApi(values);
//       dispatch({ type: "signup", payload: user });
//       toast.success(message);
//       router.push("/profile");
//     } catch (error) {
//       const errorMsg = error?.response?.data?.message;
//       dispatch({ type: "rejected", payload: errorMsg });
//       toast.error(errorMsg);
//     }
//   }

//   async function getUser() {
//     dispatch({ type: "loading" });
//     try {
//       const { user } = await getUserApi();
//       dispatch({ type: "user/loaded", payload: user });
//     } catch (error) {
//       const errorMsg = error?.response?.data?.message;
//       dispatch({ type: "rejected", payload: errorMsg });
//       toast.error(errorMsg);
//     }
//   }

//   useEffect(() => {
//     async function fetchData() {
//       await getUser();
//     }
//     fetchData();
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{ user, isAuthenticated, isLoading, signin, signup }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) throw new Error("not found Auth Context");
//   return context;
// }






"use client"; // این فایل باید در سمت کلاینت اجرا شود

import { getUserApi, signupApi, singinApi } from "@/services/authService"; // ایمپورت توابع مرتبط با احراز هویت از سرویس‌ها
import { useRouter } from "next/navigation"; // ایمپورت useRouter برای هدایت بین صفحات
import { createContext, useReducer, useContext, useEffect } from "react"; // ایمپورت توابع مربوط به مدیریت context
import toast from "react-hot-toast"; // ایمپورت toast برای نمایش پیام‌های اطلاع‌رسانی

// ایجاد Context برای مدیریت احراز هویت
const AuthContext = createContext();

// مقدار اولیه برای وضعیت احراز هویت
const initialState = {
  user: null, // اطلاعات کاربر
  isAuthenticated: false, // وضعیت احراز هویت
  isLoading: true, // وضعیت بارگذاری
  error: null, // ذخیره خطاهای احتمالی
};

// تابع reducer برای مدیریت تغییرات وضعیت احراز هویت
const authReducer = (state, action) => {
  switch (action.type) {
    case "loading": // حالت بارگذاری
      return {
        ...state,
        isLoading: true,
      };
    case "rejected": // در صورت بروز خطا
      return {
        ...state,
        isLoading: false,
        error: action.payload, // ذخیره پیام خطا
      };
    case "signin": // ورود موفق کاربر
      return {
        user: action.payload, // ذخیره اطلاعات کاربر
        isAuthenticated: true, // تغییر وضعیت احراز هویت به true
      };
    case "signup": // ثبت‌نام موفق کاربر
      return {
        user: action.payload, // ذخیره اطلاعات کاربر
        isAuthenticated: true, // تغییر وضعیت احراز هویت به true
      };
    case "user/loaded": // بارگذاری اطلاعات کاربر از سرور
      return {
        user: action.payload, // ذخیره اطلاعات کاربر
        isAuthenticated: true, // تغییر وضعیت احراز هویت به true
      };
  }
};

// تعریف کامپوننت AuthProvider برای مدیریت احراز هویت کاربران
export default function AuthProvider({ children }) {
  const router = useRouter(); // استفاده از router برای هدایت صفحات
  const [{ user, isAuthenticated, isLoading, error }, dispatch] = useReducer(
    authReducer,
    initialState
  ); // مقداردهی اولیه reducer برای مدیریت وضعیت

  // تابع ورود کاربر
  async function signin(values) {
    dispatch({ type: "loading" }); // فعال‌سازی حالت بارگذاری
    try {
      const { user, message } = await singinApi(values); // ارسال درخواست ورود به سرور
      dispatch({ type: "signin", payload: user }); // ذخیره اطلاعات کاربر در وضعیت
      toast.success(message); // نمایش پیام موفقیت
      router.push("/profile"); // هدایت کاربر به صفحه پروفایل
    } catch (error) {
      const errorMsg = error?.response?.data?.message; // دریافت پیام خطا از سرور
      dispatch({ type: "rejected", payload: errorMsg }); // ذخیره خطا در وضعیت
      toast.error(errorMsg); // نمایش پیام خطا
    }
  }

  // تابع ثبت‌نام کاربر
  async function signup(values) {
    dispatch({ type: "loading" }); // فعال‌سازی حالت بارگذاری
    try {
      const { user, message } = await signupApi(values); // ارسال درخواست ثبت‌نام به سرور
      dispatch({ type: "signup", payload: user }); // ذخیره اطلاعات کاربر در وضعیت
      toast.success(message); // نمایش پیام موفقیت
      router.push("/profile"); // هدایت کاربر به صفحه پروفایل
    } catch (error) {
      const errorMsg = error?.response?.data?.message; // دریافت پیام خطا از سرور
      dispatch({ type: "rejected", payload: errorMsg }); // ذخیره خطا در وضعیت
      toast.error(errorMsg); // نمایش پیام خطا
    }
  }

  // تابع دریافت اطلاعات کاربر
  async function getUser() {
    dispatch({ type: "loading" }); // فعال‌سازی حالت بارگذاری
    try {
      const { user } = await getUserApi(); // درخواست اطلاعات کاربر از سرور
      dispatch({ type: "user/loaded", payload: user }); // ذخیره اطلاعات کاربر در وضعیت
    } catch (error) {
      const errorMsg = error?.response?.data?.message; // دریافت پیام خطا از سرور
      dispatch({ type: "rejected", payload: errorMsg }); // ذخیره خطا در وضعیت
      toast.error(errorMsg); // نمایش پیام خطا
    }
  }

  // فراخوانی تابع دریافت اطلاعات کاربر هنگام بارگذاری کامپوننت
  useEffect(() => {
    async function fetchData() {
      await getUser(); // دریافت اطلاعات کاربر
    }
    fetchData();
  }, []);

  // ارائه context احراز هویت به کامپوننت‌های دیگر
  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, signin, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ایجاد یک هوک اختصاصی برای استفاده از context احراز هویت
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("not found Auth Context"); // در صورت عدم یافتن context، خطا نمایش داده می‌شود
  return context;
}




