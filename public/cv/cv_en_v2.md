# Barış Salih Babacan

**Systems Engineer — Rust · Go · Swift**

Istanbul, Turkey (open to remote, EU/US overlap) | +90 543 897 5759 | barissalih@babacan.me
linkedin.com/in/barissalihbabacan | github.com/barissalihbabacan | babacan.me

---

### SUMMARY

Systems engineer building local-first infrastructure in Rust, with production experience spanning embedded systems, network protocol reverse engineering, and native applications. Shipped Sortify, an iOS/iPadOS game-based learning platform now at version 2.1 on the App Store; reverse-engineered the control interfaces of three TV vendors for a shipped Android TV remote; and delivered a hardware access-control system that served 120–150 users a day for three academic years.

### SKILLS

- **Systems & Protocols:** Rust, content-addressable storage (BLAKE3), Unix domain sockets, JSON-RPC, IPC & sidecar processes, HTTP Digest auth, mDNS/DIAL discovery, serial & embedded (Arduino), Git internals
- **Languages:** Rust, Swift, Go, TypeScript, JavaScript, C++, Python, SQL
- **Apple & Desktop:** SwiftUI, MVVM, Swift Package Manager, Tauri, App Store release
- **Backend & Web:** Node.js, Express, Go (net/http), React, Next.js, Firebase (Firestore, Functions, Auth), MongoDB, SQLite
- **Practice & Tooling:** Git, GitHub Actions CI, code review workflows, unit testing & benchmarking, Wireshark, Linux

### EXPERIENCE

**CTO & Lead Developer** | _Garage.ist_ | Oct 2024 – Present
_Product studio building consumer iOS and Android applications._

- Lead development of **Sortify**, a game-based learning app for ages 3–13 with parent and teacher supervision tools (SwiftUI + MVVM + Firebase), now at **v2.1 on the App Store** across 540+ commits.
- Split the codebase into six in-house Swift packages for core, auth, education, games, subscription and chessboard; integrated subscriptions, push notifications and analytics.
- Led development with a two-developer team and enforced review discipline through CI that blocks direct pushes to main and self-merged pull requests.
- Co-built **+TV**, a shipped Android TV remote, with a fellow developer, and reverse-engineered the control interfaces of Samsung (Tizen), LG (webOS) and Philips televisions using Wireshark and curl.
- Wrote the Philips integration myself where no SDK existed, reverse-engineering Philips' own remote app off the wire: HTTP Digest authentication over a 401 challenge–response flow, PIN-based device pairing as an explicit state machine, and TLS handling for self-signed certificates.
- Shipped four additional iOS titles (RuleSort, Block Nest, Water Sort, Guess the City) to release builds.

**IT & Systems Integration Intern** | _ENLOG, Istanbul_ | Sep 2023 – Jun 2024

- Supported network operations, technical support and internal IT infrastructure while completing high school.

### PROJECTS

- **Chorus — anonymous discussion engine** | _Go, React, Git_ | github.com/joinchorus/chorus
  Built and maintain an open-source forum that stores every thread and message as an immutable Git commit, with no database in the dependency tree. Thread-scoped ephemeral identities replace user accounts. Shipped `v0.1.0-alpha` with IP token-bucket rate limiting tuned per endpoint, `X-Request-ID` correlation across logs and error payloads, and a 10-second graceful shutdown that never interrupts an in-flight Git write. 24 tests and 5 benchmarks measuring the cost of Git-as-storage.

- **Osmos — local-first version control engine** | _Rust, Tauri, React_ | github.com/Osmos-App/osmos-core
  Designed a three-crate Rust workspace: content-addressable object store keyed by BLAKE3 with streaming file hashing, a SQLite-backed tree index, and a Unix-socket daemon exposing ten typed commands (init, status, branch, switch, merge, commit) over a UUID-correlated request/response protocol. **Zero `unsafe` blocks.** Early-stage Tauri/React client; peer-to-peer sync is planned, with the transport crate scaffolded and not yet implemented.

- **Mythos — local-first IDE for novelists** | _Rust, Tauri, TypeScript_ | github.com/Mythos-IDE/mythoside-core
  Built a standalone Rust engine across six crates that models manuscripts as Markdown + YAML on disk and exposes 13 JSON-RPC methods over stdio, run by a Tauri/React client as a managed sidecar. Types are generated from Rust into TypeScript so the IPC boundary stays type-safe. **82 tests.**

- **Q-PASS — RFID access control** | _C++, Arduino, Python, PHP, MySQL_
  Delivered an end-to-end hardware and software system for a public institution: C++ microcontroller firmware bridged to a web backend over serial, in custom 3D-printed reader enclosures. **Served 120–150 people daily for three academic years**, handling cafeteria access and meal tracking.

- **IT-RMS — IT resource management** | _Node.js, Express, MongoDB, EJS_
  Built the IT asset system for my vocational high school's IT department across 249 commits, starting in 2023 during the third year of high school: multi-branch inventory with barcode generation, PDF reporting, audit logging and a five-role user model. Returned to it in 2026 to **migrate the production codebase from PHP/MySQL to Express 5 + MongoDB**, preserving the legacy version on a branch and restructuring into an MVC layout with linting, input validation and security headers.

### EDUCATION

**Istanbul University** (Open & Distance Education Faculty) | _Associate Degree, Computer Programming_ | 2024 – Present

**Haydarpaşa Vocational & Technical High School** | _Network Management & Cyber Security_ | 2020 – 2024
