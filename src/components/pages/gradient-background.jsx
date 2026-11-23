const noiseTableValues = `${"1 ".repeat(53)}${"0 ".repeat(59)}`;

export default function GradientBackground() {
  return (
    <svg
      className="gradient-noise-background"
      viewBox="0 0 393 852"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <filter
          id="gradient-background-noise"
          x="0"
          y="0"
          width="393"
          height="852"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="backgroundFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="backgroundFix"
            result="shape"
          />
          <feTurbulence
            type="fractalNoise"
            baseFrequency="2 2"
            stitchTiles="stitch"
            numOctaves="3"
            result="noise"
            seed="3530"
          />
          <feColorMatrix
            in="noise"
            type="luminanceToAlpha"
            result="alphaNoise"
          />
          <feComponentTransfer in="alphaNoise" result="coloredNoise">
            <feFuncA type="discrete" tableValues={noiseTableValues} />
          </feComponentTransfer>
          <feComposite
            operator="in"
            in="coloredNoise"
            in2="shape"
            result="noiseClipped"
          />
          <feFlood
            floodColor="rgba(0, 0, 0, 0.06)"
            result="noiseColor"
          />
          <feComposite
            operator="in"
            in="noiseColor"
            in2="noiseClipped"
            result="coloredNoise"
          />
          <feMerge>
            <feMergeNode in="shape" />
            <feMergeNode in="coloredNoise" />
          </feMerge>
        </filter>
        <linearGradient
          id="gradient-background-gradient"
          x1="196.5"
          y1="0"
          x2="196.5"
          y2="852"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#27DFFF" />
          <stop offset="1" stopColor="#FFE97A" />
        </linearGradient>
      </defs>
      <g filter="url(#gradient-background-noise)">
        <rect
          width="393"
          height="852"
          fill="url(#gradient-background-gradient)"
        />
      </g>
    </svg>
  );
}
