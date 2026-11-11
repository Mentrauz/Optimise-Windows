// All optimisation content lives here. Every tweak is a built-in Windows 11
// setting that can be switched back. No scripts, no registry edits, no third-party tools.

export type Profile = "laptop" | "desktop" | "gaming";
export type Impact = "High" | "Medium" | "Low";

export type CategoryId =
  | "performance"
  | "startup"
  | "visuals"
  | "storage"
  | "power"
  | "gaming"
  | "privacy"
  | "notifications"
  | "updates"
  | "network";

export interface Category {
  id: CategoryId;
  name: string;
  /** One-line description shown under the page title and on tiles. */
  blurb: string;
  /** Key used by <CategoryIcon /> */
  icon: CategoryId | "home" | "avoid";
  /** Tile colour (WinUI-style icon plate). */
  tint: string;
}

export interface Tweak {
  id: string;
  category: CategoryId;
  title: string;
  summary: string;
  /** Breadcrumb to the setting, e.g. ["Settings", "System", "Power & battery"] */
  path: string[];
  steps: string[];
  why: string;
  undo: string;
  impact: Impact;
  minutes: number;
  /** Empty = useful for everyone. */
  for: Profile[];
  /** ms-settings: URI that opens the page directly on a Windows PC. */
  deepLink?: string;
  /** Something to type into Run (Win + R) or an address bar. */
  command?: { label: string; value: string };
  caution?: string;
}

export const categories: Category[] = [
  { id: "performance", name: "Performance", blurb: "Find what's slowing you down and give Windows the right power settings.", icon: "performance", tint: "#0078D4" },
  { id: "startup", name: "Startup & apps", blurb: "Fewer apps launching at sign-in means a faster, quieter PC.", icon: "startup", tint: "#8764B8" },
  { id: "visuals", name: "Visual effects", blurb: "Trade a little polish for snappier windows on older hardware.", icon: "visuals", tint: "#C239B3" },
  { id: "storage", name: "Storage", blurb: "Let Windows tidy up after itself and keep room to breathe.", icon: "storage", tint: "#00B294" },
  { id: "power", name: "Power & battery", blurb: "Get more hours out of a laptop without making it feel slow.", icon: "power", tint: "#498205" },
  { id: "gaming", name: "Gaming", blurb: "Small, safe settings that help games run smoother.", icon: "gaming", tint: "#107C10" },
  { id: "privacy", name: "Privacy", blurb: "Share less by default. These also cut a little background work.", icon: "privacy", tint: "#5C2E91" },
  { id: "notifications", name: "Notifications & tips", blurb: "Quiet the suggestions and keep the alerts you actually want.", icon: "notifications", tint: "#CA5010" },
  { id: "updates", name: "Windows Update", blurb: "Stay current on your schedule, with up-to-date drivers.", icon: "updates", tint: "#0063B1" },
  { id: "network", name: "Network", blurb: "Understand where your data goes and get a steadier connection.", icon: "network", tint: "#038387" },
];

