"use server"; // استفاده از حالت سرور

import { createCommentApi } from "@/services/commentService"; // ایمپورت تابع ایجاد نظر از سرویس
import setCookieOnReq from "@/utils/setCookieOnReq"; // ایمپورت تابع تنظیم کوکی روی درخواست
import { revalidatePath } from "next/cache"; // ایمپورت تابع بازبینی مسیر از کش
import { cookies } from "next/headers"; // ایمپورت کوکی‌ها از هدرها

// export async function createComment(postId, parentId, formData) { // تابع ایجاد نظر

export async function createComment(prevState, { formData, postId, parentId }) {
  // تابع ایجاد نظر با پارامترهای جدید
  const cookiesStore = cookies(); // دریافت کوکی‌ها
  const options = setCookieOnReq(cookiesStore); // تنظیم کوکی‌ها روی درخواست

  const rawFormData = {
    // ساختار داده خام فرم
    postId, // شناسه پست
    parentId, // شناسه والد
    text: formData.get("text"), // متن نظر
  };

  try {
    const { message } = await createCommentApi(rawFormData, options); // فراخوانی API ایجاد نظر
    revalidatePath("/blogs/[slug]"); // بازبینی مسیر
    return {
      message, // پیام موفقیت
    };
  } catch (err) {
    const error = err?.response?.data?.message; // دریافت پیام خطا
    return {
      error, // پیام خطا
    };
  }
}
