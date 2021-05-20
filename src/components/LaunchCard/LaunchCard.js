import { useState } from "react";
import styled from "styled-components";
import Close from "../../assets/Icons/Close";
import ImageNotFound from "../../assets/images/ImageNotFound.png";
import { monthNames } from "../../utils/constants";
import PxToRem from "../../utils/PxToRem";
import Col from "../common/Col";
import Modal from "../common/Modal";
import Row from "../common/Row";
import Text from "../common/Text";
import Status from "../Status";

const Image = styled.img`
  width: ${PxToRem(72)};
  height: ${PxToRem(72)};
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: ${PxToRem(24)};
`;

const Link = styled.a`
  width: ${PxToRem(16.85)};
  height: ${PxToRem(14)};
  margin-right: ${PxToRem(4)};
  cursor: pointer;
  text-decoration: none;
`;

const HorizontalRule = styled.hr`
  width: 95%;
  color: #e4e4e7;
  margin: 14px 0px;
`;

const LaunchCard = ({ launchDetails, isOpen, closeModal }) => {
  const [fallBackImage, setFallBackImage] = useState(false);
  const payload = launchDetails?.rocket?.second_stage?.payloads[0];

  const getFormattedDate = (utcDate) => {
    const date = new Date(utcDate * 1000);
    return `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()} ${date.toLocaleTimeString([], {
      timeStyle: "short",
    })}`;
  };

  const launchCardDetails = {
    "Flight Number": launchDetails?.flight_number,
    "Mission Name": launchDetails?.mission_name,
    "Rocket Type": launchDetails?.rocket?.rocket_type,
    "Rocket Name": launchDetails?.rocket?.rocket_name,
    Manufacturer: payload?.manufacturer,
    Nationality: payload?.nationality,
    "Launch Date": getFormattedDate(launchDetails?.launch_date_unix),
    "Payload Type": payload?.payload_type,
    Orbit: payload?.orbit,
    "Launch Site": launchDetails?.launch_site?.site_name,
  };
  return (
    <Modal
      isOpen={isOpen}
      containerHeight={PxToRem(741)}
      containerWidth={PxToRem(544)}
    >
      <Row alignItems={"flex-start"} justifyContent="space-between">
        <Row>
          <Image
            src={
              fallBackImage || launchDetails?.links?.mission_patch_small == null
                ? ImageNotFound
                : launchDetails?.links?.mission_patch_small
            }
            alt="Icon"
            onError={() => setFallBackImage(true)}
          ></Image>
          <Info>
            <Row>
              <Text
                fontSize={PxToRem(18)}
                lineHeight={PxToRem(18)}
                fontWeight={500}
                color="#1f2937"
              >
                {launchDetails?.mission_name}
              </Text>
              <Status
                marginLeft={PxToRem(16)}
                status={launchDetails?.launch_success}
              />
            </Row>
            <Text
              color="#374151"
              fontSize={PxToRem(12)}
              lineHeight={PxToRem(12)}
            >
              {launchDetails?.rocket?.rocket_name}
            </Text>
            <Row
              width={PxToRem(65)}
              padding={PxToRem(4)}
              flexDirection="space-betweem"
            >
              {launchDetails?.links?.article_link && (
                <Link href={launchDetails?.links?.article_link}>
                  <img
                    style={{ width: PxToRem(16.75), height: PxToRem(14) }}
                    src={require("../../assets/Icons/Nasa.svg").default}
                  />
                </Link>
              )}
              {launchDetails?.links?.wikipedia && (
                <Link href={launchDetails?.links?.wikipedia}>
                  <img
                    style={{ width: PxToRem(16.75), height: PxToRem(14) }}
                    src={require("../../assets/Icons/Wiki.svg").default}
                  />
                </Link>
              )}
              {launchDetails?.links?.video_link && (
                <Link href={launchDetails?.links?.video_link}>
                  <img
                    style={{ width: PxToRem(16.75), height: PxToRem(14) }}
                    src={require("../../assets/Icons/Youtube.svg").default}
                  />
                </Link>
              )}
            </Row>
          </Info>
        </Row>
        <Close onClick={closeModal} style={{ cursor: "pointer" }} />
      </Row>
      <Row>
        <Text
          padding={PxToRem(8)}
          textAlign="left"
          marginTop={PxToRem(16)}
          fontSize={PxToRem(14)}
          lineHeight={PxToRem(24)}
        >
          {launchDetails?.details}{" "}
          {launchDetails?.links?.wikipedia && (
            <Link color={"#5469d4"} href={launchDetails?.links?.wikipedia}>
              Wikipedia.
            </Link>
          )}
        </Text>
      </Row>
      <Col margin={`${PxToRem(32)} ${PxToRem(8)}`}>
        {Object.keys(launchCardDetails).map((detail, idx) => {
          return (
            <>
              <Row>
                <Text
                  fontSize={PxToRem(14)}
                  lineHeight={PxToRem(14)}
                  width={PxToRem(150)}
                  textAlign="left"
                >
                  {detail}
                </Text>
                <Text fontSize={PxToRem(14)} lineHeight={PxToRem(14)}>
                  {launchCardDetails[detail]}
                </Text>
              </Row>
              {idx != Object.keys(launchCardDetails).length - 1 && (
                <HorizontalRule />
              )}
            </>
          );
        })}
      </Col>
    </Modal>
  );
};

export default LaunchCard;
