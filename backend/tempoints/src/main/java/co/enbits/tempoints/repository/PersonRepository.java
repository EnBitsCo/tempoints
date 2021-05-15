package co.enbits.tempoints.repository;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import co.enbits.tempoints.model.Person;

public interface PersonRepository extends MongoRepository<Person, String> {

	List<Person> findAll();
	List<Person> findByLastName(String name);
	Person findById(ObjectId id);

}