export const tweaks: Tweak[] = [
  // ───────────── Performance ─────────────
  {
    id: "task-manager-check",
    category: "performance",
    title: "Check what's actually using your PC",
    summary: "Before changing anything, see which apps are busy in Task Manager.",
    path: ["Task Manager", "Processes"],
    steps: [
      "Press Ctrl + Shift + Esc to open Task Manager.",
      "On Processes, select the CPU or Memory column to sort by usage.",
      "If one app is always near the top and you don't need it open, close it or remove it from startup.",
      "Open Startup apps in the left pane to see each app's Startup impact.",
    ],
    why: "Most slowdowns come from one or two specific apps, not from Windows itself. Knowing which ones tells you where the other tweaks will matter.",
    undo: "Nothing to undo. This is a read-only check.",
    impact: "High",
    minutes: 2,
    for: [],
    command: { label: "Run", value: "taskmgr" },
  },
  {
    id: "power-mode",
    category: "performance",
    title: "Set the power mode to Best performance",
    summary: "Let the processor ramp up faster when you're plugged in.",
    path: ["Settings", "System", "Power & battery", "Power mode"],
    steps: [
      "Open Settings and go to System › Power & battery.",
      "Under Power, find Power mode.",
      "Choose Best performance. On a laptop, set it for Plugged in and leave On battery as Balanced.",
    ],
    why: "Balanced mode is tuned to save energy. Best performance keeps clock speeds higher, which makes apps feel more responsive.",
    undo: "Set Power mode back to Balanced.",
    impact: "High",
    minutes: 1,
    for: ["desktop", "gaming"],
    deepLink: "ms-settings:powersleep",
    caution: "Laptops will run a little warmer and use more power while plugged in.",
  },
  {
    id: "restart-regularly",
    category: "performance",
    title: "Restart every few days instead of only shutting down",
    summary: "Shut down keeps part of the system in hibernation. Restart clears it fully.",
    path: ["Start", "Power", "Restart"],
    steps: [
      "Select Start, then the Power button.",
      "Choose Restart rather than Shut down, especially after installing updates or drivers.",
    ],
    why: "With Fast startup on, Shut down saves the system state to disk so it can boot quickly. Over days, that can carry along leaks and stuck drivers. A restart starts fresh.",
    undo: "Nothing to undo.",
    impact: "Medium",
    minutes: 1,
    for: [],
  },
  {
    id: "search-indexing",
    category: "performance",
    title: "Use Classic search indexing",
    summary: "Index your libraries and desktop instead of the whole PC.",
    path: ["Settings", "Privacy & security", "Searching Windows"],
    steps: [
      "Open Settings and go to Privacy & security › Searching Windows.",
      "Under Find my files, choose Classic.",
      "Optionally, select Customize search locations to add folders you search often.",
    ],
    why: "Enhanced indexing scans every drive in the background. Classic covers Documents, Pictures, Music and Desktop, which is where most people search, with far less disk activity.",
    undo: "Choose Enhanced under Find my files.",
    impact: "Medium",
    minutes: 1,
    for: ["laptop"],
    deepLink: "ms-settings:cortana-windowssearch",
  },

  // ───────────── Startup & apps ─────────────
  {
    id: "startup-apps",
    category: "startup",
    title: "Turn off apps you don't need at sign-in",
    summary: "Chat apps, launchers and updaters don't all need to start with Windows.",
    path: ["Settings", "Apps", "Startup"],
    steps: [
      "Open Settings and go to Apps › Startup.",
      "Sort by Startup impact.",
      "Turn off apps you can open yourself when needed, like game launchers, chat apps and cloud tools you rarely use.",
      "Leave on security software and anything for your audio, touchpad or graphics drivers.",
    ],
    why: "Every startup app competes for disk and CPU while you're trying to get going. Fewer of them means a faster sign-in and more free memory all day.",
    undo: "Turn the app's switch back on.",
    impact: "High",
    minutes: 3,
    for: [],
    deepLink: "ms-settings:startupapps",
  },
  {
    id: "uninstall-unused",
    category: "startup",
    title: "Uninstall apps you no longer use",
    summary: "Trial software and old utilities often run updaters in the background.",
    path: ["Settings", "Apps", "Installed apps"],
    steps: [
      "Open Settings and go to Apps › Installed apps.",
      "Use Sort by to sort by Install date or Size.",
      "Select ••• next to an app you don't use, then Uninstall.",
    ],
    why: "Unused apps take space and many install services, scheduled tasks or tray icons that run even when you never open them.",
    undo: "Reinstall the app from the Microsoft Store or its website.",
    impact: "Medium",
    minutes: 5,
    for: [],
    deepLink: "ms-settings:appsfeatures",
    caution: "If you're not sure what an app is, look it up before removing it. Drivers and runtimes (like Visual C++) are often needed by other apps.",
  },
  {
    id: "background-apps",
    category: "startup",
    title: "Stop specific apps from running in the background",
    summary: "Set background permission to Never for apps that don't need to notify you.",
    path: ["Settings", "Apps", "Installed apps", "Advanced options"],
    steps: [
      "Open Settings and go to Apps › Installed apps.",
      "Select ••• next to the app, then Advanced options.",
      "Under Background apps permissions, choose Never.",
    ],
    why: "Apps allowed to run in the background can sync and refresh while you're not using them, using power and memory.",
    undo: "Set Background apps permissions back to Power optimized.",
    impact: "Low",
    minutes: 3,
    for: ["laptop"],
    deepLink: "ms-settings:appsfeatures",
    caution: "This option appears only for some apps, mostly those from the Microsoft Store. Apps set to Never won't send notifications.",
  },
  {
    id: "edge-background",
    category: "startup",
    title: "Stop your browser running after you close it",
    summary: "Edge's Startup boost keeps it loaded in the background.",
    path: ["Microsoft Edge", "Settings", "System and performance"],
    steps: [
      "In Microsoft Edge, open Settings › System and performance.",
      "If Edge isn't your main browser, turn off Startup boost.",
      "Turn off Continue running background extensions and apps when Microsoft Edge is closed.",
      "Leave Efficiency mode on to reduce power use.",
    ],
    why: "Startup boost and background extensions keep browser processes in memory even when no windows are open.",
    undo: "Turn both options back on.",
    impact: "Low",
    minutes: 1,
    for: ["laptop"],
    command: { label: "Paste in Edge", value: "edge://settings/system" },
  },

  // ───────────── Visual effects ─────────────
  {
    id: "transparency-animation",
    category: "visuals",
    title: "Turn off transparency and animation effects",
    summary: "Solid surfaces and instant transitions are lighter on older graphics.",
    path: ["Settings", "Accessibility", "Visual effects"],
    steps: [
      "Open Settings and go to Accessibility › Visual effects.",
      "Turn off Transparency effects.",
      "Turn off Animation effects.",
    ],
    why: "Translucent materials and animations are drawn by the GPU. On integrated graphics or older PCs, turning them off makes windows and menus feel quicker.",
    undo: "Turn both switches back on.",
    impact: "Medium",
    minutes: 1,
    for: ["laptop"],
    deepLink: "ms-settings:easeofaccess-visualeffects",
    caution: "Windows will look flatter. On modern hardware the speed difference is small, so only do this if things feel sluggish.",
  },
  {
    id: "performance-options",
    category: "visuals",
    title: "Trim effects in Performance Options",
    summary: "Keep the useful effects, drop the fades and slides.",
    path: ["System Properties", "Advanced", "Performance", "Settings"],
    steps: [
      "Press Win + R, type SystemPropertiesPerformance and press Enter.",
      "Choose Custom.",
      "Clear Animate windows when minimizing and maximizing, Fade or slide menus into view, Fade or slide ToolTips into view, and Fade out menu items after clicking.",
      "Keep Show thumbnails instead of icons and Smooth edges of screen fonts selected, then select Apply.",
    ],
    why: "These classic effects add small delays to everyday actions. Removing them makes the desktop respond instantly, while keeping text sharp and previews useful.",
    undo: "Choose Let Windows choose what's best for my computer, then Apply.",
    impact: "Low",
    minutes: 2,
    for: [],
    command: { label: "Run", value: "SystemPropertiesPerformance" },
  },
  {
    id: "widgets",
    category: "visuals",
    title: "Hide Widgets from the taskbar",
    summary: "Stops the widgets board from loading news and weather in the background.",
    path: ["Settings", "Personalization", "Taskbar", "Taskbar items"],
    steps: [
      "Open Settings and go to Personalization › Taskbar.",
      "Under Taskbar items, turn off Widgets.",
    ],
    why: "The widgets board refreshes its feed in the background. If you never use it, hiding it saves a little memory and network.",
    undo: "Turn Widgets back on.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:taskbar",
  },

  // ───────────── Storage ─────────────
  {
    id: "storage-sense",
    category: "storage",
    title: "Turn on Storage Sense",
    summary: "Clear temporary files and the Recycle Bin automatically.",
    path: ["Settings", "System", "Storage", "Storage Sense"],
    steps: [
      "Open Settings and go to System › Storage › Storage Sense.",
      "Turn on Automatic User content cleanup.",
      "Set Run Storage Sense to Every month.",
      "Set Recycle Bin to 30 days and Downloads to Never, so nothing you saved is removed.",
    ],
    why: "Temporary files build up quietly. Storage Sense removes them on a schedule so you rarely have to think about space.",
    undo: "Turn off Automatic User content cleanup.",
    impact: "Medium",
    minutes: 2,
    for: [],
    deepLink: "ms-settings:storagepolicies",
  },
  {
    id: "temporary-files",
    category: "storage",
    title: "Remove temporary files now",
    summary: "A one-time clean of update leftovers, caches and thumbnails.",
    path: ["Settings", "System", "Storage", "Temporary files"],
    steps: [
      "Open Settings and go to System › Storage.",
      "Select Temporary files and wait for the scan.",
      "Review the list and clear Downloads if you want to keep those files.",
      "Select Remove files.",
    ],
    why: "Windows Update cleanup and old caches can take several gigabytes, especially after a feature update.",
    undo: "These files can't be restored, but Windows recreates caches as needed.",
    impact: "Medium",
    minutes: 3,
    for: [],
    deepLink: "ms-settings:storagesense",
    caution: "Downloads is listed here too. Make sure it's cleared before you select Remove files.",
  },
  {
    id: "cleanup-recommendations",
    category: "storage",
    title: "Review cleanup recommendations",
    summary: "Windows points out large files, unused apps and synced files you can free up.",
    path: ["Settings", "System", "Storage", "Cleanup recommendations"],
    steps: [
      "Open Settings and go to System › Storage.",
      "Select Cleanup recommendations.",
      "Expand each group and select only what you're sure you don't need.",
    ],
    why: "It's a quick, guided way to find the biggest wins without digging through folders yourself.",
    undo: "Deleted files go to the Recycle Bin, where you can restore them.",
    impact: "Low",
    minutes: 5,
    for: [],
    deepLink: "ms-settings:storagesense",
  },
  {
    id: "free-space",
    category: "storage",
    title: "Keep at least 15% of your system drive free",
    summary: "Windows needs room for updates, virtual memory and temporary files.",
    path: ["Settings", "System", "Storage"],
    steps: [
      "Open Settings and go to System › Storage to see how full drive C: is.",
      "If it's above about 85%, move large media to another drive or to the cloud.",
    ],
    why: "When the system drive is nearly full, updates fail, the page file can't grow and SSDs slow down because they have less room to manage writes.",
    undo: "Nothing to undo.",
    impact: "Medium",
    minutes: 5,
    for: [],
    deepLink: "ms-settings:storagesense",
  },
  {
    id: "optimize-drives",
    category: "storage",
    title: "Make sure drive optimization is scheduled",
    summary: "Windows trims SSDs and defragments hard drives on its own. Check that it's on.",
    path: ["Settings", "System", "Storage", "Advanced storage settings", "Drive optimization"],
    steps: [
      "Press Win + R, type dfrgui and press Enter.",
      "Under Scheduled optimization, check that it says On and runs Weekly.",
      "If it's off, select Change settings and turn on Run on a schedule.",
    ],
    why: "Windows picks the right action for each drive type: TRIM for SSDs, defragmentation for hard drives. It only works if the schedule is on.",
    undo: "Select Change settings and clear Run on a schedule.",
    impact: "Low",
    minutes: 1,
    for: [],
    command: { label: "Run", value: "dfrgui" },
  },

  // ───────────── Power & battery ─────────────
  {
    id: "energy-saver",
    category: "power",
    title: "Have Energy saver turn on automatically",
    summary: "Cut background activity and brightness when the battery gets low.",
    path: ["Settings", "System", "Power & battery", "Energy saver"],
    steps: [
      "Open Settings and go to System › Power & battery.",
      "Expand Energy saver (called Battery saver on older versions).",
      "Set Turn energy saver on automatically at to 20% or 30%.",
    ],
    why: "Energy saver limits background sync, notifications and some visual effects, which can add meaningful time when you need it most.",
    undo: "Set it to Never.",
    impact: "Medium",
    minutes: 1,
    for: ["laptop"],
    deepLink: "ms-settings:batterysaver",
  },
  {
    id: "screen-sleep",
    category: "power",
    title: "Shorten screen and sleep timeouts on battery",
    summary: "The display is usually the biggest power draw on a laptop.",
    path: ["Settings", "System", "Power & battery", "Screen, sleep & hibernate timeouts"],
    steps: [
      "Open Settings and go to System › Power & battery.",
      "Expand Screen, sleep & hibernate timeouts.",
      "On battery, set Turn my screen off after to 3–5 minutes and Make my device sleep after to 10–15 minutes.",
    ],
    why: "A screen left on while you step away can use more power than everything else combined.",
    undo: "Choose longer times, or Never.",
    impact: "Medium",
    minutes: 1,
    for: ["laptop"],
    deepLink: "ms-settings:powersleep",
  },
  {
    id: "battery-usage",
    category: "power",
    title: "See which apps drain your battery",
    summary: "Battery usage shows per-app energy use over the last day or week.",
    path: ["Settings", "System", "Power & battery", "Battery usage"],
    steps: [
      "Open Settings and go to System › Power & battery.",
      "Expand Battery usage and switch to Last 7 days.",
      "Sort by Background. Apps with high background use are good candidates to restrict.",
    ],
    why: "It tells you which single change will help most, instead of guessing.",
    undo: "Nothing to undo. This is a read-only check.",
    impact: "Medium",
    minutes: 2,
    for: ["laptop"],
    deepLink: "ms-settings:batterysaver-usagedetails",
  },
  {
    id: "dynamic-refresh",
    category: "power",
    title: "Use a dynamic refresh rate on laptops",
    summary: "Run smooth when scrolling, then drop to 60 Hz when the screen is still.",
    path: ["Settings", "System", "Display", "Advanced display"],
    steps: [
      "Open Settings and go to System › Display › Advanced display.",
      "Under Choose a refresh rate, pick the option that starts with Dynamic, if your laptop offers it.",
    ],
    why: "High refresh rates feel great but cost battery. Dynamic gives you the smoothness only when something is moving.",
    undo: "Pick a fixed refresh rate again.",
    impact: "Low",
    minutes: 1,
    for: ["laptop"],
    deepLink: "ms-settings:display-advanced",
    caution: "Only shown on displays that support it.",
  },

  // ───────────── Gaming ─────────────
  {
    id: "refresh-rate",
    category: "gaming",
    title: "Run your monitor at its full refresh rate",
    summary: "Many high-refresh monitors are left at 60 Hz out of the box.",
    path: ["Settings", "System", "Display", "Advanced display"],
    steps: [
      "Open Settings and go to System › Display › Advanced display.",
      "If you have more than one display, pick the right one at the top.",
      "Under Choose a refresh rate, select the highest value listed.",
    ],
    why: "If your monitor supports 120 Hz or more, this is the single most noticeable change for games and even everyday scrolling.",
    undo: "Choose 60 Hz again.",
    impact: "High",
    minutes: 1,
    for: ["gaming", "desktop"],
    deepLink: "ms-settings:display-advanced",
    caution: "Use a DisplayPort or recent HDMI cable. Older cables may limit the options shown.",
  },
  {
    id: "game-mode",
    category: "gaming",
    title: "Make sure Game Mode is on",
    summary: "Windows prioritises the game and holds off on driver installs while you play.",
    path: ["Settings", "Gaming", "Game Mode"],
    steps: [
      "Open Settings and go to Gaming › Game Mode.",
      "Turn on Game Mode.",
    ],
    why: "Game Mode prevents Windows Update from installing drivers or showing restart prompts mid-game, and gives the game more system resources.",
    undo: "Turn Game Mode off.",
    impact: "Low",
    minutes: 1,
    for: ["gaming"],
    deepLink: "ms-settings:gaming-gamemode",
  },
  {
    id: "background-recording",
    category: "gaming",
    title: "Turn off background recording",
    summary: "\"Record what happened\" keeps capturing gameplay in case you want a clip.",
    path: ["Settings", "Gaming", "Captures"],
    steps: [
      "Open Settings and go to Gaming › Captures.",
      "Turn off Record what happened.",
    ],
    why: "Continuous capture uses the GPU's video encoder and writes to disk. If you don't save clips, it's overhead you don't need.",
    undo: "Turn Record what happened back on.",
    impact: "Medium",
    minutes: 1,
    for: ["gaming"],
    deepLink: "ms-settings:gaming-gamedvr",
  },
  {
    id: "gpu-preference",
    category: "gaming",
    title: "Send games to your dedicated graphics",
    summary: "On laptops with two GPUs, make sure games use the powerful one.",
    path: ["Settings", "System", "Display", "Graphics"],
    steps: [
      "Open Settings and go to System › Display › Graphics.",
      "Find your game in the list, or select Add desktop app to add it.",
      "Select the game, then Options, and choose High performance.",
    ],
    why: "Windows sometimes runs games on the power-saving integrated GPU. Setting a preference makes sure they get the dedicated one.",
    undo: "Set the app back to Let Windows decide.",
    impact: "High",
    minutes: 2,
    for: ["gaming", "laptop"],
    deepLink: "ms-settings:display-advancedgraphics",
  },
  {
    id: "gpu-scheduling",
    category: "gaming",
    title: "Turn on hardware-accelerated GPU scheduling",
    summary: "Lets the graphics card manage its own memory and work queue.",
    path: ["Settings", "System", "Display", "Graphics", "Advanced graphics settings"],
    steps: [
      "Open Settings and go to System › Display › Graphics.",
      "Select Advanced graphics settings (Change default graphics settings on older versions).",
      "Turn on Hardware-accelerated GPU scheduling, then restart your PC.",
    ],
    why: "It can reduce latency slightly and is required for some features, like DLSS Frame Generation.",
    undo: "Turn it off and restart.",
    impact: "Low",
    minutes: 2,
    for: ["gaming"],
    deepLink: "ms-settings:display-advancedgraphics",
    caution: "Only appears with supported graphics cards and drivers. If a game misbehaves after turning it on, turn it back off.",
  },
  {
    id: "windowed-optimizations",
    category: "gaming",
    title: "Turn on optimizations for windowed games",
    summary: "Gives borderless and windowed games lower latency, closer to full screen.",
    path: ["Settings", "System", "Display", "Graphics", "Advanced graphics settings"],
    steps: [
      "Open Settings and go to System › Display › Graphics.",
      "Select Advanced graphics settings.",
      "Turn on Optimizations for windowed games.",
    ],
    why: "Older DirectX 10 and 11 games run in windowed mode with extra latency. This switches them to a more modern presentation model.",
    undo: "Turn it off.",
    impact: "Low",
    minutes: 1,
    for: ["gaming"],
    deepLink: "ms-settings:display-advancedgraphics",
  },
  {
    id: "pointer-precision",
    category: "gaming",
    title: "Turn off Enhance pointer precision",
    summary: "Removes mouse acceleration so aim is consistent.",
    path: ["Settings", "Bluetooth & devices", "Mouse"],
    steps: [
      "Open Settings and go to Bluetooth & devices › Mouse.",
      "Turn off Enhance pointer precision. On older versions, it's under Additional mouse settings › Pointer Options.",
    ],
    why: "With acceleration, the same hand movement moves the cursor different distances depending on speed. Turning it off makes movement predictable.",
    undo: "Turn Enhance pointer precision back on.",
    impact: "Low",
    minutes: 1,
    for: ["gaming"],
    deepLink: "ms-settings:mousetouchpad",
    caution: "You may need to raise the pointer speed slightly afterwards.",
  },

  // ───────────── Privacy ─────────────
  {
    id: "privacy-general",
    category: "privacy",
    title: "Turn off ad personalization and suggestions",
    summary: "Four switches that limit ad tracking and suggested content.",
    path: ["Settings", "Privacy & security", "General"],
    steps: [
      "Open Settings and go to Privacy & security › General.",
      "Turn off Let apps show me personalized ads by using my advertising ID.",
      "Turn off Let websites show me locally relevant content by accessing my language list.",
      "Turn off Show me suggested content in the Settings app.",
    ],
    why: "These settings share an advertising identifier with apps and surface promoted content. Turning them off doesn't affect how anything works.",
    undo: "Turn the switches back on.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:privacy-general",
  },
  {
    id: "diagnostics",
    category: "privacy",
    title: "Send only required diagnostic data",
    summary: "Limit what's sent to Microsoft to the basics needed for security and updates.",
    path: ["Settings", "Privacy & security", "Diagnostics & feedback"],
    steps: [
      "Open Settings and go to Privacy & security › Diagnostics & feedback.",
      "Expand Diagnostic data and turn off Send optional diagnostic data.",
      "Expand Tailored experiences and turn it off.",
      "Set Feedback frequency to Never.",
    ],
    why: "Optional data includes details about how you use apps and websites. Required data is enough to keep Windows secure and up to date.",
    undo: "Turn the switches back on and choose a feedback frequency.",
    impact: "Low",
    minutes: 2,
    for: [],
    deepLink: "ms-settings:privacy-feedback",
    caution: "Windows Insider builds require optional diagnostic data.",
  },
  {
    id: "activity-history",
    category: "privacy",
    title: "Stop storing activity history",
    summary: "Windows won't keep a log of apps and files you've used on this device.",
    path: ["Settings", "Privacy & security", "Activity history"],
    steps: [
      "Open Settings and go to Privacy & security › Activity history.",
      "Turn off Store my activity history on this device.",
      "Select Clear history to remove what's already stored.",
    ],
    why: "If you don't use features that resume past activity, there's no need to keep a record of it.",
    undo: "Turn the switch back on.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:privacy-activityhistory",
  },
  {
    id: "search-permissions",
    category: "privacy",
    title: "Tidy up search permissions",
    summary: "Keep search local and turn off highlights in the search box.",
    path: ["Settings", "Privacy & security", "Search permissions"],
    steps: [
      "Open Settings and go to Privacy & security › Search permissions.",
      "Under History, turn off Search history on this device if you don't want it.",
      "Under More settings, turn off Show search highlights.",
    ],
    why: "Search highlights load trending content into the search pane. Turning it off makes search simpler and faster to open.",
    undo: "Turn the switches back on.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:search-permissions",
  },
  {
    id: "app-permissions",
    category: "privacy",
    title: "Review which apps can use location, camera and mic",
    summary: "Turn off access for apps that don't need it.",
    path: ["Settings", "Privacy & security", "App permissions"],
    steps: [
      "Open Settings and go to Privacy & security.",
      "Under App permissions, open Location, Camera and Microphone in turn.",
      "Turn off access for any app that has no reason to use it.",
    ],
    why: "Each permission is a background capability. Fewer apps with access means less to worry about and slightly less background work.",
    undo: "Turn access back on for the app.",
    impact: "Low",
    minutes: 3,
    for: [],
    deepLink: "ms-settings:privacy",
  },

  // ───────────── Notifications & tips ─────────────
  {
    id: "windows-tips",
    category: "notifications",
    title: "Turn off Windows tips and setup suggestions",
    summary: "Stop the \"finish setting up\" and welcome screens from coming back.",
    path: ["Settings", "System", "Notifications", "Additional settings"],
    steps: [
      "Open Settings and go to System › Notifications.",
      "Scroll down and expand Additional settings.",
      "Clear Show the Windows welcome experience after updates, Suggest ways to finish setting up my device, and Get tips and suggestions when using Windows.",
    ],
    why: "These prompts interrupt you and promote services. Turning them off doesn't affect any feature.",
    undo: "Select the boxes again.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:notifications",
  },
  {
    id: "start-recommendations",
    category: "notifications",
    title: "Remove tips and promotions from Start",
    summary: "Keep Start focused on your apps and files.",
    path: ["Settings", "Personalization", "Start"],
    steps: [
      "Open Settings and go to Personalization › Start.",
      "Turn off Show recommendations for tips, shortcuts, new apps, and more.",
      "Optionally, turn off Show account-related notifications.",
    ],
    why: "Start then shows only what you put there, which makes it quicker to scan.",
    undo: "Turn the switches back on.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:personalization-start",
  },
  {
    id: "app-notifications",
    category: "notifications",
    title: "Turn off notifications from noisy apps",
    summary: "Keep the alerts you care about. Mute the rest.",
    path: ["Settings", "System", "Notifications"],
    steps: [
      "Open Settings and go to System › Notifications.",
      "Under Notifications from apps and other senders, sort by Most recent.",
      "Turn off apps that notify you about things you don't need to know right away.",
    ],
    why: "Fewer interruptions, and some apps stop waking up just to send alerts.",
    undo: "Turn the app's switch back on.",
    impact: "Low",
    minutes: 3,
    for: [],
    deepLink: "ms-settings:notifications",
  },
  {
    id: "do-not-disturb-rules",
    category: "notifications",
    title: "Let Do not disturb turn on by itself",
    summary: "Silence notifications automatically while you game, present or use full screen.",
    path: ["Settings", "System", "Notifications", "Turn on do not disturb automatically"],
    steps: [
      "Open Settings and go to System › Notifications.",
      "Expand Turn on do not disturb automatically.",
      "Select When playing a game, When using an app in full-screen mode and When duplicating your display.",
    ],
    why: "You won't get pop-ups during a match or a presentation, and they'll be waiting in Notification Center afterwards.",
    undo: "Clear the boxes.",
    impact: "Low",
    minutes: 1,
    for: ["gaming"],
    deepLink: "ms-settings:notifications",
  },
  {
    id: "lock-screen-tips",
    category: "notifications",
    title: "Turn off fun facts on the lock screen",
    summary: "Show only your picture and the time.",
    path: ["Settings", "Personalization", "Lock screen"],
    steps: [
      "Open Settings and go to Personalization › Lock screen.",
      "If Personalize your lock screen is set to Picture or Slideshow, clear Get fun facts, tips, tricks, and more on your lock screen.",
      "Optionally, set Lock screen status to None.",
    ],
    why: "A cleaner lock screen that doesn't fetch extra content.",
    undo: "Select the box again.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:lockscreen",
  },

  // ───────────── Windows Update ─────────────
  {
    id: "stay-updated",
    category: "updates",
    title: "Install pending updates and restart",
    summary: "Updates include performance fixes, not just security patches.",
    path: ["Settings", "Windows Update"],
    steps: [
      "Open Settings and go to Windows Update.",
      "Select Check for updates and install anything available.",
      "If it says a restart is required, restart when convenient.",
    ],
    why: "A PC waiting on a restart can run half-updated services. Staying current also fixes known slowdowns.",
    undo: "Recent updates can be removed from Update history › Uninstall updates.",
    impact: "High",
    minutes: 10,
    for: [],
    deepLink: "ms-settings:windowsupdate",
  },
  {
    id: "active-hours",
    category: "updates",
    title: "Set active hours",
    summary: "Windows won't restart for updates during the hours you use your PC.",
    path: ["Settings", "Windows Update", "Advanced options", "Active hours"],
    steps: [
      "Open Settings and go to Windows Update › Advanced options.",
      "Expand Active hours and set Adjust active hours to Automatically, or choose your hours manually.",
    ],
    why: "Updates still install on time, but never interrupt you mid-task.",
    undo: "Set it back to Automatically.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:windowsupdate-activehours",
  },
  {
    id: "delivery-optimization",
    category: "updates",
    title: "Stop sharing updates with other PCs on the internet",
    summary: "Keep your upload bandwidth for yourself.",
    path: ["Settings", "Windows Update", "Advanced options", "Delivery Optimization"],
    steps: [
      "Open Settings and go to Windows Update › Advanced options › Delivery Optimization.",
      "Either turn off Allow downloads from other devices, or keep it on and choose Devices on my local network.",
    ],
    why: "By default, your PC may upload update files to other PCs. On slow or capped connections, that can affect calls and games.",
    undo: "Turn the switch back on.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:delivery-optimization",
  },
  {
    id: "drivers",
    category: "updates",
    title: "Get current graphics and chipset drivers",
    summary: "Use Optional updates, or your PC or GPU maker's app.",
    path: ["Settings", "Windows Update", "Advanced options", "Optional updates"],
    steps: [
      "Open Settings and go to Windows Update › Advanced options › Optional updates.",
      "Expand Driver updates and install any for your graphics, chipset or Wi-Fi.",
      "For gaming, get graphics drivers directly from NVIDIA, AMD or Intel.",
    ],
    why: "Graphics and chipset drivers often include performance and power fixes that Windows Update doesn't install automatically.",
    undo: "In Device Manager, open the device's Properties › Driver and select Roll Back Driver.",
    impact: "Medium",
    minutes: 10,
    for: ["gaming", "desktop"],
    deepLink: "ms-settings:windowsupdate-optionalupdates",
    caution: "If everything works well, there's no need to install every optional driver. Focus on graphics.",
  },
  {
    id: "store-updates",
    category: "updates",
    title: "Update your Microsoft Store apps",
    summary: "Built-in apps like Photos and Terminal update through the Store.",
    path: ["Microsoft Store", "Downloads"],
    steps: [
      "Open Microsoft Store and select Downloads in the lower-left corner.",
      "Select Get updates.",
    ],
    why: "Inbox apps get performance fixes through the Store, separately from Windows Update.",
    undo: "Nothing to undo.",
    impact: "Low",
    minutes: 3,
    for: [],
    deepLink: "ms-windows-store://downloadsandupdates",
  },

  // ───────────── Network ─────────────
  {
    id: "data-usage",
    category: "network",
    title: "See which apps use your network",
    summary: "Data usage lists every app's traffic for the last 30 days.",
    path: ["Settings", "Network & internet", "Advanced network settings", "Data usage"],
    steps: [
      "Open Settings and go to Network & internet › Advanced network settings › Data usage.",
      "Choose your Wi‑Fi or Ethernet connection at the top.",
      "Look for apps you didn't expect to see near the top of the list.",
    ],
    why: "Unexpected heavy users are often sync clients or updaters you can pause or remove.",
    undo: "Nothing to undo. This is a read-only check.",
    impact: "Low",
    minutes: 2,
    for: [],
    deepLink: "ms-settings:datausage",
  },
  {
    id: "metered-connection",
    category: "network",
    title: "Mark hotspots as metered connections",
    summary: "Pause big background downloads on phone hotspots and capped plans.",
    path: ["Settings", "Network & internet", "Wi‑Fi", "Properties"],
    steps: [
      "Connect to the hotspot, then open Settings › Network & internet › Wi‑Fi.",
      "Select the network's properties.",
      "Turn on Metered connection.",
    ],
    why: "Windows Update and some apps hold off on large downloads over metered connections, saving data and keeping the connection responsive.",
    undo: "Turn Metered connection off.",
    impact: "Low",
    minutes: 1,
    for: ["laptop"],
    deepLink: "ms-settings:network-wifi",
  },
  {
    id: "dns",
    category: "network",
    title: "Use a fast, encrypted DNS server",
    summary: "Optional: a public DNS can look up sites faster than some ISP servers.",
    path: ["Settings", "Network & internet", "Wi‑Fi or Ethernet", "Hardware properties"],
    steps: [
      "Open Settings › Network & internet, then select Wi‑Fi or Ethernet and your connection's Hardware properties.",
      "Next to DNS server assignment, select Edit and choose Manual.",
      "Turn on IPv4 and enter a preferred DNS server, such as 1.1.1.1 or 8.8.8.8.",
      "Set DNS over HTTPS to On (automatic template), then Save.",
    ],
    why: "DNS turns website names into addresses. A faster server shortens the first moment of every page load, and encryption keeps lookups private.",
    undo: "Set DNS server assignment back to Automatic (DHCP).",
    impact: "Low",
    minutes: 3,
    for: [],
    deepLink: "ms-settings:network-status",
    caution: "Don't change DNS on work or school devices. Their networks may depend on internal DNS.",
  },
  {
    id: "wired-or-5ghz",
    category: "network",
    title: "Use Ethernet or 5 GHz Wi‑Fi for games and calls",
    summary: "A steadier connection matters more than a faster one.",
    path: ["Settings", "Network & internet", "Wi‑Fi", "Properties"],
    steps: [
      "If your PC is near the router, use an Ethernet cable.",
      "Otherwise, open your Wi‑Fi network's properties and check Network band. Prefer 5 GHz or 6 GHz over 2.4 GHz.",
    ],
    why: "Wired and higher-band connections have less interference, which means fewer lag spikes and dropped calls.",
    undo: "Nothing to undo.",
    impact: "Medium",
    minutes: 2,
    for: ["gaming", "desktop"],
    deepLink: "ms-settings:network-wifi",
  },
];

