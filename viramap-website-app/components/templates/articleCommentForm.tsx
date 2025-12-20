//components\templates\articleCommentForm.tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { StarIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postArticleComment } from "@/components/lib/articleApi";
import { logger } from "@/components/lib/logger";

type Props = { blogId: number };

function ArticleCommentForm({ blogId }: Props) {
  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    rating: 5,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "نام و نام خانوادگی الزامی است";
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = "نام باید حداقل ۳ کاراکتر باشد";
    }

    if (!formData.title.trim()) {
      newErrors.title = "متن دیدگاه الزامی است";
    } else if (formData.title.length < 10) {
      newErrors.title = "دیدگاه باید حداقل ۱۰ کاراکتر باشد";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await postArticleComment({
        blogId,
        title: formData.title,
        rate: formData.rating,
      });

      if (result > 0) {
        toast.success("نظر شما با موفقیت ثبت شد");
        setFormData({ fullName: "", title: "", rating: 5 });
        setErrors({});
        // می‌توانید یک callback برای refresh نظرات اضافه کنید
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      } else {
        toast.error("خطا در ثبت نظر. لطفا دوباره تلاش کنید");
      }
    } catch (error) {
      logger.error("خطا در ارسال نظر:", error);
      toast.error("خطا در ثبت نظر. لطفا دوباره تلاش کنید");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (starValue: number) => {
    setFormData((prev) => ({ ...prev, rating: starValue }));
    if (errors.rating) {
      setErrors((prev) => ({ ...prev, rating: "" }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-b from-gray-900/50 to-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 space-y-4"
    >
      <h3 className="font-ravi text-xl font-medium text-white">ثبت دیدگاه</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* نام و نام خانوادگی */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            نام و نام خانوادگی <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="نام و نام خانوادگی"
              className="w-full bg-gray-900/50 border-gray-700 text-white pr-10"
              dir="rtl"
            />
            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* امتیاز */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            به مقاله چه امتیازی می‌دهید؟ <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center justify-between bg-gray-900/50 border border-gray-700 rounded-lg p-3">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <StarIcon
                    className={`w-5 h-5 transition-colors ${
                      star <= formData.rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-gray-300 font-medium">
              {formData.rating}/5
            </span>
          </div>
        </div>
      </div>

      {/* متن دیدگاه */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          متن دیدگاه <span className="text-red-500">*</span>
        </label>
        <Textarea
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="متن دیدگاه خود را بنویسید..."
          className="w-full bg-gray-900/50 border-gray-700 text-white min-h-[120px]"
          dir="rtl"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
      </div>

      {/* دکمه ارسال */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600"
        >
          {isSubmitting ? "در حال ارسال..." : "ارسال نظر"}
        </Button>
      </div>
    </form>
  );
}

export default ArticleCommentForm;
