import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Phone, Mail, Globe, Syringe, Heart, Sparkles, Dna, MapPin } from "lucide-react";
import doctorBackground from "@/assets/doctor-background.jpg";
import doctorPortrait from "@/assets/doctor-portrait.png";
import videoIntro from "@/assets/video-intro.mp4";
import logoImage from "@/assets/logo-boto-esthetic.png";

const containerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const logoVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    filter: "blur(20px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
};

const linkVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(10px)"
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const footerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -20
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

// Diamond bullet component for brand consistency
const DiamondBullet = () => <span className="text-boto-gold mr-2">◆</span>;

interface LinkItemProps {
  href: string;
  label: string;
}

const LinkItem = ({ href, label }: LinkItemProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      variants={linkVariants}
      whileHover={{
        scale: 1.03,
        transition: {
          duration: 0.2
        }
      }}
      whileTap={{
        scale: 0.98
      }}
      className="group flex w-full items-center justify-center rounded-full border border-boto-gold/40 bg-white/5 backdrop-blur-sm px-5 py-3 transition-all duration-300 hover:border-boto-gold hover:bg-boto-gold hover:shadow-[0_0_25px_rgba(205,163,100,0.4)]"
    >
      <span className="text-sm font-medium uppercase tracking-wider text-white transition-colors duration-300 font-sans">
        {label}
      </span>
    </motion.a>
  );
};

// Service card component with hover effects
interface ServiceCardProps {
  service: {
    name: string;
    icon: React.ComponentType<{
      className?: string;
    }>;
    description: string;
  };
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  const IconComponent = service.icon;
  return (
    <motion.div
      className="p-3 rounded-xl border border-boto-gold/30 bg-white/5 backdrop-blur-sm text-center cursor-pointer group"
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.9
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      transition={{
        delay: 1.5 + index * 0.15,
        duration: 0.5,
        ease: "easeOut"
      }}
      whileHover={{
        scale: 1.05,
        y: -5,
        transition: {
          duration: 0.2
        }
      }}
      style={{
        boxShadow: "0 0 0 rgba(205,163,100,0)"
      }}
      whileTap={{
        scale: 0.98
      }}
    >
      <IconComponent className="h-6 w-6 text-boto-gold mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
      <span className="text-white text-sm font-medium block">{service.name}</span>
      <p className="text-white/60 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {service.description}
      </p>
    </motion.div>
  );
};

// Services section with interactive cards
const ServicesSection = () => {
  const services = [
    {
      name: "Toxina botulínica",
      icon: Syringe,
      description: "Suaviza rugas e linhas"
    },
    {
      name: "Preenchimento labial",
      icon: Heart,
      description: "Volume natural"
    },
    {
      name: "Harmonização facial",
      icon: Sparkles,
      description: "Contorno perfeito"
    },
    {
      name: "Bioestimuladores",
      icon: Dna,
      description: "Rejuvenescimento"
    }
  ];

  return (
    <motion.div variants={sectionVariants} className="mt-8 text-center my-0 py-[20px]">
      <motion.span
        className="inline-block font-semibold tracking-wide text-boto-gold mb-6 font-serif text-2xl sm:text-3xl"
        whileHover={{
          scale: 1.05
        }}
      >
        Tratamentos
      </motion.span>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {services.map((service, index) => (
          <ServiceCard key={service.name} service={service} index={index} />
        ))}
      </div>

      {/* Botão de destaque */}
      <motion.a
        href="https://botoesthetic.com.br/"
        target="_blank"
        rel="noopener noreferrer"
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 2.1,
          duration: 0.5
        }}
        whileHover={{
          scale: 1.03
        }}
        whileTap={{
          scale: 0.98
        }}
        className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-boto-gold text-boto-dark font-medium text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(205,163,100,0.4)] hover:shadow-[0_0_30px_rgba(205,163,100,0.6)] transition-all duration-300"
      >
        Saiba mais
      </motion.a>
    </motion.div>
  );
};

