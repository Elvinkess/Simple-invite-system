export interface IBaseRepository<TDomain, TDoc> {
    create(data: any): Promise<TDomain>;
    findById(id: string): Promise<TDomain | null>;
    findOne(filter: Partial<Record<keyof TDoc, any>>): Promise<TDomain | null>;
    _update(id: string, update: Partial<TDoc>): Promise<TDomain>;
    
  update (id: string, update: Partial<TDomain>): Promise<TDomain> 
  }
  