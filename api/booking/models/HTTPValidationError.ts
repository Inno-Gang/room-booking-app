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
 * @interface HTTPValidationError
 */
export interface HTTPValidationError {
    /**
     * 
     * @type {any}
     * @memberof HTTPValidationError
     */
    detail?: any | null;
}

/**
 * Check if a given object implements the HTTPValidationError interface.
 */
export function instanceOfHTTPValidationError(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function HTTPValidationErrorFromJSON(json: any): HTTPValidationError {
    return HTTPValidationErrorFromJSONTyped(json, false);
}

export function HTTPValidationErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): HTTPValidationError {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'detail': !exists(json, 'detail') ? undefined : json['detail'],
    };
}

export function HTTPValidationErrorToJSON(value?: HTTPValidationError | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'detail': value.detail,
    };
}
