"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import ReactLenis from "@studio-freight/react-lenis";
import { ReactLenis } from "lenis/react";
import { useRouter } from "next/navigation";

export default function ProjectClient({ project, nextProject, prevProject }) {
  const projectNavRef = useRef(null);
  const progressBarRef = useRef(null);
  const projectDescriptionRef = useRef(null);
  const footerRef = useRef(null);
  const nextProjectProgressRef = useRef(null);
  const featuredVideoRef = useRef(null);
  const parallaxImageBgRef = useRef(null);

  const router = useRouter();

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [shouldUpdateProgress, setShouldUpdateProgress] = useState(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(projectNavRef.current, {
      opacity: 0,
      y: -100,
    });

    gsap.to(projectNavRef.current, {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.25,
      ease: "power3.out",
    });

    gsap.set(projectDescriptionRef.current, {
      opacity: 0,
      y: -100,
    });

    gsap.to(projectDescriptionRef.current, {
      opacity: 1,
      duration: 1,
      delay: 0.5,
      ease: "power3.out",
    });

    gsap.set(featuredVideoRef.current, {
      scale: 0.5,
    });
    gsap.to(featuredVideoRef.current, {
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: featuredVideoRef.current,
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    });

    gsap.to(parallaxImageBgRef.current, {
      y: "35%",
      ease: "none",
      scrollTrigger: {
        trigger: parallaxImageBgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const navScrollTrigger = ScrollTrigger.create({
      trigger: document.body,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (progressBarRef.current) {
          gsap.set(progressBarRef.current, {
            scaleX: self.progress,
          });
        }
      },
    });

    const footerScrollTrigger = ScrollTrigger.create({
      trigger: footerRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 3}px`,
      pin: true,
      pinSpacing: true,
      onEnter: () => {
        if (projectNavRef.current) {
          gsap.to(projectNavRef.current, {
            y: -100,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      },
      onLeaveBack: () => {
        if (projectNavRef.current) {
          gsap.to(projectNavRef.current, {
            y: 0,
            duration: 0.5,
            ease: "power2.inOut",
          });
        }
      },
      onUpdate: (self) => {
        if (nextProjectProgressRef.current) {
          gsap.set(nextProjectProgressRef.current, {
            scaleX: self.progress,
          });
        }

        if (self.progress >= 1 && !isTransitioning) {
          setShouldUpdateProgress(false);
          setIsTransitioning(true);

          const tl = gsap.timeline();

          tl.set(nextProjectProgressRef.current, {
            scaleX: 1,
          });

          tl.to(
            [
              footerRef.current?.querySelector(".project-footer-copy"),
              footerRef.current?.querySelector(".next-project-progress"),
            ],
            {
              opacity: 0,
              duration: 0.3,
              ease: "power2.inOut",
            }
          );

          tl.call(() => {
            router.push(`/projects/${nextProject.slug}`);
          });
        }
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [nextProject.slug, isTransitioning, shouldUpdateProgress]);

  return (
    <ReactLenis root>
      <div className="">
        <div
          ref={projectNavRef}
          className="fixed top-0 left-1/2 -translate-x-1/2 w-full md:w-[50vw]  flex justify-between gap-2 p-1 z-10"
        >
          <Link
            href={`/projects/${prevProject.slug}`}
            className="rounded-[.5rem] bg-neutral-100 p-1 hidden md:block"
          >
            <span>&#8592; &nbsp;</span>
            Previous
          </Link>

          <div className="relative height-[30px] flex-2 flex-center rounded-[.5rem] border border-neutral-100 overflow-hidden bg-neutral-950/25 backdrop-blur-xlp-1">
            <p className="relative z-10">{project.title}</p>

            <div
              ref={progressBarRef}
              className="absolute top-0 left-0 z-0 w-full h-full bg-neutral-100 scale-x-0 origin-left"
            ></div>
          </div>

          <Link
            href={`/projects/${nextProject.slug}`}
            className="rounded-[.5rem] bg-neutral-100 p-1 hidden md:block"
          >
            Next
            <span>&#8594; &nbsp;</span>
          </Link>
        </div>

        <div className="relative w-screen h-screen flex-center">
          <h1 className="text-4xl md:text-8xl">{project.title}</h1>

          <p
            ref={projectDescriptionRef}
            id="project-description"
            className="absolute bottom-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            {project.description}
          </p>
        </div>

        <div className="relative h-screen mb-32">
          {project.video && (
            <video
              loop
              autoPlay
              muted
              ref={featuredVideoRef}
              className="absolute top-0 left-0 right-0 h-full w-full object-cover origin-center"
            >
              <source src={`${project.video}`} type="video/mp4" />
            </video>
          )}
        </div>

        <div className="flex flex-col justify-center items-center gap-5 md:grid md:grid-cols-2 md:px-[10%]">
          {project.images &&
            project.images.map((image, index) => (
              <div key={index} className="w-full flex-center">
                <img
                  src={image}
                  alt={`${project.title} Image ${index + 1}`}
                  style={{ maxWidth: "100%" }}
                  className="w-[90%] md:w-full h-[75svh] md:h-auto object-cover"
                />
              </div>
            ))}
        </div>

        <div className="relative h-screen overflow-hidden my-32">
          {project.finalImage && (
            <img
              ref={parallaxImageBgRef}
              src={`${project.finalImage}`}
              className="absolute top-0 left-0 h-full w-full object-cover"
            />
          )}
        </div>

        <div ref={footerRef} className="relative w-screen h-screen flex-center">
          <h1 className="text-4xl md:text-8xl">{nextProject.title}</h1>

          <div className="project-footer-copy absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="">Next Project</p>
          </div>

          <div className="next-project-progress absolute bottom-[25%] w-1/2 h-[4px] bg-neutral-100">
            <div
              ref={nextProjectProgressRef}
              className="absolute top-0 left-0 w-full h-full bg-black scale-x-0 will-change-transform"
            ></div>
          </div>
        </div>
      </div>
    </ReactLenis>
  );
}
