type P = { size?: number }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
})

export const SearchIcon = ({ size = 22 }: P) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="M16 16l4.5 4.5" />
  </svg>
)

export const UserIcon = ({ size = 22 }: P) => (
  <svg {...base(size)}>
    <circle cx="12" cy="8.5" r="3.5" />
    <path d="M5 20c.8-3.6 3.4-5.5 7-5.5s6.2 1.9 7 5.5" />
  </svg>
)

export const BagIcon = ({ size = 22 }: P) => (
  <svg {...base(size)}>
    <path d="M6 7h12l1 13H5L6 7Z" />
    <path d="M9 7a3 3 0 0 1 6 0" />
  </svg>
)

export const MailIcon = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="M3.5 6.5l8.5 6.5 8.5-6.5" />
  </svg>
)

export const PhoneIcon = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <path d="M5 4h3.5l1.5 4-2 1.5a11 11 0 0 0 5.5 5.5L15 13l4 1.5V18a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
)

export const TruckIcon = ({ size = 20 }: P) => (
  <svg {...base(size)}>
    <path d="M2 6h11v9H2z" />
    <path d="M13 9h4l3 3v3h-7" />
    <circle cx="7" cy="17" r="1.8" />
    <circle cx="17" cy="17" r="1.8" />
  </svg>
)

export const ChevronIcon = ({ size = 14 }: P) => (
  <svg {...base(size)}>
    <path d="M6 9l6 6 6-6" />
  </svg>
)