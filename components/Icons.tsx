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
  ShieldCheckmarkRegular,
  ShieldCheckmarkFilled,
  StorageRegular,
  StorageFilled,
  ToolboxRegular,
  ToolboxFilled,
  ArrowDownloadRegular,
  ArrowDownloadFilled,
  SparkleRegular,
  SparkleFilled,
  StarRegular,
  StarFilled,
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
  programs: { r: StarRegular, f: StarFilled },
  protect: { r: ShieldCheckmarkRegular, f: ShieldCheckmarkFilled },
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

/** Brand mark: the same icon as the browser tab favicon (app/icon.svg). */
export function AppMark({ size = 20 }: { size?: number }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="app-mark" src="/icon.svg" width={size} height={size} alt="" aria-hidden />;
}
