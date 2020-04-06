import { takeLatest, takeEvery, call } from 'redux-saga/effects';
import { globalErrorHandler } from '../scenes/duck';

export function safeTakeLatest(action: any, saga: any) {
    return takeLatest(action, function* handler(...args) {
        // @ts-ignore
        yield* globalErrorHandler(function* handler2() {
            yield* saga(...args);
        });
    });
}

export function safeTakeEvery(action: any, saga: any) {
    return takeEvery(action, function* handler(...args) {
        // @ts-ignore
        yield* globalErrorHandler(function* handler2() {
            yield* saga(...args);
        });
    });
}

export const buildRequests = (func: any, tasksIds: any) => {
    return tasksIds.map((i: any) => {
        return call(func, i);
    });
};
