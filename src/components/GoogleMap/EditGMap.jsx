import {
  LoadScript,
  GoogleMap,
  Polyline,
  Marker,
  Autocomplete,
  InfoWindow,
} from "@react-google-maps/api";
import { useState } from "react";
import Image from "next/image";
import Joyride from "react-joyride";
import { useEffect } from "react";
import "./index.css";
import { Col, Row, Space, notification } from "antd";
import {
  AlignCenterOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Preheading from "../Preheading";
import Paragraph from "../Paragraph";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useDeletePostcardMutation } from "../../features/api/OrganizationApi";
import FlipCard from "../FlipCard/FlipCard";

const defaultCenter = {
  lat: 42.33526852104404,
  lng: -71.1200327611774,
};
const EditGMap = ({
  cancle,
  presetTotalDistance,
  setPresetTotalDistance,
  presetMilestones,
  setPresetsMilestones,
  presets,
  setPreSets,
  milestoneImage,
  setMilestoneImage,
}) => {
  const [api, contextHolder] = notification.useNotification();
  const [map, setMap] = useState(null);
  const [showMarkers, setShowMarkers] = useState(true);
  const [center, setCenter] = useState(presets[0]);

  const [polyline, setPolyline] = useState(null);
  // Enable route creation
  const [routeCreationEnabled, setRouteCreationEnabled] = useState(false);
  // Milestone information
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [milestoneName, setMilestoneName] = useState("");
  const [milestoneDescription, setMilestoneDescription] = useState("");
  // state for existing image for milestone
  const [existingImage, setExistingImage] = useState("");
  const [selectedMarkerCoords, setSelectedMarkerCoords] = useState(null);
  // const [milestones, setMilestones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [markerTooltipName, setMarkerTooltipName] = useState("");
  // toggle Milestone Sidebar
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // Validtion for Milestones
  const [validation, setValidation] = useState(false);
  // set the timer of map tooltip tour
  const [showTour, setShowTour] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowTour(true);
    }, 2000);
  }, []);

  // Doing this if the markers are hidden then close the tooltip
  useEffect(() => {
    if (!showMarkers) {
      setTooltipVisible(false);
    }
  }, [showMarkers]);

  // Doing this to validate the image for milestone if already available
  // useEffect(() => {
  //   if (existingImage) {
  //     setValidation(false);
  //   }
  // }, [existingImage]);
  // ************* Toolkit Stuff ************* //
  const [deletePostcard, { isLoading, error, isSuccess, data }] =
    useDeletePostcardMutation();
  const handleDelete = async (id) => {
    try {
      await deletePostcard(id);
    } catch (error) {
      console.log(error);
    }
  };
  // ************* Toolkit Stuff ************* //

  //************* Search Functionality *************//
  const [searchResult, setSearchResult] = useState("");

  const onLoad = (autocomplete) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult != null) {
      // To be used
      const place = searchResult.getPlace();

      const selectedLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setCenter(selectedLocation);

      setPreSets([selectedLocation]);
    }
  };
  //************* Search Functionality *************//

  //************* Milestone Functionality *************//

  //************* Arranging Variables for Milestones *************//
  const matchedCoordinatesArray = presets.map((item) => {
    let matchedCoordinates = presetMilestones.find((innerItem) => {
      if (innerItem) {
        let parsedItem;
        if (typeof innerItem.lat_long === "string") {
          parsedItem = JSON.parse(innerItem.lat_long);
        } else {
          parsedItem = innerItem.lat_long;
        }
        return item.lat === parsedItem.lat && item.lng === parsedItem.lng;
      }
      return false;
    });

    return matchedCoordinates;
  });
  //************* Arranging Variables for Milestones *************//

  // Marker Click Functionality
  const handleMarkerClick = (markerIndex) => {
    if (!routeCreationEnabled && !isNaN(markerIndex)) {
      setSelectedMarker(markerIndex);
      setShowModal(true);

      // Get the Coordinates of the clicked marker
      const clickedMarker = presets[markerIndex];

      // Check if there's an existing milestone at the clickedMarker index
      const existingMilestoneIndex = presetMilestones.findIndex((item) => {
        if (item?.lat_long !== undefined) {
          const latLngObject = JSON.parse(item.lat_long);
          return (
            parseFloat(latLngObject.lat) === parseFloat(clickedMarker.lat) &&
            parseFloat(latLngObject.lng) === parseFloat(clickedMarker.lng)
          );
        }
        return false;
      });

      if (existingMilestoneIndex !== -1) {
        // If the existing milestone is found, update its values
        setMilestoneName(presetMilestones[existingMilestoneIndex]?.title);
        setMilestoneDescription(
          presetMilestones[existingMilestoneIndex]?.description
        );
        setExistingImage(
          presetMilestones[existingMilestoneIndex]?.image_url_front || ""
        );
        // need to add the image parameter after testing
        setSelectedMarkerCoords(clickedMarker);
      } else {
        // If no existing milestone is found, add a new one
        setMilestoneName("");
        setMilestoneDescription("");
        // resetting the state of existing image as well
        setExistingImage("");
        setSelectedMarkerCoords(clickedMarker);
      }
    }
  };

  const handleSaveMilestone = (e, selectedMarker) => {
    e.preventDefault();

    if (
      milestoneName.length === 0 ||
      milestoneDescription.length === 0 ||
      (existingImage.length === 0 && milestoneImage.length === 0)
    ) {
      setValidation(true);
    } else {
      setValidation(false);

      // Check if the selectedMarker is valid
      if (selectedMarker !== null && selectedMarker < presets.length) {
        const clickedMarker = presets[selectedMarker];

        // Check if there's an existing milestone at the selectedMarker index
        const existingMilestoneIndex = presetMilestones.findIndex((item) => {
          if (item?.lat_long !== undefined) {
            const latLngObject = JSON.parse(item.lat_long);
            return (
              parseFloat(latLngObject.lat) === parseFloat(clickedMarker.lat) &&
              parseFloat(latLngObject.lng) === parseFloat(clickedMarker.lng)
            );
          }
          return false;
        });

        if (existingMilestoneIndex !== -1) {
          // If the existing milestone is found, update its values
          const updatedMilestones = [...presetMilestones];
          updatedMilestones[existingMilestoneIndex] = {
            ...updatedMilestones[existingMilestoneIndex],
            title: milestoneName,
            description: milestoneDescription,
            image_url_front:
              existingImage.length === 0 ? milestoneImage[0] : existingImage,
          };

          setPresetsMilestones(updatedMilestones);
        } else {
          // If no existing milestone is found, add a new one
          const newMilestone = {
            title: milestoneName,
            description: milestoneDescription,
            lat_long: JSON.stringify(clickedMarker),
            image_url_front: milestoneImage[0],
          };

          // Calculate distance between milestones
          if (selectedMarker > 0) {
            let distanceToMilestone = 0;
            for (let i = 1; i <= selectedMarker; i++) {
              distanceToMilestone += calculateDistance(
                presets[i - 1].lat,
                presets[i - 1].lng,
                presets[i].lat,
                presets[i].lng
              );
            }

            newMilestone.milestone = distanceToMilestone;
          } else {
            newMilestone.distance = 0;
          }

          // Add the new milestone to the state
          setPresetsMilestones([...presetMilestones, newMilestone]);
        }

        // Reset States of milestone fields
        setMilestoneName("");
        setMilestoneDescription("");
        setSelectedMarker(null);
        setShowModal(false);
        setMilestoneImage([]);
      }
    }
  };

  const handleRemoveMilestone = (indexToRemove, id) => {
    const updatedMilestones = matchedCoordinatesArray.filter(
      (_, index) => index !== indexToRemove
    );
    setPresetsMilestones(updatedMilestones);
    if (id) {
      handleDelete(id);
    }
  };

  // Show API responses on Behalf of Milestone Removal
  useEffect(() => {
    if (isSuccess && data?.statusCode == 200) {
      api.info({
        message: `Notification`,
        description: <Paragraph text={data?.message} color={"text-primary"} />,
        placement: "top right",
        duration: 2,
      });
      // console.log(data);
    }
  }, [isSuccess]);

  const handleIndicateMarker = (markerIndex, name) => {
    setSelectedMarker(markerIndex);
    setTooltipVisible(true);
    setMarkerTooltipName(name);
  };

  //************* Milestone Functionality *************//

  //************* Map Tour Object *************//
  const [{ run, steps }] = useState({
    run: true,
    steps: [
      {
        content: (
          <p className="app__para normal text-white m-0">Begin our journey!</p>
        ),
        locale: { skip: <strong>SKIP</strong> },
        placement: "center",
        target: "body",
      },
      {
        content: (
          <p className="app__para normal text-white m-0">
            Click on Start Route to begin creating the route
          </p>
        ),
        placement: "top",
        target: "#step-1",
      },
      {
        content: (
          <p className="app__para normal text-white m-0">
            Click anywhere on map screen to drop a pin
          </p>
        ),
        placement: "center",
        target: "#step-2",
      },
      {
        content: (
          <p className="app__para normal text-white m-0">
            Step back to last pointed mark using this button
          </p>
        ),
        placement: "top",
        target: "#step-3",
      },
      {
        content: (
          <p className="app__para normal text-white m-0">
            Show and hide map markers
          </p>
        ),
        placement: "top",
        target: "#step-4",
      },
      {
        content: (
          <p className="app__para normal text-white m-0">
            Clear the entire path!
          </p>
        ),
        placement: "top",
        target: "#step-5",
      },
      {
        content: (
          <p className="app__para normal text-white m-0">
            End route & start adding milestones if needed
          </p>
        ),
        placement: "top",
        target: "#step-1",
      },
      {
        content: (
          <p className="app__para normal text-white m-0">
            Click on any specific marker to add the milestone
          </p>
        ),
        placement: "center",
        target: "#step-2",
      },
      {
        content: (
          <p className="app__para normal text-white m-0">Save & exit map</p>
        ),
        placement: "top",
        target: "#step-6",
      },
    ],
  });

  const handleJoyrideCallback = () => {
    setShowTour(false);
  };
  //************* Map Tour Object *************//

  //************* Map Route Creation Functionality *************//
  const handleMapClick = (e) => {
    // get lat, lng
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    if (routeCreationEnabled) {
      // Add a new point to the path array
      const newPath = presets ? [...presets, { lat, lng }] : [];
      setPreSets(newPath);

      if (newPath.length > 1) {
        // Calculate the distance between points and update total distance
        const newDistance = calculateDistance(
          newPath[newPath.length - 2].lat,
          newPath[newPath.length - 2].lng,
          newPath[newPath.length - 1].lat,
          newPath[newPath.length - 1].lng
        );
        setPresetTotalDistance(parseInt(presetTotalDistance) + newDistance);
      }
    }
  };
  //************* Map Route Creation Functionality *************//

  //*************Clear Route Functionality *************//
  const clearRoute = () => {
    setPreSets([]);
    setPresetTotalDistance(0);
    // setCoordinatesList([]);
    setRouteCreationEnabled(false);
    setPresetsMilestones([]);
  };
  //*************Clear Route Functionality *************//

  //*************Undo Last Point Functionality *************//
  const undoLastPoint = () => {
    if (presets.length > 0) {
      // Remove the last point from the path
      const updatedPath = presets.slice(0, -1);
      setPreSets(updatedPath);

      // Calculate the updated total distance
      let updatedTotalDistance = 0;
      for (let i = 1; i < updatedPath.length; i++) {
        updatedTotalDistance += calculateDistance(
          updatedPath[i - 1].lat,
          updatedPath[i - 1].lng,
          updatedPath[i].lat,
          updatedPath[i].lng
        );
      }
      setPresetTotalDistance(updatedTotalDistance);
    }
  };
  //*************Undo Last Point Functionality *************//

  useEffect(() => {
    if (map && presets && presets.length > 1) {
      // Check if there's an existing polyline, and remove it
      if (polyline) {
        polyline.setMap(null);
      }

      // Create a new polyline
      const newPolyline = new window.google.maps.Polyline({
        path: presets,
        strokeColor: "#193a69",
        strokeWeight: 4,
      });

      // Set the new polyline on the map
      newPolyline.setMap(map);

      // Update the state with the new polyline reference
      setPolyline(newPolyline);
    }
  }, [map, presets]);

  //************* Calculate Distance Functionality *************//
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers

    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const deltaLat = radLat2 - radLat1;
    const deltaLon = (Math.PI * lon2 - Math.PI * lon1) / 180;

    const a =
      Math.sin(deltaLat / 2) ** 2 +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in kilometers

    return distance * 1000; // Convert to meters
  };
  //************* Calculate Distance Functionality *************//
  //************* Map Route Creation Functionality *************//

  //************* Start and End Markers *************//
  const firstMarkerIcon = {
    // scaledSize: window.google.maps && new window.google.maps.Size(30, 30),
    icon: "/map-marker.svg",
  };

  const lastMarkerIcon = {
    // scaledSize: window.google.maps && new window.google.maps.Size(30, 30),
    icon: "/map-marker.svg",
  };
  //************* Start and End Markers *************//

  return (
    <div className="map-container" style={{ position: "relative" }}>
      {contextHolder}
      {/* Show Tour */}
      <div
        className="tour__trigger"
        onClick={() => setShowTour(!showTour)}
        title="See Tour"
      >
        <QuestionCircleOutlined
          style={{ fontSize: "30px", color: "var(--primary-color)" }}
        />
      </div>
      <div className="__map__layout">
        {/* Milestons  */}
        {/* {milestones.length > 0 && ( */}
        <div
          className="__milestone_sidebar"
          style={
            toggleSidebar
              ? { flex: "0 0 35%", background: "#052a5e" }
              : { flex: "0 0 0", background: "transparent", padding: "0" }
          }
        >
          {/* <div
            className="__bar_toggler"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            {toggleSidebar ? (
              <CloseOutlined style={{ color: "#fff" }} />
            ) : (
              <AlignCenterOutlined style={{ color: "#fff" }} />
            )}
            <p className="__milestones_toggle">Milestones</p>
          </div> */}
          <div className="__milestones_list">
            {matchedCoordinatesArray.length > 0
              ? matchedCoordinatesArray.map((milestone, index) => {
                  // console.log(typeof milestone?.image_url_front, 'milesonteon')
                  const fileURL =
                    typeof milestone?.image_url_front == "object"
                      ? URL.createObjectURL(milestone?.image_url_front)
                      : milestone?.image_url_front;
                  return (
                    milestone &&
                    milestone !== null &&
                    milestone !== undefined && (
                      // <div
                      //   key={index}
                      //   className="__singleMilestone"
                      //   style={
                      //     toggleSidebar
                      //       ? { display: "block" }
                      //       : { display: "none" }
                      //   }
                      // >
                      //   <button
                      //     onClick={() =>
                      //       handleRemoveMilestone(
                      //         index,
                      //         milestone.id ? milestone.id : null
                      //       )
                      //     }
                      //   >
                      //     &times;
                      //   </button>
                      //   <div className="__milestones__inner">
                      //     <div>
                      //       <Preheading
                      //         text={`${milestone?.title} Milestone`}
                      //         color={"text-secondary"}
                      //       />
                      //       <Paragraph
                      //         text={`Name: ${milestone?.title}`}
                      //         color={"text-white"}
                      //         weight={600}
                      //         margin={0}
                      //       />
                      //       <Paragraph
                      //         text={`Description: ${milestone?.description}`}
                      //         color={"text-white"}
                      //         weight={400}
                      //         margin={0}
                      //       />
                      //       <Paragraph
                      //         text={`Distance: ${milestone?.milestone?.toFixed(
                      //           2
                      //         )}`}
                      //         color={"text-white"}
                      //         weight={400}
                      //         margin={0}
                      //       />
                      //     </div>
                      //     <ArrowRightOutlined
                      //       style={{ color: "var(--secondary-color)" }}
                      //       onClick={() =>
                      //         handleIndicateMarker(index, milestone?.title)
                      //       }
                      //     />
                      //   </div>
                      // </div>
                      <div
                        key={index}
                        className="__singleMilestone"
                        style={
                          toggleSidebar
                            ? { display: "block" }
                            : { display: "none" }
                        }
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: "10px",
                          }}
                        >
                          <ArrowRightOutlined
                            style={{
                              color: "var(--secondary-color)",
                              fontSize: "24px",
                            }}
                            onClick={() =>
                              handleIndicateMarker(index, milestone?.title)
                            }
                          />

                          {/* Commenting for testing purpose  */}
                          {/* {index === matchedCoordinatesArray.length - 1 && (
                            <button
                              className="remove__btn add__btn"
                              onClick={() =>
                                handleRemoveMilestone(
                                  index,
                                  milestone.id ? milestone.id : null
                                )
                              }
                            >
                              &times;
                            </button>
                          )} */}
                          {/* Commenting for testing purpose  */}

                          <button
                            className="remove__btn add__btn"
                            onClick={() =>
                              handleRemoveMilestone(
                                index,
                                milestone.id ? milestone.id : null
                              )
                            }
                          >
                            &times;
                          </button>
                        </div>
                        <FlipCard
                          isOrg={true}
                          backImage={"/post-card.png"}
                          title={milestone?.title}
                          description={milestone?.description}
                          frontImage={fileURL}
                          distance={milestone?.milestone}
                        />
                      </div>
                    )
                  );
                })
              : toggleSidebar && (
                  <div style={{ textAlign: "center" }}>
                    <InfoCircleOutlined
                      style={{ color: "#fff", fontSize: "30px" }}
                    />
                    <Paragraph
                      text={
                        "Start Creating The Route By Clicking on Start Route Button, When Finished, Add Milestones By Clicking On A Marker"
                      }
                      weight={500}
                      color={"text-white"}
                      textAlign={"center"}
                    />
                  </div>
                )}
          </div>
        </div>
        {/* )} */}
        <div
          className="__map__inner"
          style={
            presetMilestones.length == 0 && toggleSidebar
              ? { flex: "0 0 100%" }
              : { flex: "0 0 100%" }
          }
        >
          {/* Map Stuff */}
          <div className="map__container" id="step-2">
            <LoadScript
              googleMapsApiKey={`${process.env.NEXT_PUBLIC_GMAP_API}`}
              libraries={["places"]}
            >
              <div className="__place_search_wrapp">
                <Autocomplete
                  onPlaceChanged={(place) => onPlaceChanged(place)}
                  onLoad={onLoad}
                >
                  <input
                    type="text"
                    placeholder="Search for the location"
                    className="__search_place"
                  />
                </Autocomplete>
                <SearchOutlined />
              </div>
              <GoogleMap
                key={presetTotalDistance == 0}
                mapContainerStyle={{ width: "100%", height: "600px" }}
                center={center}
                zoom={15}
                onClick={handleMapClick}
                onLoad={(map) => setMap(map)}
                options={{
                  mapTypeControl: false,
                  streetViewControl: false,
                  fullscreenControl: false,
                  draggableCursor: "crosshair",
                }}
              >
                {/* {presets && presets.length > 1 && (
                  <Polyline
                    path={presets}
                    options={{ strokeColor: "red", strokeWeight: 4 }}
                  />
                )} */}
                {showMarkers && presets && presets.length > 0
                  ? presets.map((position, index) => (
                      <Marker
                        key={index}
                        position={position}
                        onClick={() => handleMarkerClick(index)}
                        icon={
                          index === 0
                            ? firstMarkerIcon.icon
                            : index === presets.length - 1
                              ? lastMarkerIcon.icon
                              : undefined
                        }
                      >
                        {tooltipVisible && selectedMarker === index && (
                          <InfoWindow
                            onCloseClick={() => setTooltipVisible(false)}
                          >
                            <div>
                              {/* Tooltip content */}
                              <Paragraph text={markerTooltipName} margin={0} />
                            </div>
                          </InfoWindow>
                        )}
                      </Marker>
                    ))
                  : null}
              </GoogleMap>
            </LoadScript>
          </div>
          <ul className="map__modal-footer">
            <li className="text-secondary" id="step-1">
              <button
                onClick={() => setRouteCreationEnabled(!routeCreationEnabled)}
              >
                {routeCreationEnabled ? "End Route" : "Start Route"}
              </button>
            </li>
            <li className="text-secondary">
              <Image
                src={"/map-pin.svg"}
                width={23}
                height={18}
                alt="Border Rowers"
              />
              <span>{parseInt(presetTotalDistance).toFixed(2)} Meters</span>
            </li>
            <li className="text-secondary" onClick={clearRoute} id="step-5">
              <Image
                src={"/bin.svg"}
                width={17}
                height={19}
                alt="Border Rowers"
              />
              <span>Clear Route</span>
            </li>
            <li className="text-secondary" onClick={undoLastPoint} id="step-3">
              <Image
                src={"/back.svg"}
                width={17}
                height={19}
                alt="Border Rowers"
              />
              <span>Step Back</span>
            </li>
            <li
              className="text-secondary"
              onClick={() => setShowMarkers(!showMarkers)}
            >
              {/* <InputCheckbox
              label={showMarkers ? "Hide Markers" : "Show Markers"}
            /> */}
              <p id="step-4">{showMarkers ? "Hide Markers" : "Show Markers"}</p>
            </li>
            <li className="text-secondary" id="step-6">
              <button onClick={cancle}>Save & Set Route</button>
            </li>
          </ul>
        </div>
      </div>

      {showTour && (
        <Joyride
          continuous
          callback={({ action, index }) => {
            if (action === "skip") {
              handleJoyrideCallback();
            } else if (index === steps.length - 1) {
              () => handleJoyrideCallback();
            }
          }}
          run={run}
          steps={steps}
          hideCloseButton
          scrollToFirstStep
          showSkipButton
          showProgress
          disableOverlayClose
        />
      )}

      {showModal && selectedMarker !== null && (
        <div className="__milestone_modal">
          <div className="__modalContent">
            <button
              onClick={() => setShowModal(false)}
              className="remove__btn"
              style={{ lineHeight: "20px", fontSize: "24px" }}
            >
              &times;
            </button>
            <h4 className="text-primary medium" style={{ marginTop: 0 }}>
              Milestone Information
            </h4>
            <form>
              <Row gutter={20} align={"middle"}>
                <Col md={12}>
                  {existingImage ? (
                    <div className="__preview_img_wrapp">
                      <CloseCircleOutlined
                        onClick={() => setExistingImage("")}
                      />
                      <Image
                        className="preview__img"
                        alt="Border Rowers"
                        src={existingImage}
                        width={100}
                        height={100}
                        maxLength={30}
                      />
                    </div>
                  ) : (
                    <>
                      <ImageUpload
                        coverImage={milestoneImage[0]}
                        setCoverImage={(file) => setMilestoneImage(file, 0)}
                        name={"cover_image"}
                        imageId={0}
                        // preDisplay={parseDetails?.cover_image_url}
                      />
                      {validation && milestoneImage.length <= 0 ? (
                        <p
                          style={{ margin: 0, fontSize: "10px", color: "red" }}
                        >
                          Please Upload Milestone Image
                        </p>
                      ) : (
                        ""
                      )}
                    </>
                  )}
                  {/* <ImageUpload
                    coverImage={milestoneImage[0]}
                    setCoverImage={(file) => setMilestoneImage(file, 0)}
                    name={"cover_image"}
                    imageId={0}
                    // preDisplay={existingImage || ""}
                  />
                  {(existingImage == "" || milestoneImage.length <= 0) &&
                  validation ? (
                    <p style={{ margin: 0, fontSize: "10px", color: "red" }}>
                      Please Upload Milestone Image
                    </p>
                  ) : (
                    ""
                  )} */}
                </Col>
                <Col md={12}>
                  <Space
                    size={"middle"}
                    direction="vertical"
                    style={{ width: "100%" }}
                  >
                    <div>
                      <label htmlFor="milestoneName" className="text-primary">
                        Milestone Name:
                      </label>
                      <input
                        type="text"
                        id="milestoneName"
                        value={milestoneName}
                        onChange={(e) => setMilestoneName(e.target.value)}
                        maxLength={30}
                      />
                      {validation && milestoneName.length <= 0 ? (
                        <p
                          style={{ margin: 0, fontSize: "10px", color: "red" }}
                        >
                          Please Fill Out this field
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div>
                      <label
                        htmlFor="milestoneDescription"
                        className="text-primary mt-4"
                      >
                        Milestone Description:
                      </label>
                      <textarea
                        id="milestoneDescription"
                        value={milestoneDescription}
                        maxLength={200}
                        onChange={(e) =>
                          setMilestoneDescription(e.target.value)
                        }
                      ></textarea>
                      {validation && milestoneDescription.length <= 0 ? (
                        <p
                          style={{
                            margin: 0,
                            fontSize: "10px",
                            color: "red",
                            marginBottom: "10px",
                          }}
                        >
                          Please Fill Out this field
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                    <button
                      type="submit"
                      onClick={(e) => handleSaveMilestone(e, selectedMarker)}
                    >
                      Save
                    </button>
                  </Space>
                </Col>
              </Row>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditGMap;
