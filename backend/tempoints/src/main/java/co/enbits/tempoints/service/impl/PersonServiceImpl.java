package co.enbits.tempoints.service.impl;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import co.enbits.tempoints.model.Person;
import co.enbits.tempoints.repository.PersonRepository;
import co.enbits.tempoints.service.PersonService;

@Service
public class PersonServiceImpl implements PersonService {

	@Autowired
    private PersonRepository personRepository;
	
	@Override
	public List<Person> findAll() {
		return personRepository.findAll();
	}

	@Override
	public List<Person> findByLastName(String name) {
		return personRepository.findByLastName(name);
	}

	@Override
	public Person save(Person person) {
		return personRepository.save(person);
	}
	
	@Override
	public Person update(Person person) {
		return personRepository.save(person);
	}

	@Override
	public void deletePersonById(String id) {
		personRepository.deleteById(id);
	}

	@Override
	public Person findById(ObjectId id) {
		return personRepository.findById(id);
	}

}
