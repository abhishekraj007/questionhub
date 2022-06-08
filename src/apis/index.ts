export const URLS = {
  js: "https://raw.githubusercontent.com/abhishekraj007/md2json/main/api/js-v1.json",
  react:
    "https://raw.githubusercontent.com/abhishekraj007/md2json/main/api/react-v1.json",
};

export const apiGetQuestions = async (url: string = URLS.js) => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
