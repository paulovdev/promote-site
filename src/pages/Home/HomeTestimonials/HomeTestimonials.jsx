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
            <div className="testimonials-header">
                <span>what our customers say</span>
                <div className="swiper-arrows">
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-button-next"></div>
                </div>
            </div>
            <Swiper
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={1}
                navigation={{
                    prevEl: '.swiper-button-prev',
                    nextEl: '.swiper-button-next',
                }}
                spaceBetween={500}
                className="testimonials-slides"
            >
                {testimonials.map((testimonial, index) => (
                    <SwiperSlide key={index}>
                        <div className="testimonial-card">
                            <p>"{testimonial.text}"</p>
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
