"use client";
import { Suspense, useRef } from "react";
import Skiggle from "@/components/Featured/Skiggle";
import Header from "@/components/Featured/Header";
import FeaturedVideo from "@/components/Featured/FeaturedVideo";
import SubHeader from "@/components/Featured/SubHeader";
import Navbar from "@/components/Navbar/Navbar";
import HeroSection from "@/components/HeroSection/HeroSection";
import TechStack from "@/components/TechStack/TechStack";
import Projects from "@/components/Projects/Projects";
import HorizontalScroll from "@/components/HorizontalScroll/HorizontalScroll";
import Contact from "@/components/Contact/Contact";
import SiteFooter from "@/components/SiteFooter/SiteFooter";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  const ref = useRef(null);

  return (
    <SmoothScroll>
      <Suspense
        fallback={
          <div className="w-screen bg-black h-screen text-white text-4xl md:text-7xl lg:text-9xl flex items-center justify-center font-bold">
            Loading...
          </div>
        }
      >
        <div className="bg-bg text-fg h-auto w-screen overflow-x-hidden">
          <Navbar />

          <HeroSection />

          <div
            id="about"
            className="relative w-full overflow-hidden mt-16 sm:mt-24 lg:mt-32 pb-20 lg:pb-32"
            ref={ref}
          >
            <Skiggle />
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-16 relative z-10">
              <Header />
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 mt-10 lg:mt-14 items-start">
                <div className="lg:col-span-5 w-full flex justify-center lg:justify-start">
                  <FeaturedVideo refForward={ref} />
                </div>
                <div className="lg:col-span-7 w-full">
                  <SubHeader />
                </div>
              </div>
            </div>
          </div>

          <TechStack />

          <Projects />

          <HorizontalScroll />

          <Contact />

          <SiteFooter />
        </div>
      </Suspense>
    </SmoothScroll>
  );
}
