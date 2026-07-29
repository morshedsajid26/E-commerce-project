import { DUMMY_PRODUCTS, TESTIMONIALS } from "./homepage-data";

export const DETAILED_PRODUCT = {
  ...DUMMY_PRODUCTS[0],
  images: [
    "/hero-product.png",
    "/hero-product.png",
    "/hero-product.png",
    "/hero-product.png",
  ],
  video: "https://www.w3schools.com/html/mov_bbb.mp4", // Dummy standard video
  colors: [
    { name: "Matte Black", value: "black", hex: "#000000" },
    { name: "Silver", value: "silver", hex: "#e2e8f0" },
    { name: "Midnight Blue", value: "blue", hex: "#1e3a8a" },
  ],
  sizes: ["Standard", "Pro (Extended Battery)"],
  features: [
    "Active Noise Cancellation (ANC)",
    "Spatial Audio with Dynamic Head Tracking",
    "Up to 40 hours of battery life",
    "Premium memory foam ear cushions",
  ],
  specs: {
    "Driver Size": "40mm Custom High-Excursion",
    "Frequency Response": "20Hz - 20kHz",
    "Bluetooth Version": "5.3",
    "Weight": "285g",
    "Charging Time": "1.5 hours for full charge",
    "Water Resistance": "IPX4",
  },
  faq: [
    {
      question: "Does it come with a carrying case?",
      answer: "Yes, every premium headset includes a durable, hard-shell carrying case with cable storage."
    },
    {
      question: "Can I use them while charging?",
      answer: "Yes, you can continue to use the headset via the included USB-C cable while it charges from your device."
    },
    {
      question: "How good is the microphone for calls?",
      answer: "The headset features a beamforming 4-mic array specifically designed to isolate your voice and block out background noise during calls."
    }
  ],
  reviewsList: TESTIMONIALS.map(t => ({ ...t, rating: 5, date: "2 days ago" })),
  longDescription: `
    <p>Experience the absolute pinnacle of acoustic engineering. The Premium Wireless Headset represents a massive leap forward in audio technology, combining custom-built drivers with industry-leading Active Noise Cancellation to deliver an unparalleled listening experience.</p>
    <br/>
    <p>Every detail has been meticulously considered. From the acoustically engineered memory foam ear cushions that provide an exceptional acoustic seal, to the lightweight, breathable mesh canopy that reduces pressure on your head. It's not just a headset; it's a wearable acoustic environment.</p>
  `,
  shippingPolicy: "We offer Free Expedited Shipping on all premium orders. Orders placed before 2 PM EST ship the same day. Delivery typically takes 2-3 business days.",
  returnPolicy: "We offer a 30-day no-questions-asked return policy. If you are not completely satisfied with your premium acoustic experience, return it in original packaging for a full refund.",
  warranty: "Includes a 2-year limited warranty covering any manufacturing defects. Accidental damage coverage can be purchased separately.",
};
