# Report Index

The collection contains 17 PDFs: two mini projects, two design challenges, and thirteen supporting labs. Filenames were normalized for browsing while preserving the technical content. Original lab numbers are retained as authored, so gaps are intentional.

## Mini projects

| Project | Focus | Links |
|---|---|---|
| Mini Project 01 - Two-stage Miller-compensated OTA | gm/ID design, Miller compensation, CMRR, slew, and settling | [Project page](../projects/two-stage-miller-ota/README.md) · [PDF](cadence/09-two-stage-miller-ota.pdf) |
| Mini Project 02 - Fully differential folded-cascode OTA | Transistor-level CMFB, differential/common-mode stability, swing, and settling | [Project page](../projects/fully-differential-folded-cascode-ota/README.md) · [PDF](cadence/11-fully-differential-folded-cascode-ota.pdf) |

## Design challenges

| Challenge | Focus | Links |
|---|---|---|
| Self-biased sub-1 V bandgap reference | PTAT/CTAT synthesis, transistor OTA, temperature/corner verification, startup, and PDK passives | [Project page](../projects/bandgap-reference/README.md) · [PDF](../projects/bandgap-reference/report.pdf) |
| Rail-to-rail Monticelli class-AB op amp | Nominal stability, input-common-mode sweep, DC loading, slew, and large-signal tests; compiled from archived evidence | [Project page](../projects/rail-to-rail-class-ab-op-amp/README.md) · [PDF](../projects/rail-to-rail-class-ab-op-amp/report.pdf) |

## Other labs

### Cadence Virtuoso / Spectre

| File | Focus |
|---|---|
| [01-lpf-and-mosfet-characterization.pdf](cadence/01-lpf-and-mosfet-characterization.pdf) | RC low-pass response and MOS I-V characterization |
| [02-gmid-and-common-source-amplifier.pdf](cadence/02-gmid-and-common-source-amplifier.pdf) | gm/ID sizing charts and common-source gain |
| [03-cascode-for-gain.pdf](cadence/03-cascode-for-gain.pdf) | Cascode biasing, gain, bandwidth, and hand/simulation comparison |
| [08-negative-feedback.pdf](cadence/08-negative-feedback.pdf) | Closed-loop gain, loop gain, bandwidth, and desensitization |
| [10-noise-analysis.pdf](cadence/10-noise-analysis.pdf) | AC and transient noise for an RC filter and a 5T OTA |

### Xschem / ngspice

| File | Focus |
|---|---|
| [00-rlc-resonance-prelab.pdf](xschem/00-rlc-resonance-prelab.pdf) | Parallel and series RLC resonance |
| [01-mos-small-signal-parameters.pdf](xschem/01-mos-small-signal-parameters.pdf) | gm and ro in triode and saturation |
| [02-gain-linearization.pdf](xschem/02-gain-linearization.pdf) | Feedback-based gain linearization |
| [03-cascode-for-bandwidth.pdf](xschem/03-cascode-for-bandwidth.pdf) | Common-source versus cascode bandwidth |
| [04-common-drain-amplifier.pdf](xschem/04-common-drain-amplifier.pdf) | Source follower poles, zeros, peaking, and loading |
| [05-current-mirror-comparison.pdf](xschem/05-current-mirror-comparison.pdf) | Output resistance, compliance, mismatch, and Monte Carlo |
| [06-differential-amplifier.pdf](xschem/06-differential-amplifier.pdf) | Differential/common-mode behavior and CMRR |
| [07-five-transistor-ota.pdf](xschem/07-five-transistor-ota.pdf) | Open-loop and closed-loop OTA behavior |
