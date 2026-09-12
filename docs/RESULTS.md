# Detailed Results

This page collects representative results transcribed from source reports and cross-checked against their tables, annotated plots, or archived simulator logs. Values are simulation results unless a column explicitly says hand analysis. The simulations were not rerun for this portfolio.

## Self-biased sub-1 V bandgap reference

### Part 2 - transistor OTA with ideal passives

| Metric | Source-checked result |
|---|---:|
| Supply voltage | 1.2 V |
| Nominal reference voltage | approximately 0.8016 V |
| Nominal total supply current | approximately 6.303 uA |
| Evaluated temperature range | -40 to 125 degrees C |
| Global reference spread over the evaluated temperature/corner sweep | approximately 2.5 mV peak-to-peak |
| Phase margin across the evaluated sweep | approximately 65.7 to 78.5 degrees |
| Compensation capacitor | 10 pF |

### Part 3 - PDK resistor and capacitor implementation

| Metric | Source-checked result |
|---|---:|
| Nominal reference voltage | approximately 0.8036 V |
| Nominal total supply current | approximately 9.162 uA |
| Global reference spread over the evaluated temperature/corner sweep | approximately 3.25 mV peak-to-peak |
| Final resistor values | R2 = 91.4 kohm; R3 = 627 kohm; R4 = 407 kohm |
| Selected passives | RNpoly resistors and MIM capacitor |

The design combines the BJT CTAT term with a scaled delta-VBE PTAT term and uses a transistor-level OTA to close the loop. The available PDK-passive evidence does not establish phase margin for Part 3. The process-corner setup varies the MOS models while the BJT and passive models remain at TT, so the sweep is not a full all-device PVT qualification. See the [project page](../projects/bandgap-reference/README.md) and [report](../projects/bandgap-reference/report.pdf).

## Rail-to-rail input, class-AB output op amp

| Metric | Latest nominal run |
|---|---:|
| Low-frequency loop gain from annotated plot | approximately 88.9 dB |
| GBW | 10.11 MHz |
| Phase margin | 60.58 degrees |
| Input common-mode value for final run | 1.25 V |
| Compensation capacitor for final run | 1.65 pF |
| Simulation errors | 0 |

The GBW and phase-margin values come from the latest completed nominal simulator log; the low-frequency loop gain comes from a separate annotated plot. A separate captured run reports 10.03 MHz GBW, 60.21 degrees phase margin, and 17.24 dB gain margin. The input-common-mode sweep plots unity-gain frequency, not GBW. These nominal results only narrowly clear the 10 MHz GBW and 60 degree phase-margin targets and do not establish PVT closure. See the [project page](../projects/rail-to-rail-class-ab-op-amp/README.md) and [compiled report](../projects/rail-to-rail-class-ab-op-amp/report.pdf).

## Fully differential folded-cascode OTA

### Open-loop OTA with behavioral CMFB

| Metric | Hand analysis | Simulation |
|---|---:|---:|
| DC differential gain | 70.15 dB | 71.05 dB |
| Bandwidth | 18.65 kHz | 15.97 kHz |
| UGF | 59.97 MHz | 56.84 MHz |
| GBW | 59.97 MHz | 57.00 MHz |
| Phase margin | 90.02 degrees | 82.02 degrees |

### Closed-loop operation with transistor-level CMFB

| Metric | Reported result |
|---|---:|
| Common-mode-loop GBW | 11.46 MHz |
| Common-mode-loop phase margin | 85.54 degrees |
| Differential-loop GBW | 7.977 MHz |
| Differential-loop phase margin | 88.97 degrees |
| 1% settling time | 99.27 ns |
| Closed-loop differential gain | 1.9969 V/V |
| Differential output swing | 1.198 Vpp |

Evidence: [Lab 11 report](../reports/cadence/11-fully-differential-folded-cascode-ota.pdf).

## Two-stage Miller-compensated OTA

| Metric | Hand analysis | Simulation |
|---|---:|---:|
| DC gain | 71.20 dB | 71.15 dB |
| Bandwidth | 1.717 kHz | 1.698 kHz |
| GBW | 6.231 MHz | 6.126 MHz |
| UGF | 6.350 MHz | 5.987 MHz |
| Phase margin | 77 degrees | 75.23 degrees |
| Slew rate | 5.00 V/us | 5.08 V/us |
| Settling time | 61.2 ns estimate | 38.8 ns |

