"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaGithub,
  FaDownload,
  FaLinkedin,
  FaHtml5,
  FaJs,
  FaReact,
  FaNodeJs,
  FaCheck,
  FaSpinner,
  FaPaperPlane,
  FaCode,
  FaDatabase,
  FaMobile,
  FaServer,
  FaGraduationCap,
  FaBriefcase,
  FaCertificate,
  FaPlayCircle,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiExpress,
  SiMysql,
  SiNextdotjs,
  SiNestjs,
  SiJest,
} from "react-icons/si";
import emailjs from "@emailjs/browser";
emailjs.init("l9LaUdXMi1lyWL3iZ");

const Portfolio = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [skillsVisible, setSkillsVisible] = useState(false);

  // Refs for sections
  const formRef = useRef(null);
  const contactRef = useRef(null);
  const skillsRef = useRef(null);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const homeRef = useRef(null);
  const experienceRef = useRef(null);
  const educationRef = useRef(null);

  // Handle scroll to update active link and animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Update scrolled state for header
      setIsScrolled(scrollPosition > 50);

      // Check which section is in view
      const sections = [
        { ref: homeRef, id: "home" },
        { ref: aboutRef, id: "about" },
        { ref: skillsRef, id: "skills" },
        { ref: workRef, id: "work" },
        { ref: experienceRef, id: "experience" },
        { ref: educationRef, id: "education" },
        { ref: contactRef, id: "contact" },
      ];

      for (const section of sections) {
        if (!section.ref.current) continue;

        const sectionTop = section.ref.current.offsetTop - 100;
        const sectionHeight = section.ref.current.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveLink(section.id);

          // Set skills visible when skills section is in view
          if (section.id === "skills") {
            setSkillsVisible(true);
          }

          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Initialize AOS animation library
  useEffect(() => {
    const loadAOS = async () => {
      try {
        const AOS = (await import("aos")).default;
        await import("aos/dist/aos.css");

        AOS.init({
          duration: 800,
          once: false,
          mirror: true,
          offset: 80,
          easing: "ease-out-cubic",
          anchorPlacement: "top-bottom",
          disable: "mobile",
        });
      } catch (error) {
        console.error("Failed to initialize AOS:", error);
      }
    };

    loadAOS();
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveLink(sectionId);
      setShowMenu(false);
    }
  };

  // Handle resume download
  const handleDownloadResume = () => {
    window.open(
      "https://drive.google.com/file/d/1IiS_s1rrOXERz25Rx1M65Mr-b802BBEp/view?usp=sharing",
      "_blank"
    );
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      errors.email = "Invalid email address";
    }

    // Message validation
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Using EmailJS to send emails directly from client-side
      await emailjs.sendForm(
        "service_dwgym7u", // Your EmailJS service ID
        "template_caahy5j", // Your EmailJS template ID
        formRef.current
        // Public key only - never include private key in client code
      );

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } catch (error) {
      console.error("Email sending failed:", error);
      setSubmitStatus("error");

      // Reset status after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (submitStatus) {
        clearTimeout();
      }
    };
  }, [submitStatus]);

  // Projects data from resume
  const projects = [
    {
      id: 1,
      title: "Happy Kisan App",
      image: "",
      liveLink: "https://play.google.com/store/apps/details?id=com.happykisan",
      githubLink: "https://github.com/Engglala243/happy_kisan",
      description:
        "Enhanced the Happy Kisan app with improved logout session management, flat scroll integration, real-time updates, and cross-component data sync.",
      technologies: ["React Native", "Redux", "Firebase", "Push Notifications"],
    },
    {
      id: 2,
      title: "Email Booster App",
      image: "./email.jpeg",
      // liveLink: "https://github.com/Engglala243/News_app",
      githubLink: "https://github.com/oreximus/pradeep-sir-email-project",
      description:
        "Automate your email verification process with real-time monitoring. The app continuously checks for valid emails, preventing unverified or spam emails from cluttering your main inbox. The cycle runs automatically until verification is complete, optimizing your inbox efficiency.",
      technologies: ["Next", "Email API", "Tailwind"],
    },
    {
      id: 3,
      title: "DaaSu - SaaS ERP Application",
      image: "./daasu.jpeg",
      liveLink:
        "https://play.google.com/store/apps/details?id=com.oreximus.daasu",
      githubLink:
        "https://github.com/adarsh24688/daasu_app/tree/feature/react-native-bare",
      description:
        "Developed DaaSu, a SaaS-based ERP app for project/task management, Vendor Order management, and Purchase Order creation.",
      technologies: ["React Native", "Node.js", "Express.js", "MySQL"],
    },
    {
      id: 4,
      title: "GitHub Info",
      image: "./GitHub.png",
      liveLink: "https://information-fetch.vercel.app/Github",
      githubLink: "https://github.com/Engglala243/New_Page",
      description:
        "Discover detailed information about GitHub users, including their repositories, followers, and contributions—all in one place.",
      technologies: ["React", "GitHub API", "CSS"],
    },
    {
      id: 5,
      title: "Food Ordering Website",
      image: "./food_ordering.png",
      liveLink: "https://food-ordering-website.vercel.app/",
      githubLink: "https://github.com/Engglala243/food_ordering",
      description:
        "Built a responsive food ordering platform with dynamic cart, order tracking, and admin management features.",
      technologies: [
        "ReactJS",
        "Redux",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MySQL",
      ],
    },
    {
      id: 6,
      title: "Movies Review",
      image: "./Movie.png",
      liveLink: "https://movies-review-eosin.vercel.app/",
      githubLink: "https://github.com/Engglala243/Movies_Review",
      description:
        "Explore and discover detailed reviews of your favorite movies, with seamless search functionality to find any movie easily.",
      technologies: ["Node.js", "Express.js", "MongoDB", "React"],
    },
  ];

  // Skills data from resume
  const skillCategories = [
    {
      name: "Programming Languages",
      skills: [
        { name: "JavaScript", icon: <FaJs />, level: 90 },
        { name: "C/C++", icon: <FaCode />, level: 85 },
        { name: "Python", icon: <FaCode />, level: 80 },
      ],
    },
    {
      name: "Frontend Development",
      skills: [
        { name: "React.js", icon: <FaReact />, level: 95 },
        { name: "HTML5/CSS3", icon: <FaHtml5 />, level: 90 },
        { name: "Tailwind CSS", icon: <SiTailwindcss />, level: 85 },
        { name: "Next.js", icon: <SiNextdotjs />, level: 80 },
      ],
    },
    {
      name: "Backend Development",
      skills: [
        { name: "Node.js", icon: <FaNodeJs />, level: 90 },
        { name: "Express.js", icon: <SiExpress />, level: 85 },
        { name: "Nest.js", icon: <SiNestjs />, level: 75 },
        { name: "MySQL", icon: <SiMysql />, level: 80 },
      ],
    },
    {
      name: "Mobile Development",
      skills: [
        { name: "React Native", icon: <FaMobile />, level: 85 },
        { name: "Expo", icon: <FaMobile />, level: 80 },
        { name: "Android Basics", icon: <FaMobile />, level: 70 },
      ],
    },
    {
      name: "Testing & Tools",
      skills: [
        { name: "Jest", icon: <SiJest />, level: 75 },
        { name: "NMAP", icon: <FaServer />, level: 70 },
        { name: "Burp Suite", icon: <FaServer />, level: 65 },
        { name: "SQLmap", icon: <FaDatabase />, level: 70 },
      ],
    },
  ];

  // Education data from resume
  const education = [
    {
      degree: "Bachelor of Tech. (C.S.E)",
      institution: "Indore Institute of Technology, Indore (M.P.)",
      period: "2021-2025",
      description:
        "Currently pursuing my Bachelor's degree in Computer Science and Engineering.",
    },
    {
      degree: "Higher Secondary Education (PCM)",
      institution: "Pithampur Public H.S. School",
      period: "2021",
      description:
        "Completed my Higher Secondary Education with Mathematics, Physics and Chemistry as my major interests, and also have a good grasp on English and Hindi languages.",
    },
  ];
  // Work experience data from resume
  const experience = [
    {
      position: "Full-Stack Developer",
      company: "Apoliums Infotech, Indore",
      period: "August 2024 - Present",
      responsibilities: [
        "Worked under some of the experienced full-stack developers, followed best development practices.",
        "GIT VCS, GitHub platform, efficient Node.js practices to manage errors and responses.",
        "React.js optimized solutions to load the UI lightly on the user side with good experience.",
        "Managing large codebases in a structured and professional manner.",
        "Designing Database in a fulfilling way to store and expand the client requirements in the future.",
      ],
    },
  ];

  // Certifications data from resume
  const certifications = [
    {
      name: "Certificate of Completion (CCNA)",
      issuer: "Cisco Networking Academy",
      id: "ID: 105839712",
    },
    {
      name: "Certificate of Completion (Python Essentials)",
      issuer: "Cisco Networking Academy",
      id: "ID: 105839712",
    },
  ];

  return (
    <div className="portfolio-container">
      {/* Header */}
      <header className={`l-header ${isScrolled ? "scrolled" : ""}`}>
        <nav className="nav bd-grid">
          <div className="nav__brand">
            <a
              href="#home"
              className="nav__logo"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("home");
              }}
            >
              <span className="nav__logo-text">Emilio Gallo</span>
              <span className="nav__logo-dot"></span>
            </a>
          </div>

          <div className={`nav__menu ${showMenu ? "show" : ""}`} id="nav-menu">
            <ul className="nav__list">
              {[
                { name: "Home", id: "home" },
                { name: "About", id: "about" },
                { name: "Skills", id: "skills" },
                { name: "Projects", id: "work" },
                { name: "Experience", id: "experience" },
                { name: "Contact", id: "contact" },
              ].map((item) => (
                <li className="nav__item" key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`nav__link ${
                      activeLink === item.id ? "active-link" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id);
                    }}
                  >
                    {item.name}
                    {activeLink === item.id && (
                      <span className="nav__link-indicator"></span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
            <div className="nav__close" onClick={() => setShowMenu(false)}>
              <i className="bx bx-x"></i>
            </div>
          </div>

          <div className="nav__toggle" onClick={() => setShowMenu(!showMenu)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </nav>
      </header>

      <main className="l-main">
        {/* Home Section */}
        <section className="home bd-grid" id="home" ref={homeRef}>
          <div className="home__data" data-aos="fade-up" data-aos-delay="200">
            <h1 className="home__title">
              Hi,
              <br />
              I'm <></><span className="home__title-color">Emilio Gallo</span>
              <br /> <span className="typewriter">Full Stack Developer</span>
            </h1>
            <p
              className="home__description"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Building secure, scalable solutions with passion and precision
            </p>

            <div
              className="home__buttons"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <button
                onClick={handleDownloadResume}
                className="button button-outline resume-button"
              >
                <FaDownload className="button-icon" /> Resume
              </button>
              <div
                className="home__social"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                <a
                  href="https://www.linkedin.com/in/emilio-gallo-9a547a1ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home__social-icon"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://github.com/3m1l1o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="home__social-icon"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>

          <div className="home__img">
            <svg
              className="home__blob"
              viewBox="0 0 450 450"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="mask0" mask-type="alpha">
                <path d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z" />
              </mask>
              <g mask="url(#mask0)">
                <path
                  d="M9.19024 145.964C34.0253 76.5814 114.865 54.7299 184.111 29.4823C245.804 6.98884 311.86 -14.9503 370.735 14.143C431.207 44.026 467.948 107.508 477.191 174.311C485.897 237.229 454.931 294.377 416.506 344.954C373.74 401.245 326.068 462.801 255.442 466.189C179.416 469.835 111.552 422.137 65.1576 361.805C17.4835 299.81 -17.1617 219.583 9.19024 145.964Z"
                  fill="black"
                />
                <image
                  className="home__blob-img"
                  x="90"
                  y="90"
                  href="./src/assets/images/AresSpanelBretton.jpeg"
                />
              </g>
            </svg>
          </div>
        </section>

        {/* About Section */}
        <section className="about section" id="about" ref={aboutRef}>
          <h2 className="section-title" data-aos="fade-down">
            About Me
          </h2>

          <div className="about__container bd-grid">
            <div
              className="about__img"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <img
                src="./src/assets/images/AresSpanelBretton.jpeg"
                alt="image.png"
                className="about__portrait"
              />
            </div>

            <div
              className="about__content"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <h2 className="about__subtitle">I'm Aditya Patidar</h2>
              <p className="about__text">
                I'm a passionate Developer based in Javascript, React.js
                with expertise in building secure and scalable web.
              </p>

              <p className="about__text">
                I specialize in creating real-world impact through user-centered
                design and continuous learning. My technical skills span across
                frontend and backend technologies, with particular strength in
                React.js, Node.js.
              </p>

              <p className="about__text">
                I thrive in fast-paced environments and love solving real-world
                business problems with technology-driven solutions. My approach
                combines technical excellence with a focus on delivering
                exceptional user experiences.
              </p>

              <div className="about__info">
                <div className="about__info-item">
                  <span className="about__info-title">3+</span>
                  <span className="about__info-name">
                    Years
                    <br />
                    Experience
                  </span>
                </div>
                <div className="about__info-item">
                  <span className="about__info-title">3+</span>
                  <span className="about__info-name">
                    Completed
                    <br />
                    Projects
                  </span>
                </div>
                <div className="about__info-item">
                  <span className="about__info-title">3+</span>
                  <span className="about__info-name">
                    Technologies
                    <br />
                    Mastered
                  </span>
                </div>
              </div>

              <button
                onClick={handleDownloadResume}
                className="button resume-button"
              >
                <FaDownload className="button-icon" /> Download Resume
              </button>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills section" id="skills" ref={skillsRef}>
          <h2 className="section-title" data-aos="fade-down">
            Professional Skills
          </h2>

          <div className="skills__container">
            <p className="skills__intro" data-aos="fade-up">
              I've developed expertise in various technologies across the full
              development stack, allowing me to build complete, responsive, and
              scalable applications.
            </p>

            <div className="skills__categories">
              {skillCategories.map((category, categoryIndex) => (
                <div
                  key={categoryIndex}
                  className="skills__category"
                  data-aos="fade-up"
                  data-aos-delay={100 * categoryIndex}
                >
                  <h3 className="skills__category-title">{category.name}</h3>

                  <div className="skills__list">
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className="skills__item"
                        data-aos="fade-up"
                        data-aos-delay={150 + 50 * skillIndex}
                      >
                        <div className="skills__header">
                          <div className="skills__icon-wrapper">
                            {skill.icon}
                          </div>
                          <h3 className="skills__name">{skill.name}</h3>
                          <span className="skills__percentage">
                            {skill.level}%
                          </span>
                        </div>

                        <div className="skills__bar-container">
                          <div
                            className="skills__bar"
                            style={{
                              width: skillsVisible ? `${skill.level}%` : "0%",
                              transition: `width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${
                                0.3 + skillIndex * 0.1
                              }s`,
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="work section" id="work" ref={workRef}>
          <h2 className="section-title" data-aos="fade-down">
            Recent Projects
          </h2>

          <p className="work__intro" data-aos="fade-up">
            Here are some of the projects I've worked on, showcasing my skills in website development 
          </p>

          <div className="work__container">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="work__card"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <div className="work__img-container">
                  <img
                    src={"./src/assets/images/AresSpanelBretton.jpeg"}
                    alt={project.title}
                    className="work__img"
                  />
                  <div className="work__overlay">
                    <div className="work__links">
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work__link"
                      >
                        <FaPlayCircle /> Live Demo
                      </a>
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="work__link"
                      >
                        <FaGithub /> Code
                      </a>
                    </div>
                  </div>
                </div>

                <div className="work__content">
                  <h3 className="work__title">{project.title}</h3>
                  <p className="work__description">{project.description}</p>

                  <div className="work__tech">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="work__tech-item">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section
          className="experience section"
          id="experience"
          ref={experienceRef}
        >
          <h2 className="section-title" data-aos="fade-down">
            Work Experience
          </h2>

          <div className="timeline__container" data-aos="fade-up">
            {experience.map((job, index) => (
              <div
                key={index}
                className="timeline__item"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <div className="timeline__icon">
                  <FaBriefcase />
                </div>
                <div className="timeline__content">
                  <h3 className="timeline__title">{job.position}</h3>
                  <h4 className="timeline__company">{job.company}</h4>
                  <p className="timeline__period">{job.period}</p>
                  <ul className="timeline__list">
                    {job.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className="timeline__list-item">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <h2
            className="section-title"
            data-aos="fade-down"
            id="education"
            ref={educationRef}
          >
            Education
          </h2>

          <div className="timeline__container" data-aos="fade-up">
            {education.map((edu, index) => (
              <div
                key={index}
                className="timeline__item"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <div className="timeline__icon">
                  <FaGraduationCap />
                </div>
                <div className="timeline__content">
                  <h3 className="timeline__title">{edu.degree}</h3>
                  <h4 className="timeline__company">{edu.institution}</h4>
                  <p className="timeline__period">{edu.period}</p>
                  <p className="timeline__description">{edu.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications */}
          <h3 className="section-subtitle" data-aos="fade-up">
            Certifications
          </h3>

          <div className="certifications__container" data-aos="fade-up">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="certification__item"
                data-aos="fade-up"
                data-aos-delay={100 * index}
              >
                <div className="certification__icon">
                  <FaCertificate />
                </div>
                <div className="certification__content">
                  <h3 className="certification__title">{cert.name}</h3>
                  <p className="certification__issuer">{cert.issuer}</p>
                  <p className="certification__id">{cert.id}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact section" id="contact" ref={contactRef}>
          <h2 className="section-title" data-aos="fade-down">
            Get In Touch
          </h2>

          <div className="contact__container bd-grid">
            <div className="contact__info" data-aos="fade-right">
              <h3 className="contact__subtitle">
                Let's talk about your project
              </h3>
              <p className="contact__text">
                Feel free to reach out if you're looking for a developer, have a
                question, or just want to connect.
              </p>

              <div className="contact__info-item">
                <i className="bx bx-envelope contact__icon"></i>
                <div>
                  <h3 className="contact__info-title">Email</h3>
                  <span className="contact__info-data">
                    adityapatidar243@gmail.com
                  </span>
                </div>
              </div>

              <div className="contact__info-item">
                <i className="bx bx-phone contact__icon"></i>
                <div>
                  <h3 className="contact__info-title">Phone</h3>
                  <span className="contact__info-data">+91 7828982951</span>
                </div>
              </div>

              <div className="contact__info-item">
                <i className="bx bx-map contact__icon"></i>
                <div>
                  <h3 className="contact__info-title">Location</h3>
                  <span className="contact__info-data">
                    Indore, Madhya Pradesh, India
                  </span>
                </div>
              </div>
            </div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact__form"
              data-aos="fade-left"
            >
              <div className="form-group">
                <label htmlFor="name" className="contact__label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  className={`contact__input ${
                    formErrors.name ? "input-error" : ""
                  }`}
                  value={formData.name}
                  onChange={handleInputChange}
                />
                {formErrors.name && (
                  <p className="error-message">{formErrors.name}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email" className="contact__label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  className={`contact__input ${
                    formErrors.email ? "input-error" : ""
                  }`}
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && (
                  <p className="error-message">{formErrors.email}</p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message" className="contact__label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  className={`contact__input ${
                    formErrors.message ? "input-error" : ""
                  }`}
                  rows="7"
                  value={formData.message}
                  onChange={handleInputChange}
                ></textarea>
                {formErrors.message && (
                  <p className="error-message">{formErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="contact__button button"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner className="button-icon spinner" /> Sending...
                  </>
                ) : submitStatus === "success" ? (
                  <>
                    <FaCheck className="button-icon" /> Message Sent!
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="button-icon" /> Send Message
                  </>
                )}
              </button>

              {submitStatus === "error" && (
                <p className="submit-error">
                  Failed to send message. Please try again later.
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer__container">
          <div className="footer__content">
            <div className="footer__info">
              <h2 className="footer__title">Aditya Patidar</h2>
              <p className="footer__description">
                Full-Stack Developer specializing in creating secure, scalable
                web and mobile applications.
              </p>
            </div>

            <div className="footer__links">
              <h3 className="footer__subtitle">Quick Links</h3>
              <ul className="footer__list">
                <li>
                  <a
                    href="#home"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("home");
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("about");
                    }}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("skills");
                    }}
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#work"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("work");
                    }}
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("contact");
                    }}
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__contact">
              <h3 className="footer__subtitle">Contact Info</h3>
              <p>
                <i className="bx bx-envelope"></i> adityapatidar.tech@gmail.com
              </p>
              <p>
                <i className="bx bx-phone"></i> +91 7828982951
              </p>
              <p>
                <i className="bx bx-map"></i> Indore, Madhya Pradesh, India
              </p>
            </div>

            <div className="footer__social">
              <h3 className="footer__subtitle">Social Links</h3>
              <div className="footer__social-icons">
                <a
                  href="https://github.com/3m1l1o"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-icon"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/emilio-gallo-9a547a1ba/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-icon"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          <div className="footer__bottom">
            <p className="footer__copy">
              &#169; {new Date().getFullYear()} Emilio Gallo. All rights
              reserved
            </p>
            <p className="footer__credit">
              Designed with <span className="heart">❤</span> by Emilio Gallo
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <a
        href="#home"
        className={`back-to-top ${isScrolled ? "show" : ""}`}
        onClick={(e) => {
          e.preventDefault();
          scrollToSection("home");
        }}
        aria-label="Back to top"
      >
        <i className="bx bx-up-arrow-alt"></i>
      </a>
    </div>
  );
};

export default Portfolio;
