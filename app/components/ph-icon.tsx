import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Check,
  Cloud,
  Cube,
  EnvelopeSimple,
  GithubLogo,
  Hexagon,
  Image,
  Lightning,
  LinkedinLogo,
  MapPin,
  Stack,
  Triangle,
  type Icon,
} from '@phosphor-icons/react';

const ICONS: Record<string, Icon> = {
  'ph-arrow-down': ArrowDown,
  'ph-arrow-left': ArrowLeft,
  'ph-arrow-right': ArrowRight,
  'ph-arrow-up': ArrowUp,
  'ph-arrow-up-right': ArrowUpRight,
  'ph-check': Check,
  'ph-cloud': Cloud,
  'ph-cube': Cube,
  'ph-envelope-simple': EnvelopeSimple,
  'ph-github-logo': GithubLogo,
  'ph-hexagon': Hexagon,
  'ph-image': Image,
  'ph-linkedin-logo': LinkedinLogo,
  'ph-lightning': Lightning,
  'ph-map-pin': MapPin,
  'ph-stack': Stack,
  'ph-triangle': Triangle,
};

export type PhIconName = keyof typeof ICONS | (string & {});

export function PhIcon({
  name,
  size = 16,
  weight = 'regular',
  style,
}: {
  name: string;
  size?: number | string;

  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  style?: React.CSSProperties;
}) {
  const Cmp = ICONS[name];
  if (!Cmp) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[ph-icon] ícone desconhecido: "${name}"`);
    }
    return null;
  }
  return <Cmp size={size} weight={weight} style={style} />;
}
