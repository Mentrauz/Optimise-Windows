// All optimisation content lives here. Every tweak is a built-in Windows 11
// setting that can be switched back. No scripts, no registry edits, no third-party tools.

export type Profile = "laptop" | "desktop" | "gaming";
export type Impact = "High" | "Medium" | "Low";

export type CategoryId =
  | "performance"
  | "startup"
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
  icon: CategoryId | "home" | "avoid" | "tools" | "download" | "features";
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
      "On PCs with an NPU, right-click a column heading and add NPU to see AI workloads too.",
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
    path: ["Settings", "Privacy & security", "Search"],
    steps: [
      "Open Settings and go to Privacy & security › Search (called Searching Windows on older versions).",
      "Under Find my files, choose Classic.",
      "Leave Automatically find additional relevant locations on. It indexes only the folders you use most, so search still finds your files.",
      "Optionally, select Customize search locations to add folders you search often.",
    ],
    why: "Enhanced indexing scans every drive in the background. Classic covers Documents, Pictures, Music and Desktop, which is where most people search, with far less disk activity.",
    undo: "Choose Enhanced under Find my files.",
    impact: "Medium",
    minutes: 1,
    for: ["laptop"],
    deepLink: "ms-settings:cortana-windowssearch",
  },

  {
    id: "end-task",
    category: "performance",
    title: "Add End task to the taskbar",
    summary: "Close a frozen app from its taskbar button without opening Task Manager.",
    path: ["Settings", "System", "Advanced"],
    steps: [
      "Open Settings and go to System › Advanced (called For developers on older versions).",
      "Turn on End task.",
      "When an app freezes, right-click its taskbar button and select End task.",
    ],
    why: "A frozen app can keep using CPU and memory. End task closes it immediately, the same as ending it in Task Manager.",
    undo: "Turn End task off.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:developers",
    caution: "Anything unsaved in the app is lost, so only use it when the app has stopped responding.",
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
    summary: "Three switches that limit ad tracking and suggested content.",
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
    title: "Keep search on your PC",
    summary: "Turn off web results, Store suggestions and highlights in the search box.",
    path: ["Settings", "Privacy & security", "Search"],
    steps: [
      "Open Settings and go to Privacy & security › Search (called Search permissions on older versions).",
      "Under Show suggested search results, turn off web results and Microsoft Store suggestions. If you don't see this section yet, it's still rolling out to your PC.",
      "Under History, turn off Search history on this device if you don't want it.",
      "Under More settings, turn off Show search highlights.",
    ],
    why: "With web results on, what you type is sent to Bing. Turning web results, Store suggestions and highlights off keeps search on your own apps, settings and files, and makes it simpler and faster to open.",
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
    path: ["Settings", "Personalization", "Start", "Recent"],
    steps: [
      "Open Settings and go to Personalization › Start.",
      "To keep recent files but drop the promotions, expand Recent and clear Show recommendations and promotional content.",
      "Or turn off Recent to hide the whole section. Recent was called Recommended in older versions.",
      "On older versions, turn off Show recommendations for tips, shortcuts, new apps, and more instead.",
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
      "Expand Driver updates and install any for your graphics, chipset or Wi-Fi. On newer versions, optional drivers may show under Available updates on the main Windows Update page instead.",
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

/** UI personalisation options added in 25H2/26H2. Same shape as a tweak, without a category. */
export type FeatureGroup = "Start menu" | "Taskbar" | "Search & menus" | "Visual effects" | "Comfort & accessibility" | "Gaming";
export type FeatureChange = Omit<Tweak, "category"> & { group: FeatureGroup };

/** Display order of the groups on the Optional feature changes page. */
export const featureGroups: { name: FeatureGroup; blurb: string }[] = [
  { name: "Start menu", blurb: "Make Start smaller and show only what you use." },
  { name: "Taskbar", blurb: "Move it, shrink it and drop what you don't use." },
  { name: "Search & menus", blurb: "Keep search local and trim the right-click menu." },
  { name: "Visual effects", blurb: "Trade a little polish for snappier windows on older hardware." },
  { name: "Comfort & accessibility", blurb: "Easier on the eyes for long sessions." },
  { name: "Gaming", blurb: "A cleaner, console-style way to play." },
];

export const featureChanges: FeatureChange[] = [
  {
    id: "start-size",
    group: "Start menu",
    title: "Make the Start menu smaller",
    summary: "Pick a compact Start menu instead of one that fills a third of the screen.",
    path: ["Settings", "Personalization", "Start", "Start menu size"],
    steps: [
      "Open Settings and go to Personalization › Start.",
      "Set Start menu size to Small. Choose Large if you'd rather see more apps at once, or Automatic to let Windows decide for your screen.",
    ],
    why: "The redesigned Start menu adapts to your screen size, which can make it very tall on a big monitor. Small keeps it compact and out of the way.",
    undo: "Set Start menu size back to Automatic.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:personalization-start",
    caution: "Rolling out gradually through 2026 updates, so this may not be on your PC yet.",
  },
  {
    id: "start-sections",
    group: "Start menu",
    title: "Show only the Start sections you use",
    summary: "Turn Pinned, Recent and All on or off independently, and pick how apps are listed.",
    path: ["Settings", "Personalization", "Start"],
    steps: [
      "Open Settings and go to Personalization › Start.",
      "Turn off any of Pinned, Recent or All that you never use. Recent was called Recommended on older versions.",
      "In the Start menu, open All and choose Category or Grid view if the long alphabetical list is hard to scan.",
    ],
    why: "Each section you hide leaves more room for the ones you use. Hiding Recent also stops Start from showing your recent files and apps.",
    undo: "Turn the section back on.",
    impact: "Low",
    minutes: 2,
    for: [],
    deepLink: "ms-settings:personalization-start",
    caution: "Rolling out gradually through 2026 updates. If you don't see these switches yet, install pending updates and check again later.",
  },
  {
    id: "start-hide-name",
    group: "Start menu",
    title: "Hide your name and picture in Start",
    summary: "Useful when you share your screen or use a shared PC.",
    path: ["Settings", "Personalization", "Start"],
    steps: [
      "Open Settings and go to Personalization › Start.",
      "Turn on the option to hide your name and profile picture. Its wording varies by build, so look for a switch that mentions your name or profile picture.",
    ],
    why: "Your account name and picture are shown at the bottom of Start. Hiding them keeps your identity off screen recordings and shared screens.",
    undo: "Turn the option off.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:personalization-start",
    caution: "Sources describe this option differently, and it may not have reached every PC yet.",
  },
  {
    id: "taskbar-position",
    group: "Taskbar",
    title: "Move the taskbar to the top, left or right",
    summary: "Windows 11 can finally put the taskbar somewhere other than the bottom again.",
    path: ["Settings", "Personalization", "Taskbar", "Taskbar behaviors", "Taskbar position"],
    steps: [
      "Open Settings and go to Personalization › Taskbar.",
      "Expand Taskbar behaviors.",
      "Set Taskbar position to Bottom, Top, Left or Right. The change applies straight away.",
      "Use the alignment option next to it to place icons at the start or centre of the bar.",
    ],
    why: "A side taskbar saves vertical space on widescreen monitors and laptops, and a top taskbar suits people who prefer menus at the top of the screen.",
    undo: "Set Taskbar position back to Bottom.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:taskbar",
    caution: "You can't drag the taskbar to another edge. Change it in Settings. It arrived with the September 2026 update, so install pending updates if you don't see it.",
  },
  {
    id: "taskbar-size",
    group: "Taskbar",
    title: "Use a smaller taskbar",
    summary: "Shrinks both the icons and the height of the taskbar.",
    path: ["Settings", "Personalization", "Taskbar", "Taskbar behaviors", "Taskbar size"],
    steps: [
      "Open Settings and go to Personalization › Taskbar.",
      "Expand Taskbar behaviors.",
      "Set Taskbar size to Small.",
    ],
    why: "More room for your apps, especially on small laptop screens. Start, Search and the system tray stay available.",
    undo: "Set Taskbar size back to the default.",
    impact: "Low",
    minutes: 1,
    for: ["laptop"],
    deepLink: "ms-settings:taskbar",
    caution: "The smaller size only applies when the taskbar is at the top or bottom, not on the sides.",
  },
  {
    id: "search-web-results",
    group: "Search & menus",
    title: "Turn off web results and Store suggestions in search",
    summary: "Make Windows search show only your apps, settings and files.",
    path: ["Settings", "Privacy & security", "Search", "Show suggested search results"],
    steps: [
      "Open Settings and go to Privacy & security › Search.",
      "Under Show suggested search results, turn off web results.",
      "Turn off Microsoft Store suggestions too.",
      "Under More settings, turn off Show search highlights.",
    ],
    why: "With both off, search is limited to items on your PC, results are cleaner, and what you type is no longer sent to Bing for web results.",
    undo: "Turn the switches back on.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:search-permissions",
    caution: "Rolling out gradually. If your organisation sets this by Group Policy or Intune, the policy overrides these switches.",
  },
  {
    id: "context-menu",
    group: "Search & menus",
    title: "Clean up the right-click menu",
    summary: "Hide the commands and app entries you never use in File Explorer's context menu.",
    path: ["Settings", "Personalization", "Context menu"],
    steps: [
      "Right-click any file or folder and choose Customize menu at the bottom, or open Settings › Personalization › Context menu.",
      "Under File actions, turn off built-in commands you don't use, such as Send to or Create shortcut.",
      "Under App actions, turn off entries added by apps, or move them into a submenu so they don't crowd the main menu.",
      "Optionally, show Cut, Copy, Paste, Rename, Delete and Share as text instead of icons, and move Properties to the bottom.",
    ],
    why: "Every app that adds an entry makes the menu do extra work when it opens. A shorter menu opens faster and is easier to scan.",
    undo: "Turn the entries back on in the same page.",
    impact: "Low",
    minutes: 3,
    for: [],
    caution: "Still rolling out and may not be on your PC yet. Turning an entry off only hides it. The app stays installed. Don't hide commands you use every day.",
  },
  {
    id: "run-dialog",
    group: "Search & menus",
    title: "Try the modern Run dialog",
    summary: "A Windows 11-style Run box that matches the rest of the system.",
    path: ["Settings", "System", "Advanced", "Run dialog"],
    steps: [
      "Open Settings and go to System › Advanced.",
      "Turn on Run dialog.",
      "Press Win + R to try it.",
    ],
    why: "It's a cosmetic upgrade, so Run looks and behaves like the rest of Windows 11, including dark mode.",
    undo: "Turn Run dialog off.",
    impact: "Low",
    minutes: 1,
    for: [],
    deepLink: "ms-settings:developers",
    caution: "Reported by a single source and may be limited to some builds. Skip it if you don't see the switch.",
  },
  {
    id: "xbox-mode",
    group: "Gaming",
    title: "Try Xbox mode for a console-style full-screen experience",
    summary: "A controller-friendly home screen that replaces the desktop while you play.",
    path: ["Settings", "Gaming", "Xbox mode"],
    steps: [
      "Open Settings and go to Gaming › Xbox mode.",
      "Turn on Enable Xbox mode.",
      "Optionally, turn on Enter Xbox mode on startup, or Show Xbox mode in Task View.",
      "Press Win + F11 to switch between Xbox mode and the normal desktop.",
    ],
    why: "Xbox mode hides the desktop clutter and opens games from one clean screen, which suits a PC connected to a TV or used with a controller.",
    undo: "Turn Enable Xbox mode off, or press Win + F11 to return to the desktop.",
    impact: "Low",
    minutes: 2,
    for: ["gaming"],
    caution: "Needs Windows 11 24H2 or later and is only available in supported markets. It's a gradual rollout, so update Windows and the Xbox app from the Microsoft Store if you don't see it. This is separate from Game Mode.",
  },
  {
    id: "screen-tint",
    group: "Comfort & accessibility",
    title: "Tint the screen to reduce eye strain",
    summary: "A built-in colour overlay that softens bright whites. No extra app needed.",
    path: ["Settings", "Accessibility", "Screen Tint"],
    steps: [
      "Open Settings and go to Accessibility › Screen Tint.",
      "Turn on Screen Tint and choose one of the presets, or make a custom tint.",
      "Drag the strength slider until the screen feels comfortable.",
    ],
    why: "A warm tint takes the harshness off bright white pages, which can make long sessions or late-night use easier on the eyes.",
    undo: "Turn Screen Tint off.",
    impact: "Low",
    minutes: 1,
    for: [],
    caution: "Screen Tint can't be used at the same time as Color filters. Turn Color filters off first if you use them.",
  },
  {
    id: "magnifier-zoom",
    group: "Comfort & accessibility",
    title: "Set Magnifier's zoom the way you like it",
    summary: "Type an exact zoom level, change the zoom steps, and keep a separate zoom per monitor.",
    path: ["Settings", "Accessibility", "Magnifier"],
    steps: [
      "Open Settings and go to Accessibility › Magnifier.",
      "Turn on Magnifier, or press Win + Plus.",
      "In the Magnifier window, enter a specific zoom percentage and adjust the zoom increment.",
      "With more than one monitor in Extend mode, each display keeps its own zoom level.",
    ],
    why: "Small text is easier to read when you can zoom to an exact level instead of stepping through preset sizes.",
    undo: "Turn Magnifier off, or press Win + Esc.",
    impact: "Low",
    minutes: 2,
    for: [],
    deepLink: "ms-settings:easeofaccess-magnifier",
  },
  {
    id: "transparency-animation",
    group: "Visual effects",
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
    impact: "Low",
    minutes: 1,
    for: ["laptop"],
    deepLink: "ms-settings:easeofaccess-visualeffects",
    caution: "Windows will look flatter. On modern hardware the speed difference is small, so only do this if things feel sluggish.",
  },
  {
    id: "performance-options",
    group: "Visual effects",
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
    group: "Taskbar",
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
    title: "Unofficial activation scripts and cracked keys",
    claim: "One command activates Windows and Office for free, forever.",
    reality: "Using Windows or Office without a valid licence breaks Microsoft's licence terms, and these scripts run with full admin rights. Use the free and legitimate options on the Optional tools page instead.",
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
  { title: "Built-in settings first", text: "Every main tweak is a switch already in Windows. Third-party tools are optional, clearly marked and limited to their safe parts." },
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

export function matchesProfile(t: Pick<Tweak, "for">, p: Profile | "all") {
  return p === "all" || t.for.length === 0 || t.for.includes(p);
}

const impactRank: Record<Impact, number> = { High: 0, Medium: 1, Low: 2 };
export function byImpact(a: Tweak, b: Tweak) {
  return impactRank[a.impact] - impactRank[b.impact];
}

// ───────────── Optional third-party tools ─────────────
// Only the safe, reversible parts are recommended. Everything else is listed under "skip".

export interface ToolOption {
  name: string;
  note: string;
}

export interface Tool {
  id: string;
  name: string;
  maker: string;
  tagline: string;
  cost: string;
  kind: string;
  source: { label: string; url: string };
  launch?: { label: string; value: string };
  before: string[];
  use: ToolOption[];
  skip: ToolOption[];
  undo: string;
  caution?: string;
}

export const tools: Tool[] = [
  {
    id: "shutup10",
    name: "O&O ShutUp10++",
    maker: "O&O Software",
    tagline: "A single screen of privacy switches, each rated by how safe it is to change.",
    cost: "Free, with an optional paid edition",
    kind: "Portable app, no install",
    source: { label: "oo-software.com/en/shutup10", url: "https://www.oo-software.com/en/shutup10" },
    before: [
      "Download it only from the O&O website. It's a single .exe that runs without installing.",
      "Select Restart as Admin on the Local Machine tab so system-wide settings can be changed.",
      "Open Actions › Create a system restoration point.",
    ],
    use: [
      { name: "Actions › Apply only recommended settings", note: "Changes only the settings O&O rates as Recommended: safe for most people, with minimal effect on how Windows works." },
      { name: "Secure Boot certificate status", note: "Check that your PC shows the updated (2023) certificates. If it doesn't, keep Windows Update running before turning off more telemetry." },
      { name: "Re-check after big Windows updates", note: "Feature updates can reset some settings. Open the app again and re-apply recommended settings if needed." },
    ],
    skip: [
      { name: "Settings rated Limited", note: "Generally safe but they switch off features some people use, like Copilot, search suggestions or app sync. Only change ones you understand." },
      { name: "Settings rated Not recommended", note: "These can break Windows Update, Microsoft Store, Defender updates or sign-in features." },
      { name: "The paid edition, unless you manage several PCs", note: "Its main extra is a background service that re-applies settings automatically. Re-running the free app now and then does the same job." },
    ],
    undo: "Actions › Undo shows every change and can reverse them, even from an earlier session. The restore point is your fallback.",
    caution: "Turning off all telemetry can stop Windows from updating your PC's Secure Boot certificates automatically. Stick to the Recommended settings.",
  },
  {
    id: "winutil",
    name: "Chris Titus Tech's Windows Utility",
    maker: "Chris Titus Tech (open source)",
    tagline: "A toolbox for installing apps, a few tweaks and some repair tools. Treat it as a toolbox, not a one-click button.",
    cost: "Free, open source (MIT)",
    kind: "PowerShell script with a graphical window",
    source: { label: "github.com/ChrisTitusTech/winutil", url: "https://github.com/ChrisTitusTech/winutil" },
    launch: { label: "In Terminal (Admin)", value: "irm \"https://christitus.com/win\" | iex" },
    before: [
      "Right-click Start and choose Terminal (Admin).",
      "Type the command exactly as shown. Never run a copy from a video description, comment or other website.",
      "Leave Create Restore Point selected on the Tweaks tab. Recent versions create one automatically before running tweaks.",
    ],
    use: [
      { name: "Install tab", note: "Install or update apps you choose in one go, using Microsoft's own winget package manager. Probably the most useful and safest part." },
      { name: "Tweaks › Disable ConsumerFeatures", note: "Stops Windows from quietly installing suggested apps and games on new accounts." },
      { name: "Tweaks › Disable Activity History", note: "The same as turning off activity history in Settings." },
      { name: "Tweaks › Delete Temporary Files and Run Disk Cleanup", note: "A one-time tidy-up. Storage Sense does this on a schedule too." },
      { name: "Tweaks › Enable End Task With Right Click", note: "Adds End task to taskbar right-click menus. Not needed on recent versions, where it's built in under Settings › System › Advanced." },
      { name: "Tweaks › Disable GameDVR", note: "For gamers who don't save clips. Same effect as turning off background recording." },
      { name: "Config › repair tools", note: "Reset Windows Update and the system file check are useful when updates are stuck. They don't change any preferences." },
    ],
    skip: [
      { name: "Advanced tweaks (marked CAUTION)", note: "Removing OneDrive, Copilot and other components, or reverting Start, can cause side effects. Not needed for speed." },
      { name: "Set Services to Manual", note: "This is in the Standard preset, but the speed gain is tiny and it's the kind of bulk service change we advise against." },
      { name: "Disable Telemetry", note: "Required diagnostic data helps Windows deliver security fixes like the Secure Boot certificate update. Use the Privacy settings on this site instead." },
      { name: "Disable Storage Sense and Disable Hibernation", note: "Both undo useful defaults. Leave them on, especially on laptops." },
      { name: "Updates tab › disabling updates", note: "Only for a short pause while a known bad update is fixed. Never leave updates off." },
      { name: "Ultimate Performance power plan", note: "Use the Best performance power mode instead. Ultimate Performance mostly just stops your CPU from idling." },
      { name: "Win11 Creator (custom ISO)", note: "A stripped-down Windows image is harder to support and update. Use Microsoft's own media." },
    ],
    undo: "Select the tweaks on the Tweaks tab and choose Undo Selected Tweaks. For anything else, use System Restore to go back to the restore point.",
    caution: "The script needs admin rights, so it can change anything on your PC. Only use the official command, and don't select a whole preset without reading each item.",
  },
];

export interface OfficialSource {
  title: string;
  text: string;
  links: { label: string; url: string }[];
}

/** Genuine ways to download and license Windows and Office. */
export const officialSources: OfficialSource[] = [
  {
    title: "Windows 11",
    text: "Microsoft offers three free downloads. Use Installation Assistant to upgrade this PC, Media Creation Tool to make a bootable USB, or the ISO for a virtual machine. You still need a licence to activate.",
    links: [{ label: "Download Windows 11", url: "https://www.microsoft.com/software-download/windows11" }],
  },
  {
    title: "Microsoft 365 and Office 2024",
    text: "Sign in with the account your subscription or product key is linked to and install from there. An offline installer is available if your connection is unreliable.",
    links: [
      { label: "Install Microsoft 365 or Office", url: "https://support.microsoft.com/office/download-install-or-reinstall-microsoft-365-or-office-2024-on-a-pc-or-mac-4414eaaf-0478-48be-9c42-23adc4716658" },
      { label: "Offline installer", url: "https://support.microsoft.com/office/use-the-office-offline-installer-f0a85fe7-118f-41cb-a791-d59cef96ad1c" },
    ],
  },
  {
    title: "Licences, legitimately",
    text: "Most PCs already have a digital licence. Students, teachers, developers and nonprofits can also get Microsoft software free or at a discount.",
    links: [
      { label: "See every legitimate option", url: "#licences" },
      { label: "Open Activation settings", url: "ms-settings:activation" },
    ],
  },
];

// ───────────── Legitimate licence programmes ─────────────

export type Audience = "everyone" | "education" | "developers" | "nonprofits";

export interface LicenceProgram {
  id: string;
  audience: Audience;
  title: string;
  summary: string;
  /** What you actually get */
  gives: string;
  cost: string;
  eligibility: string[];
  steps: string[];
  limits: string;
  links: { label: string; url: string }[];
  caution?: string;
}

export const audiences: { id: Audience; label: string }[] = [
  { id: "everyone", label: "Everyone" },
  { id: "education", label: "Students & teachers" },
  { id: "developers", label: "Developers & IT pros" },
  { id: "nonprofits", label: "Nonprofits" },
];

export const licencePrograms: LicenceProgram[] = [
  // Everyone
  {
    id: "digital-licence",
    audience: "everyone",
    title: "Use the digital licence your PC already has",
    summary: "Most PCs sold with Windows reactivate automatically, even after a clean reinstall.",
    gives: "Windows 11 Home or Pro, permanently, on that PC",
    cost: "Included with your PC",
    eligibility: ["You bought a PC with Windows preinstalled, or you activated Windows on it before."],
    steps: [
      "Open Settings › System › Activation and check that Activation state says Active.",
      "Sign in with a Microsoft account, then check that it says the licence is linked to your account. This makes reactivating after a hardware change much easier.",
      "When you reinstall, choose the same edition (Home or Pro) and select I don't have a product key. Windows activates once it's online.",
      "If you replace the motherboard, open Activation › Troubleshoot and choose I changed hardware on this device recently.",
    ],
    limits: "The licence belongs to that PC. Most licences that came with a PC can't be moved to a different one.",
    links: [
      { label: "Open Activation settings", url: "ms-settings:activation" },
      { label: "Microsoft: Activate Windows", url: "https://support.microsoft.com/windows/activate-windows-c39005d4-95ee-b91e-b399-2820fda32227" },
    ],
  },
  {
    id: "win10-upgrade",
    audience: "everyone",
    title: "Upgrade a licensed Windows 10 PC",
    summary: "A genuine Windows 10 licence activates Windows 11 on the same PC at no cost.",
    gives: "Windows 11 in the same edition as your Windows 10",
    cost: "Free",
    eligibility: ["Windows 10 is activated on the PC.", "The PC meets Windows 11's hardware requirements (check with the PC Health Check app)."],
    steps: [
      "Check Settings › Update & Security › Windows Update. If Windows 11 is offered, select Download and install.",
      "If it isn't offered yet, use Windows 11 Installation Assistant from Microsoft's download page.",
      "After the upgrade, check Settings › System › Activation. It should already say Active.",
    ],
    limits: "Upgrades the edition you already have. Home stays Home and Pro stays Pro.",
    links: [{ label: "Download Windows 11", url: "https://www.microsoft.com/software-download/windows11" }],
  },
  {
    id: "m365-web",
    audience: "everyone",
    title: "Use Microsoft 365 free on the web",
    summary: "Word, Excel, PowerPoint and Outlook in your browser with a free Microsoft account.",
    gives: "Web versions of the Office apps with OneDrive storage",
    cost: "Free",
    eligibility: ["Anyone with a Microsoft account."],
    steps: [
      "Go to microsoft365.com and sign in, or create a free Microsoft account.",
      "Open Word, Excel or PowerPoint from the app list. Files save to OneDrive.",
    ],
    limits: "Web apps only, with fewer advanced features than the desktop apps. For desktop Office you need Microsoft 365 or Office 2024.",
    links: [{ label: "Open microsoft365.com", url: "https://www.microsoft365.com" }],
  },

  // Education
  {
    id: "azure-students",
    audience: "education",
    title: "Azure for Students",
    summary: "Free cloud credit plus a catalogue of Microsoft software, verified with your school email.",
    gives: "$100 of Azure credit for 12 months, plus developer software like Visual Studio, SQL Server and Windows Server. Some schools also include Windows 11 Education.",
    cost: "Free, no credit card",
    eligibility: [
      "You're a full-time student at an accredited, degree-granting college or university (two-year or four-year).",
      "You can verify with your school email address. Online courses and for-profit training don't count.",
    ],
    steps: [
      "Go to azure.microsoft.com/free/students and select Start free.",
      "Sign in and verify your student status with your school email.",
      "Open the Azure Education Hub in the Azure portal and select Software.",
      "Choose a product, then View key to get a product key and Download to get the installer.",
    ],
    limits: "Software is for your studies and personal learning. Renew each year while you're still a student. If Windows 11 Education isn't listed, your school hasn't enabled it. Ask your IT help desk.",
    links: [
      { label: "Azure for Students", url: "https://azure.microsoft.com/free/students" },
      { label: "Education Hub FAQ", url: "https://learn.microsoft.com/azure/education-hub/faq" },
    ],
  },
  {
    id: "office-education",
    audience: "education",
    title: "Office 365 Education",
    summary: "Free Office for students and teachers whose school is signed up.",
    gives: "The free A1 plan includes web versions of Word, Excel, PowerPoint, Outlook and OneNote. Many schools pay for A3 or A5, which include the desktop apps.",
    cost: "Free (A1) or paid by your school",
    eligibility: ["You're a student or teacher with an email address from an eligible school."],
    steps: [
      "Go to Microsoft's Office 365 Education page and enter your school email address.",
      "Follow the verification email. Approval is usually instant but can take longer.",
      "Sign in at microsoft365.com with your school account. If your school includes desktop apps, select Install apps.",
    ],
    limits: "Ends when you leave the school, after which files become read-only. Re-verify or move to a personal plan to keep editing.",
    links: [{ label: "Office 365 Education", url: "https://www.microsoft.com/education/products/office" }],
    caution: "In November 2026, Microsoft announced it will retire the free A1 plan from January 2028, as schools renew. It will be replaced by a student-only A0 plan with desktop apps, which has conditions. Check with your school.",
  },

  // Developers
  {
    id: "m365-dev",
    audience: "developers",
    title: "Microsoft 365 Developer Program (E5 sandbox)",
    summary: "A temporary Microsoft 365 E5 tenant for building and testing Teams apps, add-ins and Graph integrations.",
    gives: "A Microsoft 365 E5 developer subscription with 25 user licences, for development only",
    cost: "Needs a qualifying subscription",
    eligibility: [
      "Visual Studio Professional or Enterprise subscribers (standard subscriptions) qualify automatically.",
      "Companies in the ISV Success Program, eligible Microsoft AI Cloud Partner Program tiers, or with Premier or Unified Support.",
      "A free sign-up on its own no longer qualifies you for a sandbox.",
    ],
    steps: [
      "Go to the Microsoft 365 Developer Program page and select Join now. Use a work or personal Microsoft account, not an onmicrosoft.com account.",
      "Enter your contact email, country and company, accept the terms and choose your interests.",
      "On the dashboard, complete eligibility, for example by linking your Visual Studio subscription.",
      "Select Set up E5 subscription and create your sandbox admin account. Visual Studio subscribers can also start from my.visualstudio.com.",
    ],
    limits: "Lasts up to 90 days and may need to be recreated. Microsoft's terms say using it for anything other than application development, including personal Office use, breaks the licence agreement.",
    links: [
      { label: "About the program", url: "https://learn.microsoft.com/office/developer-program/microsoft-365-developer-program" },
      { label: "Program FAQ", url: "https://learn.microsoft.com/office/developer-program/microsoft-365-developer-program-faq" },
    ],
  },
  {
    id: "visual-studio-subscription",
    audience: "developers",
    title: "Visual Studio Professional or Enterprise subscriptions",
    summary: "Paid developer subscriptions that include Windows and other Microsoft software for development and testing.",
    gives: "Downloads and product keys for Windows, Windows Server, Office and more, plus monthly Azure credit and E5 sandbox eligibility",
    cost: "Paid, usually through your employer",
    eligibility: ["You're assigned a subscription by your organisation, or you buy one yourself."],
    steps: [
      "Sign in at my.visualstudio.com with the account your subscription is assigned to.",
      "Open Downloads to get installers and Product Keys to claim keys.",
      "Open Benefits to activate Azure credit and the Microsoft 365 Developer Program.",
    ],
    limits: "Software is licensed for designing, developing, testing and demonstrating your apps, not for everyday personal or production use.",
    links: [{ label: "my.visualstudio.com", url: "https://my.visualstudio.com" }],
  },
  {
    id: "windows-eval",
    audience: "developers",
    title: "Windows 11 Enterprise evaluation",
    summary: "A free 90-day trial for testing in a virtual machine or on a spare PC.",
    gives: "Windows 11 Enterprise or Enterprise LTSC, fully featured for 90 days",
    cost: "Free",
    eligibility: ["Intended for IT professionals. Registration is required."],
    steps: [
      "Go to the Microsoft Evaluation Center page for Windows 11 Enterprise and register.",
      "Download the ISO (x64 or Arm64).",
      "Install it in a virtual machine, such as Hyper-V on Windows Pro, rather than on your main PC.",
    ],
    limits: "Can't be converted to a full licence. Installing it on a PC can't be rolled back. When the 90 days end, the desktop turns black and the PC shuts down every hour.",
    links: [{ label: "Evaluation Center", url: "https://www.microsoft.com/evalcenter/evaluate-windows-11-enterprise" }],
    caution: "Microsoft's ready-made Windows 11 developer VMs have been unavailable since October 2024. The evaluation ISO is the official alternative.",
  },

  // Nonprofits
  {
    id: "nonprofits",
    audience: "nonprofits",
    title: "Microsoft for Nonprofits",
    summary: "Discounted Microsoft 365 and Windows for registered charities and nonprofits.",
    gives: "Microsoft 365 Business Basic and Business Premium, plus Windows 11 Pro upgrades and Azure credit, at nonprofit prices",
    cost: "Discounted",
    eligibility: ["A registered nonprofit or charity in an eligible country. Schools, hospitals and government bodies are usually excluded."],
    steps: [
      "Register your organisation at nonprofit.microsoft.com and wait for verification.",
      "Once approved, choose offers from the nonprofit hub, or buy through TechSoup or a Microsoft partner.",
    ],
    limits: "Microsoft ended its free Business Premium and E1 grants on July 1, 2025. Discounted prices remain.",
    links: [
      { label: "Microsoft for Nonprofits", url: "https://nonprofit.microsoft.com" },
      { label: "TechSoup", url: "https://www.techsoup.org" },
    ],
  },
];

/** Things people assume give them a licence, but don't. */
export const notALicence = [
  { title: "Windows Insider Program", text: "Gives you early builds, not a licence. Your PC still needs a valid Windows licence." },
  { title: "Using the E5 developer sandbox for personal Office", text: "It's for building apps only. Personal use breaks the licence terms." },
  { title: "Keys from auction sites and too-good-to-be-true shops", text: "Often volume or resold keys that Microsoft can deactivate later. Buy from Microsoft, your PC maker or an authorised retailer." },
];
