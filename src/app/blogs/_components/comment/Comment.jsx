import Avatar from "@/ui/Avatar"; // کامپوننت آواتار برای نمایش تصویر پروفایل کاربر
import Button from "@/ui/Button"; // کامپوننت دکمه
import { ArrowUturnRightIcon } from "@heroicons/react/24/outline"; // آیکون پاسخ (فلش برگشت)

function Comment({ comment, onAddComment }) {
  // کامپوننت نمایش نظر با ورودی‌های comment و onAddComment
  return (
    <>
      {/* بخش بالایی نظر شامل نام کاربر، آواتار و دکمه پاسخ */}
      <div className="flex items-center justify-between mb-5 border-b border-b-secondary-200/60 pb-2">
        {/* اطلاعات کاربر شامل آواتار، نام و تاریخ ثبت نظر */}
        <div className="flex items-center gap-x-1">
          <Avatar
            height={34} // ارتفاع آواتار
            width={34} // عرض آواتار
            alt={comment.user?.name || "-"} // نام کاربر یا "-" در صورت نبودن اطلاعات کاربر
            src={comment.user.avatarUrl} // آدرس تصویر آواتار
          />
          <div className="text-sm w-full text-secondary-600">
            <span className="font-bold block mb-1">{comment.user.name}</span>{" "}
            {/* نام کاربر */}
            <span className="block text-secondary-500 text-xs">
              {comment.createdAt} {/* تاریخ ثبت نظر */}
            </span>
          </div>
        </div>

        {/* دکمه پاسخ به نظر در صورت فعال بودن پاسخ‌دهی */}
        <div>
          {comment.openToComment && ( // بررسی اینکه آیا امکان پاسخ دادن فعال است
            <Button
              onClick={onAddComment} // کلیک روی دکمه پاسخ
              variant="secondary"
              className="text-sm flex gap-x-1 p-1 rounded-lg text-secondary-500 bg-secondary-200"
            >
              <span className="ml-1">
                <ArrowUturnRightIcon className="w-4" /> {/* آیکون پاسخ */}
              </span>
              <span>پاسخ</span> {/* متن دکمه */}
            </Button>
          )}
        </div>
      </div>

      {/* محتوای متن نظر */}
      <p className="text-secondary-700 leading-loose lg:leading-8 text-xs lg:text-base">
        {comment.content.text} {/* متن نظر */}
      </p>
    </>
  );
}

export default Comment; // خروجی گرفتن از کامپوننت برای استفاده در سایر بخش‌های پروژه
