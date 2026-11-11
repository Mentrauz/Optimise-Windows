"use client";

import {
  AlertRegular,
  AlertFilled,
  AppsListRegular,
  AppsListFilled,
  ArrowSyncRegular,
  ArrowSyncFilled,
  BatteryChargeRegular,
  BatteryChargeFilled,
  GamesRegular,
  GamesFilled,
  GaugeRegular,
  GaugeFilled,
  GlobeRegular,
  GlobeFilled,
  HomeRegular,
  HomeFilled,
  ProhibitedRegular,
  ProhibitedFilled,
  ShieldLockRegular,
  ShieldLockFilled,
  StorageRegular,
  StorageFilled,
  ToolboxRegular,
  ToolboxFilled,
  ArrowDownloadRegular,
  ArrowDownloadFilled,
  SparkleRegular,
  SparkleFilled,
} from "@fluentui/react-icons";
import type { Category } from "@/lib/content";

type IconKey = Category["icon"];

const map: Record<IconKey, { r: React.ElementType; f: React.ElementType }> = {
  home: { r: HomeRegular, f: HomeFilled },
  performance: { r: GaugeRegular, f: GaugeFilled },
  startup: { r: AppsListRegular, f: AppsListFilled },
  storage: { r: StorageRegular, f: StorageFilled },
  power: { r: BatteryChargeRegular, f: BatteryChargeFilled },
  gaming: { r: GamesRegular, f: GamesFilled },
  privacy: { r: ShieldLockRegular, f: ShieldLockFilled },
  notifications: { r: AlertRegular, f: AlertFilled },
  updates: { r: ArrowSyncRegular, f: ArrowSyncFilled },
  network: { r: GlobeRegular, f: GlobeFilled },
  avoid: { r: ProhibitedRegular, f: ProhibitedFilled },
  tools: { r: ToolboxRegular, f: ToolboxFilled },
  download: { r: ArrowDownloadRegular, f: ArrowDownloadFilled },
  features: { r: SparkleRegular, f: SparkleFilled },
};

export function CategoryIcon({
  icon,
  filled = false,
  size = 20,
}: {
  icon: IconKey;
  filled?: boolean;
  size?: number;
}) {
  const entry = map[icon];
  const Cmp = filled ? entry.f : entry.r;
  return <Cmp fontSize={size} aria-hidden />;
}

/** Brand mark: a small accent tile with a gauge glyph (not the Windows logo). */
export function AppMark({ size = 20 }: { size?: number }) {
  return (
    <span className="app-mark" style={{ width: size, height: size, borderRadius: size / 4 }} aria-hidden>
      <GaugeFilled fontSize={Math.round(size * 0.7)} />
    </span>
  );
}
