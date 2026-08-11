import { motion, Variants } from "framer-motion";
import { Phone, Mail, Globe, MapPin, Play } from "lucide-react";
import logoImage from "@/assets/logo-fit-in-less.png";
import bgImage from "@/assets/bg-fitinless-new.jpg";
import studioImage from "@/assets/fitinless-foto1.jpg";
import salaImage from "@/assets/fitinless-sala.jpg";
import recepcaoImage from "@/assets/fitinless-foto2.jpg";
import videoFitinless from "@/assets/video-fitinless.mp4";
const containerVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3
    }
  }
};
const logoVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    filter: "blur(20px)"
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};
const linkVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};
const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(8px)"
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
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};
interface LinkItemProps {
  href: string;
  label: string;
}
const LinkItem = ({
  href,
  label
}: LinkItemProps) => {
  return <motion.a href={href} target="_blank" rel="noopener noreferrer" variants={linkVariants} whileHover={{
    scale: 1.03,
    transition: {
      duration: 0.2
    }
  }} whileTap={{
    scale: 0.98
  }} className="group flex w-full items-center justify-center rounded-full border border-fitinless-green/40 bg-white/5 backdrop-blur-sm px-5 py-3.5 transition-all duration-300 hover:border-fitinless-green hover:bg-fitinless-green hover:shadow-[0_0_25px_rgba(83,209,170,0.3)]">
      <span className="text-sm font-medium uppercase tracking-wider text-white transition-colors duration-300 font-montserrat group-hover:text-fitinless-blue">
        {label}
      </span>
    </motion.a>;
};
const LinkBioFitInLess = () => {
  const links = [{
    href: "https://wa.me/552730757588?text=Ol%C3%A1%2C%20estou%20vindo%20pelo%20Instagram%20e%20gostaria%20de%20ter%20mais%20informa%C3%A7%C3%B5es.",
    label: "Fale conosco"
  }, {
    href: "https://maps.app.goo.gl/aRbACgzR4neQ6ft58",
    label: "Onde estamos"
  }, {
    href: "https://fitinless.com.br/",
    label: "Nosso site"
  }, {
    href: "https://www.instagram.com/fitinless/",
    label: "Instagram"
  }, {
    href: "https://www.tiktok.com/@fitinless",
    label: "TikTok"
  }];
  return <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background image with low opacity */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60" style={{
      backgroundImage: `url(${bgImage})`
    }} />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-fitinless-blue/90" />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />

      {/* Animated green light flares - Flash/Clarão effect */}
      <motion.div 
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[100px]"
        style={{ backgroundColor: '#00b896' }}
        animate={{
          scale: [0.3, 1.5, 0.3],
          opacity: [0, 0.6, 0]
        }} 
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }} 
      />
      <motion.div 
        className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-[120px]"
        style={{ backgroundColor: '#00b896' }}
        animate={{
          scale: [0.4, 1.8, 0.4],
          opacity: [0, 0.55, 0]
        }} 
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }} 
      />
      <motion.div 
        className="absolute top-1/4 right-0 w-[550px] h-[550px] rounded-full blur-[90px]"
        style={{ backgroundColor: '#00b896' }}
        animate={{
          scale: [0.2, 1.6, 0.2],
          opacity: [0, 0.5, 0]
        }} 
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }} 
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-[500px] h-[500px] rounded-full blur-[80px]"
        style={{ backgroundColor: '#00b896' }}
        animate={{
          scale: [0.3, 1.4, 0.3],
          opacity: [0, 0.45, 0]
        }} 
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 7
        }} 
      />
      <motion.div 
        className="absolute top-1/2 left-1/2 w-[800px] h-[800px] rounded-full blur-[150px] -translate-x-1/2 -translate-y-1/2"
        style={{ backgroundColor: '#00b896' }}
        animate={{
          scale: [0.2, 2, 0.2],
          opacity: [0, 0.4, 0]
        }} 
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }} 
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col py-12 px-6 sm:px-10">
        <motion.div className="mx-auto w-full max-w-xs sm:max-w-sm" variants={containerVariants} initial="hidden" animate="visible">
          {/* Logo */}
          <motion.div variants={logoVariants} className="mb-8 flex flex-col items-center">
            <motion.img src={logoImage} alt="Fit In Less" className="h-20 w-auto sm:h-24 lg:h-28" whileHover={{
            scale: 1.05
          }} transition={{
            duration: 0.3
          }} />
          </motion.div>

          {/* Links */}
          <motion.div className="flex flex-col gap-3" variants={containerVariants}>
            {links.map(link => <LinkItem key={link.label} href={link.href} label={link.label} />)}
          </motion.div>

          {/* Sobre Section */}
          <motion.div variants={sectionVariants} className="mt-16" initial="hidden" whileInView="visible" viewport={{
          once: true
        }}>
            <motion.span className="inline-block tracking-wide mb-4 font-montserrat text-2xl font-semibold text-center w-full uppercase sm:text-3xl text-fitinless-green" whileHover={{
            scale: 1.05
          }}>
              Sobre Nós
            </motion.span>

            {/* Photo Gallery */}
            <div className="mt-4 mb-6 grid grid-cols-3 gap-2">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg aspect-square"
              >
                <img 
                  src={studioImage} 
                  alt="Estúdio de Pilates Fit In Less" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg aspect-square"
              >
                <img 
                  src={salaImage} 
                  alt="Sala de Atendimento Fit In Less" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-lg aspect-square"
              >
                <img 
                  src={recepcaoImage} 
                  alt="Recepção Fit In Less" 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            </div>

            <div className="font-montserrat text-sm leading-relaxed text-white/90 text-center space-y-3 [&_p]:text-balance">
              <p className="font-semibold">Sua recuperação completa começa&nbsp;aqui.</p>
              <p>No nosso centro, entendemos que cada corpo é único e cada processo de cura exige um olhar atento. Por isso, criamos um ecossistema de saúde que une Fisioterapia, Pilates, Musculação e&nbsp;Funcional em um só&nbsp;lugar.</p>
              <p>Com fisioterapia especializada o seu tratamento é baseado em evidência de forma individualizada. Nosso grande diferencial é o acompanhamento de perto por meio, de uma equipe&nbsp;multidisciplinar.</p>
              <p>Aqui, você não fica sozinho: nossos especialistas estão prontos para guiar cada passo da sua evolução, ajustando cada&nbsp;movimento.</p>
              <p className="font-semibold">Entre em contato e venha conhecer o nosso&nbsp;espaço.</p>
            </div>
          </motion.div>

          {/* Video Title */}
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 mb-4 text-2xl sm:text-3xl font-semibold text-center uppercase tracking-wide text-fitinless-green font-montserrat"
          >
            Assista o vídeo
          </motion.h2>

          {/* Video */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.95
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.7,
          delay: 1.2
        }}>
            <div className="relative bg-black/20 backdrop-blur-sm border border-fitinless-green/30 rounded-lg overflow-hidden">
              <video 
                src={videoFitinless}
                className="w-full h-auto"
                autoPlay
                controls
                loop
                playsInline
              />
            </div>
          </motion.div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-fitinless-green/20">
            <div className="text-center space-y-4">
              {/* Address */}
              <div className="flex flex-col items-center justify-center gap-2">
                <MapPin className="h-5 w-5 text-fitinless-green" />
                <p className="leading-relaxed text-center font-medium text-white text-sm">
                  R. Pôrto Alegre, 335 - Itapuã
                  <br />
                  <span className="text-white/70">Vila Velha - ES</span>
                </p>
              </div>

              {/* Separator */}
              <div className="flex items-center justify-center gap-4">
                <span className="w-8 h-px bg-gradient-to-r from-transparent to-fitinless-green/40" />
                <span className="text-fitinless-green text-xs">●</span>
                <span className="w-8 h-px bg-gradient-to-l from-transparent to-fitinless-green/40" />
              </div>

              {/* Contact Links */}
              <div className="flex flex-col items-center gap-3">
                <a href="tel:+552730757588" className="flex items-center gap-2 text-sm font-medium transition-colors text-white">
                  <Phone className="h-4 w-4 text-fitinless-green" />
                  (27) 3075-7588
                </a>
                <a href="mailto:contato@fitinless.com.br" className="flex items-center gap-2 text-sm font-medium transition-colors text-white">
                  <Mail className="h-4 w-4 text-fitinless-green" />
                  contato@fitinless.com.br
                </a>
                <a href="https://www.fitinless.com.br" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium transition-colors text-white">
                  <Globe className="h-4 w-4 text-fitinless-green" />
                  www.fitinless.com.br
                </a>
              </div>
            </div>

            {/* Copyright */}
            <p className="text-[9px] uppercase tracking-[0.15em] text-center mt-8 font-light text-white/50">
              DESENVOLVIDO POR NORD COMUNICAÇÃO
              <br />
              ©2026 TODOS OS DIREITOS RESERVADOS
            </p>
          </footer>
        </motion.div>
      </div>
    </div>;
};
export default LinkBioFitInLess;