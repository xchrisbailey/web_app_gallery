import { Icon, WebApp } from "@/types";

/**
 * @param a the first icon to be compared
 * @param b the second icon to be compared
 * @returns positive if a is smaller than b
 */
function sortIconsBySize(a: Icon, b: Icon) {
  if (a.sizes == undefined && a.sizes == undefined) {
    return 0;
  } else if (a.sizes == undefined) {
    return 1;
  } else if (b.sizes == undefined) {
    return -1;
  } else {
    const aSize = Math.max(...a.sizes.split(" ").map(size => parseInt(size.split("x")[0])));
    const bSize = Math.max(...b.sizes.split(" ").map(size => parseInt(size.split("x")[0])));
    return bSize - aSize;
  }
}

/**
 * finds the best icon from a list
 *
 * @param icons a list of icons
 *
 * @returns the best Icon to display
 */
export function findIcon(icons: Icon[]): Icon & { purpose: "maskable" | "any" } {
  const maskableIcons = icons.filter(icon => icon.purpose === "maskable");
  const anyIcons = icons.filter(icon => icon.purpose === "any");
  if (maskableIcons.length > 0) {
    return {
      src: maskableIcons.sort(sortIconsBySize)[0].src,
      purpose: "maskable"
    };
  } else if (anyIcons.length > 0) {
    return {
      src: anyIcons.sort(sortIconsBySize)[0].src,
      purpose: "any"
    };
  } else {
    throw "must have an icon";
  }
}

/**
 * this function mutates a webApp to have absolute urls no undefined purpose etc.
 */
export function processWebApp(app: WebApp) {
  app.startURL = new URL(app.startURL, app.manifestURL).href;
  for (const icon of app.icons) {
    icon.src = new URL(icon.src, app.manifestURL).href;
    if (icon.purpose == undefined) {
      icon.purpose = "any";
    }
  }
  if (app.screenshots) {
    for (const screenshot of app.screenshots) {
      screenshot.src = new URL(screenshot.src, app.manifestURL).href;
    }
  }
  return app;
}
