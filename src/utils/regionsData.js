import {
  useGetCitiesQuery,
  useGetCountryListQuery,
  useGetStatesQuery,
} from "../features/api/regionApi";

export const GetCountryOptions = () => {
  const { data } = useGetCountryListQuery();
  return data?.response?.data?.map((country) => ({
    id: country?.id,
    label: country.name,
    value: country?.id,
  }));
};
export const GetCityOptions = (countryId) => {
  const { data } = useGetCitiesQuery(countryId);
  return data?.response?.data?.map((city) => ({
    id: city?.id,
    label: city.name,
    value: city?.id,
  }));
};

export const GetStateOptions = (countryId) => {
  const { data } = useGetStatesQuery(countryId);
  return data?.response?.data?.map((state) => ({
    id: state?.id,
    label: state.name,
    value: state?.id,
  }));
};
