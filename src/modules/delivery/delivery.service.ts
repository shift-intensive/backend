import { Injectable } from '@nestjs/common';

import { PACKAGE_TYPES, POINTS } from './constants';
import { DeliveryPackageType, DeliveryPoint } from './entities';

@Injectable()
export class DeliveryService {
  getDeliveryPoints(): DeliveryPoint[] {
    return POINTS;
  }

  getDeliveryPoint(pointId: string): DeliveryPoint {
    return POINTS.find((point) => point.id === pointId);
  }

  getDeliveryPackageTypes(): DeliveryPackageType[] {
    return PACKAGE_TYPES;
  }

  getDeliveryPackageType(typeId: string): DeliveryPackageType {
    return PACKAGE_TYPES.find((type) => type.id === typeId);
  }
}
