import Image from "next/image";
import Hero from "@/sections/home/hero";
import Brands from "@/sections/home/brands";
import Stats from "@/sections/home/stats";
import Timeline from "@/sections/home/timeline";
import About from "@/sections/home/about";
import Serve from "@/sections/home/serve";
import Testimonials from "@/sections/home/testimonials";
export default function Home() {
  return (
    <>
    <Hero />
    <Brands />
    <Stats />
    <About />
    <Timeline />
    <Serve />
    <Testimonials />
    </>
  );
}
