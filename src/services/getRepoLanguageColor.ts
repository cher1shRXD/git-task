import axios from "axios";

export const getRepoLanguageColor = async (language: string | null) => {
  if(!language) {
    return "#000000"
  }
  const { data: colors } = await axios.get("https://raw.githubusercontent.com/ozh/github-colors/master/colors.json");
  return colors[language]?.color || "#000000";
};
