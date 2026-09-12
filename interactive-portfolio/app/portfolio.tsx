"use client";
import { useMemo, useState } from "react";

const miniProjects = [
  { id: "miller", code: "MP-01", label: "Mini project 01 · Cadence Lab 9", title: "Two-stage Miller OTA", focus: "Amplifier design / frequency compensation", image: "miller-ota-open-loop-gain.png", alt: "Two-stage Miller OTA open-loop gain and phase response", description: "A two-stage operational transconductance amplifier designed from gain, bandwidth, phase-margin, and slew-rate constraints.", metrics: [["Open-loop gain", "71.15 dB"], ["GBW", "6.126 MHz"], ["Phase margin", "75.23°"], ["Slew rate", "5.08 V/µs"]], detail: "Hand analysis predicts 71.20 dB gain, 6.231 MHz GBW, and 5.00 V/µs slew rate. The report compares these estimates with transistor-level AC and transient simulation.", pdf: "cadence/09-two-stage-miller-ota.pdf", methods: ["Small-signal analysis", "Miller compensation", "AC & transient"] },
  { id: "folded", code: "MP-02", label: "Mini project 02 · Cadence Lab 11", title: "Fully differential folded-cascode OTA", focus: "Differential amplification / common-mode feedback", image: "folded-cascode-ota-schematic.png", alt: "Fully differential folded-cascode OTA transistor-level schematic", description: "A fully differential OTA with behavioral and transistor-level common-mode feedback, loop stability, and closed-loop settling verification.", metrics: [["Open-loop gain", "71.05 dB"], ["Open-loop GBW", "57.00 MHz"], ["Phase margin", "82.02°"], ["1% settling", "99.27 ns"]], detail: "The gain, GBW, and phase margin describe the open-loop OTA with behavioral CMFB. The settling result belongs to the closed-loop test with transistor-level CMFB; the report documents both setups.", pdf: "cadence/11-fully-differential-folded-cascode-ota.pdf", methods: ["gm/ID sizing", "CMFB", "Loop stability"] },
];
const challenges = [
  { id: "bandgap", code: "DC-01", label: "Design challenge 01", title: "Self-biased sub-1 V bandgap reference", focus: "Precision reference / temperature compensation", image: "bandgap-temperature-corners.png", alt: "Bandgap reference voltage across temperature and evaluated MOS corners", description: "CTAT/PTAT synthesis, a transistor-level regulation loop, and a separately characterized implementation using PDK passive cells.", metrics: [["Supply", "1.2 V"], ["Ideal-passive VREF", "~0.8016 V"], ["Global spread¹", "~2.5 mV"], ["Phase margin¹", "65.7–78.5°"]], detail: "¹Ideal-passive implementation. The PDK-passive version gives approximately 0.8036 V nominal, 9.162 µA nominal supply current, and 3.25 mV global spread. Its stability is not established by the earlier ideal-passive sweep. MOS corners vary while BJT and passive models remain typical.", pdf: "bgr-design-challenge.pdf", methods: ["CTAT / PTAT", "MOS corners", "Startup"] },
  { id: "class-ab", code: "DC-02", label: "Design challenge 02", title: "Monticelli rail-to-rail class-AB op amp", focus: "Rail-to-rail input / translinear-loop biasing", image: "class-ab-loop-gain.png", alt: "Monticelli class-AB op amp loop gain and phase response", description: "Complementary input stages and a Monticelli bias network drive a class-AB output stage, verified through nominal stability and large-signal tests.", metrics: [["Low-frequency loop gain²", "~88.9 dB"], ["Nominal GBW", "10.11 MHz"], ["Nominal phase margin", "60.58°"], ["Load", "10 kΩ / 20 pF"]], detail: "Exact GBW and phase margin come from Interactive.184 at VCM = 1.25 V, TT / 27 °C, and c = 1.65 pF. ²Loop gain is from a separate captured plot. The common-mode sweep measures unity-gain frequency, not GBW. Full-range and PVT compliance remain unverified.", pdf: "monticelli-class-ab.pdf", methods: ["Class-AB bias", "Common-mode sweeps", "Load drive"] },
];

