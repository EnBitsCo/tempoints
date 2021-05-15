package co.enbits.tempoints.controller;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import co.enbits.tempoints.dto.PersonDTO;
import co.enbits.tempoints.model.Person;
import co.enbits.tempoints.service.PersonService;
import co.enbits.tempoints.util.ObjectMapperUtils;

@RestController
@RequestMapping("/people")
public class PersonRestController {

	@Autowired
    private PersonService personService;
	
	@GetMapping(value = "/")
    public List<PersonDTO> getAllStudents() {
        return ObjectMapperUtils.mapAll(personService.findAll(), PersonDTO.class);
    }

    @PostMapping(value = "/save")
    public ResponseEntity<?> saveOrUpdatePerson(@RequestBody PersonDTO personDTO) {
        personService.save(ObjectMapperUtils.map(personDTO, Person.class));
        return new ResponseEntity("Person added successfully", HttpStatus.OK);
    }

    @DeleteMapping(value = "/delete/{personId}")
    public ResponseEntity<?> deletePersonById(@PathVariable ObjectId personId) {
        personService.deletePersonById(personService.findById(personId).getId());
        return new ResponseEntity("Person deleted successfully", HttpStatus.OK);
    }
    
    @PutMapping(value = "/{id}")
    public void modifyPersonById(@PathVariable("id") String id, @RequestBody Person person) {
      person.setId(id);
      personService.save(person);
    }
}
