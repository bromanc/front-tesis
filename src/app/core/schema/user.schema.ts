import {IDegree} from "./degree.schema";

export interface IUser {
    created_at: string;
    email: string;
    email_verified: boolean;
    identities: IIdentities[];
    name: string;
    nickname: string;
    picture: string;
    updated_at: string;
    user_id: string;
    last_login: string;
    last_ip: string;
    logins_count: number;
    management: any;
}

export interface IIdentities {
    connection: string;
    provider: string;
    user_id: string;
    isSocial: string;
}
