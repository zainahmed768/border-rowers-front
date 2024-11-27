import { usePageMetasQuery } from "../features/api/pagesApi";

// to convert words in capitalize
export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, (match) => match.toUpperCase());
};

export const PageMetas = (title) => {
  const { data, isLoading, error } = usePageMetasQuery();
  const filteredData =
    data?.statusCode == 200
      ? data?.response?.data?.filter((meta) => meta.page_title == title)
      : [];
  const meta = filteredData[0];
  return meta;
};
