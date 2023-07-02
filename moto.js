import axios from "axios";
import notifier from "node-notifier";
import dayjs from "dayjs";
import open from "open";

async function getMotoData(
  config = {
    url: "",
    name: "",
  }
) {
  try {
    const data = await axios.get(
      `${config.url}?__pickRuntime=appsEtag%2Cblocks%2CblocksTree%2Ccomponents%2CcontentMap%2Cextensions%2Cmessages%2Cpage%2Cpages%2Cquery%2CqueryData%2Croute%2CruntimeMeta%2Csettings&__device=tablet`,
      {
        headers: {
          Origin: "https://www.motorola.in",
          Referer: "https://www.motorola.in/",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 FKUA/website/42/website/Desktop",
          "X-User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 FKUA/website/42/website/Desktop",
        },
      }
    );

    const response = JSON.parse(data.data.queryData[0].data);
    const items = response.product.items;
    const itemsAvailable = items.filter(
      (item) => item.sellers[0].commertialOffer.AvailableQuantity > 0
    );

    if (itemsAvailable.length > 0) {
      const list = itemsAvailable.map((item) => item.name).join(", ");
      const total = itemsAvailable.reduce(
        (acc, item) => acc + item.sellers[0].commertialOffer.AvailableQuantity,
        0
      );

      console.log(
        `✅ [MOTOROLA] ${dayjs(new Date()).format(
          "HH:mm A"
        )} - In Stock - 🛒 ${list} - Total: ${total}`
      );

      notifier.notify({
        title: "Moto",
        message: `${list} is in stock with ${total} items.`,
        sound: true,
      });

      notifier.on("click", async function () {
        await open(config.url);
      });
    } else {
      console.log(
        `❌ [MOTOROLA] ${dayjs(new Date()).format(
          "HH:mm A"
        )} - Out of Stock - 🛒 ${config.name}`
      );
    }
  } catch (error) {
    console.log(`⚠️ Error: ${error.message}`);
  }
}

export default getMotoData;