const LinkBio = () => {
  const [address, setAddress] = useState("Rua Henrique Moscoso, 722 - Centro de Vila Velha, Vila Velha");
  const [copyright, setCopyright] = useState("© 2026 Boto Esthetic - Todos os direitos reservados");
  
  const links = [
    {
      href: "https://api.whatsapp.com/send/?phone=5527998140385&text&type=phone_number&app_absent=0",
      label: "Agende sua consulta"
    },
    {
      href: "https://www.google.com/maps/place/Cl%C3%ADnica+BotoEsthetic+-+Vila+Velha/@-20.3354643,-40.292635,17z/data=!3m1!4b1!4m6!3m5!1s0xb8178bdfc6459f:0x301e92c811e649d3!8m2!3d-20.3354694!4d-40.2884078!16s%2Fg%2F11jz40ztcc?coh=164777&entry=tt&shorturl=1",
      label: "Onde estamos"
    },
    {
      href: "https://www.instagram.com/botoesthetic_vilavelha/",
      label: "Instagram"
    },
    {
      href: "https://botoesthetic.com.br/",
      label: "Visitar nosso site"
    }
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Full-screen background image with graphite gradient overlay */}
      <motion.div
        className="absolute inset-0 h-full w-full"
        initial={{
          scale: 1.1
        }}
        animate={{
          scale: 1
        }}
        transition={{
          duration: 1.5,
          ease: "easeOut"
        }}
      >
        <img
          src={doctorBackground}
          alt="Boto Esthetic"
          className="h-full w-full object-cover object-[center_top]"
        />
      </motion.div>

      {/* Graphite gradient overlay - brand aligned */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-boto-gradient-start/95 via-boto-dark/90 to-boto-gradient-end/95"
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1
        }}
        transition={{
          duration: 0.8
        }}
      />

      {/* Bottom black gradient fade - starts from Tratamentos section */}
      <div className="absolute bottom-0 left-0 right-0 h-[70vh] bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-[5]" />

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex-col pb-10 pt-16 sm:px-10 lg:justify-center lg:px-0 px-8 py-16 flex items-center justify-center">
        <motion.div
          className="mx-auto w-full max-w-xs sm:max-w-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header - Logo with subtitle */}
          <motion.div variants={logoVariants} className="mb-8 flex flex-col items-center">
            <motion.img
              src={logoImage}
              alt="Boto Esthetic"
              className="h-12 w-auto sm:h-14 lg:h-20"
              whileHover={{
                scale: 1.05
              }}
              transition={{
                duration: 0.3
              }}
            />
          </motion.div>

          {/* Links */}
          <motion.div className="flex flex-col gap-2.5" variants={containerVariants}>
            {links.map((link) => (
              <LinkItem key={link.label} href={link.href} label={link.label} />
            ))}
          </motion.div>

          {/* About Section */}
          <motion.div variants={sectionVariants} className="mt-10">
            <motion.div
              className="mt-5 text-center py-[18px]"
              initial={{
                opacity: 0,
                y: 30
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.6,
                delay: 0.9
              }}
            >
              <motion.span
                className="inline-block tracking-wide text-boto-gold mb-6 font-serif text-2xl sm:text-3xl font-semibold my-[2px]"
                initial={{
                  opacity: 0,
                  scale: 0.8
                }}
                animate={{
                  opacity: 1,
                  scale: 1
                }}
                transition={{
                  duration: 0.5,
                  delay: 1
                }}
                whileHover={{
                  scale: 1.05
                }}
              >
                Sobre
              </motion.span>

              <div className="mt-3 font-body text-sm leading-relaxed text-white font-normal text-center space-y-5">
                <p>Localizada no coração da Praia da Costa, em Vila Velha, a Boto Esthetic é uma clínica dedicada a realçar a sua melhor versão através da excelência em harmonização facial.</p>

                <p>Especialistas em procedimentos como Botox, Bioestimuladores de colágeno, Preenchimento Labial e o inovador Laser Lavieen, nossa missão é entregar resultados naturais e seguros.</p>

                <p>Contamos com uma equipe de profissionais altamente qualificados e especializados, garantindo um atendimento personalizado em um ambiente moderno e acolhedor.</p>

                <p className="font-semibold">Sua beleza é nossa especialidade!</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Video */}
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            transition={{
              duration: 0.7,
              delay: 1.1,
              ease: "easeOut"
            }}
            className="mt-10"
          >
            <motion.div
              className="flex justify-center"
              whileHover={{
                scale: 1.02
              }}
              transition={{
                duration: 0.3
              }}
            >
              <video
                src={videoIntro}
                className="rounded-xl w-full shadow-2xl"
                style={{
                  maxWidth: "400px"
                }}
                controls
                playsInline
                autoPlay
                muted
                loop
              />
            </motion.div>
          </motion.div>

          {/* Services Section */}
          <ServicesSection />

          {/* Footer - Minimalist Premium */}
          <motion.footer
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              duration: 0.8,
              delay: 1.3
            }}
            className="mt-16 pt-10 border-t border-boto-gold/20"
          >
            {/* Contact Info - Elegant Typography */}
            <motion.div
              className="text-center space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{
                delayChildren: 1.4,
                staggerChildren: 0.15
              }}
            >
              {/* Address */}
              <motion.div
                variants={footerItemVariants}
                className="flex flex-col items-center justify-center gap-2"
              >
                <MapPin className="h-5 w-5 text-boto-gold" />
                <p className="leading-relaxed text-center font-bold text-white text-sm">
                  Rua Henrique Moscoso, 722
                  <br />
                  <span className="text-white">Centro de Vila Velha, Vila Velha - ES</span>
                </p>
              </motion.div>

              {/* Diamond Separator */}
              <motion.div
                variants={footerItemVariants}
                className="flex items-center justify-center gap-4"
              >
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-boto-gold/40" />
                <span className="text-boto-gold text-xs">◆</span>
                <span className="w-8 h-px bg-gradient-to-l from-transparent to-boto-gold/40" />
              </motion.div>

              {/* Contact Links */}
              <motion.div
                variants={footerItemVariants}
                className="flex flex-col items-center gap-4"
              >
                <a
                  href="tel:+5527999147748"
                  className="flex items-center gap-2 text-sm font-bold text-white"
                >
                  <Phone className="h-4 w-4 text-boto-gold" />
                  (27) 99914-7748
                </a>
                <a
                  href="mailto:contato@botoesthetic.com.br"
                  className="flex items-center gap-2 text-sm font-bold text-white"
                >
                  <Mail className="h-4 w-4 text-boto-gold" />
                  contato@botoesthetic.com.br
                </a>
                <a
                  href="https://www.botoesthetic.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-bold text-white"
                >
                  <Globe className="h-4 w-4 text-boto-gold" />
                  www.botoesthetic.com.br
                </a>
              </motion.div>
            </motion.div>

            {/* Copyright */}
            <motion.p
              className="text-[9px] uppercase tracking-[0.15em] text-center mt-10 font-light text-white"
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                duration: 0.6,
                delay: 2
              }}
            >
              DESENVOLVIDO POR NORD COMUNICAÇÃO
              <br />
              ©2026 TODOS OS DIREITOS RESERVADOS
            </motion.p>
          </motion.footer>
        </motion.div>
      </div>
    </div>
  );
};

export default LinkBio;
