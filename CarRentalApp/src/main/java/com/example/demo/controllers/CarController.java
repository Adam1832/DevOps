package com.example.carrental.controllers;

import com.example.carrental.models.Car;
import com.example.carrental.services.CarService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cars")
public class CarController {
    private final CarService carService;

    public CarController(CarService carService) {
        this.carService = carService;
    }

    @GetMapping
    public ResponseEntity<List<Car>> getAvailableCars() {
        return new ResponseEntity<>(carService.getAvailableCars(), HttpStatus.OK);
    }

    @GetMapping("/{plateNumber}")
    public ResponseEntity<Car> getCar(@PathVariable String plateNumber) {
        Optional<Car> car = carService.getCarByPlate(plateNumber);
        return car.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                  .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{plateNumber}")
    public ResponseEntity<String> rentCar(@PathVariable String plateNumber, @RequestParam boolean rent) {
        boolean success = rent ? carService.rentCar(plateNumber) : carService.returnCar(plateNumber);

        if (success) {
            return new ResponseEntity<>("Opération réussie.", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Opération échouée. Vérifiez l'état de la voiture.", HttpStatus.BAD_REQUEST);
        }
    }
}
