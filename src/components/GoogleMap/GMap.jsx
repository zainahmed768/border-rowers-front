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
import { Col, Row, Space } from "antd";
import {
  AlignCenterOutlined,
  ArrowRightOutlined,
  CloseCircleOutlined,
  CloseOutlined,
  InfoCircleOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Paragraph from "../Paragraph";
import ImageUpload from "../ImageUpload/ImageUpload";
import FlipCard from "../FlipCard/FlipCard";

const defaultCenter = {
  lat: 42.33526852104404,
  lng: -71.1200327611774,
};
const GMap = ({
  cancle,
  path,
  setPath,
  totalDistance,
  setTotalDistance,
  milestones,
  setMilestones,
  milestoneImage,
  setMilestoneImage,
}) => {
  // console.log("milestones", milestones);
  const [map, setMap] = useState(null);
  const [showMarkers, setShowMarkers] = useState(true);
  const [center, setCenter] = useState(defaultCenter);

  // Enable route creation
  const [routeCreationEnabled, setRouteCreationEnabled] = useState(false);

  // Milestone information
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [milestoneName, setMilestoneName] = useState("");
  const [milestoneDescription, setMilestoneDescription] = useState("");
  const [existingMilestonImage, setExistingMilestonImage] = useState("");
  const [selectedMarkerCoords, setSelectedMarkerCoords] = useState(null);
  // toggle Milestone Sidebar
  const [toggleSidebar, setToggleSidebar] = useState(false);

  // Validtion for Milestones
  const [validation, setValidation] = useState(false);

  // const [milestones, setMilestones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [markerTooltipName, setMarkerTooltipName] = useState("");

  // Doing this if the markers are hidden then close the tooltip
  useEffect(() => {
    if (!showMarkers) {
      setTooltipVisible(false);
    }
  }, [showMarkers]);

  // set the timer of map tooltip tour
  const [showTour, setShowTour] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShowTour(true);
    }, 2000);
  }, []);

  //*************** Search functionality ***************//
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

      setPath([selectedLocation]);
    }
  };
  //*************** Search functionality ***************//

  //*************** Milestones functionality ***************//
  // const handleMarkerClick = (markerIndex) => {
  //   if (!routeCreationEnabled && !isNaN(markerIndex)) {
  //     setSelectedMarker(markerIndex);
  //     setShowModal(true);
  //     if (showModal) {
  //       tooltipVisible(false);
  //     }
  //     const clickedMarker = path[markerIndex];
  //     setSelectedMarkerCoords(clickedMarker);
  //   }
  // };

  //testing piece of code
  const handleMarkerClick = (markerIndex) => {
    if (!routeCreationEnabled && !isNaN(markerIndex)) {
      setSelectedMarker(markerIndex);
      // Check if the clicked marker corresponds to an existing milestone
      const clickedMarker = path[markerIndex];
      const existingMilestone = milestones.find(
        (milestone) =>
          milestone?.latLong?.lat === clickedMarker?.lat &&
          milestone?.latLong?.lng === clickedMarker?.lng
      );
      if (existingMilestone) {
        // If a milestone exists, populate the modal fields with its values
        setMilestoneName(existingMilestone?.name);
        setMilestoneDescription(existingMilestone?.description);
        setExistingMilestonImage(existingMilestone?.milestonImage);
      } else {
        // If no milestone exists, reset the modal fields to empty values
        setMilestoneName("");
        setMilestoneDescription("");
        setExistingMilestonImage("");
        setMilestoneImage([]);
      }
      setShowModal(true);
      if (showModal) {
        setTooltipVisible(false);
      }
      setSelectedMarkerCoords(clickedMarker);
    }
  };

  const handleSaveMilestone = (e, selectedMarker) => {
    e.preventDefault();

    if (
      milestoneName.length === 0 ||
      milestoneDescription.length === 0 ||
      (milestoneImage.length === 0 && existingMilestonImage.length === 0)
    ) {
      setValidation(true);
    } else {
      setValidation(false);

      // Check if the selectedMarker is valid
      if (selectedMarker !== null && selectedMarker < path.length) {
        const clickedMarker = path[selectedMarker];

        // Milestone Addition logic
        const newMilestone = {
          name: milestoneName,
          description: milestoneDescription,
          latLong: clickedMarker,
          milestonImage:
            existingMilestonImage == ""
              ? milestoneImage[0]
              : existingMilestonImage,
        };

        // Calculate distance between milestones
        if (selectedMarker > 0) {
          let distanceToMilestone = 0;
          for (let i = 1; i <= selectedMarker; i++) {
            distanceToMilestone += calculateDistance(
              path[i - 1].lat,
              path[i - 1].lng,
              path[i].lat,
              path[i].lng
            );
          }

          newMilestone.distance = distanceToMilestone;
        } else {
          newMilestone.distance = 0;
        }

        // Update milestones directly without using undefined values
        const updatedMilestones = [...milestones];
        updatedMilestones[selectedMarker] = newMilestone;

        setMilestones(updatedMilestones);

        // Reset States of milestone fields
        setMilestoneName("");
        setMilestoneDescription("");
        setMilestoneImage([]);
        setExistingMilestonImage("");
        setSelectedMarker(null);
        setShowModal(false);
      }
    }
  };

  const handleRemoveMilestone = (indexToRemove) => {
    const updatedMilestones = milestones.filter(
      (_, index) => index !== indexToRemove
    );
    setMilestones(updatedMilestones);
  };

  const handleIndicateMarker = (markerIndex, name) => {
    setSelectedMarker(markerIndex);
    setMarkerTooltipName(name);

    // Delay opening the tooltip to ensure selectedMarker is updated
    if (showModal) {
      setTooltipVisible(false);
    } else {
      setTimeout(() => {
        setTooltipVisible(true);
      }, 0);
    }
  };

  //*************** Milestones functionality ***************//

  //*************** Map Tour Functionality ***************//
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
  //*************** Map Tour Functionality ***************//

  const handleMapClick = (e) => {
    // get lat, lng
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    if (routeCreationEnabled) {
      // Add a new point to the path array
      const newPath = [...path, { lat, lng }];
      setPath(newPath);

      if (newPath.length > 1) {
        // Calculate the distance between points and update total distance
        const newDistance = calculateDistance(
          newPath[newPath.length - 2].lat,
          newPath[newPath.length - 2].lng,
          newPath[newPath.length - 1].lat,
          newPath[newPath.length - 1].lng
        );
        setTotalDistance(totalDistance + newDistance);
      }
    }
  };

  //*************** Clear RouteFunctionality ***************//
  const clearRoute = () => {
    setPath([]);
    setTotalDistance(0);
    setMilestones([]);
    setRouteCreationEnabled(false);
    setSelectedMarker(null); // Reset selectedMarker
  };
  //*************** Clear RouteFunctionality ***************//

  //*************** Undo Last Point Functionality ***************//
  const undoLastPoint = () => {
    if (path.length > 0) {
      // Remove the last point from the path
      const updatedPath = path.slice(0, -1);
      setPath(updatedPath);

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
      setTotalDistance(updatedTotalDistance);
    }
  };
  //*************** Undo Last Point Functionality ***************//

  //*************** Calculate Distance Functionality ***************//
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
  //*************** Calculate Distance Functionality ***************//

  //*************** For Start and End Marker ***************//
  const firstMarkerIcon = {
    // scaledSize: window.google.maps && new window.google.maps.Size(30, 30),
    icon: "/map-marker.svg",
  };

  const lastMarkerIcon = {
    // scaledSize: window.google.maps && new window.google.maps.Size(30, 30),
    icon: "/map-marker.svg",
  };
  //*************** For Start and End Marker ***************//

  return (
    <div className="map-container" style={{ position: "relative" }}>
      {/* Show Tour */}
      <div className="tour__trigger">
        <QuestionCircleOutlined
          style={{ fontSize: "30px", color: "var(--primary-color)" }}
          title="See Tour"
          onClick={() => setShowTour(!showTour)}
        />
        <CloseCircleOutlined
          onClick={cancle}
          style={{ fontSize: "30px", color: "var(--primary-color)" }}
          title="Close Window"
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
          // ref={milestoneRef}
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
            {milestones.length > 0
              ? milestones.map((milestone, index) => {
                  const frontURL = milestone?.milestonImage
                    ? URL.createObjectURL(milestone?.milestonImage)
                    : null;

                  return (
                    milestone &&
                    milestone !== null &&
                    milestone !== undefined && (
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
                              handleIndicateMarker(index, milestone?.name)
                            }
                          />
                          {/* Commenting for testing purpost  */}
                          {/* {index === milestones.length - 1 && (
                            <button
                              className="remove__btn add__btn"
                              onClick={() => handleRemoveMilestone(index)}
                            >
                              &times;
                            </button>
                          )} */}

                          <button
                            className="remove__btn add__btn"
                            onClick={() => handleRemoveMilestone(index)}
                          >
                            &times;
                          </button>
                        </div>
                        <FlipCard
                          isOrg={true}
                          backImage={"/post-card.png"}
                          title={milestone?.name}
                          description={milestone?.description}
                          frontImage={frontURL ? frontURL : "/post-card.png"}
                          distance={milestone?.distance}
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
            milestones.length == 0 && toggleSidebar
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
                key={totalDistance == 0}
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
                {path.length > 1 && (
                  <Polyline
                    path={path}
                    options={{ strokeColor: "#193a69", strokeWeight: 4 }}
                  />
                )}
                {showMarkers &&
                  path.map((position, index) => (
                    <Marker
                      key={index}
                      position={position}
                      onClick={() => handleMarkerClick(index)}
                      icon={
                        index === 0
                          ? firstMarkerIcon.icon
                          : index === path.length - 1
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
                  ))}
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
              <span>{totalDistance.toFixed(2)} Meters</span>
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
                  {existingMilestonImage ? (
                    <div className="__preview_img_wrapp">
                      <CloseCircleOutlined
                        onClick={() => setExistingMilestonImage("")}
                      />
                      <Image
                        className="preview__img"
                        alt="Border Rowers"
                        src={
                          existingMilestonImage !== ""
                            ? URL?.createObjectURL(existingMilestonImage)
                            : ""
                        }
                        width={100}
                        height={100}
                      />
                    </div>
                  ) : (
                    <>
                      <ImageUpload
                        coverImage={milestoneImage[0]}
                        setCoverImage={(file) => setMilestoneImage(file, 0)}
                        name={"cover_image"}
                        imageId={0}
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
                        onChange={(e) =>
                          setMilestoneDescription(e.target.value)
                        }
                        maxLength={200}
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

export default GMap;
