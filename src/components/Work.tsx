import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const projects = [
  {
    title: "Aircraft Maintenance Assistant",
    category: "GenAI / Hybrid RAG",
    tools: "Python, LlamaIndex, Qdrant, FastAPI, Docker, Ragas",
    summary:
      "Hybrid retrieval (BM25 + embeddings, RRF, cross-encoder reranking) over FAA defect reports; raised top-5 accuracy from 76% to 93% with citation guardrails.",
    image: "/images/project-rag.jpg",
  },
  {
    title: "Carbon Credit Trading System",
    category: "Blockchain / Smart Contracts",
    tools: "React, Tailwind CSS, Solidity, Python (ERC-20 & ERC-721)",
    summary:
      "Tokenizes each ton of CO2 as tradable ERC-20 credits and issues unique ERC-721 NFT certificates to verified companies for compliant trading.",
    image: "/images/project-carbon.jpg",
  },
  {
    title: "Berry Growth Stage Detector",
    category: "Computer Vision / ViT + LoRA",
    tools: "Python, PyTorch, Hugging Face, OpenCV, NumPy, Matplotlib",
    summary:
      "Fine-tuned ViT-Base using Low-Rank Adaptation (LoRA) for strawberry and blueberry detection and growth-stage classification at 89% accuracy.",
    image: "/images/project-berry.jpg",
  },
  {
    title: "Carbon Asset Governance Patent",
    category: "Indian Patent 202641027095 A",
    tools: "Solidity, Cryptographic Verification, Hybrid DApp Architecture",
    summary:
      "Co-inventor of a decentralized lifecycle governance system for carbon assets combining smart contracts with off-chain storage (Filed Mar. 2026).",
    image: "/images/project-patent.jpg",
  },
];

const Work = () => {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
      function getTranslateX() {
        const box = document.getElementsByClassName("work-box");
        const container = document.querySelector(".work-container");
        if (!box.length || !container || !box[0].parentElement) return 0;
        const rectLeft = container.getBoundingClientRect().left;
        const rect = box[0].getBoundingClientRect();
        const parentWidth = box[0].parentElement.getBoundingClientRect().width;
        const padding = parseInt(window.getComputedStyle(box[0]).padding) / 2;
        return Math.max(
          0,
          rect.width * box.length - (rectLeft + parentWidth) + padding
        );
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${getTranslateX()}`,
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work",
        },
      });

      timeline.to(".work-flex", {
        x: () => -getTranslateX(),
        ease: "none",
      });

      return () => {
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={project.title}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
                <p>{project.summary}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
