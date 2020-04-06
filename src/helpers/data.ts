import { v1 as uuidv1 } from 'uuid';

export const uuid = (): string => uuidv1();

export const recordUUID = (): { value: string } => ({ value: uuid() });

export const recordValue = <T>(value: T): { value: T } => ({ value });

export const recordKey = <T>(key: T): { key: T } => ({ key });
