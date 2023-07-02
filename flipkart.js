import axios from "axios";
import notifier from "node-notifier";
import dayjs from "dayjs";
import open from "open";

async function getFlipkartData(
  config = {
    url: "",
    name: "",
  }
) {
  try {
    const url = new URL(config.url);
    const pageUri = config.url.replace(url.origin, "");

    const data = await axios.post(
      `https://1.rome.api.flipkart.com/api/4/page/fetch`,
      {
        pageUri: pageUri,
        pageContext: {
          fetchSeoData: false,
        },
      },
      {
        headers: {
          Origin: url.origin,
          Referer: url.origin,
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 FKUA/website/42/website/Desktop",
          "X-User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 FKUA/website/42/website/Desktop",
        },
      }
    );

    const response = data.data.RESPONSE;
    const status = response.pageData.pageContext.trackingDataV2.productStatus;

    const isInStock = status !== "Out of Stock";
    const emoji = isInStock ? "✅" : "❌";
    if (isInStock) {
      notifier.notify({
        title: "Flipkart",
        message: `${config.name} is in stock`,
        sound: true,
      });

      notifier.on("click", async function () {
        await open(config.url);
      });
    }

    console.log(
      `${emoji} [FLIPKART] ${dayjs(new Date()).format(
        "HH:mm A"
      )} - ${status} - 🛒 ${config.name}`
    );
  } catch (error) {
    console.log(`⚠️ Error: ${error.message}`);
  }
}

export default getFlipkartData;
