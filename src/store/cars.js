// src/stores/cars.js

import { writable, derived } from 'svelte/store';

// Sample car data
const initialCars = [
    {
        manufacturer: 'Toyota',
        cars: [
            { id: 1, model: 'Corolla', year: 2020 },
            { id: 2, model: 'Camry', year: 2021 },
        ],
    },
    {
        manufacturer: 'Honda',
        cars: [
            { id: 3, model: 'Civic', year: 2019 },
            { id: 4, model: 'Accord', year: 2022 },
        ],
    },
    {
        manufacturer: 'Ford',
        cars: [
            { id: 5, model: 'F-150', year: 2022 },
            { id: 6, model: 'Mustang', year: 2020 },
        ],
    },
    {
        manufacturer: 'Chevrolet',
        cars: [
            { id: 7, model: 'Silverado', year: 2021 },
            { id: 8, model: 'Camaro', year: 2023 },
        ],
    },
    {
        manufacturer: 'BMW',
        cars: [
            { id: 9, model: '3 Series', year: 2021 },
            { id: 10, model: '5 Series', year: 2020 },
        ],
    },
    // Add more manufacturers and their cars here
];

// Create a writable store for cars
const cars = writable(initialCars);

// Function to check if a car already exists for a manufacturer
function isCarDuplicate(manufacturer, newCar) {
    return initialCars.some(
        (car) =>
            car.manufacturer === manufacturer &&
            car.cars.some(
                (existingCar) =>
                    existingCar.model === newCar.model && existingCar.year === newCar.year
            )
    );
}

// Function to add a new car to the store
export function addCar(manufacturer, newCar) {
    if (isCarDuplicate(manufacturer, newCar)) {
        // Car already exists, handle duplicate car scenario (you can show an error message)
        console.error('Duplicate car entry. Car not added.');
        return;
    }

    cars.update((carList) => {
        // Check if the manufacturer already exists in the car list
        const manufacturerIndex = carList.findIndex(
            (item) => item.manufacturer === manufacturer
        );

        // If the manufacturer exists, add the new car to its cars array
        if (manufacturerIndex !== -1) {
            carList[manufacturerIndex].cars.push(newCar);
        } else {
            // If the manufacturer doesn't exist, add a new entry for it
            const newManufacturer = {
                manufacturer,
                cars: [newCar],
            };
            carList.push(newManufacturer);
        }

        return carList;
    });
}

// Function to delete a car from the store
export function deleteCar(manufacturer, carId) {
    cars.update((carList) => {
        const manufacturerIndex = carList.findIndex(
            (item) => item.manufacturer === manufacturer
        );
        if (manufacturerIndex !== -1) {
            carList[manufacturerIndex].cars = carList[
                manufacturerIndex
            ].cars.filter((car) => car.id !== carId);
        }
        return carList;
    });
}

// Function to update the details of a car in the store
export function updateCar(manufacturer, updatedCar) {
    cars.update((carList) => {
        const manufacturerIndex = carList.findIndex(
            (item) => item.manufacturer === manufacturer
        );
        if (manufacturerIndex !== -1) {
            const updatedManufacturerCars = carList[
                manufacturerIndex
            ].cars.map((car) => (car.id === updatedCar.id ? { ...car, ...updatedCar } : car));
            carList[manufacturerIndex].cars = updatedManufacturerCars;
        }
        return carList;
    });
}


// Create a writable store for the selected manufacturer
export const selectedManufacturer = writable(null);

// Create an updateSelected function to update the selected manufacturer
export function updateSelected(manufacturer) {
    cars.update((carList) => {
        const selectedCar = carList.find((car) => car.manufacturer === manufacturer);
        selectedManufacturer.set(selectedCar ? { ...selectedCar } : null);
        return carList;
    });
}

// Create a derived store to get the selected manufacturer from cars
export const selectedManufacturerFromCars = derived([cars, selectedManufacturer], ([$cars, $selectedManufacturer]) => {
    return $cars.find((car) => car.manufacturer === $selectedManufacturer?.manufacturer) || null;
});

export default cars;
