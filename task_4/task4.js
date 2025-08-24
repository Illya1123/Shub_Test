import axios from "axios";

async function fetchInputData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new Error("Lỗi khi fetch dữ liệu: " + error.message);
  }
}

async function sendOutputData(url, token, resultData) {
  try {
    await axios.post(url, resultData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw new Error("Lỗi khi gửi dữ liệu: " + error.message);
  }
}

async function processData() {
  try {
    const input = await fetchInputData(
      "https://share.shub.edu.vn/api/intern-test/input"
    );

    console.log("Dữ liệu lấy về:", input);

    const { token, data, query } = input;

    const n = data.length;
    const tongMang = new Array(n + 1).fill(0);
    const tongDoiDau = new Array(n + 1).fill(0);

    for (let i = 0; i < n; i++) {
      tongMang[i + 1] = tongMang[i] + data[i];
      tongDoiDau[i + 1] = tongDoiDau[i] + (i % 2 === 0 ? data[i] : -data[i]);
    }

    const results = query.map(({ type, range }) => {
      const [l, r] = range;
      if (type === "1") return tongMang[r + 1] - tongMang[l];
      if (type === "2") return tongDoiDau[r + 1] - tongDoiDau[l];
    });

    await sendOutputData(
      "https://share.shub.edu.vn/api/intern-test/output",
      token,
      results
    );

    console.log("Thành công!");
  } catch (error) {
    console.error("Lỗi:", error.message);
  }
}

processData();
