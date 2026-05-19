"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        name: "Ali Raza",
        role: "Gym Enthusiast",
        review:
            "Pulse Track completely transformed how I monitor workouts and nutrition.",
    },
    {
        name: "Sarah Khan",
        role: "Fitness Coach",
        review:
            "The dashboard analytics and progress tracking are incredibly professional.",
    },
    {
        name: "Usman Tariq",
        role: "Weight Loss Journey",
        review:
            "Tracking calories and hydration daily became easy and motivating.",
    },
];

export default function TestimonialsSection() {
    return (
        <section className="bg-black py-24 text-white">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl font-extrabold md:text-5xl">
                        What Our
                        <span className="bg-gradient-to-r from-blue-500 to-green-400 bg-clip-text text-transparent">
                            {" "}Users Say
                        </span>
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-400">
                        Thousands of users trust Pulse Track to improve their fitness lifestyle.
                    </p>
                </motion.div>

                <div className="grid gap-8 md:grid-cols-3">

                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                            }}
                            viewport={{ once: true }}
                            className="rounded-3xl border border-blue-500/10 bg-white/5 p-8 backdrop-blur-xl"
                        >
                            <p className="leading-8 text-gray-300">
                                &ldquo;{testimonial.review}&rdquo;
                            </p>

                            <div className="mt-8">
                                <h4 className="text-lg font-bold">
                                    {testimonial.name}
                                </h4>

                                <p className="text-sm text-green-400">
                                    {testimonial.role}
                                </p>
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    );
}