The report shows an approximately 87 dB simulator CMRR plot; its differential/common-mode gain calculation gives 75.57 dB. Evidence: [Lab 9 report](../reports/cadence/09-two-stage-miller-ota.pdf).

## 5-transistor OTA

| Metric | Hand analysis | Open-loop simulation | STB loop-gain simulation |
|---|---:|---:|---:|
| DC gain | 34.22 dB | 34.19 dB | 33.21 dB |
| Gain-crossover frequency | 5.09 MHz | 5.000 MHz | 4.674 MHz |
| CMRR | 75 dB | 83.95 dB | - |

Evidence: [Lab 7 report](../reports/xschem/07-five-transistor-ota.pdf).

## Differential amplifier

| Metric | Hand analysis | Simulation |
|---|---:|---:|
| Differential gain | 7.824 V/V | 7.82 V/V |
| Bandwidth | 5.68 MHz | 5.80 MHz |
| Common-mode gain | -0.0441 V/V | -0.0359 V/V |
| CMRR | 44.98 dB | 46.76 dB |
| Differential output limit | +/-1.200 V | +/-1.189 V |

Evidence: [Lab 6 report](../reports/xschem/06-differential-amplifier.pdf).

## Cascode bandwidth study

| Metric | Common-source simulation | Cascode simulation | Improvement |
|---|---:|---:|---:|
| DC gain | 7.807 V/V | 8.355 V/V | 7.0% |
| Bandwidth | 1.695 MHz | 3.006 MHz | 77.3% |
| UGF | 13.182 MHz | 24.911 MHz | 89.0% |
| GBW | 13.229 MHz | 25.116 MHz | 89.9% |

The cascode suppresses Miller multiplication while the drain resistor limits the available DC-gain increase. Evidence: [Lab 3 Xschem report](../reports/xschem/03-cascode-for-bandwidth.pdf).

## Feedback desensitization

| Temperature sweep result | Change from -40 to 100 degrees C |
|---|---:|
| Loop gain | -11.38% |
| Closed-loop gain | -0.572% |

The much smaller closed-loop variation demonstrates the expected desensitization when loop gain is high. Evidence: [Lab 8 report](../reports/cadence/08-negative-feedback.pdf).

## Simple versus wide-swing cascode current mirrors

| Metric | Simple mirror | Wide-swing cascode mirror |
|---|---:|---:|
| Simulated output resistance | 1.586 Mohm | 221.8 Mohm |
| Analytical output resistance | 1.665 Mohm | 221.15 Mohm |
| Monte Carlo sample count | 200 | 200 |
| Sample mean output current | 20.118 uA | 20.025 uA |
| Population standard deviation | 0.423 uA | 0.394 uA |
| Population coefficient of variation | 2.10% | 1.97% |

The statistics above were recomputed from the included raw datasets. Evidence: [Lab 5 report](../reports/xschem/05-current-mirror-comparison.pdf) and [Monte Carlo data](../data/current-mirror-monte-carlo).

## Noise analysis

### RC low-pass filter

| Metric | Hand analysis | Simulation | Difference |
|---|---:|---:|---:|
| Noise density | 4.071 nV/sqrt(Hz) | 4.071 nV/sqrt(Hz) | 0.001% |
| Bandwidth | 159.15 MHz | 158.8 MHz | 0.223% |
| RMS output noise | 64.37 uV | 64.32 uV | 0.084% |

### 5-transistor OTA

| Metric | Hand analysis | Simulation |
|---|---:|---:|
| Thermal-noise density | 14.46 nV/sqrt(Hz) | 15.068 nV/sqrt(Hz) |
| Bandwidth | 5.02 MHz | 4.853 MHz |
| Integrated thermal-noise estimate | 40.62 uV RMS | - |

Evidence: [Lab 10 report](../reports/cadence/10-noise-analysis.pdf).

## Interpretation

The strongest theme across the portfolio is quantitative closure: initial hand calculations are used to choose topology, bias, gm/ID, device dimensions, and compensation, then the differences from transistor-level simulation are explained rather than hidden. The later labs extend that workflow to feedback-loop stability, mismatch, noise, PVT corners, and common-mode control.
