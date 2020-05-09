import {v1 as uuidv1} from 'uuid';
import {StrawberryBox, StrawberryEmployee} from "../types/schema-types";
import moment from "moment";

export const uuid = (): string => uuidv1();

export const recordUUID = (): { value: string } => ({value: uuid()});

export const recordValue = <T>(value: T): { value: T } => ({value});

export const recordKey = <T>(key: T): { key: T } => ({key});

export const rangeInDays = (range: any) => Math.abs(moment(range[0]).diff(moment(range[1]), 'd')) + 1;

export const calculateSalaryForAllTime = (employee: StrawberryEmployee) => {
  return employee.boxes?.reduce((previousValue: number, currentValue: StrawberryBox, currentIndex: number, array: StrawberryBox[]) => {
    const pricePerKilo = currentValue.workDay.pricePerKilo;
    const tareWeight = currentValue.workDay.tareWeight;
    const kilograms = currentValue.kilograms;
    const boxAmount = currentValue.boxAmount;

    return previousValue + (kilograms - (boxAmount * tareWeight)) * pricePerKilo;
  }, 0)
};

export const reduceWeightNumbers = (employee: StrawberryEmployee, workDayId: string) => {
  const weightNumbers: any =
      employee.boxes?.reduce((previousValue: Set<number | undefined>, currentValue: StrawberryBox, currentIndex: number, array: StrawberryBox[]) => {
        return currentValue.workDay.coreID === workDayId ? previousValue.add(currentValue.weightId) : previousValue;
      }, new Set());

  return Array.from(weightNumbers).join(', ')
};

export const calculateKilogramsByWorkDay = (employee: StrawberryEmployee, workDayId: string) => {
  return employee.boxes?.reduce((previousValue: number, currentValue: StrawberryBox, currentIndex: number, array: StrawberryBox[]) => {
    return currentValue.workDay.coreID === workDayId ? previousValue += currentValue.kilograms : previousValue;
  }, 0);
};

export const calculateSalaryByWorkDay = (employee: StrawberryEmployee, workDayId: string) => {
  if (employee.employeeRole.toString() === "PICKER") {
    return employee.boxes?.reduce((previousValue: number, currentValue: StrawberryBox, currentIndex: number, array: StrawberryBox[]) => {
      if (currentValue.workDay.coreID === workDayId) {
        const pricePerKilo = currentValue.workDay.pricePerKilo;
        const tareWeight = currentValue.workDay.tareWeight;
        const kilograms = currentValue.kilograms;
        const boxAmount = currentValue.boxAmount;
        const calculatedSalary = (kilograms - (boxAmount * tareWeight)) * pricePerKilo;

        return calculatedSalary ? previousValue + calculatedSalary : previousValue;
      } else {
        return previousValue;
      }
    }, 0);
  }
};
