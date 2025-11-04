import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ProductCard from "./ProductCard.jsx";
import { listAutos } from "../api";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./destacados.css"; // 👈 estilos actualizados aquí

export default function Destacados({ items: external }) {
  const [items, setItems] = useState(external || []);
  const [loading, setLoading] = useState(!external);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (external) return;
    (async () => {
      try {
        setLoading(true);
        const data = await listAutos({
          destacado: 1,
          page: 1,
          limit: 30,
          sort: "created_at desc",
        });
        setItems(Array.isArray(data?.items) ? data.items : []);
      } catch {
        setErr("No se pudieron cargar los destacados");
      } finally {
        setLoading(false);
      }
    })();
  }, [external]);

  if (loading)
    return (
      <section className="max-w-6xl mx-auto p-6">
        <p className="text-neutral-400">Cargando…</p>
      </section>
    );
  if (err)
    return (
      <section className="max-w-6xl mx-auto p-6">
        <p className="text-rose-400">{err}</p>
      </section>
    );
  if (items.length === 0) return null;

  const loop = items.length > 1;

  return (
    <section className="max-w-6xl mx-auto p-6 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-semibold text-white">
          Destacados
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={16}
        loop={loop}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 18 },
        }}
        className="!pb-10 destacados-swiper"
      >
        {items.map((p) => (
          <SwiperSlide key={p.id}>
            <ProductCard p={p} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
