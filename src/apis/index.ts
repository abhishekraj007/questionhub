const JS_URL =
  "https://raw.githubusercontent.com/abhishekraj007/md2json/main/js-v1.json";

export const getJSQuestions = async () => {
  try {
    const res = await fetch(JS_URL);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