const labs = [
  ["Cadence", "01", "LPF and MOSFET characterization", "Devices", "01-lpf-and-mosfet-characterization.pdf"],
  ["Cadence", "02", "gm/ID and common-source amplifier", "Sizing", "02-gmid-and-common-source-amplifier.pdf"],
  ["Cadence", "03", "Cascode amplifier for gain", "Amplifiers", "03-cascode-for-gain.pdf"],
  ["Cadence", "08", "Negative feedback", "Feedback", "08-negative-feedback.pdf"],
  ["Cadence", "09", "Two-stage Miller OTA", "Amplifiers", "09-two-stage-miller-ota.pdf"],
  ["Cadence", "10", "AC and transient noise analysis", "Noise", "10-noise-analysis.pdf"],
  ["Cadence", "11", "Fully differential folded-cascode OTA", "Amplifiers", "11-fully-differential-folded-cascode-ota.pdf"],
  ["Xschem", "00", "RLC resonance prelab", "Fundamentals", "00-rlc-resonance-prelab.pdf"],
  ["Xschem", "01", "MOS small-signal parameters", "Devices", "01-mos-small-signal-parameters.pdf"],
  ["Xschem", "02", "Gain linearization", "Feedback", "02-gain-linearization.pdf"],
  ["Xschem", "03", "Cascode amplifier for bandwidth", "Amplifiers", "03-cascode-for-bandwidth.pdf"],
  ["Xschem", "04", "Common-drain amplifier", "Amplifiers", "04-common-drain-amplifier.pdf"],
  ["Xschem", "05", "Current-mirror comparison", "Biasing", "05-current-mirror-comparison.pdf"],
  ["Xschem", "06", "Differential amplifier", "Amplifiers", "06-differential-amplifier.pdf"],
  ["Xschem", "07", "Five-transistor OTA", "Amplifiers", "07-five-transistor-ota.pdf"],
];
const views = [
  { tab: "Miller OTA", title: "Gain and compensation", image: "miller-ota-open-loop-gain.png", alt: "Miller OTA frequency response", text: "The simulated gain is within 0.05 dB of hand analysis. Compensation produces 75.23° phase margin with 6.126 MHz gain-bandwidth product.", metrics: [["Simulated gain", "71.15 dB"], ["Hand-analysis gain", "71.20 dB"], ["Phase margin", "75.23°"]] },
  { tab: "Folded-cascode OTA", title: "Closed-loop settling", image: "folded-cascode-ota-settling.png", alt: "Folded-cascode OTA closed-loop settling response", text: "The fully differential OTA operates with transistor-level CMFB and reaches the documented one-percent settling band in 99.27 ns.", metrics: [["1% settling", "99.27 ns"], ["Closed-loop gain", "1.9969 V/V"], ["Differential swing", "1.198 Vpp"]] },
  { tab: "Bandgap reference", title: "Temperature and MOS corners", image: "bandgap-temperature-corners.png", alt: "Ideal-passive bandgap temperature and MOS-corner sweep", text: "The ideal-passive implementation spans approximately 799.44 to 801.94 mV across the displayed temperature and MOS-corner family. PDK-passive results are documented separately.", metrics: [["Nominal reference", "~0.8016 V"], ["Global envelope", "~2.49 mV"], ["Temperature", "−40 to 125 °C"]] },
  { tab: "Monticelli class-AB", title: "Nominal loop stability", image: "class-ab-loop-gain.png", alt: "Class-AB loop gain and phase response", text: "The latest nominal record clears the 10 MHz GBW and 60° phase-margin targets. The plotted loop response is a separate archived snapshot.", metrics: [["Final nominal GBW", "10.1083 MHz"], ["Final nominal PM", "60.5839°"], ["Input common mode", "1.25 V"]] },
];

