import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface LinkButtonProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  delay?: number;
}

const LinkButton = ({ href, icon: Icon, children, delay = 0 }: LinkButtonProps) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group flex w-full items-center gap-4 rounded-full border border-border bg-card/80 px-6 py-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card hover:shadow-lg"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary transition-colors duration-300 group-hover:bg-primary/10">
        <Icon className="h-5 w-5 text-primary transition-colors duration-300" />
      </div>
      <span className="flex-1 text-sm font-medium tracking-wide text-foreground transition-colors duration-300">
        {children}
      </span>
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
        <svg
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </motion.a>
  );
};

export default LinkButton;
