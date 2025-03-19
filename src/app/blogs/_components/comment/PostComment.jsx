"use client";
import Button from "@/ui/Button";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline"; // آیکون علامت سوال برای نمایش در دکمه
import Comment from "./Comment"; // کامپوننت نمایش نظر
import Modal from "@/ui/Modal"; // کامپوننت مودال برای نمایش فرم نظر جدید
import { useState } from "react"; // هوک useState برای مدیریت وضعیت‌های محلی (Local State)
import CommentForm from "./CommentForm"; // فرم ارسال نظر
import { useAuth } from "@/context/AuthContext"; // هوک برای مدیریت وضعیت احراز هویت کاربر
import { useRouter } from "next/navigation"; // هوک برای مدیریت مسیریابی در پروژه‌های Next.js
import classNames from "classnames"; // کتابخانه‌ای برای مدیریت کلاس‌های CSS به صورت داینامیک

// تعریف کامپوننت PostComment که ورودی آن شامل اطلاعات پست و نظرات آن است
function PostComment({ post: { comments, _id: postId } }) {
  // تعریف وضعیت‌های محلی (State)
  const [open, setOpen] = useState(false); // مدیریت باز یا بسته بودن مودال
  const [parent, setParent] = useState(null); // ذخیره اطلاعات کامنت والد (برای پاسخ به کامنت)
  const { user } = useAuth(); // دریافت اطلاعات کاربر با استفاده از هوک احراز هویت
  const router = useRouter(); // استفاده از روتینگ در Next.js

  // تابع مدیریت کلیک روی "افزودن نظر جدید" یا "پاسخ به نظر"
  const addNewCommentHandler = (parent) => {
    if (!user) {
      // بررسی اینکه آیا کاربر وارد سیستم شده است یا خیر
      router.push("/signin"); // در صورت عدم ورود به سیستم، کاربر به صفحه ورود هدایت می‌شود
      return;
    }
    setParent(parent); // تنظیم کامنت والد در صورت وجود
    setOpen(true); // باز کردن مودال
  };

  return (
    <div className="mb-10">
      {/* نمایش مودال برای ثبت نظر جدید یا پاسخ به یک نظر */}
      <Modal
        open={open} // تعیین وضعیت باز بودن مودال
        onClose={() => setOpen(false)} // بستن مودال
        title={parent ? "پاسخ به نظر" : "نظر جدید"} // تعیین عنوان مودال
        description={parent ? parent.user.name : "نظر خود را وارد کنید"} // توضیح داخل مودال
      >
        <CommentForm
          onClose={() => setOpen(false)} // تابع برای بستن مودال پس از ارسال نظر
          parentId={parent ? parent._id : null} // ارسال آی‌دی والد در صورت پاسخ به یک نظر
          postId={postId} // ارسال آی‌دی پست برای ثبت نظر
        />
      </Modal>

      {/* بخش عنوان و دکمه افزودن نظر جدید */}
      <div className="flex flex-col items-center lg:flex-row justify-between gap-y-3 mb-8">
        <h2 className="text-2xl font-bold text-secondary-800">نظرات</h2>{" "}
        {/* عنوان بخش نظرات */}
        <Button
          onClick={() => addNewCommentHandler(null)} // کلیک روی دکمه برای ثبت نظر جدید
          variant="outline"
          className="flex items-center py-2"
        >
          <QuestionMarkCircleIcon className="w-4 ml-2" /> {/* آیکون دکمه */}
          <span>ثبت نظر جدید</span> {/* متن دکمه */}
        </Button>
      </div>

      {/* بخش نمایش نظرات */}
      <div className="space-y-8 post-comments bg-secondary-0 rounded-xl py-6 px-3 lg:px-6 ">
        {comments.length > 0 ? ( // بررسی اینکه آیا نظری وجود دارد یا خیر
          comments.map((comment) => {
            // مپ کردن روی آرایه نظرات
            return (
              <div key={comment._id}>
                {/* نمایش هر نظر اصلی */}
                <div className="border border-secondary-200 rounded-xl p-2 sm:p-4 mb-3">
                  <Comment
                    comment={comment} // ارسال داده‌های کامنت
                    onAddComment={() => addNewCommentHandler(comment)} // کلیک روی دکمه پاسخ به نظر
                  />
                </div>

                {/* نمایش پاسخ‌های مربوط به هر نظر */}
                <div className="post-comments__answer mr-2 sm:mr-8 space-y-3">
                  {comment.answers.map((item, index) => {
                    // مپ روی پاسخ‌های هر نظر
                    return (
                      <div key={item._id} className="relative">
                        <div
                          className={classNames(
                            "answer-item border border-secondary-100 bg-secondary-50/80 rounded-xl p-2 sm:p-4",
                            {
                              "last-item": index + 1 === comment.answers.length, // اضافه کردن کلاس خاص به آخرین آیتم پاسخ
                            }
                          )}
                        >
                          <Comment comment={item} key={item._id} />{" "}
                          {/* نمایش پاسخ */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-secondary-500">برای این پست نظری ثبت نشده است</p>
        )}
      </div>
    </div>
  );
}
export default PostComment; // خروجی گرفتن از کامپوننت برای استفاده در سایر بخش‌های پروژه