export interface Avoid {
  title: string;
  claim: string;
  reality: string;
}

/** Things we deliberately don't recommend. */
export const avoidList: Avoid[] = [
  {
    title: "Registry cleaners and \"PC booster\" apps",
    claim: "They clean up thousands of errors and speed up your PC.",
    reality: "Leftover registry entries don't slow Windows down. These tools can delete entries that apps still need, and many bundle adware.",
  },
  {
    title: "Turning off Windows Security",
    claim: "Antivirus uses resources, so turning it off makes games faster.",
    reality: "Microsoft Defender has very little impact during normal use and pauses heavy scans while you're busy. The risk is far greater than any gain.",
  },
  {
    title: "Disabling Windows Update",
    claim: "Updates slow you down and break things.",
    reality: "Updates fix security holes and performance bugs. Use active hours and pause updates for a few weeks instead of turning them off.",
  },
  {
    title: "\"Debloat\" scripts from the internet",
    claim: "One script removes everything you don't need.",
    reality: "They often disable services other features depend on, and changes are hard to undo. Uninstalling apps you don't want from Settings is safer.",
  },
  {
    title: "Disabling the page file",
    claim: "With enough RAM, virtual memory just slows things down.",
    reality: "Some apps require a page file and will crash without it. Windows manages its size well on its own.",
  },
  {
    title: "Memory \"cleaners\" and RAM boosters",
    claim: "Freeing up RAM makes your PC faster.",
    reality: "Windows uses spare memory to cache apps so they open quicker. Forcing it free just makes things load from disk again.",
  },
  {
    title: "Clearing the Prefetch folder",
    claim: "Old prefetch data slows down app launches.",
    reality: "Prefetch exists to make apps launch faster. Clearing it makes the next launches slower until Windows rebuilds it.",
  },
  {
    title: "Turning off services in bulk",
    claim: "Dozens of services are running that you don't need.",
    reality: "Most services start only when needed and use almost nothing while idle. Disabling the wrong one can break printing, sound or sign-in.",
  },
];

export const principles = [
  { title: "Built-in settings only", text: "Everything here is a switch already in Windows. No scripts, downloads or registry edits." },
  { title: "Easy to undo", text: "Every tweak tells you exactly how to switch it back." },
  { title: "Do what matters for you", text: "Pick laptop, desktop or gaming and we'll highlight the tweaks that help most." },
];

export const profiles: { id: Profile | "all"; label: string }[] = [
  { id: "all", label: "Everyone" },
  { id: "laptop", label: "Laptop" },
  { id: "desktop", label: "Desktop" },
  { id: "gaming", label: "Gaming" },
];

export function getCategory(id: string) {
  return categories.find((c) => c.id === id);
}

export function tweaksFor(category: CategoryId) {
  return tweaks.filter((t) => t.category === category);
}

export function matchesProfile(t: Tweak, p: Profile | "all") {
  return p === "all" || t.for.length === 0 || t.for.includes(p);
}

const impactRank: Record<Impact, number> = { High: 0, Medium: 1, Low: 2 };
export function byImpact(a: Tweak, b: Tweak) {
  return impactRank[a.impact] - impactRank[b.impact];
}
