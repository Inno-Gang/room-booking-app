/* tslint:disable */
/* eslint-disable */
/**
 * Room Booking Service
 * Innopolis University room booking service API.
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface DemoUserData
 */
export interface DemoUserData {
    /**
     * 
     * @type {any}
     * @memberof DemoUserData
     */
    email: any | null;
    /**
     * 
     * @type {any}
     * @memberof DemoUserData
     */
    password: any | null;
}

/**
 * Check if a given object implements the DemoUserData interface.
 */
export function instanceOfDemoUserData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "email" in value;
    isInstance = isInstance && "password" in value;

    return isInstance;
}

export function DemoUserDataFromJSON(json: any): DemoUserData {
    return DemoUserDataFromJSONTyped(json, false);
}

export function DemoUserDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): DemoUserData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
    };
}

export function DemoUserDataToJSON(value?: DemoUserData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
    };
}

