import { motion, Variants, useReducedMotion } from "framer-motion";
import { Phone, MapPin, Instagram, Map as MapIcon } from "lucide-react";
import logoSilva from "@/assets/logo-silva-final.png";
import fachadaSilva from "@/assets/fachada-silva.webp";
import HorariosFuncionamento from "@/components/HorariosFuncionamento";

const WHATSAPP =
  "https://wa.me/5527996530453?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20a%20Silva%20Barbearia.";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.1, 
      delayChildren: 0.1,
      ease: "easeOut"
    },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, x: -20, scale: 0.98 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1,
    },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

interface LinkItemProps {
  href: string;
  label: string;
}

const LinkItem = ({ href, label }: LinkItemProps) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    variants={linkVariants}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.97 }}
    className="group flex w-full items-center justify-center rounded-full border border-silva-yellow/40 bg-silva-white/5 px-5 py-3.5 backdrop-blur-sm transition-colors duration-300 hover:border-silva-yellow hover:bg-silva-yellow hover:shadow-[0_0_20px_hsl(var(--silva-yellow)/0.35)]"
  >
    <span className="font-kamerik text-sm font-bold uppercase tracking-wider text-silva-white transition-colors duration-300 group-hover:text-silva-black">
      {label}
    </span>
  </motion.a>
);


const SilvaBarbearia = () => {
  const shouldReduceMotion = useReducedMotion();
  const links = [
    { href: "https://cashbarber.com.br/silvabarbearia", label: "Agende o seu horário" },
    { href: WHATSAPP, label: "Fale conosco" },
    { href: WHATSAPP, label: "Curso" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-silva-black">
      {/* Foto da fachada com exposição reduzida */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: `url(${fachadaSilva})` }}
      />
      <div className="fixed inset-0 bg-silva-black/60" />
      <div className="fixed inset-0 bg-gradient-to-b from-silva-black/40 via-transparent to-silva-black" />

      {/* Halos amarelos animados */}
      <motion.div
        className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full blur-[110px]"
        style={{ backgroundColor: "#ffdd83" }}
        animate={shouldReduceMotion ? { opacity: 0.1 } : { scale: [0.3, 1.4, 0.3], opacity: [0, 0.18, 0] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full blur-[130px]"
        style={{ backgroundColor: "#ffdd83" }}
        animate={shouldReduceMotion ? { opacity: 0.08 } : { scale: [0.4, 1.6, 0.4], opacity: [0, 0.16, 0] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        style={{ backgroundColor: "#ffdd83" }}
        animate={shouldReduceMotion ? { opacity: 0.06 } : { scale: [0.2, 1.8, 0.2], opacity: [0, 0.12, 0] }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex min-h-screen flex-col px-4 py-8 sm:px-10 sm:py-12">
        <motion.div
          className="mx-auto w-full max-w-sm sm:max-w-md"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div variants={logoVariants} className="mb-8 flex flex-col items-center">
            <motion.img
              src={logoSilva}
              alt="Silva Barbearia"
              className="h-44 w-auto sm:h-52 lg:h-60"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Links */}
          <motion.div className="flex flex-col gap-3">
            {links.map((link) => (
              <LinkItem key={link.label} href={link.href} label={link.label} />
            ))}
          </motion.div>

          {/* Seção Onde Estamos */}
          <motion.div
            variants={sectionVariants}
            className="mt-16 flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.span
              className="mb-8 inline-block w-full text-center font-kamerik text-2xl font-bold uppercase tracking-widest text-silva-yellow sm:text-3xl"
            >
              Onde Estamos
            </motion.span>

            <div className="w-full space-y-6">
              {/* Mapa com Preview */}
              <a 
                href="https://maps.app.goo.gl/VJ7oUUp24KZYeB6n8"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full overflow-hidden rounded-2xl border border-silva-yellow/30 bg-silva-white/5 transition-all duration-300 hover:border-silva-yellow/60 hover:shadow-[0_0_20px_rgba(255,221,131,0.2)]"
              >
                <div className="aspect-[16/9] w-full grayscale transition-all duration-500 group-hover:grayscale-0">
                  <iframe
                    src="https://maps.google.com/maps?q=Silva%20Barbearia%2C%20Av.%20Saturnino%20Rangel%20Mauro%2C%20Praia%20de%20Itaparica%2C%20Vila%20Velha%20-%20ES%2C%2029102-035&z=17&hl=pt-BR&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0, pointerEvents: 'none' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps - Silva Barbearia"
                  />
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-silva-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="rounded-full bg-silva-yellow px-4 py-2 text-xs font-bold uppercase tracking-wider text-silva-black shadow-xl">
                    Abrir no Google Maps
                  </div>
                </div>
              </a>

              <div className="px-2 text-center">
                <p className="font-kamerik text-[11px] leading-relaxed tracking-wide text-silva-white/40">
                  <span className="font-bold text-silva-white">Av. Saturnino Rangel Mauro, 2960 Loja 3</span><br />
                  Praia de Itaparica, Vila Velha - ES, 29102-570
                </p>
              </div>

              {/* Informações de Endereço e Horário */}
              <div className="rounded-2xl border border-silva-white/10 bg-silva-white/5 p-6 backdrop-blur-md">
                <HorariosFuncionamento />
              </div>
            </div>
          </motion.div>

          {/* Rodapé */}
          <footer className="mt-16 border-t border-silva-yellow/20 pt-8">
            <div className="space-y-4 text-center">





              <div className="flex flex-col items-center gap-3">
                <a
                  href="tel:+5527996530453"
                  className="flex items-center gap-2 font-kamerik text-sm font-bold text-silva-white transition-colors hover:text-silva-yellow"
                >
                  <Phone className="h-4 w-4 text-silva-yellow" />
                  (27) 99653-0453
                </a>
                <a
                  href="https://www.instagram.com/silvabarbeariavv/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-kamerik text-sm font-bold text-silva-white transition-colors hover:text-silva-yellow"
                >
                  <Instagram className="h-4 w-4 text-silva-yellow" />
                  @silvabarbeariavv
                </a>
              </div>
            </div>

            <p className="mt-8 text-center font-kamerik text-[9px] font-normal uppercase tracking-[0.15em] text-silva-white/50">
              DESENVOLVIDO POR NORD COMUNICAÇÃO
              <br />
              ©2026 TODOS OS DIREITOS RESERVADOS
            </p>
          </footer>
        </motion.div>
      </div>
    </div>
  );
};

export default SilvaBarbearia;