import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.E. Computer Science</h4>
                <h5>Dayananda Sagar College of Engineering</h5>
              </div>
              <h3>2024–28</h3>
            </div>
            <p>
              Pursuing B.E. in Computer Science (IoT, Blockchain &amp; Cyber
              Security) in Bangalore with a CGPA of 8.8, combining AI/ML
              engineering with decentralized systems and cloud architecture.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Computer Vision Intern</h4>
                <h5>E-refresh (Aug. 2025 – Oct. 2025)</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Developed Vision Transformer (ViT) models for classification and
              segmentation on strawberry and blueberry datasets using PyTorch
              and Hugging Face; fine-tuned ViT-Base with LoRA to reach 89%
              accuracy while training 25% of parameters and cutting GPU memory
              usage by 20%.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Co-Inventor (Patent Filed)</h4>
                <h5>Indian Patent App. No. 202641027095 A</h5>
              </div>
              <h3>2026</h3>
            </div>
            <p>
              Filed &ldquo;Decentralized System and Method for Lifecycle
              Governance of Carbon Assets via Smart Contracts and Cryptographic
              Verification&rdquo; (Mar. 2026). Designed a hybrid DApp combining
              smart contracts with off-chain storage to automate carbon credit
              trading.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
