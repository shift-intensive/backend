import { getDistance } from './getDistance';

interface PointCoordinates {
  latitude: number;
  longitude: number;
}

interface PackageData {
  height: number;
  length: number;
  weight: number;
  width: number;
}

export interface CalculateDeliveryParams {
  packageData: PackageData;
  receiverPointCoordinates: PointCoordinates;
  senderPointCoordinates: PointCoordinates;
}

export const calculateDelivery = ({
  packageData,
  receiverPointCoordinates,
  senderPointCoordinates
}: CalculateDeliveryParams) => {
  const distancePrice = getDistance(
    senderPointCoordinates.latitude,
    senderPointCoordinates.longitude,
    receiverPointCoordinates.latitude,
    receiverPointCoordinates.longitude
  );

  const sizeWeightPrice =
    (packageData.length * packageData.weight * packageData.height * packageData.width) / 10_000;

  const price = Math.round((distancePrice + sizeWeightPrice) * 100);

  return price;
};
