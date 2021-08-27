import { CreateDateColumn, UpdateDateColumn, PrimaryColumn, BeforeInsert } from "typeorm";
import * as uuid from 'uuid';

export abstract class GenericEntity {

  @PrimaryColumn()
  id: string;

  @CreateDateColumn( { type: 'timestamp with time zone', select: false } )
  createdAt: Date;

  @UpdateDateColumn( { type: 'timestamp with time zone', select: false } )
  updatedAt: Date;

  @BeforeInsert()
  generateId () {
    if ( !this.id ) {
      this.id = uuid.v4();
    }
  }

}
