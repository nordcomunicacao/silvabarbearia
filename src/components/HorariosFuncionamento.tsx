import { useMemo, useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Clock } from "lucide-react";
import { DATAS_ESPECIAIS } from "@/config/calendario";

type Horario = { abre: number; fecha: number } | null;

// index 0 = domingo ... 6 = sábado
const HORARIOS: Horario[] = [
  null, // domingo
  { abre: 9 * 60, fecha: 19 * 60 }, // segunda
  { abre: 9 * 60, fecha: 19 * 60 }, // terça
  { abre: 9 * 60, fecha: 20 * 60 }, // quarta
  { abre: 9 * 60, fecha: 20 * 60 }, // quinta
  { abre: 9 * 60, fecha: 20 * 60 }, // sexta
  { abre: 8 * 60, fecha: 16 * 60 }, // sábado
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
  const eFeriado = DATAS_ESPECIAIS.includes(iso);

  const hoje = eFeriado ? null : HORARIOS[dia];
  const estaAberta = !!hoje && minutos >= hoje.abre && minutos < hoje.fecha;

  const proximaAbertura = useMemo(() => {
    if (estaAberta) return null;
    
    // Se for hoje antes de abrir
    if (hoje && minutos < hoje.abre) return `Abre hoje às ${fmt(hoje.abre)}`;
    
    // Procurar os próximos 14 dias para garantir que achamos uma abertura após feriados
    for (let i = 1; i <= 14; i++) {
      const dataFutura = new Date();
      dataFutura.setDate(dataFutura.getDate() + i);
      
      const isoFuturo = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(dataFutura);
      
      const diaFuturo = dataFutura.getDay();
      const eFeriadoFuturo = DATAS_ESPECIAIS.includes(isoFuturo);
      const h = eFeriadoFuturo ? null : HORARIOS[diaFuturo];
      
      if (h) {
        if (i === 1) return `Abre amanhã às ${fmt(h.abre)}`;
        return `Abre ${DIAS[diaFuturo]} às ${fmt(h.abre)}`;
      }
    }
    return null;
  }, [minutos, hoje, estaAberta, dia]);

  const ordem = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const data = new Date();
      data.setDate(data.getDate() + i);
      const iso = new Intl.DateTimeFormat("en-CA", {
        timeZone: "America/Sao_Paulo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }).format(data);
      
      return {
        dia: data.getDay(),
        iso,
        eHoje: i === 0
      };
    });
  }, [iso]); // Re-calcula se o dia mudar

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
              {ordem.map((item) => {
                const eFeriadoItem = DATAS_ESPECIAIS.includes(item.iso);
                const h = eFeriadoItem ? null : HORARIOS[item.dia];
                
                return (
                  <p
                    key={item.iso}
                    className={`flex justify-between font-kamerik text-sm ${
                      item.eHoje ? "font-bold text-silva-white" : "text-silva-white/60"
                    }`}
                  >
                    <span className="capitalize">
                      {item.eHoje ? "Hoje" : DIAS[item.dia]}
                      {eFeriadoItem && <span className="ml-2 text-[10px] text-status-closed opacity-80">(Feriado)</span>}
                    </span>
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
