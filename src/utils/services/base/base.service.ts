import type { Document, FilterQuery } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class BaseService<Doc extends Document> {
  constructor(private readonly model: Model<Doc>) {}

  create = ((...params: Parameters<typeof this.model.create>) =>
    this.model.create(...params)) as typeof this.model.create;
  insertMany = ((...params: Parameters<typeof this.model.insertMany>) =>
    this.model.insertMany(...params)) as typeof this.model.insertMany;
  find = ((...params: Parameters<typeof this.model.find>) =>
    this.model.find(...params)) as typeof this.model.find;
  findById = ((...params: Parameters<typeof this.model.findById>) =>
    this.model.findById(...params)) as typeof this.model.findById;
  findOne = ((...params: Parameters<typeof this.model.findOne>) =>
    this.model.findOne(...params)) as typeof this.model.findOne;
  updateOne = ((...params: Parameters<typeof this.model.updateOne>) =>
    this.model.updateOne(...params)) as typeof this.model.updateOne;
  updateMany = ((...params: Parameters<typeof this.model.updateMany>) =>
    this.model.updateMany(...params)) as typeof this.model.updateMany;
  findOneAndUpdate = ((...params: Parameters<typeof this.model.findOneAndUpdate>) =>
    this.model.findOneAndUpdate(...params)) as typeof this.model.findOneAndUpdate;
  delete = ((...params: Parameters<typeof this.model.deleteOne>) =>
    this.model.deleteOne(...params)) as typeof this.model.deleteOne;

  async findAndDelete(filter: FilterQuery<Doc>) {
    const documents = await this.model.find(filter);
    const deletedInfo = await this.model.deleteMany(filter);
    return { ...deletedInfo, documents };
  }

  total(...params: Parameters<typeof this.model.countDocuments>) {
    return this.model.countDocuments(...params);
  }
}
