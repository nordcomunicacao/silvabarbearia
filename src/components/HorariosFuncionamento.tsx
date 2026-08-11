import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock } from "lucide-react";

type Horario = { abre: number; fecha: number } | null;

// index 0 = domingo ... 6 = sábado
const HORARIOS: Horario[] = [
  null, // domingo
  { abre: 9 * 60, fecha: 19 * 60 }, // segunda
  { abre: 9 * 60, fecha: 20 * 60 }, // terça
  { abre: 9 * 60, fecha: 20 * 60 }, // quarta
  { abre: 9 * 60, fecha: 20 * 60 }, // quinta
  { abre: 9 * 60, fecha: 20 * 60 }, // sexta
  { abre: 8 * 60, fecha: 16 * 60 }, // sábado
];

const FERIADOS = [
  "2026-01-01", // Ano Novo
  "2026-04-21", // Tiradentes
  "2026-05-01", // Dia do Trabalho
  "2026-09-07", // Independência
  "2026-10-12", // Padroeira
  "2026-11-02", // Finados
  "2026-11-15", // Proclamação da República
  "2026-12-25", // Natal
];

const DIAS = [
  "domingo",
  "segunda-feira",
  "terça-feira",
  "quarta-feira",
  "quinta-feira",
  "sexta-feira",
  "sábado",
];

const fmt = (min: number) =>
  `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

const agoraEmSaoPaulo = () => {
  const partes = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (t: string) => partes.find((p) => p.type === t)?.value ?? "";
  const mapaDias: Record<string, number> = {
    dom: 0,
    seg: 1,
    ter: 2,
    qua: 3,
    qui: 4,
    sex: 5,
    sáb: 6,
    sab: 6,
  };
  const chave = get("weekday").toLowerCase().replace(".", "").slice(0, 3);
  const iso = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());

  return {
    dia: mapaDias[chave] ?? new Date().getDay(),
    minutos: Number(get("hour")) * 60 + Number(get("minute")),
    iso,
  };
};

const HorariosFuncionamento = () => {
  const [aberto, setAberto] = useState(false);
  const [agora, setAgora] = useState(agoraEmSaoPaulo());

  useEffect(() => {
    const timer = setInterval(() => {
      setAgora(agoraEmSaoPaulo());
    }, 1000 * 60);

    return () => clearInterval(timer);
  }, []);

  const { dia, minutos, iso } = agora;
  const eFeriado = FERIADOS.includes(iso);

  const hoje = eFeriado ? null : HORARIOS[dia];
  const estaAberta = !!hoje && minutos >= hoje.abre && minutos < hoje.fecha;

  const proximaAbertura = useMemo(() => {
    if (estaAberta) return null;
    if (hoje && minutos < hoje.abre) return `Abre hoje às ${fmt(hoje.abre)}`;
    for (let i = 1; i <= 7; i++) {
      const d = (dia + i) % 7;
      const h = HORARIOS[d];
      if (h) {
        return i === 1
          ? `Abre amanhã às ${fmt(h.abre)}`
          : `Abre ${DIAS[d]} às ${fmt(h.abre)}`;
      }
    }
    return null;
  }, [dia, minutos, hoje, estaAberta]);

  const ordem = Array.from({ length: 7 }, (_, i) => (dia + i) % 7);

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={() => setAberto((v) => !v)}
        aria-expanded={aberto}
        className="flex w-full items-center justify-between gap-3 text-left"
      >
        <span className="flex items-center gap-2">
          <Clock className="h-4 w-4 shrink-0 text-silva-yellow" />
          <span
            className={`font-kamerik text-sm font-bold ${
              estaAberta ? "text-status-open" : "text-status-closed"
            }`}
          >
            {estaAberta ? "Aberta agora" : "Fechada"}
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="font-kamerik text-sm text-silva-white">
            {estaAberta && hoje
              ? `${fmt(hoje.abre)} - ${fmt(hoje.fecha)}`
              : proximaAbertura}
          </span>
          <motion.span animate={{ rotate: aberto ? 180 : 0 }} transition={{ duration: 0.25 }}>
            <ChevronDown className="h-4 w-4 text-silva-white/60" />
          </motion.span>
        </span>
      </button>

      <AnimatePresence initial={false}>
        {aberto && (
          <motion.div
            key="lista"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-1.5 border-t border-silva-white/10 pt-4">
              {ordem.map((d) => {
                const h = HORARIOS[d];
                const eHoje = d === dia;
                return (
                  <p
                    key={d}
                    className={`flex justify-between font-kamerik text-sm ${
                      eHoje ? "font-bold text-silva-white" : "text-silva-white/60"
                    }`}
                  >
                    <span className="capitalize">{DIAS[d]}</span>
                    <span>{h ? `${fmt(h.abre)} - ${fmt(h.fecha)}` : "Fechada"}</span>
                  </p>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HorariosFuncionamento;
