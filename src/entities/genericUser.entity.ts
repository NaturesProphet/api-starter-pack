import { Column, Index, BeforeInsert } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { GenericEntity } from "./generic.entity";
import { EnumStatusUsuario } from "./enums/statusUsuario.enum";
import { EnumGenero } from "./enums/genero.enum";


export abstract class GenericUser extends GenericEntity {

  @BeforeInsert()
  padronize () {
    this.email = this.email.toLowerCase();
  }

  @Column()
  name: string;

  @Column( { select: false } )
  private passwordHash: string;

  @Column()
  @Index( { unique: true } )
  email: string;


  @Column( { nullable: true, name: 'pushId' } )
  pushId: string;


  @Column( {
    type: "enum",
    enum: EnumStatusUsuario,
    default: EnumStatusUsuario.PENDENTE
  } )
  status: EnumStatusUsuario;

  @Column( { nullable: true } )
  suspendReason: string;


  @Column( { type: 'date', nullable: true } )
  birthDay: Date;


  @Column( { nullable: true } )
  @Index( { unique: true } )
  document: string;


  @Column( { nullable: true } )
  @Index( { unique: true } )
  phone: string;


  @Column( { nullable: true } )
  profilePicturePath: string;


  @Column( { nullable: true, select: false } )
  emailVerificationCode: string;


  @Column( {
    type: "enum",
    enum: EnumGenero,
    nullable: true
  } )
  genre: EnumGenero;


  setPassword ( password: string ) {
    this.passwordHash = bcrypt.hashSync( password );
  }

  getPasswordHash () {
    return this.passwordHash;
  }

}
