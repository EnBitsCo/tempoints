package co.enbits.tempoints.service;

import co.enbits.tempoints.model.Person;

import java.util.List;

import org.bson.types.ObjectId;

public interface PersonService {

	List<Person> findAll();

	List<Person> findByLastName(String name);
	
	Person findById(ObjectId id);

    Person save(Person person);
    
    Person update(Person person);

    void deletePersonById(String id);
}
