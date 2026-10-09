import React from 'react';

export function UnriEmblem({ className = 'w-14 h-14' }: { className?: string }) {
  return (
    <div
      className={`relative shrink-0 rounded-2xl overflow-hidden flex items-center justify-center p-1.5 shadow-md border border-amber-500/20 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 ${className}`}
      title="Universitas Riau"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow"
      >
        {/* Shield Outer Outline */}
        <path
          d="M50 8 L85 22 V52 C85 72 50 92 50 92 C50 92 15 72 15 52 V22 Z"
          fill="#c2410c"
          stroke="#fef08a"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Inner Shield Accent */}
        <path
          d="M50 16 L77 28 V50 C77 66 50 82 50 82 C50 82 23 66 23 50 V28 Z"
          fill="#9a3412"
          stroke="#fde047"
          strokeWidth="1.5"
        />
        {/* Academic Lotus Petals / Torch */}
        <path
          d="M50 30 C53 40 60 48 68 50 C58 52 53 58 50 72 C47 58 42 52 32 50 C40 48 47 40 50 30 Z"
          fill="#fef08a"
        />
        {/* Center Flame Torch */}
        <path
          d="M50 35 C52 42 56 46 50 56 C44 46 48 42 50 35 Z"
          fill="#ea580c"
        />
        {/* Open Book Base */}
        <path
          d="M36 65 C43 62 50 64 50 64 C50 64 57 62 64 65 C64 68 57 66 50 69 C43 66 36 68 36 65 Z"
          fill="#ffffff"
          stroke="#fef08a"
          strokeWidth="1"
        />
        {/* UNRI Lettermark */}
        <text
          x="50"
          y="78"
          textAnchor="middle"
          fill="#fef08a"
          fontSize="9.5"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1"
        >
          UNRI
        </text>
      </svg>
    </div>
  );
}

export function HighSchoolEmblem({ className = 'w-14 h-14' }: { className?: string }) {
  return (
    <div
      className={`relative shrink-0 rounded-2xl overflow-hidden flex items-center justify-center p-1.5 shadow-md border border-sky-400/20 bg-gradient-to-br from-sky-600 via-sky-700 to-sky-950 ${className}`}
      title="Sekolah Menengah Atas"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow"
      >
        {/* Shield Outer Outline */}
        <path
          d="M50 10 C76 10 86 24 86 46 C86 68 50 90 50 90 C50 90 14 68 14 46 C14 24 24 10 50 10 Z"
          fill="#0284c7"
          stroke="#fef08a"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Inner Shield */}
        <path
          d="M50 18 C70 18 78 28 78 46 C78 63 50 80 50 80 C50 80 22 63 22 46 C22 28 30 18 50 18 Z"
          fill="#0369a1"
        />
        {/* Laurel Wreath */}
        <path
          d="M32 40 C30 52 38 64 50 68 C62 64 70 52 68 40"
          stroke="#fef08a"
          strokeWidth="2"
          strokeDasharray="2 3"
          fill="none"
        />
        {/* Central Star */}
        <path
          d="M50 28 L53 36 L61 36 L54 41 L57 49 L50 44 L43 49 L46 41 L39 36 L47 36 Z"
          fill="#fde047"
        />
        {/* Open Book Wings */}
        <path
          d="M35 54 C42 50 50 53 50 53 C50 53 58 50 65 54 V64 C58 60 50 63 50 63 C50 63 42 60 35 64 Z"
          fill="#ffffff"
          stroke="#38bdf8"
          strokeWidth="1"
        />
        {/* SMA Text */}
        <text
          x="50"
          y="74"
          textAnchor="middle"
          fill="#fef08a"
          fontSize="8.5"
          fontWeight="900"
          fontFamily="system-ui, sans-serif"
          letterSpacing="1"
        >
          SMA
        </text>
      </svg>
    </div>
  );
}
