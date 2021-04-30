import { Icon, WebApp } from "@/types";

function parseSizes(sizes: string) {
  return sizes.split(" ").map(size => {
    const [x, y] = size.split("x");
    return { x: parseInt(x), y: parseInt(y) };
  });
}

/**
 * finds the best icon from a list
 *
 * @param icons a list of icons
 *
 * @returns the best Icon to display
 */
export function findIcon(icons: Icon[]): Icon {
  if (icons.length < 1) {
    throw "must have an icon";
  } else if (icons.length === 1) {
    return icons[0];
  } else {
    const a = icons.shift() as Icon;
    const b = findIcon(icons);

    if (a.purpose === "maskable" && b.purpose !== "maskable") {
      return a;
    } else if (b.purpose === "maskable" && a.purpose !== "maskable") {
      return b;
    } else {
      if (a.sizes === "any" && b.sizes !== "any") {
        return a;
      } else if (b.sizes === "any" && a.sizes !== "any") {
        return b;
      } else {
        if (a.sizes && b.sizes) {
          const aSize = Math.max(
            ...parseSizes(a.sizes)
              .filter(size => size.x === size.y)
              .map(size => size.x)
          );
          const bSize = Math.max(
            ...parseSizes(b.sizes)
              .filter(size => size.x === size.y)
              .map(size => size.x)
          );
          if (aSize > bSize) {
            return a;
          } else if (bSize > aSize) {
            return b;
          }
        }
      }
    }

    return a;
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
  app.reviews = app.reviews.filter(review => Object.keys(review).length !== 0);
  return app;
}
