package dev.jcsystem.backend.controller;

import dev.jcsystem.backend.exception.ResourceNotFoundException;
import dev.jcsystem.backend.model.Customer;
import dev.jcsystem.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000/")
@RestController
@RequestMapping("/api/v1")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    // Listar Clientes
    @GetMapping("/customer")
    public List<Customer> customerList(){
        return customerRepository.findAll();
    }

    // Crear Clientes
    @PostMapping("/customer")
    public Customer createCustomer(@RequestBody Customer customer){
        return customerRepository.save(customer);
    }

    // Listar Clientes por ID
    @GetMapping("/customer/{id}")
    public ResponseEntity<Customer> customerListById(@PathVariable Long id){
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El cliente " + id + " no existe"));
        return ResponseEntity.ok(customer);
    }

    // Actualizar Clientes
    @PutMapping("/customer/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id,@RequestBody Customer customerRequest){
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El cliente " + id + " no existe"));
        customer.setName(customerRequest.getName());
        customer.setLastname(customerRequest.getLastname());
        customer.setEmail(customerRequest.getEmail());
        customer.setPhone(customerRequest.getPhone());
        customer.setAddress(customerRequest.getAddress());

        Customer customerUpdated = customerRepository.save(customer);
        return ResponseEntity.ok(customerUpdated);
    }

    // Eliminar Clientes
    @DeleteMapping("/customer/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteCustomer(@PathVariable Long id){
        Customer customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El cliente " + id + " no existe"));

        customerRepository.delete(customer);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
