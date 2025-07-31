// infrastructure/db/BaseRepository.ts
import { Model, Types } from 'mongoose';
import { IBaseRepository } from '../../usecase/interface/repository/base_repo';

export abstract class BaseRepository<TDomain, TDoc> implements IBaseRepository<TDomain,TDoc> {
  protected model: Model<TDoc>;

  constructor(model: Model<TDoc>) {
    this.model = model;
  }

   create =async (data: any): Promise<TDomain> => {
    const doc = await this.model.create(data);
    return this.toDomain(doc);
  }

   findById= async (id: string): Promise<TDomain | null>=> {
    const doc = await this.model.findById(new Types.ObjectId(id));
    return doc ? this.toDomain(doc) : null;
  }

   findOne= async (filter: Partial<Record<keyof TDoc, any>>): Promise<TDomain | null>=> {
    const doc = await this.model.findOne(filter);
    return doc ? this.toDomain(doc) : null;
  }

   
  _update = async (id: string, update: Partial<TDoc>): Promise<TDomain> => {
    const doc = await this.model.findByIdAndUpdate(
      new Types.ObjectId(id),
      update,
      { new: true } // ensures it returns the updated document
    );
  
    if (!doc) throw new Error(`Document with id ${id} not found`);
  
    return this.toDomain(doc);
  };
  



  update = async (id: string, update: Partial<TDomain>): Promise<TDomain> => {
    const updateObj = { ...update } as Record<string, any>;
  
    const objectIdFields = ['estateId', 'houseId', 'flatId'];
    for (const key of objectIdFields) {
      if (key in updateObj && typeof updateObj[key] === 'string') {
        updateObj[key] = new Types.ObjectId(updateObj[key]);
      }
    }
  
    const doc = await this.model.findByIdAndUpdate(
      new Types.ObjectId(id),
      updateObj,
      { new: true }
    );
  
    if (!doc) throw new Error(`Document with id ${id} not found`);
  
    return this.toDomain(doc);
  };
  
  
  

  // Convert known string IDs to ObjectId
  private convertStringIds(data: Partial<TDoc>): Partial<TDoc> {
    const objectIdFields = ['houseId', 'flatId', 'estateId',]; // Add others if needed

    const converted: any = { ...data };

    for (const key of objectIdFields) {
      if (converted[key] && typeof converted[key] === 'string') {
        converted[key] = new Types.ObjectId(converted[key]);
      }
    }

    return converted;
  }

  // import to convert Tdoc to my entity
  protected abstract toDomain(doc: TDoc): TDomain;
}
