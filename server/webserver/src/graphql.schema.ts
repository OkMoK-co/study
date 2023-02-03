/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    name?: Nullable<string>;
    email?: Nullable<string>;
}

export abstract class IQuery {
    abstract users():
        | Nullable<Nullable<User>[]>
        | Promise<Nullable<Nullable<User>[]>>;

    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract createUser(): Nullable<User> | Promise<Nullable<User>>;
		abstract updateProfileMessage(name?: string, profileMessage?: string): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id?: Nullable<number>;
    name?: Nullable<string>;
		profileMessage?: Nullable<string>;
    email?: Nullable<string>;
}

type Nullable<T> = T | null;