type Project = typeof miniProjects[number];
function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card" id={project.id}>
    <div className="project-topline"><span>{project.label}</span><span className="project-code">{project.code}</span></div>
    <div className="project-image"><img src={"/results/" + project.image} alt={project.alt} loading="lazy" /></div>
    <div className="project-body"><p className="project-focus">{project.focus}</p><h3>{project.title}</h3><p className="project-description">{project.description}</p>
      <dl className="project-metrics">{project.metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      <div className="method-tags">{project.methods.map((method) => <span key={method}>{method}</span>)}</div>
      <details className="result-notes"><summary>Result context & conditions</summary><p>{project.detail}</p></details>
      <div className="project-actions"><a className="button blue" href={"/reports/" + project.pdf} target="_blank" rel="noreferrer">View PDF report <span aria-hidden="true">↗</span></a><a className="download-link" href={"/reports/" + project.pdf} download>Download PDF <span aria-hidden="true">↓</span></a></div>
    </div>
  </article>;
}

export default function Portfolio({ section = "projects" }: { section?: "projects" | "labs" }) {
  const [viewIndex, setViewIndex] = useState(0);
  const [platform, setPlatform] = useState("All");
  const [topic, setTopic] = useState("All topics");
  const [query, setQuery] = useState("");
  const selected = views[viewIndex];
  const otherLabs = useMemo(() => labs.filter((lab) => !(lab[0] === "Cadence" && ["09", "11"].includes(lab[1]))), []);
  const filteredLabs = useMemo(() => otherLabs.filter((lab) => (platform === "All" || lab[0] === platform) && (topic === "All topics" || lab[3] === topic) && lab.slice(0, 4).join(" ").toLowerCase().includes(query.trim().toLowerCase())), [otherLabs, platform, topic, query]);
  const topics = [...new Set(otherLabs.map((lab) => lab[3]))];
  return <main id="top">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="utility-bar"><span>MARWAN YASSER NEGM</span><span>ANALOG INTEGRATED CIRCUIT DESIGN</span></div>
    <header className="site-header">
      <a className="brand" href="/"><span className="brand-mark" aria-hidden="true">IC</span><span><strong>Analog Design</strong><small>Engineering portfolio</small></span></a>
      <nav className="main-tabs" aria-label="Portfolio sections"><a aria-current={section === "projects" ? "page" : undefined} className={section === "projects" ? "active" : ""} href="/">Projects & challenges <span>04</span></a><a aria-current={section === "labs" ? "page" : undefined} className={section === "labs" ? "active" : ""} href="/labs">Other labs <span>13</span></a></nav>
    </header>
    {section === "projects" ? <>
      <section className="hero" id="main-content"><div className="hero-inner"><div className="hero-copy"><p className="eyebrow">PRECISION REFERENCES / ANALOG AMPLIFIERS</p><h1>Analog IC design.<br /><span>From calculation<br className="desktop-break" /> to circuit.</span></h1><p>Two mini projects. Two design challenges. A focused collection of transistor-level designs, simulation results, and complete technical reports.</p><div className="hero-actions"><a className="button white" href="#mini-projects">Explore mini projects <span aria-hidden="true">↓</span></a><a className="hero-text-link" href="#design-challenges">Design challenges <span aria-hidden="true">→</span></a></div></div><div className="hero-figure"><div><span>FEATURED DESIGN / MP-02</span><span>CADENCE VIRTUOSO</span></div><img src="/results/folded-cascode-ota-schematic.png" alt="Transistor-level schematic of the fully differential folded-cascode OTA" /><div className="hero-readout"><span><b>71.05 dB</b>Open-loop gain</span><span><b>57.00 MHz</b>Open-loop GBW</span><span><b>82.02°</b>Phase margin</span></div></div></div></section>
      <div className="section-nav"><a href="#mini-projects">01 <b>Mini projects</b></a><a href="#design-challenges">02 <b>Design challenges</b></a><a href="#results">03 <b>Results explorer</b></a><span>17 complete PDF reports</span></div>
      <section className="section" id="mini-projects"><div className="section-heading"><div><p className="section-kicker">01 / MINI PROJECTS</p><h2>Operational amplifier design</h2></div><p>From two-stage compensation to fully differential operation and common-mode control.</p></div><div className="project-grid">{miniProjects.map((project) => <ProjectCard key={project.id} project={project} />)}</div></section>
      <section className="challenge-section" id="design-challenges"><div className="section"><div className="section-heading"><div><p className="section-kicker">02 / DESIGN CHALLENGES</p><h2>Precision and output drive</h2></div><p>Two circuit architectures, supported by reconstructed reports with original simulation evidence.</p></div><div className="project-grid">{challenges.map((project) => <ProjectCard key={project.id} project={project} />)}</div></div></section>
      <section className="section" id="results"><div className="section-heading"><div><p className="section-kicker">03 / RESULTS EXPLORER</p><h2>A closer look at the results</h2></div><p>Select a design to inspect one of its key plots and the conditions behind the numbers.</p></div><div className="result-tabs" role="group" aria-label="Select a result">{views.map((view, index) => <button type="button" key={view.tab} aria-pressed={viewIndex === index} className={viewIndex === index ? "active" : ""} onClick={() => setViewIndex(index)}>{view.tab}</button>)}</div><div className="result-stage" aria-live="polite"><div className="result-window"><div className="result-window-bar">SIMULATION EVIDENCE</div><a href={"/results/" + selected.image} target="_blank" rel="noreferrer"><img src={"/results/" + selected.image} alt={selected.alt} loading="lazy" /><span>Open full-resolution plot ↗</span></a></div><div className="result-copy"><h3>{selected.title}</h3><p>{selected.text}</p><dl>{selected.metrics.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl></div></div></section>
      <section className="archive-cta"><div><p className="section-kicker">THE SUPPORTING LAB SEQUENCE</p><h2>Explore the fundamentals behind the designs.</h2><p>Device characterization, amplifier stages, feedback, current mirrors, and noise.</p></div><a className="button blue" href="/labs">Browse 13 other labs <span aria-hidden="true">→</span></a></section>
    </> : <>
      <section className="archive-hero" id="main-content"><div className="section"><p className="eyebrow">LAB ARCHIVE / CADENCE & XSCHEM</p><h1>The fundamentals.<br /><span>Organized by topic.</span></h1><p>Thirteen supporting reports, from device characterization to noise. The Miller and folded-cascode OTA mini projects have their own featured section.</p><a href="/#mini-projects">Back to featured projects →</a></div></section>
      <section className="section library"><div className="library-controls"><label className="search-box"><span>Search reports</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try noise, cascode, or feedback" /></label><label className="topic-filter"><span>Topic</span><select value={topic} onChange={(event) => setTopic(event.target.value)}><option>All topics</option>{topics.map((value) => <option key={value}>{value}</option>)}</select></label><div className="platform-filter"><span>Simulation flow</span><div role="group" aria-label="Filter reports by platform">{["All", "Cadence", "Xschem"].map((item) => <button type="button" aria-pressed={platform === item} className={platform === item ? "active" : ""} key={item} onClick={() => setPlatform(item)}>{item}</button>)}</div></div></div><p className="result-count" aria-live="polite">{filteredLabs.length} of 13 reports</p>
      {topics.filter((group) => filteredLabs.some((lab) => lab[3] === group)).map((group) => <section className="lab-group" key={group}><div className="lab-group-heading"><h2>{group}</h2><span>{filteredLabs.filter((lab) => lab[3] === group).length} reports</span></div>{filteredLabs.filter((lab) => lab[3] === group).map(([flow, number, title, , file]) => <a className="lab-row" href={"/reports/" + flow.toLowerCase() + "/" + file} target="_blank" rel="noreferrer" key={flow + number}><span className={"platform-badge " + flow.toLowerCase()}>{flow}</span><span className="lab-number">{number === "00" ? "Prelab" : "Lab " + Number(number)}</span><h3>{title}</h3><span className="pdf-label">PDF <span aria-hidden="true">↗</span></span></a>)}</section>)}
      {filteredLabs.length === 0 && <p className="empty-state">No reports match your filters. Try another topic or search term.</p>}
      <p className="library-footnote">Original course numbering is retained across both tracks. Lab 10 uses the updated, better-formatted PDF supplied for this portfolio.</p></section>
    </>}
    <footer><div className="footer-inner"><div><strong>Marwan Yasser Negm</strong><p>Analog IC Design Portfolio</p></div><p>Information Technology Institute training<br />Cadence Virtuoso · Xschem · ngspice</p><p>Results are simulations. Conditions and source<br className="desktop-break" /> limitations are documented in each report.</p></div></footer>
  </main>;
}
