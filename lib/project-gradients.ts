export const projectGradients = {
  warm: "bg-gradient-to-br from-[#f5d4a8] via-[#f0b87a] to-[#e8a060]",
  blue: "bg-gradient-to-br from-[#c8d8f0] via-[#9eb8e8] to-[#7a9fd8]",
  sand: "bg-gradient-to-br from-[#f0e0c8] via-[#e8c8a0] to-[#ddb878]",
  sky: "bg-gradient-to-br from-[#d0e8f8] via-[#a8d0f0] to-[#88b8e8]",
  purple: "bg-gradient-to-br from-[#e8d0f0] via-[#d0a8e8] to-[#c088d8]",
} as const

export type ProjectGradient = keyof typeof projectGradients
