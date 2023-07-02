import getMotoData from "./moto.js";
import getFlipkartData from "./flipkart.js";

const configs = {
  intervalInSec: 30,
  flipkart: {
    url: "https://www.flipkart.com/motorola-edge-40-viva-magenta-256-gb/p/itm05e373bd204cb?pid=MOBGPJZABN3GPDZ7&lid=LSTMOBGPJZABN3GPDZ7D67ZGP&marketplace=FLIPKART&fm=factBasedRecommendation%2FrecentlyViewed&iid=R%3Arv%3Bpt%3Ahp%3Buid%3A371963b2-17c9-11ee-91da-371515f91046%3B.MOBGPJZABN3GPDZ7&ppt=hp&ppn=homepage&ssid=ejwi2s3vsw0000001688186347813&otracker=hp_reco_Recently%2BViewed_2_37.productCard.RECENTLY_VIEWED_MOTOROLA%2BEdge%2B40%2B%2528Viva%2BMagenta%252C%2B256%2BGB%2529_MOBGPJZABN3GPDZ7_factBasedRecommendation%2FrecentlyViewed_1&otracker1=hp_reco_PINNED_factBasedRecommendation%2FrecentlyViewed_Recently%2BViewed_DESKTOP_HORIZONTAL_productCard_cc_2_NA_view-all&cid=MOBGPJZABN3GPDZ7",
    name: "Motorola Edge 40 (Viva Magenta, 256 GB)",
  },
  motorola: {
    url: "https://www.motorola.in/smartphones-motorola-edge-40/p",
    name: "Motorola Edge 40",
  },
};

console.log("🚀 Starting notifier!");

let run = 0;
function check() {
  console.log(`\n\n#Run: ${++run}`);

  if (configs.flipkart) getFlipkartData(configs.flipkart);
  if (configs.motorola) getMotoData(configs.motorola);
}

check();
setInterval(check, 1000 * configs.intervalInSec);
