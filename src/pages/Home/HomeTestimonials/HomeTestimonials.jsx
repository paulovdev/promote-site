import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./HomeTestimonials.scss";

const testimonials = [
    {
        text: "Quimplo has completely transformed the way I sell websites and promote them. The exposure and speed of sales are unmatched!",
        name: "Jane Doe",
        title: "SOFTWARE ENGINEER",
        image: "/world-img.jpg"
    }, {
        text: "Quimplo has completely transformed the way I sell websites and promote them. The exposure and speed of sales are unmatched!",
        name: "Jane Doe",
        title: "SOFTWARE ENGINEER",
        image: "/world-img.jpg"
    }, {
        text: "Quimplo has completely transformed the way I sell websites and promote them. The exposure and speed of sales are unmatched!",
        name: "Jane Doe",
        title: "SOFTWARE ENGINEER",
        image: "/world-img.jpg"
    }, {
        text: "Quimplo has completely transformed the way I sell websites and promote them. The exposure and speed of sales are unmatched!",
        name: "Jane Doe",
        title: "SOFTWARE ENGINEER",
        image: "/world-img.jpg"
    }, {
        text: "Quimplo has completely transformed the way I sell websites and promote them. The exposure and speed of sales are unmatched!",
        name: "Jane Doe",
        title: "SOFTWARE ENGINEER",
        image: "/world-img.jpg"
    },
];

const HomeTestimonials = () => {
    return (
        <section id="home-testimonials">
            <h1>What our <span>users</span> say</h1>
            <Swiper
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={4}
                spaceBetween={250}
                className="testimonials-slides"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="testimonial-card">
                            <div className="top-testimonial-card">
                                <p>"{testimonial.text}"</p>
                            </div>
                            <div className="bottom-testimonial-card">
                                <img src={testimonial.image} alt={testimonial.name} />
                                <div className="profile-text">
                                    <h3>{testimonial.name}</h3>
                                    <p>{testimonial.title}</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default HomeTestimonials;
