import React from "react";
import { useTranslation } from "next-i18next";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar, FaRegStar, FaQuoteLeft } from "react-icons/fa";

import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) =>
        i < rating ? (
          <FaStar key={i} className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
        ) : (
          <FaRegStar
            key={i}
            className="w-3.5 h-3.5 text-[var(--theme-text-muted)]"
          />
        )
      )}
    </div>
  );
};

const TestimonialCard: React.FC<{
  testimonial: Testimonial;
  index: number;
}> = ({ testimonial, index }) => {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <motion.div
      className="h-full pb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <div className="relative h-full rounded-2xl border bg-[var(--theme-surface-1)] p-8 backdrop-blur-sm border-[var(--theme-border)] transition-all duration-300 hover:border-[var(--theme-surface-3)] hover:bg-[var(--theme-surface-2)]">
        <FaQuoteLeft className="w-8 h-8 text-[var(--theme-accent)] opacity-20 mb-4" />

        <p className="text-[var(--theme-text-secondary)] text-sm leading-relaxed mb-6">
          &ldquo;{testimonial.text}&rdquo;
        </p>

        <StarRating rating={testimonial.rating} />

        <div className="flex items-center gap-3 mt-6">
          <div className="w-10 h-10 rounded-full bg-[var(--theme-accent)]/10 flex items-center justify-center text-[var(--theme-accent)] text-sm font-semibold">
            {initials}
          </div>
          <div>
            <p className="text-[var(--theme-text)] font-semibold text-sm">
              {testimonial.name}
            </p>
            <p className="text-[var(--theme-text-muted)] text-xs">
              {testimonial.role} · {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const { t } = useTranslation("testimonials");
  const testimonials = t("testimonials", {
    returnObjects: true,
  }) as Testimonial[];

  return (
    <div className="bg-transparent unselectable">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <motion.div
          className="flex flex-col items-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-[var(--theme-accent)] to-transparent mb-4" />
          <h2 className="text-heading font-semibold text-center text-[var(--theme-text)]">
            {t("sectionTitle")}
          </h2>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={24}
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {Array.isArray(testimonials) &&
            testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <TestimonialCard testimonial={testimonial} index={index} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
