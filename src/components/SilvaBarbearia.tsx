import { motion, Variants } from "framer-motion";
import { Phone, MapPin, Instagram } from "lucide-react";
import logoSilva from "@/assets/logo-silva.png";
import fachadaSilva from "@/assets/fachada-silva.webp";

const WHATSAPP =
  "https://wa.me/5527996530453?text=Ol%C3%A1%2C%20vim%20pelo%20Instagram%20e%20gostaria%20de%20mais%20informa%C3%A7%C3%B5es.";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, filter: "blur(20px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const linkVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
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
    whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
    whileTap={{ scale: 0.98 }}
    className="group flex w-full items-center justify-center rounded-full border border-silva-yellow/50 bg-silva-white/5 px-5 py-3.5 backdrop-blur-sm transition-all duration-300 hover:border-silva-yellow hover:bg-silva-yellow hover:shadow-[0_0_25px_hsl(var(--silva-yellow)/0.35)]"
  >
    <span className="font-kamerik text-sm font-bold uppercase tracking-wider text-silva-white transition-colors duration-300 group-hover:text-silva-black">
      {label}
    </span>
  </motion.a>
);

const SilvaBarbearia = () => {
  const links = [
    { href: WHATSAPP, label: "Agende o seu horário" },
    { href: WHATSAPP, label: "Fale conosco" },
    {
      href: "https://maps.google.com/?q=Av.+Saturnino+Rangel+Mauro+-+Praia+de+Itaparica,+Vila+Velha+-+ES,+29102-035",
      label: "Como chegar",
    },
    { href: WHATSAPP, label: "Curso" },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-silva-black">
      {/* Foto da fachada com exposição reduzida */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${fachadaSilva})` }}
      />
      <div className="absolute inset-0 bg-silva-black/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-silva-black/60 via-transparent to-silva-black" />

      {/* Halos amarelos animados */}
      <motion.div
        className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full blur-[110px]"
        style={{ backgroundColor: "#ffdd83" }}
        animate={{ scale: [0.3, 1.4, 0.3], opacity: [0, 0.18, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full blur-[130px]"
        style={{ backgroundColor: "#ffdd83" }}
        animate={{ scale: [0.4, 1.6, 0.4], opacity: [0, 0.16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[150px]"
        style={{ backgroundColor: "#ffdd83" }}
        animate={{ scale: [0.2, 1.8, 0.2], opacity: [0, 0.12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Conteúdo */}
      <div className="relative z-10 flex min-h-screen flex-col px-6 py-12 sm:px-10">
        <motion.div
          className="mx-auto w-full max-w-xs sm:max-w-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div variants={logoVariants} className="mb-8 flex flex-col items-center">
            <motion.img
              src={logoSilva}
              alt="Silva Barbearia"
              className="h-32 w-auto sm:h-36 lg:h-40"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Links */}
          <motion.div className="flex flex-col gap-3" variants={containerVariants}>
            {links.map((link) => (
              <LinkItem key={link.label} href={link.href} label={link.label} />
            ))}
          </motion.div>

          {/* Sobre Nós */}
          <motion.div
            variants={sectionVariants}
            className="mt-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              className="mb-4 inline-block w-full text-center font-kamerik text-2xl font-bold uppercase tracking-wide text-silva-yellow sm:text-3xl"
              whileHover={{ scale: 1.05 }}
            >
              Sobre Nós
            </motion.span>

            {/* Galeria */}
            <div className="mb-6 mt-4 grid grid-cols-3 gap-2">
              {[
                { delay: 0.1, position: "20% 30%" },
                { delay: 0.2, position: "50% 55%" },
                { delay: 0.3, position: "80% 40%" },
              ].map(({ delay, position }) => (
                <motion.div
                  key={delay}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay }}
                  viewport={{ once: true }}
                  className="aspect-square overflow-hidden rounded-lg border border-silva-yellow/20"
                >
                  <img
                    src={fachadaSilva}
                    alt="Fachada da Silva Barbearia em Vila Velha"
                    style={{ objectPosition: position }}
                    className="h-full w-full scale-150 object-cover transition-transform duration-500 hover:scale-[1.7]"
                  />
                </motion.div>
              ))}
            </div>

            <div className="space-y-3 text-center font-kamerik text-sm leading-relaxed text-silva-white/90 [&_p]:text-balance">
              <p className="font-bold">O seu estilo começa&nbsp;aqui.</p>
              <p>A Silva Barbearia é referência em Vila Velha - ES quando o assunto é corte, barba e cuidado&nbsp;masculino. Cada atendimento é feito com técnica, atenção aos detalhes e respeito ao seu&nbsp;estilo.</p>
              <p>Nosso espaço foi pensado para você relaxar: ambiente climatizado, música boa e um time de barbeiros experientes prontos para deixar o seu visual&nbsp;impecável.</p>
              <p className="font-bold">Agende o seu horário e venha conhecer a&nbsp;barbearia.</p>
            </div>
          </motion.div>

          {/* Rodapé */}
          <footer className="mt-16 border-t border-silva-yellow/20 pt-8">
            <div className="space-y-4 text-center">
              <div className="flex flex-col items-center justify-center gap-2">
                <MapPin className="h-5 w-5 text-silva-yellow" />
                <p className="text-center font-kamerik text-sm font-bold leading-relaxed text-silva-white">
                  Av. Saturnino Rangel Mauro - Praia de Itaparica
                  <br />
                  <span className="font-normal text-silva-white/70">Vila Velha - ES, 29102-035</span>
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-silva-yellow/40" />
                <span className="text-xs text-silva-yellow">●</span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-silva-yellow/40" />
              </div>

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
