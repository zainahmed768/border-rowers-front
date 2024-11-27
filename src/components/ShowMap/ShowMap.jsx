"use client";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import React from "react";

const ShowMap = ({ routes, slug, style }) => {
  const parsedRoutes = routes ? JSON.parse(routes) : null;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GMAP_API}`,
  });

  const defaultCenter = parsedRoutes[0];
  if (!isLoaded) {
    return null;
  }
  return (
    <>
      {isLoaded && (
        <GoogleMap
          key={slug}
          mapContainerStyle={style}
          center={defaultCenter}
          zoom={14}
          options={{
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: false,
          }}
        >
          {parsedRoutes?.map((_, i) => (
            <Marker key={i} position={_} />
          ))}
          {parsedRoutes.length > 0 && (
            <Polyline path={parsedRoutes} options={{ strokeColor: "#000" }} />
          )}
        </GoogleMap>
      )}
    </>
  );
};

export default ShowMap;
