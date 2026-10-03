import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Atom,
  Check,
  Cloud,
  Cube,
  Database,
  DeviceMobile,
  DownloadSimple,
  EnvelopeSimple,
  FileTs,
  GithubLogo,
  GitBranch,
  Hexagon,
  Image,
  InstagramLogo,
  Lightning,
  LinkedinLogo,
  MapPin,
  Package,
  Stack,
  TestTube,
  Triangle,
  type Icon,
} from '@phosphor-icons/react';

const ICONS: Record<string, Icon> = {
  'ph-arrow-down': ArrowDown,
  'ph-arrow-left': ArrowLeft,
  'ph-arrow-right': ArrowRight,
  'ph-arrow-up': ArrowUp,
  'ph-arrow-up-right': ArrowUpRight,
  'ph-atom': Atom,
  'ph-check': Check,
  'ph-cloud': Cloud,
  'ph-cube': Cube,
  'ph-database': Database,
  'ph-device-mobile': DeviceMobile,
  'ph-download-simple': DownloadSimple,
  'ph-envelope-simple': EnvelopeSimple,
  'ph-file-ts': FileTs,
  'ph-github-logo': GithubLogo,
  'ph-git-branch': GitBranch,
  'ph-hexagon': Hexagon,
  'ph-image': Image,
  'ph-instagram-logo': InstagramLogo,
  'ph-linkedin-logo': LinkedinLogo,
  'ph-lightning': Lightning,
  'ph-map-pin': MapPin,
  'ph-package': Package,
  'ph-stack': Stack,
  'ph-test-tube': TestTube,
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
